import { GameObject } from './GameObject';

export default class Unity {
    /** @type {typeof GameObject} */
    static GameObject = GameObject;
    static internalLogs = false;
    static types = {
        int: "System.Int32",
        float: "System.Single",
        double: "System.Double",
        bool: "System.Boolean",
        string: "System.String",
        char: "System.Char",
        byte: "System.Byte",
        long: "System.Int64",
        short: "System.Int16",
        decimal: "System.Decimal",
        object: "System.Object",
        customClass: (className, namespace = "", assembly = "Assembly-CSharp") => {
            const qualifiedName = namespace === "" ? className : `${namespace}.${className}`;
            return `${qualifiedName}, ${assembly}.dll`;
        },
    };

    static #clientEventCallback;
    static #instanceReady = false;
    static #onInstanceReadyListeners = new Set();
    static #onEventListeners = {};

    static LoadInstance(url, elementId) {
        Unity.#instanceReady = false;
        const r = new XMLHttpRequest();
        r.open("GET", url + "/index.html", true);
        r.onreadystatechange = function () {
            if (r.readyState !== 4 || r.status !== 200) return;
            document.querySelector(`#${elementId}`).innerHTML = r.responseText;

            const link = document.createElement('link');

            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = url + "/TemplateData/style.css";
            document.head.appendChild(link);

            const indexScript = document.createElement("script");
            indexScript.src = url + "/index.js";
            document.body.appendChild(indexScript);
        };
        r.send();
    }

    static GetBuildVersion() {
        return Unity.InvokeEvent("InstanceEvent:GetBuildVersion");
    }

    static InvokeEvent(eventName, payload = undefined) {
        const responseJson = Unity.#invokeEventInternal(eventName, payload);
        try {
            const response = JSON.parse(responseJson);
            if(response.hasOwnProperty("promiseId")){
                console.warn(`Event '${eventName}' returned a promise. Consider using InvokeEventAsync instead.`);
                Unity.onEvent(`PromiseResolvedEvent:${response.promiseId}`, payload => {
                    delete Unity.#onEventListeners[`PromiseResolvedEvent:${response.promiseId}`];
                });
            }
            return response;
        }
        catch {
            return responseJson;
        }
    }

    static async InvokeEventAsync(eventName, payload = undefined) {
        return new Promise(resolve => {
            const responseJson = Unity.#invokeEventInternal(eventName, payload);
            try {
                const response = JSON.parse(responseJson);
                if(response.hasOwnProperty("promiseId")){
                    Unity.onEvent(`PromiseResolvedEvent:${response.promiseId}`, payload => {
                        resolve(payload);
                        delete Unity.#onEventListeners[`PromiseResolvedEvent:${response.promiseId}`];
                    });
                }
                else {
                    resolve(response);
                }
            } catch {
                resolve(responseJson);
            }
        })
    }

    static async WaitForEndOfFrameAsync() {
        return new Promise((resolve) => {
            const eventId = crypto.randomUUID().toString();
            const eventName = `EndOfFrameEvent:${eventId}`;

            Unity.onEvent(eventName, () => {
                resolve();
                delete Unity.#onEventListeners[eventName];
            });

            Unity.InvokeEvent("InstanceEvent:WaitForEndOfFrame", eventId);
        });
    }

    static async LoadBundleAsync(bundleUrl) {
        await Unity.InvokeEventAsync("InstanceEvent:LoadBundle", bundleUrl);
    }

    static async InstantiatePrefabFromBundleAsync(bundleUrl, prefabName, parentKey = "") {
        await Unity.InvokeEventAsync("InstanceEvent:InstantiatePrefabFromBundle", {
            bundleUrl: bundleUrl,
            prefabName: prefabName,
            parentKey: parentKey
        });
    }

    // Listeners -----------------------------

    static onInstanceReady(callback) {
        if(!Unity.#instanceReady) {
            Unity.#onInstanceReadyListeners.add(callback);
        }
        else {
            callback();
        }
    }

    static onEvent(eventName, callback) {
        if(!Unity.#onEventListeners.hasOwnProperty(eventName)) {
            Unity.#onEventListeners[eventName] = new Set();
        }
        Unity.#onEventListeners[eventName].add(callback);
    }

    static offEvent(eventName, callback) {
        if(!Unity.#onEventListeners.hasOwnProperty(eventName)) return;
        Unity.#onEventListeners[eventName].delete(callback);
    }

    static #invokeEventInternal(eventName, payload) {
        if(payload === undefined || payload === null) payload = "";
        let payloadJson = payload;
        if(typeof payload === "object") payloadJson = JSON.stringify(payload);
        else if(typeof payload !== "string") payloadJson = payload.toString();
        const responseJson = Unity.#clientEventCallback(eventName, payloadJson);
        Unity.#onEventListeners[eventName]?.forEach(callback => callback(payloadJson));
        return responseJson;
    }

    // JSLib usage -----------------------------

    /**Only for unity js library use*/
    static _instanceReady() {
        Unity.#instanceReady = true;
        Unity.#onInstanceReadyListeners.forEach(callback => callback());
    }

    /**Only for unity js library use*/
    static _registerClientListener(callback) {
        Unity.#clientEventCallback = callback;
    }

    /**Only for unity js library use*/
    static _receiveEvent(eventName, payloadJson) {
        let payload = payloadJson;
        try {
            payload = JSON.parse(payloadJson);
        } catch {}

        Unity.InvokeEvent(eventName, payload);
    }

    /**Only for unity js library use*/
    static _logFromUnity(verbosity, message) {
        if(verbosity === "internal" && !Unity.internalLogs) return;
        if(verbosity === "error") console.error(`[Unity] ${message}`);
        else if(verbosity === "warning") console.warn(`[Unity] ${message}`);
        else console.log(`[Unity] ${message}`);
    }

}

export class GameObject {

    static keyGameObjects = {};
    static #lifeCycleCallbacks = {
        awake: {},
        start: {},
        enable: {},
        disable: {},
        destroy: {}
    }

    static GetKeyGameObject(key){
        if(!GameObject.keyGameObjects.hasOwnProperty(key)) {
            console.error(`GameObject with key '${key}' not found`);
            return null;
        }
        return GameObject.keyGameObjects[key];
    }

    static onAwake(key, callback){
        if(!GameObject.#lifeCycleCallbacks.awake.hasOwnProperty(key)) {
            GameObject.#lifeCycleCallbacks.awake[key] = new Set();
        }
        GameObject.#lifeCycleCallbacks.awake[key].add(callback);
    }

    static onStart(key, callback) {
        if(!GameObject.#lifeCycleCallbacks.start.hasOwnProperty(key)) {
            GameObject.#lifeCycleCallbacks.start[key] = new Set();
        }
        GameObject.#lifeCycleCallbacks.start[key].add(callback);
    }

    static onEnable(key, callback) {
        if(!GameObject.#lifeCycleCallbacks.enable.hasOwnProperty(key)) {
            GameObject.#lifeCycleCallbacks.enable[key] = new Set();
        }
        GameObject.#lifeCycleCallbacks.enable[key].add(callback);
    }

    static onDisable(key, callback) {
        if(!GameObject.#lifeCycleCallbacks.disable.hasOwnProperty(key)) {
            GameObject.#lifeCycleCallbacks.disable[key] = new Set();
        }
        GameObject.#lifeCycleCallbacks.disable[key].add(callback);
    }

    static onDestroy(key, callback) {
        if(!GameObject.#lifeCycleCallbacks.destroy.hasOwnProperty(key)) {
            GameObject.#lifeCycleCallbacks.destroy[key] = new Set();
        }
        GameObject.#lifeCycleCallbacks.destroy[key].add(callback);
    }

    static _register(key, data) {
        GameObject.keyGameObjects[key] = new GameObject(key, data);
    }

    static _receiveLifeCycleEvent(key, event) {
        const gameObject = GameObject.keyGameObjects[key];
        if(!gameObject) return;

        const callbacks = GameObject.#lifeCycleCallbacks[event][key];
        if(callbacks) {
            for(const callback of callbacks) {
                callback(gameObject);
            }
        }
        if(event === "destroy") {
            gameObject.transform = null;
            delete GameObject.keyGameObjects[key];
        }
    }

    constructor(key, data) {
        this.key = key;
        this.name = data.name;
        this.transform = data.transform;
        this.hierarchyPath = data.hasOwnProperty("hierarchyPath") ? data.hierarchyPath : "";
    }

    SetActive(active) {
        this?.#invokeGameObjectEvent("gameObject.setActive", active);
    }

    InvokeMethod(methodName, paramType = "", paramValue = "") {
        paramType = Unity.types[paramType] || paramType;
        this?.#invokeGameObjectEvent("gameObject.invokeMethod", { methodName: methodName, parameterType: paramType, parameterValue: paramValue });
    }

    GetChild(query) {
        const eventName = typeof query === "string" ? "gameObject.findChild" : "gameObject.getChild";
        const childData = this?.#invokeGameObjectEvent(eventName, query);
        if(childData !== null) {
            const currentPath = this.hierarchyPath === "" ? this.key : this.hierarchyPath;
            childData.hierarchyPath = currentPath + "/" + childData.name;
            return new GameObject(this.key, childData);
        }
        return null;
    }

    Translate(x, y, z) {
        this?.#invokeGameObjectEvent("transform.translate", { x: x, y: y, z: z });
    }

    Rotate(x, y, z) {
        this?.#invokeGameObjectEvent("transform.rotate", { x: x, y: y, z: z });
    }

    SetLocalScale(x, y, z) {
        this?.#invokeGameObjectEvent("transform.setLocalScale", { x: x, y: y, z: z });
    }

    SetLocalPosition(x, y, z) {
        this?.#invokeGameObjectEvent("transform.setLocalPosition", { x: x, y: y, z: z });
    }

    SetText(text) {
        this?.#invokeGameObjectEvent("text.setText", text);
    }

    Destroy() {
        this?.#invokeGameObjectEvent("gameObject.destroy", "");
    }

    #invokeGameObjectEvent(eventName, payload) {
        if(!this.transform) return null;

        let payloadJson = payload;
        if(typeof payload === "object") payloadJson = JSON.stringify(payload);
        else if(typeof payload !== "string") payloadJson = payload.toString();
        const eventPayload = { eventName: eventName, hierarchyPath: this.hierarchyPath, payloadJson: payloadJson, listenDisabled: true };
        
        const response = Unity.InvokeEvent(`GOEvent:${this.key}`, JSON.stringify(eventPayload));

        if(Unity.internalLogs) console.log(`Invoked Event: GOEvent:${this.key}`, eventPayload);

        if(response === null || !response.hasOwnProperty("ok")){
            console.error(`Invalid JSON response from GameObject event callback: ${response}`);
            return null;
        }

        if(response.ok) {
            let responseObj = response.responseJson;
            try {
                responseObj = JSON.parse(response.responseJson);
            } catch {}
            return responseObj;
        }
        console.error(`Error invoking GameObject event: ${eventName}`, response.error);
        return null;
    }
}

import { Transform } from './Transform';
import { Rigidbody } from './Rigidbody';

export class GameObject {
    #transform = null;
    #rigidbody = null;

    static keyGameObjects = {};
    static #lifeCycleCallbacks = {
        awake: {},
        start: {},
        update: {},
        enable: {},
        disable: {},
        destroy: {}
    }

    /**
     * Gets a GameObject by its JS Key (previously set in Unity using the JSKeyGameObject component).
     * @param {string} key
     * @returns {GameObject | null}
     * @constructor
     */
    static GetKeyGameObject(key){
        if(!GameObject.keyGameObjects.hasOwnProperty(key)) {
            console.error(`GameObject with key '${key}' not found`);
            return null;
        }
        return GameObject.keyGameObjects[key];
    }
    
    /**
     * Instantiates a prefab at the specified position and rotation either in world space or relative to a parent GameObject.
     * @param {string} prefabPath - The path to the prefab to instantiate from a Resources folder.
     * @param {Object} position - The position to instantiate the prefab at (Defaults to Vector3.Zero).
     * @param {Object} rotation - The rotation to instantiate the prefab with (Defaults to Quaternion.Identity).
     * @param {GameObject | Transform | null} parent - The parent GameObject to instantiate the prefab relative to (Defaults to null).
     */
    static Instantiate(prefabPath, position = { x: 0, y: 0, z: 0 }, rotation = { x: 0, y: 0, z: 0, w: 1 }, parent = null) {
        if(parent === null){
            Unity.InvokeEvent("InstanceEvent:InstantiateGameObject", { prefabPath: prefabPath, position: position, rotation: rotation });
        }
        else {
            const p = parent instanceof GameObject ? parent : parent instanceof Transform ? parent.gameObject : null;
            if(p === null) return;
            p.Instantiate(prefabPath, position, rotation);
        }
    }

    /**
     * Registers a callback for a GameObject's Awake event using its JS Key. If the GameObject doesn't exist yet, it will trigger when it's created.
     * @param {string} key
     * @param {function} callback
     */
    static onAwake(key, callback){
        if(!GameObject.#lifeCycleCallbacks.awake.hasOwnProperty(key)) {
            GameObject.#lifeCycleCallbacks.awake[key] = new Set();
        }
        GameObject.#lifeCycleCallbacks.awake[key].add(callback);
    }

    /**
     * Registers a callback for a GameObject's Start event using its JS Key. If the GameObject doesn't exist yet, it will trigger when it's created.
     * @param {string} key
     * @param {function} callback
     */
    static onStart(key, callback) {
        if(!GameObject.#lifeCycleCallbacks.start.hasOwnProperty(key)) {
            GameObject.#lifeCycleCallbacks.start[key] = new Set();
        }
        GameObject.#lifeCycleCallbacks.start[key].add(callback);
    }
    
    /**
     * Registers a callback for a GameObject's Update event using its JS Key. If the GameObject doesn't exist yet, it will trigger when it's created.
     * @param {string} key
     * @param {function} callback
     */
    static onUpdate(key, callback) {
        if(!GameObject.#lifeCycleCallbacks.update.hasOwnProperty(key)) {
            GameObject.#lifeCycleCallbacks.update[key] = new Set();
        }
        GameObject.#lifeCycleCallbacks.update[key].add(callback);
    }

    /**
     * Registers a callback for a GameObject's OnEnable event using its JS Key. If the GameObject doesn't exist yet, it will trigger when it's created.
     * @param {string} key
     * @param {function} callback
     */
    static onEnable(key, callback) {
        if(!GameObject.#lifeCycleCallbacks.enable.hasOwnProperty(key)) {
            GameObject.#lifeCycleCallbacks.enable[key] = new Set();
        }
        GameObject.#lifeCycleCallbacks.enable[key].add(callback);
    }

    /**
     * Registers a callback for a GameObject's OnDisable event using its JS Key. If the GameObject doesn't exist yet, it will trigger when it's created and then disabled.
     * @param {string} key
     * @param {function} callback
     */
    static onDisable(key, callback) {
        if(!GameObject.#lifeCycleCallbacks.disable.hasOwnProperty(key)) {
            GameObject.#lifeCycleCallbacks.disable[key] = new Set();
        }
        GameObject.#lifeCycleCallbacks.disable[key].add(callback);
    }

    /**
     * Registers a callback for a GameObject's Destroy event using its JS Key. If the GameObject doesn't exist yet, it will trigger when it's created and then destroyed.
     * @param {string} key
     * @param {function} callback
     */
    static onDestroy(key, callback) {
        if(!GameObject.#lifeCycleCallbacks.destroy.hasOwnProperty(key)) {
            GameObject.#lifeCycleCallbacks.destroy[key] = new Set();
        }
        GameObject.#lifeCycleCallbacks.destroy[key].add(callback);
    }

    /**Only for unity js library use*/
    static _register(key, data) {
        GameObject.keyGameObjects[key] = new GameObject(key, data);
    }

    /**Only for unity js library use*/
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
            delete GameObject.keyGameObjects[key];
        }
    }

    constructor(key, data) {
        this.key = key;
        this.name = data.name;
        this.#transform = new Transform(this);
        if(data.hasRigidbody) {
            this.#rigidbody = new Rigidbody(this);
        }
        this.hierarchyPath = data.hasOwnProperty("hierarchyPath") ? data.hierarchyPath : "";
    }
    
    /**
     * Gets the Transform component of the GameObject.
     * @returns {Transform | null}
     */
    get transform() {
        // A GameObject HAS to have a transform
        return this.#transform;
    }

    /**
     * Gets the RigidBody component of the GameObject.
     * @returns {Rigidbody | null}
     */
    get rigidbody() {
        if(this.#rigidbody) return this.#rigidbody;
        const hasRigidbody = this._invokeGameObjectEvent("gameObject.hasComponent", "rigidbody");
        if(hasRigidbody) {
            this.#rigidbody = new Rigidbody(this);
            return this.#rigidbody;
        }
        return null;
    }

    /** 
     * Sets the GameObject's active state.
     * @param {boolean} active
     */
    SetActive(active) {
        this?._invokeGameObjectEvent("gameObject.setActive", active);
    }

    /**
     * Invokes a method on the GameObject via SendMessage. Use GameObject.types for type options.
     * <br>In order for it to work with custom types, you need to get the fully qualified name of the type.
     * @param {string} methodName 
     * @param {string} paramType 
     * @param {string} paramValue 
     */
    InvokeMethod(methodName, paramType = "", paramValue = "") {
        paramType = Unity.types[paramType] || paramType;
        this?._invokeGameObjectEvent("gameObject.invokeMethod", { methodName: methodName, parameterType: paramType, parameterValue: paramValue });
    }

    /**
     * Gets a child GameObject by index or name.
     * @param {number | string} query 
     * @returns {GameObject | null}
     */
    GetChild(query) {
        const eventName = typeof query === "string" ? "gameObject.findChild" : "gameObject.getChild";
        const childData = this?._invokeGameObjectEvent(eventName, query);
        if(childData !== null) {
            const currentPath = this.hierarchyPath === "" ? this.key : this.hierarchyPath;
            childData.hierarchyPath = currentPath + "/" + childData.name;
            return new GameObject(this.key, childData);
        }
        return null;
    }

    /**
     * Looks for a text component and sets its text to the specified value. It works with Legacy, TextMeshPro, and TextMesh components.
     * @param {string} text
     */
    SetText(text) {
        this?._invokeGameObjectEvent("text.setText", text);
    }

    /**
     * Destroys the GameObject.
     */
    Destroy() {
        this?._invokeGameObjectEvent("gameObject.destroy", "");
    }
    
    /**
     * Instantiates a prefab at the specified position and rotation relative to this GameObject's transform.
     * @param {string} prefabPath - The path to the prefab to instantiate from a Resources folder.
     * @param {Object} position - The position to instantiate the prefab at (Defaults to Vector3.Zero).
     * @param {Object} rotation - The rotation to instantiate the prefab with (Defaults to Quaternion.Identity).
     */
    Instantiate(prefabPath, position = { x: 0, y: 0, z: 0 }, rotation = { x: 0, y: 0, z: 0, w: 1 }) {
        this?._invokeGameObjectEvent("gameObject.instantiate", { prefabPath: prefabPath, position: position, rotation: rotation });
    }

    /**Only for internal library use*/
    _invokeGameObjectEvent(eventName, payload) {
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

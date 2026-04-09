export class Transform {
    
    constructor(gameObject) {
        this.gameObject = gameObject;
    }

    /**
     * Gets the GameObject's world position.
     * @returns {object}
     */
    get position() {
        return this.#tryInvokeGameObjectEvent("transform.getPosition", "");
    }

    /**
     * Sets the GameObject's world position.
     * @param {object} value
     */
    set position(value) {
        this.#assertVector3(value);
        this.#tryInvokeGameObjectEvent("transform.setPosition", value);
    }

    /**
     * Gets the GameObject's local position.
     * @returns {object}
     */
    get localPosition() {
        return this.#tryInvokeGameObjectEvent("transform.getLocalPosition", "");
    }

    /**
     * Sets the GameObject's local position.
     * @param {object} value
     */
    set localPosition(value) {
        this.#assertVector3(value);
        this.#tryInvokeGameObjectEvent("transform.setLocalPosition", value);
    }

    /**
     * Gets the GameObject's local rotation.
     * @returns {object}
     */
    get rotation() {
        return this.#tryInvokeGameObjectEvent("transform.getRotation", "");
    }

    /**
     * Sets the GameObject's local rotation.
     * @param {object} value
     */
    set rotation(value) {
        this.#assertQuaternion(value);
        this.#tryInvokeGameObjectEvent("transform.setRotation", value);
    }

    /**
     * Gets the GameObject's euler angles in degrees.
     * @returns {object}
     */
    get eulerAngles() {
        return this.#tryInvokeGameObjectEvent("transform.getEulerAngles", "");
    }

    /**
     * Sets the GameObject's euler angles.
     * @param {object} value
     */
    set eulerAngles(value) {
        console.warn("[Unity] eulerAngles is read-only.");
    }

    /**
     * Gets the GameObject's local scale.
     * @returns {object}
     */
    get localScale() {
        return this.#tryInvokeGameObjectEvent("transform.getLocalScale", "");
    }

    /**
     * Sets the GameObject's local scale.
     * @param {object} value
     */
    set localScale(value) {
        this.#assertVector3(value);
        this.#tryInvokeGameObjectEvent("transform.setLocalScale", value);
    }

    /**
     * Gets the GameObject's lossy scale (Read Only).
     * @returns {object}
     */
    get lossyScale() {
        return this.#tryInvokeGameObjectEvent("transform.getLossyScale", "");
    }

    /**
     * Sets the GameObject's lossy scale.
     * @param {object} value
     */
    set lossyScale(value) {
        console.warn("[Unity] lossyScale is read-only.");
    }

    /** 
     * Translates the GameObject's position by the specified amount on each axis.
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    Translate(x, y, z) {
        this.#tryInvokeGameObjectEvent("transform.translate", { x: x, y: y, z: z });
    }

    /**
     * Rotates the GameObject around its local axis by the specified amount in degrees.
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    Rotate(x, y, z) {
        this.#tryInvokeGameObjectEvent("transform.rotate", { x: x, y: y, z: z });
    }

    
    #tryInvokeGameObjectEvent(eventName, payload) {
        if(!this.gameObject) {
            console.error("[Unity] The GameObject associated with this Transform is null");
        }
        return this.gameObject._invokeGameObjectEvent(eventName, payload);
    }

    #assertVector3(value) {
        if (typeof value !== "object" || value === null || typeof value.x !== "number" || typeof value.y !== "number" || typeof value.z !== "number") {
            throw new Error(`[Unity] Invalid Vector3: ${JSON.stringify(value)}`);
        }
    }

    #assertQuaternion(value) {
        if (typeof value !== "object" || value === null || typeof value.x !== "number" || typeof value.y !== "number" || typeof value.z !== "number" || typeof value.w !== "number") {
            throw new Error(`[Unity] Invalid Quaternion: ${JSON.stringify(value)}`);
        }
    }
}

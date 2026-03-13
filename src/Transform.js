export class Transform {
    
    constructor(gameObject) {
        this.gameObject = gameObject;

        // Make getters enumerable for better logging
        Object.defineProperties(this, {
            position: { enumerable: true, get: () => this.position },
            rotation: { enumerable: true, get: () => this.rotation },
            localScale: { enumerable: true, get: () => this.localScale }
        });
    }

    /**
     * Gets the GameObject's local position.
     * @returns {object}
     */
    get position() {
        return this.#tryInvokeGameObjectEvent("transform.getPosition", "");
    }

    /**
     * Gets the GameObject's local rotation.
     * @returns {object}
     */
    get rotation() {
        return this.#tryInvokeGameObjectEvent("transform.getRotation", "");
    }

    /**
     * Gets the GameObject's local scale.
     * @returns {object}
     */
    get localScale() {
        return this.#tryInvokeGameObjectEvent("transform.getLocalScale", "");
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

    /**
     * Sets the GameObject's local scale to the specified values.
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    SetLocalScale(x, y, z) {
        this.#tryInvokeGameObjectEvent("transform.setLocalScale", { x: x, y: y, z: z });
    }

    /**
     * Sets the GameObject's local position to the specified values.
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    SetLocalPosition(x, y, z) {
        this.#tryInvokeGameObjectEvent("transform.setLocalPosition", { x: x, y: y, z: z });
    }
    
    #tryInvokeGameObjectEvent(eventName, payload) {
        if(!this.gameObject) {
            console.error("[Unity] The GameObject associated with this Transform is null");
        }
        return this.gameObject._invokeGameObjectEvent(eventName, payload);
    }
}

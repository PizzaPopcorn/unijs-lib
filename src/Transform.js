export class Transform {
    #cache = null;

    /**
     * @param {GameObject} gameObject
     */
    constructor(gameObject) {
        this.gameObject = gameObject;

        // Make getters enumerable for better logging
        Object.defineProperties(this, {
            position: { enumerable: true, get: () => this.position },
            rotation: { enumerable: true, get: () => this.rotation },
            localScale: { enumerable: true, get: () => this.localScale }
        });
    }

    /**@internal*/
    _setCache(data) {
        this.#cache = data;
        // The cache is cleared in the next microtask to ensure it's "live" but efficient during a single execution tick.
        Promise.resolve().then(() => {
            this.#cache = null;
        });
    }

    /**
     * Gets the GameObject's local position.
     * @returns {object}
     */
    get position() {
        if (this.#cache && this.#cache.hasOwnProperty("position")) return this.#cache.position;
        return this.#tryInvokeGameObjectEvent("transform.getPosition", "");
    }

    /**
     * Gets the GameObject's local rotation.
     * @returns {object}
     */
    get rotation() {
        if (this.#cache && this.#cache.hasOwnProperty("rotation")) return this.#cache.rotation;
        return this.#tryInvokeGameObjectEvent("transform.getRotation", "");
    }

    /**
     * Gets the GameObject's local scale.
     * @returns {object}
     */
    get localScale() {
        if (this.#cache && this.#cache.hasOwnProperty("localScale")) return this.#cache.localScale;
        return this.#tryInvokeGameObjectEvent("transform.getLocalScale", "");
    }

    /**
     * Returns a plain object with all transform properties.
     * @returns {object}
     */
    toJSON() {
        if (this.#cache) return this.#cache;
        return this.gameObject._invokeGameObjectEvent("gameObject.getTransform", "");
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

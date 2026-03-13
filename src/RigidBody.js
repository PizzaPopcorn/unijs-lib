export class RigidBody {
    #cache = null;

    /**
     * @param {GameObject} gameObject
     */
    constructor(gameObject) {
        this.gameObject = gameObject;

        // Make getters enumerable for better logging
        Object.defineProperties(this, {
            mass: { enumerable: true, get: () => this.mass },
            useGravity: { enumerable: true, get: () => this.useGravity },
            isKinematic: { enumerable: true, get: () => this.isKinematic },
            linearDamping: { enumerable: true, get: () => this.linearDamping },
            angularDamping: { enumerable: true, get: () => this.angularDamping }
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
     * Gets the mass of the RigidBody.
     * @returns {number}
     */
    get mass() {
        if (this.#cache && this.#cache.hasOwnProperty("mass")) return this.#cache.mass;
        return this.#tryInvokeGameObjectEvent("physics.getMass", "");
    }

    /**
     * Gets whether the RigidBody is affected by gravity.
     * @returns {boolean}
     */
    get useGravity() {
        if (this.#cache && this.#cache.hasOwnProperty("useGravity")) return this.#cache.useGravity;
        return this.#tryInvokeGameObjectEvent("physics.getUseGravity", "");
    }

    /**
     * Gets whether the RigidBody is kinematic.
     * @returns {boolean}
     */
    get isKinematic() {
        if (this.#cache && this.#cache.hasOwnProperty("isKinematic")) return this.#cache.isKinematic;
        return this.#tryInvokeGameObjectEvent("physics.getIsKinematic", "");
    }

    /**
     * Gets the linear damping of the RigidBody.
     * @returns {number}
     */
    get linearDamping() {
        if (this.#cache && this.#cache.hasOwnProperty("linearDamping")) return this.#cache.linearDamping;
        return this.#tryInvokeGameObjectEvent("physics.getLinearDamping", "");
    }

    /**
     * Gets the angular damping of the RigidBody.
     * @returns {number}
     */
    get angularDamping() {
        if (this.#cache && this.#cache.hasOwnProperty("angularDamping")) return this.#cache.angularDamping;
        return this.#tryInvokeGameObjectEvent("physics.getAngularDamping", "");
    }

    /**
     * Returns a plain object with all rigidbody properties.
     * @returns {object}
     */
    toJSON() {
        if (this.#cache) return this.#cache;
        return this.gameObject._invokeGameObjectEvent("physics.getRigidBody", "");
    }

    /**
     * Adds a force to the RigidBody.
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    AddForce(x, y, z) {
        this.#tryInvokeGameObjectEvent("physics.addForce", { x: x, y: y, z: z });
    }

    /**
     * Adds a torque to the RigidBody.
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    AddTorque(x, y, z) {
        this.#tryInvokeGameObjectEvent("physics.addTorque", { x: x, y: y, z: z });
    }

    /**
     * Sets the linear velocity of the RigidBody.
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    SetVelocity(x, y, z) {
        this.#tryInvokeGameObjectEvent("physics.setVelocity", { x: x, y: y, z: z });
    }

    /**
     * Gets the linear velocity of the RigidBody.
     * @returns {object}
     */
    GetVelocity() {
        return this.#tryInvokeGameObjectEvent("physics.getVelocity", "");
    }

    /**
     * Sets the angular velocity of the RigidBody.
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    SetAngularVelocity(x, y, z) {
        this.#tryInvokeGameObjectEvent("physics.setAngularVelocity", { x: x, y: y, z: z });
    }

    /**
     * Gets the angular velocity of the RigidBody.
     * @returns {object}
     */
    GetAngularVelocity() {
        return this.#tryInvokeGameObjectEvent("physics.getAngularVelocity", "");
    }

    /**
     * Sets whether the RigidBody is affected by gravity.
     * @param {boolean} useGravity
     */
    SetUseGravity(useGravity) {
        this.#tryInvokeGameObjectEvent("physics.setUseGravity", useGravity);
    }

    /**
     * Sets whether the RigidBody is kinematic.
     * @param {boolean} isKinematic
     */
    SetIsKinematic(isKinematic) {
        this.#tryInvokeGameObjectEvent("physics.setIsKinematic", isKinematic);
    }

    /**
     * Sets the mass of the RigidBody.
     * @param {number} mass
     */
    SetMass(mass) {
        this.#tryInvokeGameObjectEvent("physics.setMass", mass);
    }

    /**
     * Sets the linear damping of the RigidBody.
     * @param {number} linearDamping
     */
    SetLinearDamping(linearDamping) {
        this.#tryInvokeGameObjectEvent("physics.setLinearDamping", linearDamping);
    }

    #tryInvokeGameObjectEvent(eventName, payload) {
        if(!this.gameObject) {
            console.error("[Unity] The GameObject associated with this RigidBody is null");
            return null;
        }
        return this.gameObject._invokeGameObjectEvent(eventName, payload);
    }
}
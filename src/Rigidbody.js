export class Rigidbody {
    
    constructor(gameObject) {
        this.gameObject = gameObject;
    }

    /**
     * Gets the mass of the RigidBody.
     * @returns {number}
     */
    get mass() {
        return this.#tryInvokeGameObjectEvent("physics.getMass", "");
    }

    /**
     * Gets whether the RigidBody is affected by gravity.
     * @returns {boolean}
     */
    get useGravity() {
        return this.#tryInvokeGameObjectEvent("physics.getUseGravity", "");
    }

    /**
     * Gets whether the RigidBody is kinematic.
     * @returns {boolean}
     */
    get isKinematic() {
        return this.#tryInvokeGameObjectEvent("physics.getIsKinematic", "");
    }

    /**
     * Gets the linear damping of the RigidBody.
     * @returns {number}
     */
    get linearDamping() {
        return this.#tryInvokeGameObjectEvent("physics.getLinearDamping", "");
    }

    /**
     * Gets the angular damping of the RigidBody.
     * @returns {number}
     */
    get angularDamping() {
        return this.#tryInvokeGameObjectEvent("physics.getAngularDamping", "");
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
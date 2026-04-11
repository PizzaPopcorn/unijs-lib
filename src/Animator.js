export class Animator {
    #gameObject = null;

    constructor(gameObject) {
        this.#gameObject = gameObject;
    }

    /**
     * Sets the trigger of the Animator.
     * @param {string} triggerName
     */
    SetTrigger(triggerName) {
        this.#tryInvokeGameObjectEvent("animator.setTrigger", triggerName);
    }

    /**
     * Sets the float parameter of the Animator.
     * @param {string} name
     * @param {number} value
     */
    SetFloat(name, value) {
        this.#tryInvokeGameObjectEvent("animator.setFloat", { name, value });
    }

    /**
     * Sets the integer parameter of the Animator.
     * @param {string} name
     * @param {number} value
     */
    SetInteger(name, value) {
        this.#tryInvokeGameObjectEvent("animator.setInteger", { name, value });
    }

    /**
     * Sets the boolean parameter of the Animator.
     * @param {string} name
     * @param {boolean} value
     */
    SetBool(name, value) {
        this.#tryInvokeGameObjectEvent("animator.setBool", { name, value });
    }

    /**
     * Plays the specified state of the Animator.
     * @param {string} stateName
     */
    Play(stateName) {
        this.#tryInvokeGameObjectEvent("animator.play", stateName);
    }

    /**
     * Sets the layer weight of the Animator.
     * @param {number} layerIndex
     * @param {number} weight
     */
    SetLayerWeight(layerIndex, weight) {
        this.#tryInvokeGameObjectEvent("animator.setLayerWeight", { layerIndex, weight });
    }

    #tryInvokeGameObjectEvent(eventName, payload) {
        if(!this.#gameObject) {
            console.error("[Unity] The GameObject associated with this Animator is null");
            return null;
        }
        return this.#gameObject._invokeGameObjectEvent(eventName, payload);
    }
}

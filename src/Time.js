export class Time {
    /**
     * Current time in seconds.
     * @returns {number}
     */
    static get time() {
        return Unity.InvokeEvent("InstanceEvent:GetTime");
    }
    
    /**
     * The time since the last frame in seconds.
     * @returns {number}
     */
    static get deltaTime() {
        return Unity.InvokeEvent("InstanceEvent:GetDeltaTime");
    }
    
    /**
     * The interval in seconds of in-game time at which physics and other fixed frame rate updates (like MonoBehaviour's MonoBehaviour.FixedUpdate) are performed.
     * @returns {number}
     */
    static get fixedDeltaTime() {
        return Unity.InvokeEvent("InstanceEvent:GetFixedDeltaTime");
    }
    
    /**
     * The timeScale-independent interval in seconds from the last frame to the current one
     * @returns {number}
     */
    static get unscaledDeltaTime() {
        return Unity.InvokeEvent("InstanceEvent:GetUnscaledDeltaTime");
    }
    
    /**
     * The real time in seconds since Unity started running.
     * @returns {number}
     */
    static get realtimeSinceStartup() {
        return Unity.InvokeEvent("InstanceEvent:GetRealtimeSinceStartup");
    }
    
    /**
     * The scale at which time passes.
     * @returns {number}
     */
    static get timeScale() {
        return Unity.InvokeEvent("InstanceEvent:GetTimeScale");
    }
    
    static set timeScale(value) {
        Unity.InvokeEvent("InstanceEvent:SetTimeScale", value);
    }
}
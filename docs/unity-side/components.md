# Unity Side Components

UniJS relies on a few key components on the Unity side to enable communication with JavaScript.

## `JSInstance`

The `JSInstance` component is the heart of UniJS on the Unity side. It should be present in your starting scene (usually on a persistent object).

- **Responsibilities**:
    - Initializes the communication bridge.
    - Manages the lifecycle of the interop system.
    - Handles incoming calls from JavaScript.
    - Dispatches events to JavaScript.

## `JSKeyGameObject`

The `JSKeyGameObject` component is used to "tag" GameObjects that you want to access directly from JavaScript by a name (Key).

- **Properties**:
    - **Key**: A unique string identifier for the GameObject.
- **Usage**:
    - Attach this to any object you want to reference using `Unity.GameObject.GetKeyGameObject("YourKey")`.
    - Once you have a reference to a keyed object in JS, you can navigate its children using `GetChild()`.

## `JSEventButton`

A helper component for Unity UI Buttons.

- **Usage**:
    - Attach to a GameObject with a `Button` component.
    - It allows you to trigger a `JSEvent` when the button is clicked.

## `JSLifecycleTracker`

(Internal) This component is automatically added to objects with `JSKeyGameObject` to track their lifecycle events (`Awake`, `Start`, `OnEnable`, `OnDisable`, `OnDestroy`) and report them back to JavaScript. This is what enables `Unity.GameObject.onStart("Key", callback)`.

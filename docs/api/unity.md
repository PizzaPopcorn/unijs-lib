# `Unity` Class

The `Unity` class is the main entry point for the UniJS library. It provides global functions for instance management, scene loading, and event handling.

## Properties

- `GameObject`: Reference to the `GameObject` class.
- `Time`: Reference to the `Time` class.
- `internalLogs`: (boolean) Set to true to see internal UniJS logs in the console.

## Methods

### `LoadInstance(url, elementId)`
Loads the Unity canvas from the specified URL and injects it into the specified DOM element.
- `url`: The path to your WebGL build folder.
- `elementId`: The ID of the HTML element where the game will be embedded.

### `GetVersion()`
Returns the Unity version string.

### `GetBuildVersion()`
Returns your build version string as defined in Unity project settings.

### `IsValid(gameObject)`
Checks if a `GameObject` instance is still valid and has not been destroyed in Unity.

### `InvokeEvent(eventName, payload)`
Invokes a global event in Unity.
- `eventName`: String name of the event.
- `payload`: (Optional) Data to send with the event. Can be a string, number, or object.

### `InvokeEventAsync(eventName, payload)`
(Async) Similar to `InvokeEvent` but returns a Promise that resolves when Unity finishes processing the event and returns a result.

### `WaitForEndOfFrameAsync()`
(Async) Returns a promise that resolves at the end of the current frame in Unity.

### `LoadSceneAsync(sceneName)`
(Async) Loads a Unity scene by name and returns a promise that resolves when the scene is fully loaded.

### `IsSceneLoading()`
Returns true if a scene transition is currently in progress.

### `GetSceneLoadProgress()`
Returns a number from 0 to 1 representing the current scene loading progress.

### `LoadBundleAsync(bundleUrl)`
(Async) Downloads and loads an Asset Bundle from the specified URL.

### `InstantiatePrefabFromBundleAsync(bundleUrl, prefabName, parentKey)`
(Async) Loads a bundle, instantiates a prefab from it, and then unloads the bundle.
- `parentKey`: (Optional) The JS Key of a GameObject to set as parent for the new instance.

### `onInstanceReady(callback)`
Registers a callback that will be executed when the Unity instance is fully loaded and ready for communication.

### `onEvent(eventName, callback)`
Registers a listener for a global event.

### `offEvent(eventName, callback)`
Unregisters a listener for a global event.

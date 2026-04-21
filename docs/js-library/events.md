# Events System

UniJS provides a robust event system to communicate between Unity and JavaScript.

## Listening to Unity Events in JS

You can listen to events triggered from Unity using `Unity.onEvent`.

```javascript
Unity.onEvent("MyEventName", (data) => {
    console.log("Received event from Unity with data:", data);
});
```

## Triggering Events from Unity

In Unity, you can trigger events that JS can listen to using the `JSEventHub`.

```csharp
JSInstance.InvokeEvent("MyEventName", "Hello from Unity!");
```

## Special Events

### `onInstanceReady`

This event is triggered when the Unity instance is fully loaded and communication is established. It's the best place to perform initial setup from JavaScript.

```javascript
Unity.onInstanceReady(() => {
    console.log("Unity is ready!");
    // Your initialization code here
});
```

### Lifecycle Callbacks

You can listen for specific lifecycle events of keyed GameObjects:

- `Unity.GameObject.onAwake(key, callback)`
- `Unity.GameObject.onStart(key, callback)`
- `Unity.GameObject.onEnable(key, callback)`
- `Unity.GameObject.onDisable(key, callback)`
- `Unity.GameObject.onDestroy(key, callback)`

Example:

```javascript
Unity.GameObject.onStart("Player", (player) => {
    console.log("Player object started!", player);
});
```

## `JSEventButton`

You can use the `JSEventButton` component in Unity to easily map a UI Button click to a JS event without writing C# code. Just specify the event name in the inspector.

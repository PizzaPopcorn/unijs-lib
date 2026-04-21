# JavaScript API Documentation

The UniJS JavaScript library provides a set of classes that mirror common Unity classes, allowing you to interact with your game objects naturally from JavaScript.

## Core Classes

- [Unity](unity.md) - The main entry point for the library.
- [GameObject](gameobject.md) - Represents a Unity GameObject.
- [Transform](transform.md) - Mirror of the Unity Transform component.
- [Rigidbody](rigidbody.md) - Mirror of the Unity Rigidbody component.
- [Time](time.md) - Access to Unity Time functions.
- [Animator](animator.md) - Access to Unity Animator components.

## Basic Usage

Most of the time, you will start by getting a reference to a keyed GameObject:

```javascript
Unity.onInstanceReady(() => {
    const player = Unity.GameObject.GetKeyGameObject("Player");
    player.transform.position = { x: 0, y: 10, z: 0 };
});
```

All methods that communicate with Unity are generally asynchronous if they return a value, although many property setters and action methods (like `Rotate`) are fire-and-forget for performance.

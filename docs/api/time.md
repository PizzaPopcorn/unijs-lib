# `Time` Class

The `Time` class provides access to Unity's time information. It is accessed via `Unity.Time`.

## Static Properties

- `time`: (number) The time in seconds since the start of the game.
- `deltaTime`: (number) The interval in seconds from the last frame to the current one.
- `fixedDeltaTime`: (number) The interval in seconds at which physics and other fixed frame rate updates are performed.
- `unscaledDeltaTime`: (number) The timeScale-independent interval in seconds from the last frame to the current one.
- `realtimeSinceStartup`: (number) The real time in seconds since the game started.
- `timeScale`: (number) The scale at which time passes. This can be set to accelerate or slow down time.

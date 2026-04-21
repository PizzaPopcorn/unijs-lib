# `GameObject` Class

The `GameObject` class represents a Unity GameObject in JavaScript.

## Static Methods

### `GetKeyGameObject(key)`
Retrieves a `GameObject` instance that was tagged in Unity with a `JSKeyGameObject` component using the provided key.

### `Instantiate(prefabPath, position, rotation, parent)`
Instantiates a prefab from a Unity `Resources` folder.
- `prefabPath`: Path to the prefab inside `Resources`.
- `position`: `{x, y, z}` object.
- `rotation`: `{x, y, z, w}` quaternion object.
- `parent`: (Optional) `GameObject` or `Transform` to set as parent.

### Lifecycle Callbacks
Registers a callback that triggers when a keyed GameObject enters a specific lifecycle state.
- `onAwake(key, callback)`
- `onStart(key, callback)`
- `onUpdate(key, callback)`
- `onEnable(key, callback)`
- `onDisable(key, callback)`
- `onDestroy(key, callback)`

## Instance Properties

- `name`: (string) The name of the GameObject in Unity.
- `key`: (string) The unique JS Key assigned to this object (or its root keyed ancestor).
- `isAlive`: (boolean) Returns true if the object still exists in Unity.
- `transform`: Returns the `Transform` component.
- `rigidbody`: Returns the `Rigidbody` component (or `null` if it doesn't have one).
- `animator`: Returns the `Animator` component (or `null` if it doesn't have one).

## Instance Methods

### `SetActive(active)`
Sets the active state of the GameObject in Unity.

### `InvokeMethod(methodName, paramType, paramValue)`
Invokes a method on the GameObject using `SendMessage`.
- `methodName`: Name of the method to call.
- `paramType`: (Optional) Type of the parameter (use `Unity.types` keys).
- `paramValue`: (Optional) Value of the parameter.

### `GetChild(query)`
Returns a child `GameObject`.
- `query`: Can be a child index (number) or a child name (string).

### `SetText(text)`
Finds a text component (`Text`, `TextMeshPro`, `TextMesh`) on this object and sets its text.

### `Destroy()`
Destroys the GameObject in Unity.

### `HasComponent(componentName)`
Returns true if the GameObject has the specified component.

### `GetComponent(componentName)`
(Advanced) Returns raw data of the specified component.

### `AddComponent(componentName)`
Adds a component of the specified type to the GameObject.

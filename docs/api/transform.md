# `Transform` Class

The `Transform` class mirrors the Unity Transform component. It is accessed via the `transform` property of a `GameObject`.

## Properties

All vector properties expect an object with `{x, y, z}`. Rotation expects `{x, y, z, w}`.

- `position`: (Vector3) Gets or sets the world position.
- `localPosition`: (Vector3) Gets or sets the local position.
- `rotation`: (Quaternion) Gets or sets the world rotation.
- `eulerAngles`: (Vector3) Gets the euler angles in degrees (Read Only).
- `localScale`: (Vector3) Gets or sets the local scale.
- `lossyScale`: (Vector3) Gets the lossy scale (Read Only).

## Methods

### `Translate(x, y, z)`
Moves the transform in the direction and distance of the translation.

### `Rotate(x, y, z)`
Applies a rotation of eulerAngles.z degrees around the z axis, eulerAngles.x degrees around the x axis, and eulerAngles.y degrees around the y axis (in that order).

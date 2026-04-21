# `Rigidbody` Class

The `Rigidbody` class mirrors the Unity Rigidbody component. It is accessed via the `rigidbody` property of a `GameObject`.

## Properties (Read Only)

- `mass`: (number) The mass of the Rigidbody.
- `useGravity`: (boolean) Controls whether gravity affects this Rigidbody.
- `isKinematic`: (boolean) Controls whether physics affects the Rigidbody.
- `linearDamping`: (number) How much air resistance affects the object.
- `angularDamping`: (number) How much air resistance affects the rotation of the object.

## Methods

### `AddForce(x, y, z)`
Adds a force to the Rigidbody.

### `AddTorque(x, y, z)`
Adds a torque to the Rigidbody.

### `SetVelocity(x, y, z)`
Sets the linear velocity of the Rigidbody.

### `GetVelocity()`
Returns the current linear velocity as a `{x, y, z}` object.

### `SetAngularVelocity(x, y, z)`
Sets the angular velocity of the Rigidbody.

### `GetAngularVelocity()`
Returns the current angular velocity as a `{x, y, z}` object.

### `SetUseGravity(useGravity)`
Sets whether gravity affects this Rigidbody.

### `SetIsKinematic(isKinematic)`
Sets whether this Rigidbody is kinematic.

### `SetMass(mass)`
Sets the mass of the Rigidbody.

### `SetLinearDamping(linearDamping)`
Sets the linear damping.

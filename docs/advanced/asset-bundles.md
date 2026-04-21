# Asset Bundles and Dynamic Builds

## Asset Bundles

To maximize the fast prototyping potential, it's recommended to export all your game content to **Asset Bundles**. That way you don't have to rebuild the entire WebGL project each time you change a scene or a prefab. You just update your bundles.

### Loading Bundles from JS

You can use UniJS to load bundles dynamically:

```javascript
await Unity.LoadBundleAsync(bundleUrl);
console.log("Bundle loaded successfully!");
```

Or directly load a prefab from a bundle. This will load the bundle, instantiate the prefab and then unload the bundle.

```javascript
await Unity.InstantiatePrefabFromBundleAsync(bundleUrl, prefabName);
console.log(`${prefabName} prefab loaded successfully!`);
```

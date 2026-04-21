# Asset Bundles and Dynamic Builds

## Asset Bundles

To maximize the fast prototyping potential, it's recommended to export all your game content to **Asset Bundles**. That way you don't have to rebuild the entire WebGL project each time you change a scene or a prefab. You just update your bundles.

### Loading Bundles from JS

You can use UniJS to load bundles dynamically:

```javascript
Unity.LoadBundle("bundleUrl", (bundle) => {
    console.log("Bundle loaded successfully!");
});
```

---

## Dynamic Build Instance

This section covers how to create a dynamic instance of your Web / WebGL build in case you want to embed your game in your existing web page. This approach is the preferred one because it gives you total control over your HTML content.

1. **Disable CDN & Inject controller**: In your Unity project settings for UniJS, uncheck "Include CDN" and "Inject controller script".
2. **Build your game**: Use the standard "Build" option.
3. **Add the JS library**: Manually add the CDN script to your custom HTML file:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@pizzapopcorn/unijs/dist/unity.min.js"></script>
   ```
4. **Create a container**: Create a `div` with a specific ID where your game will be embedded:
   ```html
   <div id="game-container"></div>
   ```
5. **Load the instance**: In your own JavaScript file, call `Unity.LoadInstance("url", "elementId")`:
   ```javascript
   Unity.LoadInstance("path/to/build/folder", "game-container");
   ```
   The `url` is the path to the folder where your `Build` files (loader, framework, data, wasm) are located.

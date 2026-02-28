# Unity JS

## Prerequisites
- Your Unity WebGL build must have the [Unity plugin package](https://github.com/PizzaPopcorn/unityjs-unity-plugin) installed and implemented (instructions provided in the README of that repo).
- If you want to customize the library you need to have [Node.js](https://nodejs.org) installed.

## Installation
IMPORTANT: You don't have to clone/fork this repository if you just want to use the library without modifying it. Use CDN in that case.

For getting the latest version in your project just paste this line in the html page that will load the Unity instance:
```javascript
<script src="https://cdn.jsdelivr.net/npm/@pizzapopcorn/unityjs/dist/unity.min.js"></script>
```
Now if you want to customize the library you can clone/fork this repository and follow the build steps.

## Build
Building is pretty straightforward, just do the modifications you need and then run the following command:
```bash
npm run build
```
That will create `unity.js` and `unity.min.js` files that you can manually import to your web page project.

## Additional Notes
Notice that this library is designed to be only compatible with browser since that's where Unity runs. That being said, there is no need to import the npm package in any scenario, it just exists for the sake of the CDN download.

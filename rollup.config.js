import pkg from './package.json' with { type: 'json' };

export default {
    input: 'src/Unity.js',
    output: {
        name: 'Unity',
        file: `dist/pizzapopcorn-unityjs-${pkg.version}.js`,
        format: 'umd'
    }
}
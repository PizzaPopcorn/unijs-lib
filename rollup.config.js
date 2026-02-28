import terser from '@rollup/plugin-terser';

export default {
    input: 'src/Unity.js',
    output: [
        {
            name: 'Unity',
            file: `dist/unityjs.js`,
            format: 'umd',
            exports: 'default'
        },
        {
            name: 'Unity',
            file: `dist/unityjs.min.js`,
            format: 'umd',
            exports: 'default',
            plugins: [terser()]
        }
    ]
}
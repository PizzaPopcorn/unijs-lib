import terser from '@rollup/plugin-terser';

export default {
    input: 'src/Unity.js',
    output: [
        {
            name: 'Unity',
            file: `dist/unity.js`,
            format: 'umd',
            exports: 'default'
        },
        {
            name: 'Unity',
            file: `dist/unity.min.js`,
            format: 'umd',
            exports: 'default',
            plugins: [terser()]
        }
    ]
}
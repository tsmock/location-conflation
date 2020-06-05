import buble from '@rollup/plugin-buble';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';

export default {
  input: 'index.mjs',
  output: {
    file: 'dist/index.es5.js',
    format: 'umd',
    indent: false,
    name: 'LocationConflation'
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    json({ indent: '' }),
    buble()
  ]
};
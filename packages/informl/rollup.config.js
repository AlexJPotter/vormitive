import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/informl.cjs.js',
      format: 'cjs',
      sourcemap: false,
    },
    {
      file: 'dist/informl.cjs.min.js',
      format: 'cjs',
      sourcemap: true,
      plugins: [terser()],
    },
    {
      file: 'dist/informl.esm.js',
      format: 'esm',
      sourcemap: false,
    },
    {
      file: 'dist/informl.esm.min.js',
      format: 'esm',
      sourcemap: true,
      plugins: [terser()],
    },
  ],
  plugins: [typescript(), nodeResolve({ resolveOnly: ['klona'] }), commonjs()],
};

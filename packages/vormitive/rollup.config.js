import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/vormitive.cjs.js',
      format: 'cjs',
      sourcemap: false,
    },
    {
      file: 'dist/vormitive.cjs.min.js',
      format: 'cjs',
      sourcemap: true,
      plugins: [terser()],
    },
    {
      file: 'dist/vormitive.esm.js',
      format: 'esm',
      sourcemap: false,
    },
    {
      file: 'dist/vormitive.esm.min.js',
      format: 'esm',
      sourcemap: true,
      plugins: [terser()],
    },
  ],
  plugins: [typescript(), nodeResolve({ resolveOnly: ['klona'] }), commonjs()],
};

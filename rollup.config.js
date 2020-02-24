import path from 'path';
import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const production = process.env.NODE_ENV === 'production';
const addExtension = (input, ext) => {
  const extension = input.substr(input.lastIndexOf('.'));
  return input.replace(new RegExp(`${extension}$`), `${ext}${extension.replace('ts', 'js')}`);
};

export default (root, ...inputs) => (inputs && inputs.length > 0 ? inputs : ['index.js'])
  .map((input) => ({
    input: path.resolve(root, 'src', input),
    output: [
      {
        file: path.resolve(root, 'dist', addExtension(input, '.min')),
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: path.resolve(root, 'dist', addExtension(input, '.min.esm')),
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: []
      .concat(
        input.match(/tsx?$/)
          ? [
            typescript({
              module: 'CommonJS',
              exclude: 'node_modules/**',
            }),
          ]
          : [
            babel({
              exclude: 'node_modules/**',
            }),
            commonjs({ extensions: ['.js', '.ts'] }),
          ],
      )
      .concat([
        resolve(),
        production && terser(),
      ]),
  }));

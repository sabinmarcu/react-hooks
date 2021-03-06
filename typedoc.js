/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const path = require('path');

module.exports = (root, {
  paths = ['src'],
  options = null,
}) => {
  const pkg = require(path.resolve(root, 'package.json'));
  return {
    inputFiles: paths.map((it) => path.resolve(root, it)),
    exclude: [
      '**/+(__tests__|__fixtures__|__mocks__|docs|dist)/*',
      '**/*.+(spec|test|mock).[jt]s?(x)',
    ],
    name: `${pkg.name} Documentation`,
    mode: 'file',
    out: 'docs',
    tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    ...options,
  };
};

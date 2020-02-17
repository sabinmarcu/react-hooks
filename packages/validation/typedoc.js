const path = require('path');
const fs = require('fs');

const validatorsDir = path.resolve(__dirname, 'src/validators');
const toc = [
  'validate',
  ...fs.readdirSync(validatorsDir)
    .filter((it) => fs.lstatSync(path.resolve(validatorsDir, it)).isFile())
    .filter((it) => it !== 'index.js')
    .map((it) => it.substr(0, it.indexOf('.'))),
];

module.exports = require('../../typedoc')(
  __dirname,
  { options: { toc } },
);

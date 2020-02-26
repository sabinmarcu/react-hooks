module.exports = {
  clearMocks: true,
  verbose: true,
  coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    'packages/**/*.[jt]s?(x)',
    '!packages/**/(typedoc|gulpfile|rollup.config).js',
    '!packages/**/index.[jt]s?(x)',
    '!**/(__tests__|__fixtures__|__mocks__|dist|docs)/**/*.[jt]s?(x)',
    '!**/?(*.)+(spec|test|fixture|mock).[jt]s?(x)',
  ],
  testMatch: [
    '**/(__tests__|__fixtures__|__mocks__)/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test|fixture|mock).[jt]s?(x)',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '\\/__[^\\/]*\\.[jt]sx?$',
  ],
};

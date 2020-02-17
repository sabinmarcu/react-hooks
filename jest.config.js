module.exports = {
  clearMocks: true,
  verbose: true,
  coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    'packages/**/*.[jt]s?(x)',
  ],
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '\\/__[^.\\/]*\\.[jt]sx?$',
  ],
};

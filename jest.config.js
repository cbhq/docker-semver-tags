module.exports = {
  rootDir: '.',
  testEnvironment: 'node',
  roots: [
    '<rootDir>',
  ],
  testRegex: '.(e2e-)?\\.spec\\.(ts|js)$',
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
  ],
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/**/*.(e2e-)?\\.spec\\.ts',
    '!src/**/*.(e2e-)?\\.spec\\.tsx',
  ],
  // https://github.com/istanbuljs/istanbuljs/tree/master/packages/istanbul-reports/lib
  coverageReporters: [
    'text-summary',
    'html',
    'lcovonly',
  ],
};

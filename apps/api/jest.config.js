module.exports = {
  rootDir: '../..',
  testEnvironment: 'node',
  testMatch: ['**/apps/api/**/*.spec.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: '<rootDir>/apps/api/tsconfig.json' }]
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  clearMocks: true
};

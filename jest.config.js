// jest.config.js
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*.test.js'],
  collectCoverage: true,
  collectCoverageFrom: ['**/*.js', '!**/node_modules/**'],
};

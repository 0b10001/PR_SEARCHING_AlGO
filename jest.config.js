module.exports = {
  collectCoverage: true,
  coverageReporters: ['text', 'cobertura'],
  testEnvironment: 'node',
  testMatch: ['**/*.test.js'],
  collectCoverageFrom: ['**/*.js', '!**/node_modules/**'],
  setupFiles: ["<rootDir>/jest.setup.js"],
}

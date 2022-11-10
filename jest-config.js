import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: "./"
})

const customJestConfig = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', '<rootDir>/'],
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  testMatch: ['<rootDir>/pages/api/**/__tests__/**'],
}

module.exports = createJestConfig(customJestConfig)

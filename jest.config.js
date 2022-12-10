/* eslint-disable @typescript-eslint/no-var-requires */
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@shared/(.*)$': '<rootDir>/src/components/shared/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^#types/(.*)$': '<rootDir>/src/types/$1',
    '^@mocks/(.*)$': '<rootDir>/__mocks__/$1',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@atoms/(.*)$': '<rootDir>/src/components/shared/atoms/$1',
    '^@molecules/(.*)$': '<rootDir>/src/components/shared/molecules/$1',
    '^@organisms/(.*)$': '<rootDir>/src/components/shared/organisms/$1',
    '^@templates/(.*)$': '<rootDir>/src/components/shared/templates/$1',
    '^src/hooks': '<rootDir>/src/hooks',
    '^src/utils': '<rootDir>/src/utils',
    '^src/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^src/api/(.*)$': '<rootDir>/src/api/$1',
    '^src/pages/(.*)$': '<rootDir>/src/pages/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    './src/**/*.[jt]s?(x)',
    '!./src/components/**/*.[jt]s?(x)',
    '!./src/constants/**/*.[jt]s?(x)',
    '!./src/types/**/*.[jt]s?(x)',
    '!./src/pages/**/*.[jt]s?(x)',
    '!./src/*.stories.[jt]s?(x)',
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);

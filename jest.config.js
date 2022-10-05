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
    '^@shared/(.*)$': '<rootDir>/components/shared/$1',
    '^@styles/(.*)$': '<rootDir>/styles/$1',
    '^#types/(.*)$': '<rootDir>/types/$1',
    '^@mocks/(.*)$': '<rootDir>/__mocks__/$1',
    '^@constants/(.*)$': '<rootDir>/constants/$1',
    '^@atoms/(.*)$': '<rootDir>/components/shared/atoms/$1',
    '^@molecules/(.*)$': '<rootDir>/components/shared/molecules/$1',
    '^@organisms/(.*)$': '<rootDir>/components/shared/organisms/$1',
    '^@templates/(.*)$': '<rootDir>/components/shared/templates/$1',
    '^hooks': '<rootDir>/hooks',
    '^utils': '<rootDir>/utils',
    '^lib/(.*)$': '<rootDir>/lib/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);

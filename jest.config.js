module.exports = {
  roots: [
    'src',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.tsx',
  ],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    '^.+\\.module\\.(css|scss)$',
  ],
  moduleNameMapper: {
    '^.+\\.module\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(css|scss)$': '<rootDir>/config/jest/styleMock.js',
  },
  resetMocks: true,
  setupFilesAfterEnv: [
    './src/test/setup.ts',
  ],
};

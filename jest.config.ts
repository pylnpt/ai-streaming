import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  setupFiles: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        useESM: false,
        tsconfig: {
          jsx: 'react-jsx',
          esModuleInterop: true,
        },
      },
    ],
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  projects: [
    {
      displayName: 'node',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/__tests__/**/*.test.ts'],
      preset: 'ts-jest',
      setupFiles: ['<rootDir>/jest.setup.js'],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
      },
      transform: {
        '^.+\\.(ts|tsx)$': [
          'ts-jest',
          {
            useESM: false,
            tsconfig: {
              jsx: 'react-jsx',
              esModuleInterop: true,
            },
          },
        ],
      },
    },
    {
      displayName: 'jsdom',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/__tests__/**/*.test.tsx'],
      preset: 'ts-jest',
      setupFiles: ['<rootDir>/jest.setup.js'],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
      },
      transform: {
        '^.+\\.(ts|tsx)$': [
          'ts-jest',
          {
            useESM: false,
            tsconfig: {
              jsx: 'react-jsx',
              esModuleInterop: true,
            },
          },
        ],
      },
    },
  ],
};

export default config;

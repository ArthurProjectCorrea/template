module.exports = {
  // Test environment
  testEnvironment: 'node',
  
  // Module file extensions
  moduleFileExtensions: ['js', 'json', 'ts'],
  
  // Test file patterns
  testMatch: [
    '**/__tests__/**/*.(ts|js)',
    '**/*.(test|spec).(ts|js)'
  ],
  
  // Root directory
  rootDir: 'src',
  
  // Test regex
  testRegex: '.*\\.spec\\.ts$',
  
  // Transform files
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  
  // Coverage configuration
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/*.spec.ts',
    '!**/*.e2e-spec.ts',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/coverage/**',
    '!main.ts', // Exclude bootstrap file
    '!**/*.module.ts', // Exclude modules (mostly configuration)
  ],
  
  // Coverage thresholds - FAIL BUILD IF NOT MET
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 85,
      lines: 85,
      statements: 85
    },
    // Specific thresholds for critical services
    './auth/': {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95
    },
    './users/': {
      branches: 85,
      functions: 90,
      lines: 90,
      statements: 90
    },
    // Lower threshold for controllers (mostly integration)
    './**/*.controller.ts': {
      branches: 70,
      functions: 75,
      lines: 75,
      statements: 75
    }
  },
  
  // Coverage reporters
  coverageReporters: [
    'text',
    'text-summary',
    'html',
    'lcov',
    'clover'
  ],
  
  // Coverage directory
  coverageDirectory: '../coverage',
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/../test/setup.ts'],
  
  // Module name mapping for path aliases
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@/auth/(.*)$': '<rootDir>/auth/$1',
    '^@/users/(.*)$': '<rootDir>/users/$1',
    '^@/common/(.*)$': '<rootDir>/common/$1',
  },
  
  // Verbose output
  verbose: true,
  
  // Clear mocks between tests
  clearMocks: true,
  
  // Automatically restore mocks
  restoreMocks: true,
  
  // Fail fast on first test failure (useful for CI)
  bail: false,
  
  // Maximum worker processes
  maxWorkers: '50%',
  
  // Test timeout
  testTimeout: 10000,
  
  // Global test setup
  globalSetup: '<rootDir>/../test/global-setup.ts',
  globalTeardown: '<rootDir>/../test/global-teardown.ts',
}

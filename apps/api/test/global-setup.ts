/**
 * Global setup for Jest tests
 * Runs once before all tests
 */
export default function globalSetup() {
  console.log('🧪 Setting up test environment...');

  // Set test environment variables
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test-jwt-secret';
  process.env.DATABASE_URL = 'memory://';

  // Additional global setup if needed
  // e.g., start test database, mock external services

  console.log('✅ Test environment ready');
}

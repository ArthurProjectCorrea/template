/**
 * Global teardown for Jest tests
 * Runs once after all tests
 */
export default function globalTeardown() {
  console.log('🧹 Cleaning up test environment...');

  // Cleanup resources
  // e.g., close database connections, stop test servers

  console.log('✅ Test cleanup complete');
}

/**
 * Test set// Global test utilities
declare global {
  // eslint-disable-next-line no-var
  var testUtils: {
    createMockUser: () => any;
    createMockRequest: (overrides?: any) => any;
    createMockResponse: () => any;
  };
}

global.testUtils = {
  createMockUser: () => ({
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    createdAt: new Date(),
    updatedAt: new Date()
  }),* Runs before each test file
 */

// Increase timeout for integration tests
jest.setTimeout(30000);

// Mock common external dependencies
jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn().mockResolvedValue({ messageId: 'test-message-id' }),
  })),
}));

// Global test utilities
global.testUtils = {
  createMockUser: () => ({
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    createdAt: new Date(),
    updatedAt: new Date(),
  }),

  createMockRequest: (overrides = {}) => ({
    user: global.testUtils.createMockUser(),
    headers: {},
    body: {},
    params: {},
    query: {},
    ...overrides,
  }),

  createMockResponse: () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    res.cookie = jest.fn().mockReturnValue(res);
    res.clearCookie = jest.fn().mockReturnValue(res);
    return res;
  },
};

// Suppress console.log in tests unless explicitly needed
const originalConsole = console;
beforeAll(() => {
  console.log = jest.fn();
  console.warn = jest.fn();
  console.error = jest.fn();
});

afterAll(() => {
  console.log = originalConsole.log;
  console.warn = originalConsole.warn;
  console.error = originalConsole.error;
});

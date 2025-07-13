# 🧪 Estratégia de Testes

Este documento define a estratégia completa de testes do template, incluindo tipos de testes,
ferramentas, padrões e métricas de qualidade.

## 🎯 Filosofia de Testes

### Princípios Fundamentais

- **Test Pyramid**: Mais unit tests, menos E2E tests
- **Fast Feedback**: Testes rápidos para feedback imediato
- **Reliable Tests**: Testes determinísticos e estáveis
- **Maintainable**: Testes fáceis de manter e atualizar
- **Coverage Inteligente**: Foco em código crítico

### Pirâmide de Testes

```mermaid
pyramid
    title Testing Pyramid
    pyramid_levels:
        - level1: "E2E Tests (5%) - Playwright"
        - level2: "Integration Tests (15%) - Supertest + RTL"
        - level3: "Unit Tests (80%) - Jest + RTL"
```

## 🏗️ Arquitetura de Testes

### Stack Tecnológica

#### Frontend Testing

- **Unit Tests**: Jest + React Testing Library
- **Component Tests**: React Testing Library + MSW
- **E2E Tests**: Playwright
- **Visual Tests**: Storybook (opcional)
- **Performance**: Lighthouse CI

#### Backend Testing

- **Unit Tests**: Jest
- **Integration Tests**: Supertest
- **Database Tests**: Jest + Test Database
- **API Tests**: Supertest + OpenAPI validation
- **Load Tests**: Artillery (opcional)

#### Shared Testing

- **Type Checking**: TypeScript
- **Linting**: ESLint + custom rules
- **Coverage**: Jest coverage
- **Mutation Testing**: Stryker (opcional)

## 📊 Configuração de Coverage

### Requirements por App

#### Frontend (`apps/web/`)

```javascript
// jest.config.js
module.exports = {
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
    './src/components/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
}
```

#### Backend (`apps/api/`)

```javascript
// jest.config.js
module.exports = {
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 85,
      lines: 80,
      statements: 80,
    },
    './src/modules/': {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
}
```

#### Packages (`packages/ui/`)

```javascript
// jest.config.js
module.exports = {
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 90,
      lines: 85,
      statements: 85,
    },
  },
}
```

## 🧪 Tipos de Testes

### 1. Unit Tests

#### Frontend Unit Tests

```typescript
// components/Button/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct variant classes', () => {
    render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-blue-500');
  });
});
```

#### Backend Unit Tests

```typescript
// users/users.service.test.ts
import { Test } from '@nestjs/testing'
import { UsersService } from './users.service'
import { getRepositoryToken } from '@nestjs/typeorm'

describe('UsersService', () => {
  let service: UsersService
  let mockRepository: jest.Mocked<Repository<User>>

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get(UsersService)
    mockRepository = module.get(getRepositoryToken(User))
  })

  it('should find all users', async () => {
    const users = [{ id: 1, email: 'test@test.com' }]
    mockRepository.find.mockResolvedValue(users)

    const result = await service.findAll()
    expect(result).toEqual(users)
    expect(mockRepository.find).toHaveBeenCalled()
  })
})
```

### 2. Integration Tests

#### Frontend Integration Tests

```typescript
// pages/LoginPage/LoginPage.integration.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { LoginPage } from './LoginPage';

const server = setupServer(
  rest.post('/api/auth/login', (req, res, ctx) => {
    return res(ctx.json({ token: 'mock-token' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('LoginPage Integration', () => {
  it('performs complete login flow', async () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@test.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password' }
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('mock-token');
    });
  });
});
```

#### Backend Integration Tests

```typescript
// auth/auth.controller.integration.test.ts
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../app.module'

describe('AuthController (Integration)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/auth/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@test.com', password: 'password' })
      .expect(200)
      .expect(res => {
        expect(res.body.access_token).toBeDefined()
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
```

### 3. E2E Tests

#### Playwright E2E Tests

```typescript
// e2e/login.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Login Flow', () => {
  test('user can login successfully', async ({ page }) => {
    await page.goto('/login')

    await page.fill('[data-testid=email-input]', 'test@test.com')
    await page.fill('[data-testid=password-input]', 'password')
    await page.click('[data-testid=login-button]')

    await expect(page).toHaveURL('/dashboard')
    await expect(page.locator('[data-testid=user-menu]')).toBeVisible()
  })

  test('shows error for invalid credentials', async ({ page }) => {
    await page.goto('/login')

    await page.fill('[data-testid=email-input]', 'invalid@test.com')
    await page.fill('[data-testid=password-input]', 'wrongpassword')
    await page.click('[data-testid=login-button]')

    await expect(page.locator('[data-testid=error-message]')).toBeVisible()
    await expect(page.locator('[data-testid=error-message]')).toContainText('Invalid credentials')
  })
})
```

## 🛠️ Configuração de Ferramentas

### Jest Configuration

#### Global Setup

```javascript
// jest.config.js (root)
module.exports = {
  projects: ['<rootDir>/apps/web', '<rootDir>/apps/api', '<rootDir>/packages/ui'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/index.ts',
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  testTimeout: 10000,
}
```

#### Frontend Jest Config

```javascript
// apps/web/jest.config.js
module.exports = {
  displayName: 'web',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['@swc/jest'],
  },
}
```

#### Backend Jest Config

```javascript
// apps/api/jest.config.js
module.exports = {
  displayName: 'api',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts)$': ['@swc/jest'],
  },
}
```

### Playwright Configuration

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: {
    command: 'pnpm dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
})
```

## 🎯 Padrões de Teste

### Testing Library Best Practices

```typescript
// ✅ Bom: Testa comportamento do usuário
test('user can submit form', () => {
  render(<ContactForm />);

  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: 'John Doe' }
  });
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(screen.getByText(/form submitted/i)).toBeInTheDocument();
});

// ❌ Ruim: Testa implementação
test('calls setState when input changes', () => {
  const setState = jest.fn();
  render(<Input onChange={setState} />);

  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: 'test' }
  });

  expect(setState).toHaveBeenCalledWith('test');
});
```

### Data-testid Strategy

```typescript
// Usar data-testid apenas quando necessário
// Preferir queries semânticas (role, label, text)

// ✅ Bom: Query semântica
screen.getByRole('button', { name: /submit/i })
screen.getByLabelText(/email address/i)
screen.getByText(/welcome back/i)

// ⚠️ OK: data-testid para casos específicos
screen.getByTestId('user-avatar')
screen.getByTestId('loading-spinner')
```

### Mock Strategy

```typescript
// Mock externo, não interno
// ✅ Bom: Mock de dependency externa
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
}))

// ❌ Ruim: Mock de código interno
jest.mock('./userService', () => ({
  getUser: jest.fn(),
}))
```

## 🚀 Pipeline de Testes

### CI/CD Integration

```yaml
# .github/workflows/test-and-deploy.yml
- name: Run Tests
  run: |
    pnpm test:unit
    pnpm test:integration
    pnpm test:e2e

- name: Upload Coverage
  uses: codecov/codecov-action@v3
  with:
    token: ${{ secrets.CODECOV_TOKEN }}
    fail_ci_if_error: true

- name: Quality Gate
  run: |
    if [ "$COVERAGE_THRESHOLD_FAILED" = "true" ]; then
      echo "Coverage threshold not met"
      exit 1
    fi
```

### Parallel Testing

```bash
# Package.json scripts
{
  "test": "turbo run test",
  "test:unit": "turbo run test:unit",
  "test:integration": "turbo run test:integration",
  "test:e2e": "turbo run test:e2e",
  "test:coverage": "turbo run test:coverage",
  "test:watch": "turbo run test:watch"
}
```

## 📊 Métricas e Monitoring

### Coverage Reports

```bash
# Gerar relatórios detalhados
pnpm test:coverage

# Visualizar no browser
open coverage/lcov-report/index.html
```

### Test Performance

```typescript
// Benchmark de testes
const { performance } = require('perf_hooks')

beforeEach(() => {
  global.testStartTime = performance.now()
})

afterEach(() => {
  const duration = performance.now() - global.testStartTime
  if (duration > 5000) {
    console.warn(`Slow test detected: ${duration}ms`)
  }
})
```

### Quality Metrics

- **Test Coverage**: 75%+ frontend, 80%+ backend
- **Test Speed**: <10min total pipeline
- **Flaky Test Rate**: <1% failure rate
- **Mutation Score**: 80%+ (se usando Stryker)

## 🎯 Estratégias por Tipo

### Component Testing

```typescript
// Testa props, states, events, accessibility
describe('Button Component', () => {
  it('renders all variants correctly', () => {
    const variants = ['primary', 'secondary', 'danger'];

    variants.forEach(variant => {
      render(<Button variant={variant}>Test</Button>);
      expect(screen.getByRole('button')).toHaveClass(`btn-${variant}`);
    });
  });

  it('is accessible', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### API Testing

```typescript
// Testa contracts, validation, error handling
describe('Users API', () => {
  it('validates required fields', async () => {
    const response = await request(app)
      .post('/users')
      .send({}) // Empty body
      .expect(400)

    expect(response.body.errors).toContain('email is required')
    expect(response.body.errors).toContain('password is required')
  })

  it('returns user without password', async () => {
    const response = await request(app).get('/users/1').expect(200)

    expect(response.body).toHaveProperty('email')
    expect(response.body).not.toHaveProperty('password')
  })
})
```

### Integration Testing

```typescript
// Testa fluxos completos, state management, side effects
describe('Shopping Cart Flow', () => {
  it('handles complete purchase flow', async () => {
    render(<App />);

    // Add item to cart
    fireEvent.click(screen.getByTestId('add-to-cart-1'));
    await waitFor(() => {
      expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    });

    // Go to checkout
    fireEvent.click(screen.getByTestId('checkout-button'));

    // Fill payment info
    fireEvent.change(screen.getByLabelText(/card number/i), {
      target: { value: '4111111111111111' }
    });

    // Submit order
    fireEvent.click(screen.getByTestId('place-order'));

    await waitFor(() => {
      expect(screen.getByText(/order confirmed/i)).toBeInTheDocument();
    });
  });
});
```

## 🔧 Troubleshooting

### Common Issues

#### Flaky Tests

```typescript
// Use waitFor para async operations
await waitFor(() => {
  expect(screen.getByText(/loaded/i)).toBeInTheDocument()
})

// Mock timers para timing
jest.useFakeTimers()
act(() => {
  jest.advanceTimersByTime(1000)
})
```

#### Memory Leaks

```typescript
// Cleanup em afterEach
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})
```

#### Slow Tests

```typescript
// Optimize rendering
const renderWithProviders = (ui) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <TestProvider>{children}</TestProvider>
    )
  });
};
```

Esta estratégia garante testes robustos, rápidos e confiáveis que suportam desenvolvimento ágil e
deployment seguro.

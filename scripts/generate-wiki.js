#!/usr/bin/env node

/**
 * Wiki Auto-Generator
 * Usa o documentation-helper para gerar e atualizar wiki automaticamente
 */

const fs = require('fs').promises
const path = require('path')

const WIKI_DIR = '.github/wiki'
const DOCS_CONFIG = {
  'HOME.md': {
    title: '🏠 Home - Project Wiki',
    sections: ['overview', 'getting-started', 'architecture', 'contributing'],
    generator: 'generateHomePage'
  },
  'API.md': {
    title: '📡 API Documentation',
    source: 'apps/api/src',
    generator: 'generateApiDocs'
  },
  'COMPONENTS.md': {
    title: '🎨 Component Library',
    source: 'packages/ui',
    generator: 'generateComponentDocs'
  },
  'WORKFLOWS.md': {
    title: '🔄 CI/CD Workflows',
    source: '.github/workflows',
    generator: 'generateWorkflowDocs'
  },
  'TROUBLESHOOTING.md': {
    title: '🔧 Troubleshooting Guide',
    sections: ['common-issues', 'debugging', 'performance'],
    generator: 'generateTroubleshootingDocs'
  }
}

class WikiGenerator {
  constructor() {
    this.wikiDir = path.resolve(WIKI_DIR)
  }

  async ensureWikiDir() {
    try {
      await fs.access(this.wikiDir)
    } catch {
      await fs.mkdir(this.wikiDir, { recursive: true })
    }
  }

  async generateHomePage() {
    return `# 🏠 Project Wiki

Welcome to the comprehensive wiki for this monorepo project!

## 📚 Documentation Sections

### 🚀 Getting Started
- [Installation Guide](./INSTALLATION.md)
- [Development Setup](./DEVELOPMENT.md)
- [First Contribution](./CONTRIBUTING.md)

### 🏗️ Architecture
- [System Overview](./ARCHITECTURE.md)
- [API Documentation](./API.md)
- [Component Library](./COMPONENTS.md)

### 🔄 Workflows
- [CI/CD Pipelines](./WORKFLOWS.md)
- [Release Process](./RELEASE.md)
- [Quality Gates](./QUALITY.md)

### 🛠️ Development
- [Coding Standards](./CODING_STANDARDS.md)
- [Testing Strategy](./TESTING.md)
- [Performance Guidelines](./PERFORMANCE.md)

### 🆘 Support
- [Troubleshooting](./TROUBLESHOOTING.md)
- [FAQ](./FAQ.md)
- [Contact](./SUPPORT.md)

## 🤖 Copilot Profiles

This project uses specialized AI profiles:

- 🎨 **frontend-helper**: Next.js, React, UI/UX
- ⚙️ **backend-helper**: NestJS, APIs, Database  
- 📚 **documentation-helper**: Technical writing
- 🎯 **dev-helper**: Architecture, coordination

See [Copilot Profiles Guide](../copilot-profiles/README.md) for details.

---

**Last Updated**: ${new Date().toISOString().split('T')[0]}
**Auto-generated**: This wiki is automatically maintained by documentation-helper
`
  }

  async generateApiDocs() {
    return `# 📡 API Documentation

## 🔗 Base URL
\`\`\`
Development: http://localhost:3001
Production: https://api.yourproject.com
\`\`\`

## 🔐 Authentication

All API endpoints require authentication via JWT tokens:

\`\`\`bash
Authorization: Bearer <your-jwt-token>
\`\`\`

## 📋 Endpoints Overview

### 🔐 Authentication
- \`POST /auth/login\` - User login
- \`POST /auth/register\` - User registration  
- \`POST /auth/refresh\` - Refresh token
- \`POST /auth/logout\` - User logout

### 👥 Users
- \`GET /users\` - List users (paginated)
- \`POST /users\` - Create user
- \`GET /users/:id\` - Get user by ID
- \`PUT /users/:id\` - Update user
- \`DELETE /users/:id\` - Delete user

### 📊 Health & Monitoring
- \`GET /health\` - Health check
- \`GET /metrics\` - Application metrics

## 📖 Interactive Documentation

Full API documentation with examples is available at:
- **Swagger UI**: \`/api/docs\` (when running locally)
- **OpenAPI Spec**: \`/api/docs-json\`

## 🧪 Testing the API

### Using curl:
\`\`\`bash
# Login
curl -X POST http://localhost:3001/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email": "user@example.com", "password": "password"}'

# Get users (with token)
curl -X GET http://localhost:3001/users \\
  -H "Authorization: Bearer YOUR_TOKEN"
\`\`\`

### Using Insomnia/Postman:
Import the OpenAPI specification from \`/api/docs-json\`

---

**Last Updated**: ${new Date().toISOString().split('T')[0]}
**Source**: Generated from \`apps/api/src\`
`
  }

  async generateComponentDocs() {
    return `# 🎨 Component Library

## 📦 Package: @project/ui

Shared React components used across the monorepo.

## 🏗️ Architecture

Components follow **Atomic Design** principles:

\`\`\`
packages/ui/src/
├── atoms/          # Basic building blocks
├── molecules/      # Simple component groups
├── organisms/      # Complex UI sections
├── templates/      # Page layout structures
└── index.ts        # Exports
\`\`\`

## 🧩 Available Components

### ⚛️ Atoms
- **Button**: Primary, secondary, ghost variants
- **Input**: Text, email, password, search inputs
- **Label**: Form labels with accessibility
- **Badge**: Status and notification badges
- **Avatar**: User profile images
- **Icon**: Lucide icon wrapper

### 🧬 Molecules  
- **FormField**: Input + Label + Error message
- **SearchBox**: Input + Search button
- **ButtonGroup**: Multiple related buttons
- **Card**: Container with header, body, footer
- **Modal**: Overlay dialog component
- **Dropdown**: Select and menu dropdown

### 🦠 Organisms
- **Header**: Site navigation and branding
- **Sidebar**: Application side navigation
- **DataTable**: Sortable, filterable table
- **FormWizard**: Multi-step form component
- **NavigationMenu**: Complex navigation structure

## 🎨 Design System

### 🎨 Colors
\`\`\`css
/* Primary Colors */
--primary-50: #eff6ff;
--primary-500: #3b82f6;
--primary-900: #1e3a8a;

/* Semantic Colors */
--success: #10b981;
--warning: #f59e0b;  
--error: #ef4444;
--info: #06b6d4;
\`\`\`

### 📏 Spacing
\`\`\`css
/* Spacing Scale (Tailwind) */
xs: 0.25rem (4px)
sm: 0.5rem (8px)
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
\`\`\`

### 🔤 Typography
\`\`\`css
/* Font Sizes */
text-xs: 12px
text-sm: 14px
text-base: 16px
text-lg: 18px
text-xl: 20px
text-2xl: 24px
\`\`\`

## 💻 Usage Examples

### Button Component
\`\`\`tsx
import { Button } from '@project/ui'

// Primary button
<Button variant="primary" size="lg" onClick={handleClick}>
  Save Changes
</Button>

// Secondary button with icon
<Button variant="secondary" icon={<SaveIcon />}>
  Draft
</Button>
\`\`\`

### Form Field
\`\`\`tsx
import { FormField } from '@project/ui'

<FormField
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  required
  error={errors.email}
  {...register('email')}
/>
\`\`\`

### Card Component
\`\`\`tsx
import { Card } from '@project/ui'

<Card>
  <Card.Header>
    <Card.Title>User Profile</Card.Title>
  </Card.Header>
  <Card.Body>
    <p>User information content</p>
  </Card.Body>
  <Card.Footer>
    <Button>Edit Profile</Button>
  </Card.Footer>
</Card>
\`\`\`

## 🧪 Testing Components

\`\`\`bash
# Run component tests
pnpm test --filter=ui

# Test with coverage
pnpm test:cov --filter=ui

# Visual testing with Storybook
pnpm storybook --filter=ui
\`\`\`

## 🎯 Contributing

1. Follow the established design system
2. Write comprehensive tests
3. Document props with JSDoc
4. Include Storybook stories
5. Ensure accessibility compliance

---

**Last Updated**: ${new Date().toISOString().split('T')[0]}
**Source**: Generated from \`packages/ui\`
`
  }

  async generateWorkflowDocs() {
    return `# 🔄 CI/CD Workflows Documentation

## 🚀 Overview

This project uses GitHub Actions for comprehensive CI/CD automation.

## 📋 Workflow Files

### 🚀 test-and-deploy.yml (Primary Pipeline)
**Purpose**: Main pipeline combining testing and deployment
**Triggers**: PRs and pushes to \`main\`

\`\`\`yaml
Jobs:
├── build-and-test     # Build + test all packages
├── auto-merge         # Auto-merge for Dependabot/labeled PRs  
└── deploy            # Deploy to production (main only)
\`\`\`

**Timeline**: ~15-20 minutes for full pipeline

### 🔍 ci.yml (Code Quality)
**Purpose**: Comprehensive code quality checks
**Triggers**: PRs and pushes to \`main\`/\`develop\`

\`\`\`yaml
Jobs:
├── quality           # Lint, format, type-check, build
├── test             # Unit and E2E tests
└── security         # Vulnerability scanning
\`\`\`

### 🚀 cd.yml (Deployment)
**Purpose**: Production deployment
**Triggers**: Pushes to \`main\` only

\`\`\`yaml
Jobs:
├── deploy-api       # Backend deployment
├── deploy-web       # Frontend to Vercel
└── notify          # Success/failure notifications
\`\`\`

### 🤖 auto-merge.yml (Automation)
**Purpose**: Automated PR merging
**Triggers**: Dependabot PRs or \`auto-merge\` label

\`\`\`yaml
Jobs:
└── auto-merge       # Wait for CI + auto-approve + merge
\`\`\`

### 📦 release.yml (Versioning)
**Purpose**: Automated releases
**Triggers**: Pushes to \`main\`

\`\`\`yaml
Jobs:
├── build           # Build all packages
├── changelog       # Generate changelog
└── release         # Create GitHub release
\`\`\`

## 🔄 Development Flow

### 🌟 Feature Development
\`\`\`mermaid
gitgraph
    commit id: "main"
    branch feature/new-component
    checkout feature/new-component
    commit id: "implement"
    commit id: "test"
    checkout main
    merge feature/new-component
    commit id: "deploy"
\`\`\`

1. **Branch Creation**: \`git checkout -b feature/component-name\`
2. **Development**: Code + tests + documentation
3. **Push**: Triggers CI pipeline automatically
4. **PR Review**: Manual or auto-merge
5. **Deploy**: Automatic deployment to production

### 🐛 Hotfix Flow
\`\`\`mermaid
gitgraph
    commit id: "main"
    branch hotfix/critical-bug
    checkout hotfix/critical-bug
    commit id: "fix"
    checkout main
    merge hotfix/critical-bug
    commit id: "hotfix-deploy"
\`\`\`

## 🎯 Quality Gates

### ✅ Pre-merge Requirements
- [ ] **ESLint**: No errors or warnings
- [ ] **Prettier**: Code properly formatted
- [ ] **TypeScript**: No type errors
- [ ] **Tests**: All tests passing
- [ ] **Coverage**: Minimum thresholds met
- [ ] **Build**: Successful build for all packages
- [ ] **Security**: No vulnerabilities detected

### 🔒 Deployment Requirements
- [ ] **All Quality Gates**: Must pass
- [ ] **Branch Protection**: Only from \`main\`
- [ ] **Required Reviews**: Configured per repository
- [ ] **Status Checks**: All workflows successful

## 📊 Monitoring & Metrics

### 🎯 Key Metrics
- **Build Success Rate**: Target >98%
- **Test Coverage**: Minimum 80%
- **Deployment Frequency**: Multiple times per day
- **Lead Time**: <2 hours from commit to production
- **Mean Time to Recovery**: <30 minutes

### 📈 Dashboard Links
- **GitHub Actions**: Repository Actions tab
- **Codecov**: Coverage reports and trends
- **Vercel**: Deployment logs and analytics
- **Dependabot**: Security and dependency updates

## 🛠️ Workflow Configuration

### 🔧 Required Secrets
\`\`\`bash
# Repository Secrets (Settings > Secrets)
TURBO_TOKEN          # Turborepo remote cache
CODECOV_TOKEN        # Coverage reporting
VERCEL_TOKEN         # Deployment token
VERCEL_ORG_ID        # Organization ID
VERCEL_PROJECT_ID    # Project ID
\`\`\`

### 🌍 Environment Configuration
\`\`\`bash
# Production Environment
NODE_ENV=production
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=secure-secret
\`\`\`

## 🔧 Troubleshooting

### ❌ Common Issues

**Build Failures**:
\`\`\`bash
# Check logs in GitHub Actions
# Usually TypeScript or lint errors
pnpm lint:fix
pnpm type-check
\`\`\`

**Test Failures**:
\`\`\`bash
# Run tests locally first
pnpm test
pnpm test:e2e
\`\`\`

**Deployment Failures**:
\`\`\`bash
# Check environment variables
# Verify secrets configuration
# Review deployment logs
\`\`\`

### 🚨 Emergency Procedures

**Revert Deployment**:
1. Revert commit on \`main\`
2. Push triggers automatic redeployment
3. Monitor health checks

**Skip CI** (Emergency only):
\`\`\`bash
git commit -m "fix: emergency patch [skip ci]"
\`\`\`

---

**Last Updated**: ${new Date().toISOString().split('T')[0]}
**Source**: Generated from \`.github/workflows\`
`
  }

  async generateTroubleshootingDocs() {
    return `# 🔧 Troubleshooting Guide

## 🚨 Common Issues & Solutions

### 🏗️ Build Issues

#### TypeScript Errors
\`\`\`bash
# Check for type errors
pnpm type-check

# Common fixes:
# 1. Update type definitions
pnpm add -D @types/node@latest

# 2. Check tsconfig.json paths
# 3. Clear TypeScript cache
rm -rf node_modules/.cache
\`\`\`

#### ESLint Errors
\`\`\`bash
# Auto-fix linting issues
pnpm lint:fix

# Check specific files
pnpm eslint apps/web/app/page.tsx --fix
\`\`\`

#### Build Cache Issues
\`\`\`bash
# Clear all caches
pnpm clean
rm -rf node_modules
pnpm install

# Clear Turborepo cache
pnpm turbo prune
\`\`\`

### 🧪 Testing Issues

#### Jest Configuration
\`\`\`bash
# Debug Jest config
pnpm test --debug

# Clear Jest cache
pnpm test --clearCache

# Run specific test
pnpm test --filter=web Button.test.tsx
\`\`\`

#### Playwright E2E Issues
\`\`\`bash
# Install browsers
pnpm playwright install

# Debug mode
pnpm test:e2e --debug

# Generate test code
pnpm playwright codegen localhost:3000
\`\`\`

### 📦 Package Manager Issues

#### pnpm Lock File Conflicts
\`\`\`bash
# Delete lock file and reinstall
rm pnpm-lock.yaml
pnpm install

# Clear pnpm store
pnpm store prune
\`\`\`

#### Workspace Dependencies
\`\`\`bash
# Check workspace dependencies
pnpm list --depth=0

# Verify workspace configuration
cat pnpm-workspace.yaml
\`\`\`

### 🚀 Development Server Issues

#### Port Already in Use
\`\`\`bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Use different port
PORT=3001 pnpm dev --filter=web
\`\`\`

#### Hot Reload Not Working
\`\`\`bash
# Check file watchers limit (Linux/macOS)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf

# Restart development server
pnpm dev --filter=web
\`\`\`

### 🔐 Authentication Issues

#### JWT Token Problems
\`\`\`bash
# Check token in browser DevTools
localStorage.getItem('token')

# Verify JWT secret in .env
JWT_SECRET=your-secret-key

# Check token expiration
# Use jwt.io to decode and inspect
\`\`\`

#### Database Connection
\`\`\`bash
# Check database URL
echo $DATABASE_URL

# Test connection
pnpm --filter=api npm run db:ping

# Run migrations
pnpm --filter=api npm run db:migrate
\`\`\`

### 🎨 Frontend Issues

#### Tailwind Styles Not Loading
\`\`\`bash
# Check Tailwind config
cat tailwind.config.js

# Rebuild CSS
pnpm build --filter=web

# Check for CSS purging issues
# Add to safelist in tailwind.config.js
\`\`\`

#### Next.js Issues
\`\`\`bash
# Clear Next.js cache
rm -rf apps/web/.next

# Check Next.js config
cat apps/web/next.config.js

# Debug build
pnpm build --filter=web --debug
\`\`\`

### ⚙️ Backend Issues

#### NestJS Module Issues
\`\`\`bash
# Check for circular dependencies
pnpm --filter=api npm run build

# Debug module loading
DEBUG=* pnpm --filter=api npm run start:dev
\`\`\`

#### Database Schema Issues
\`\`\`bash
# Generate new migration
pnpm --filter=api npm run migration:generate

# Reset database (CAUTION!)
pnpm --filter=api npm run db:reset

# Seed database
pnpm --filter=api npm run db:seed
\`\`\`

## 🔍 Debugging Tools

### 🛠️ VS Code Debugging
\`\`\`json
// .vscode/launch.json
{
  "name": "Debug Next.js",
  "type": "node",
  "request": "launch",
  "program": "\${workspaceFolder}/apps/web/node_modules/.bin/next",
  "args": ["dev"],
  "cwd": "\${workspaceFolder}/apps/web"
}
\`\`\`

### 📊 Performance Debugging
\`\`\`bash
# Bundle analyzer
pnpm --filter=web npm run analyze

# Lighthouse CI
pnpm --filter=web npm run lighthouse

# Memory usage
node --inspect apps/api/dist/main.js
\`\`\`

### 🔍 Network Debugging
\`\`\`bash
# Check API endpoints
curl -X GET http://localhost:3001/health

# Debug with verbose
curl -v -X POST http://localhost:3001/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"test@example.com","password":"test"}'
\`\`\`

## 🆘 Emergency Procedures

### 🚨 Production Issues

#### Service Down
1. **Check health endpoints**: \`/health\`, \`/metrics\`
2. **Review error logs**: GitHub Actions, Vercel logs
3. **Rollback if needed**: Revert last commit
4. **Monitor recovery**: Health checks and metrics

#### Performance Issues
1. **Check metrics**: Response times, error rates
2. **Database queries**: Slow query log
3. **Memory usage**: Node.js heap snapshots
4. **CDN issues**: Vercel edge locations

#### Security Incident
1. **Revoke tokens**: JWT secrets, API keys
2. **Check logs**: Audit logs, access logs
3. **Update dependencies**: Security patches
4. **Document incident**: Post-mortem analysis

### 📞 Escalation Contacts

- **Technical Issues**: Create GitHub issue with \`bug\` label
- **Security Issues**: Create private security advisory
- **Production Outage**: Immediate rollback + investigation

## 📋 Health Check Commands

### 🏥 System Health
\`\`\`bash
# Overall system check
pnpm health:check

# Individual services
pnpm --filter=web health:check
pnpm --filter=api health:check

# Database health
pnpm --filter=api db:health

# External dependencies
pnpm deps:check
\`\`\`

### 📊 Monitoring Dashboard
- **Application Metrics**: \`/metrics\` endpoint
- **Build Status**: GitHub Actions tab
- **Deployment Status**: Vercel dashboard
- **Error Tracking**: Application logs

---

**Last Updated**: ${new Date().toISOString().split('T')[0]}
**Auto-generated**: Updated by documentation-helper
`
  }

  async generateWiki() {
    await this.ensureWikiDir()
    
    for (const [filename, config] of Object.entries(DOCS_CONFIG)) {
      const generator = this[config.generator]
      if (generator) {
        const content = await generator.call(this)
        const filepath = path.join(this.wikiDir, filename)
        await fs.writeFile(filepath, content, 'utf8')
        console.log(`✅ Generated: ${filename}`)
      }
    }
  }

  async updateWiki() {
    console.log('🚀 Starting wiki generation...')
    await this.generateWiki()
    console.log('✅ Wiki generation complete!')
  }
}

// CLI interface
if (require.main === module) {
  const generator = new WikiGenerator()
  generator.updateWiki().catch(console.error)
}

module.exports = WikiGenerator

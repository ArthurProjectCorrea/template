# 🚀 Fullstack Template

Template repository for fullstack development with Next.js, NestJS, and comprehensive tooling.

## 🎯 Quick Start

**Use this template for your project:**

```bash
# 1. Use this repository as template on GitHub
# 2. Clone your new repository
git clone https://github.com/your-username/your-project.git
cd your-project

# 3. Initialize the template
pnpm init:template
```

**[📋 Complete Quick Start Guide](.github/wiki/QUICK_START.md)**

## 📚 Full Documentation

**Complete documentation is available in the [📖 Wiki](.github/wiki/HOME.md)**

### 🎯 Quick Links

- **[🚀 Quick Start](.github/wiki/QUICK_START.md)** - Get up and running in minutes
- **[📋 Template Usage](.github/wiki/TEMPLATE_USAGE.md)** - Complete usage guide
- **[🤖 Copilot Helpers](.github/wiki/COPILOT_HELPERS.md)** - AI-powered development
- **[🏗️ Architecture](.github/wiki/ARCHITECTURE.md)** - System architecture overview
- **[🔄 Development Workflow](.github/wiki/DEVELOPMENT_WORKFLOW.md)** - Complete dev workflow
- **[🧪 Testing Strategy](.github/wiki/TESTING_STRATEGY.md)** - Comprehensive testing guide

## 🏗️ What's Inside?

This template includes a complete fullstack setup:

### 🎯 Apps and Packages

- **`apps/web`**: [Next.js 15](https://nextjs.org/) app with App Router
- **`apps/api`**: [NestJS](https://nestjs.com/) API with TypeScript
- **`packages/ui`**: Shared React component library
- **`packages/eslint-config`**: Shared ESLint configurations
- **`packages/typescript-config`**: Shared TypeScript configurations
- **`packages/tailwind-config`**: Shared Tailwind CSS configurations

### 🤖 AI-Powered Development

- **Chat Modes**: Specialized AI helpers (@frontend-helper, @backend-helper, @documentation-helper,
  @dev-helper)
- **Instructions**: Contextualized development guidelines
- **Prompts**: Structured templates for issue evaluation and architecture coordination

### 🛠️ Development Tools

- **[Turborepo](https://turbo.build/)**: Monorepo build system with caching
- **[TypeScript](https://www.typescriptlang.org/)**: Static type checking
- **[ESLint](https://eslint.org/)**: Code linting with shared configurations
- **[Prettier](https://prettier.io)**: Code formatting
- **[Husky](https://typicode.github.io/husky/)**: Git hooks for quality gates
- **[Commitlint](https://commitlint.js.org/)**: Conventional commit validation
- **[Jest](https://jestjs.io/)**: Testing framework with coverage reports

### 🧪 Testing & Quality

- **Unit Tests**: Jest + React Testing Library
- **E2E Tests**: Playwright for web, Supertest for API
- **Coverage Thresholds**: Enforced minimums (75-95%)
- **Quality Gates**: Pre-commit hooks, CI/CD validation
- **Code Standards**: ESLint + Prettier + TypeScript strict mode

### 🔄 CI/CD & Automation

- **GitHub Actions**: Automated testing, building, and deployment
- **Auto-merge**: Dependabot PRs and labeled PRs
- **Wiki Generation**: Automatic documentation updates
- **Release Automation**: Semantic versioning and changelog generation

## 🚀 Complete Installation Workflow

### Prerequisites

- Node.js 18+
- pnpm (recommended package manager)
- Git configured with GitHub
- GitHub CLI (gh) for branch protection (optional)

### Manual Installation Steps (Steps 1-8)

#### Steps 1-2: Template Setup

1. **Use this template** on GitHub:
   - Click "Use this template" button
   - Create your new repository
   - Choose public/private visibility

2. **Clone your repository**:
   ```bash
   git clone https://github.com/your-username/your-project.git
   cd your-project
   ```

#### Automated Setup (Steps 3-8)

3. **Run the complete setup script**:

   ```bash
   # Cross-platform (Node.js) - Recommended
   pnpm setup:complete

   # Linux/macOS/WSL
   pnpm setup:complete:sh

   # Windows PowerShell
   pnpm setup:complete:bat
   ```

   **This automated script will:**
   - ✅ **Step 3**: Install dependencies (`pnpm install`)
   - ✅ **Step 4**: Edit initial commit with standard message
   - ✅ **Step 5**: Configure .gitignore for docs folders
   - ✅ **Step 6**: Commit changes with `chore(setup): configure gitignore and project settings`
   - ✅ **Step 7**: Create dev branch from main
   - ✅ **Step 8**: Configure branch protection rules (if GitHub CLI available)

#### Manual Configuration (If Needed)

If the automated setup cannot configure branch protection, manually set up:

**Main Branch Protection Rules:**

- Require pull request before merging
- Require status checks (CI/tests)
- Require linear history
- Disable direct commits

**Dev Branch Protection Rules:**

- Require pull request before merging
- Require status checks (CI/tests)
- Disable direct commits

**Configure at:** `https://github.com/your-username/your-repo/settings/branches`

### Alternative: Step-by-Step Manual Setup

If you prefer manual setup or the automated script fails:

3. **Install dependencies**:

   ```bash
   pnpm install
   ```

4. **Edit initial commit**:

   ```bash
   git add .
   git commit --amend -m "chore(setup): initial setup of the fullstack project with monorepo (#0)"
   ```

5. **Configure .gitignore** (add to all .gitignore files):

   ```gitignore
   # Documentation folders (local only)
   docs/
   docs/**
   ```

6. **Commit setup changes**:

   ```bash
   git add .
   git commit -m "chore(setup): configure gitignore and project settings"
   ```

7. **Create dev branch**:

   ```bash
   git checkout -b dev
   git push -u origin dev
   git checkout main
   ```

8. **Configure branch protection** (requires GitHub CLI or manual setup)

### Quick Template Initialization (Legacy)

For quick testing without the complete workflow:

```bash
# Quick template initialization (legacy)
pnpm init:template
```

The initialization script will:

- Install dependencies
- Create initial commit
- Fetch your repository information
- Customize all files with your project details
- Configure AI helpers with project context

### Development Commands

```bash
# Start all apps in development mode
pnpm dev

# Start specific app
pnpm dev --filter=web   # Frontend only
pnpm dev --filter=api   # Backend only

# Build all packages
pnpm build

# Run all tests
pnpm test

# Lint and format
pnpm lint
pnpm format

# Quality check (lint + format + type check + test + build)
pnpm quality:check
```

## 🤖 AI-Powered Development

This template includes specialized AI helpers:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev
yarn exec turbo dev
pnpm exec turbo dev
```

You can develop a specific package by using a
[filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev --filter=web

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev --filter=web
yarn exec turbo dev --filter=web
pnpm exec turbo dev --filter=web
```

### Remote Caching

> [!TIP] Vercel Remote Cache is free for all plans. Get started today at
> [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as
[Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) to share cache artifacts
across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with
Vercel. If you don't have an account you can
[create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following
commands:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo login

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo login
yarn exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your
[Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the
root of your Turborepo:

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo link

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo link
yarn exec turbo link
pnpm exec turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)

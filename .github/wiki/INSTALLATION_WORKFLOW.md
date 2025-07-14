# 🚀 Complete Installation Workflow

## Overview

This guide provides a complete step-by-step workflow for setting up a new project using this
template. The workflow includes both manual steps and automated scripts for a professional
development environment.

## Prerequisites

Before starting, ensure you have:

- **Node.js 18+** installed
- **pnpm** (recommended) or npm
- **Git** configured with your GitHub credentials
- **GitHub CLI (gh)** for branch protection (optional but recommended)
- **Repository access** with push permissions

## Installation Steps (1-8)

### Steps 1-2: Repository Setup (Manual)

#### Step 1: Create Repository from Template

1. Navigate to the template repository on GitHub
2. Click **"Use this template"** button
3. Choose **"Create a new repository"**
4. Configure your new repository:
   - **Repository name**: your-project-name
   - **Visibility**: Public or Private
   - **Include all branches**: Unchecked (use main only)
5. Click **"Create repository"**

#### Step 2: Clone Your Repository

```bash
# Clone your new repository
git clone https://github.com/your-username/your-project.git
cd your-project

# Verify you're in the correct directory
pwd
ls -la
```

### Steps 3-8: Automated Setup

#### Option A: Complete Automated Setup (Recommended)

Run the complete setup script that handles steps 3-8 automatically:

```bash
# Linux/macOS/WSL
chmod +x scripts/complete-setup.sh
./scripts/complete-setup.sh

# Windows PowerShell
scripts/complete-setup.bat

# Cross-platform (Node.js)
node scripts/complete-setup.js

# Or using pnpm scripts
pnpm setup:complete          # Node.js version
pnpm setup:complete:sh       # Shell version
pnpm setup:complete:bat      # Windows batch version
```

**What the automated script does:**

1. ✅ **Step 3**: Install dependencies
2. ✅ **Step 4**: Update initial commit message
3. ✅ **Step 5**: Configure .gitignore files
4. ✅ **Step 6**: Commit setup changes
5. ✅ **Step 7**: Create dev branch
6. ✅ **Step 8**: Configure branch protection rules

#### Option B: Manual Step-by-Step Setup

If you prefer manual control or the automated script fails:

#### Step 3: Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install

# Verify installation
pnpm run build
```

#### Step 4: Edit Initial Commit

```bash
# Stage all files
git add .

# Amend the initial commit with standard message
git commit --amend -m "chore(setup): initial setup of the fullstack project with monorepo (#0)"

# If amend fails, create new commit
git commit -m "chore(setup): initial setup of the fullstack project with monorepo (#0)"
```

#### Step 5: Configure .gitignore for Docs Folders

Add the following to all `.gitignore` files (root, `apps/web/.gitignore`, `apps/api/.gitignore`):

```gitignore

# Documentation folders (local only)
docs/
docs/**
```

**Files to update:**

- `./.gitignore`
- `./apps/web/.gitignore`
- `./apps/api/.gitignore`

#### Step 6: Commit Setup Changes

```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "chore(setup): configure gitignore and project settings

- Configure .gitignore to ignore docs folders
- Set up project structure for development"
```

#### Step 7: Create Dev Branch from Main

```bash
# Create and switch to dev branch
git checkout -b dev

# Push dev branch to remote
git push -u origin dev

# Switch back to main
git checkout main

# Verify branches
git branch -a
```

#### Step 8: Configure Branch Protection Rules

##### Option A: Using GitHub CLI (Automated)

```bash
# Configure main branch protection
gh api repos/OWNER/REPO/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["build-and-test"]}' \
  --field enforce_admins=false \
  --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
  --field restrictions=null \
  --field required_linear_history=true \
  --field allow_force_pushes=false \
  --field allow_deletions=false

# Configure dev branch protection
gh api repos/OWNER/REPO/branches/dev/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["build-and-test"]}' \
  --field enforce_admins=false \
  --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
  --field restrictions=null \
  --field required_linear_history=false \
  --field allow_force_pushes=false \
  --field allow_deletions=false
```

##### Option B: Manual Configuration (GitHub Web Interface)

1. **Navigate to Repository Settings**:
   - Go to `https://github.com/your-username/your-repo/settings/branches`

2. **Configure Main Branch Protection**:
   - Click **"Add rule"**
   - Branch name pattern: `main`
   - Enable:
     - ✅ Require a pull request before merging
     - ✅ Require status checks to pass before merging
     - ✅ Require linear history
     - ✅ Do not allow bypassing the above settings
   - Add status checks: `build-and-test`

3. **Configure Dev Branch Protection**:
   - Click **"Add rule"**
   - Branch name pattern: `dev`
   - Enable:
     - ✅ Require a pull request before merging
     - ✅ Require status checks to pass before merging
   - Add status checks: `build-and-test`

## Post-Installation Verification

### Verify Setup Completion

```bash
# Check git branches
git branch -a

# Verify dependencies
pnpm list --depth=0

# Test build
pnpm build

# Test development
pnpm dev
```

### Expected Results

After successful installation:

1. ✅ **Dependencies**: All packages installed
2. ✅ **Branches**: `main` and `dev` branches exist
3. ✅ **Commits**: Clean commit history with standard messages
4. ✅ **Protection**: Branch protection rules configured
5. ✅ **Build**: Project builds successfully
6. ✅ **Development**: Dev server starts without errors

## Troubleshooting

### Common Issues

#### Permission Errors

```bash
# If you get permission errors
sudo chown -R $(whoami) ~/.npm
npm cache clean --force
```

#### Git Authentication

```bash
# Configure git if not done
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Check authentication
git remote -v
gh auth status
```

#### Branch Protection Failures

- Ensure you have admin access to the repository
- Install GitHub CLI: `gh auth login`
- Manual setup via GitHub web interface

#### Script Execution Errors

```bash
# Make scripts executable (Linux/macOS)
chmod +x scripts/*.sh

# For Windows, use .bat files
scripts/complete-setup.bat

# Or use Node.js version
node scripts/complete-setup.js
```

### Getting Help

1. **Check logs**: Review script output for specific errors
2. **Verify prerequisites**: Ensure all tools are installed
3. **Manual fallback**: Use step-by-step manual setup
4. **GitHub Issues**: Report problems with reproduction steps

## Next Steps

After successful installation:

1. 🚀 **Start Development**: `pnpm dev`
2. 🌿 **Create Feature Branch**: `git checkout -b feature/your-feature`
3. 🤖 **Use AI Helpers**: `@frontend-helper`, `@backend-helper`, etc.
4. 📝 **Follow Workflow**: PR to `dev`, then to `main`
5. 📚 **Read Documentation**: [Development Workflow](DEVELOPMENT_WORKFLOW.md)

## Advanced Configuration

### Environment Variables

Create environment files for different environments:

```bash
# Development
cp .env.example .env.local

# Production
cp .env.example .env.production
```

### Database Setup

If your project includes database:

```bash
# Install database dependencies
pnpm add @prisma/client prisma

# Initialize database
pnpm exec prisma init
pnpm exec prisma migrate dev
```

### Additional Integrations

Consider setting up:

- **Vercel** for frontend deployment
- **Railway/Heroku** for backend deployment
- **Sentry** for error monitoring
- **Codecov** for coverage reporting

---

📋 **Need help?** Check the [Template Validation Checklist](TEMPLATE_VALIDATION.md) to ensure
everything is working correctly.

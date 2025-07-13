#!/bin/bash

# 🚀 Template Initialization Script (Bash)
# Simple version for Unix-like systems

set -e

echo "🎯 Initializing Template Project..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

info() {
    echo -e "${BLUE}ℹ️ $1${NC}"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warn() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
}

# Step 1: Install dependencies
info "Installing dependencies..."
pnpm install
success "Dependencies installed"

# Step 2: Initial commit
info "Making initial commit..."
git add .
if git commit --amend -m "chore(main): initialize project structure" 2>/dev/null; then
    success "Amended existing commit"
else
    warn "Could not amend, creating new commit"
    git commit -m "chore(main): initialize project structure"
fi

# Step 3: Push to remote
info "Pushing to remote..."
if git push --force-with-lease origin main 2>/dev/null; then
    success "Pushed with --force-with-lease"
else
    warn "Using --force push"
    git push --force origin main
fi

# Step 4: Run Node.js initialization script
info "Running project customization..."
node scripts/initialize-project.js

echo ""
echo "🎉 Template initialization complete!"
echo "Next steps:"
echo "  • Start development: pnpm dev"
echo "  • Run tests: pnpm test"
echo "  • Use AI helpers with @frontend-helper, @backend-helper, etc."

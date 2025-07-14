#!/bin/bash

# 🚀 Complete Project Setup Script (Unix/Linux/macOS)
# 
# This script performs the complete setup from steps 3-8:
# 3. Install dependencies
# 4. Edit initial commit
# 5. Configure .gitignore for docs folders
# 6. Commit changes
# 7. Create dev branch from main
# 8. Configure branch protection rules

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warn() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

log_step() {
    echo -e "${CYAN}🚀 $1${NC}"
}

log_title() {
    echo -e "${MAGENTA}${BOLD}🎯 $1${NC}"
}

# Check if we're in a git repository
check_git_repo() {
    if ! git rev-parse --git-dir >/dev/null 2>&1; then
        log_error "Not in a git repository. Please run this from the project root."
        exit 1
    fi
}

# Get repository information
get_repo_info() {
    local remote_url=$(git config --get remote.origin.url 2>/dev/null || echo "")
    
    if [[ $remote_url =~ github\.com[:/]([^/]+)/([^/.]+) ]]; then
        REPO_OWNER="${BASH_REMATCH[1]}"
        REPO_NAME="${BASH_REMATCH[2]%.git}"
        REPO_FULL_NAME="$REPO_OWNER/$REPO_NAME"
        REPO_URL="https://github.com/$REPO_FULL_NAME"
    else
        log_warn "Could not parse repository information from remote URL"
        REPO_OWNER=""
        REPO_NAME=""
        REPO_FULL_NAME=""
        REPO_URL=""
    fi
}

# Step 3: Install dependencies
install_dependencies() {
    log_step "Step 3: Installing dependencies..."
    
    if command -v pnpm >/dev/null 2>&1; then
        pnpm install
        log_success "Dependencies installed successfully with pnpm"
    elif command -v npm >/dev/null 2>&1; then
        npm install
        log_success "Dependencies installed successfully with npm"
    else
        log_error "Neither pnpm nor npm found. Please install a package manager."
        exit 1
    fi
}

# Step 4: Edit initial commit
edit_initial_commit() {
    log_step "Step 4: Editing initial commit..."
    
    # Add all files to staging
    git add .
    
    # Try to amend existing commit
    if git commit --amend -m "chore(setup): initial setup of the fullstack project with monorepo (#0)" >/dev/null 2>&1; then
        log_success "Initial commit updated with standard message"
    else
        log_warn "Could not amend existing commit, creating new commit"
        git commit -m "chore(setup): initial setup of the fullstack project with monorepo (#0)"
        log_success "New initial commit created"
    fi
}

# Step 5: Configure .gitignore for docs folders
configure_gitignore() {
    log_step "Step 5: Configuring .gitignore files..."
    
    local docs_ignore="

# Documentation folders (local only)
docs/
docs/**"
    
    local updated=false
    
    # Update root .gitignore
    if [ -f ".gitignore" ]; then
        if ! grep -q "docs/" ".gitignore"; then
            echo "$docs_ignore" >> ".gitignore"
            log_success "Updated: .gitignore"
            updated=true
        else
            log_info "Already configured: .gitignore"
        fi
    fi
    
    # Update web app .gitignore
    if [ -f "apps/web/.gitignore" ]; then
        if ! grep -q "docs/" "apps/web/.gitignore"; then
            echo "$docs_ignore" >> "apps/web/.gitignore"
            log_success "Updated: apps/web/.gitignore"
            updated=true
        else
            log_info "Already configured: apps/web/.gitignore"
        fi
    fi
    
    # Update api .gitignore
    if [ -f "apps/api/.gitignore" ]; then
        if ! grep -q "docs/" "apps/api/.gitignore"; then
            echo "$docs_ignore" >> "apps/api/.gitignore"
            log_success "Updated: apps/api/.gitignore"
            updated=true
        else
            log_info "Already configured: apps/api/.gitignore"
        fi
    fi
    
    if [ "$updated" = true ]; then
        log_success "GitIgnore files configured to ignore docs folders"
    else
        log_info "GitIgnore files already properly configured"
    fi
}

# Step 6: Commit changes
commit_changes() {
    log_step "Step 6: Committing setup changes..."
    
    # Check if there are changes to commit
    if [ -n "$(git status --porcelain)" ]; then
        git add .
        git commit -m "chore(setup): configure gitignore and project settings

- Configure .gitignore to ignore docs folders
- Set up project structure for development"
        log_success "Setup changes committed"
    else
        log_info "No changes to commit"
    fi
}

# Step 7: Create dev branch
create_dev_branch() {
    log_step "Step 7: Creating dev branch..."
    
    # Check if dev branch already exists
    if git rev-parse --verify dev >/dev/null 2>&1; then
        log_info "Dev branch already exists"
        return
    fi
    
    # Create and switch to dev branch
    git checkout -b dev
    log_success "Dev branch created from main"
    
    # Push dev branch to remote
    git push -u origin dev
    log_success "Dev branch pushed to remote"
    
    # Switch back to main
    git checkout main
    log_info "Switched back to main branch"
}

# Step 8: Configure branch protection rules
configure_branch_protection() {
    log_step "Step 8: Configuring branch protection rules..."
    
    get_repo_info
    
    if [ -z "$REPO_FULL_NAME" ]; then
        log_warn "Could not determine repository information"
        return
    fi
    
    log_info "Setting up branch protection rules..."
    log_warn "Note: Branch protection requires GitHub CLI (gh) and appropriate permissions"
    
    # Check if GitHub CLI is available
    if ! command -v gh >/dev/null 2>&1; then
        log_error "GitHub CLI (gh) is not installed. Please install it to configure branch protection."
        log_info "Manual setup required - see documentation for branch protection rules"
        return
    fi
    
    # Configure main branch protection
    if gh api "repos/$REPO_FULL_NAME/branches/main/protection" \
        --method PUT \
        --field required_status_checks='{"strict":true,"contexts":["build-and-test"]}' \
        --field enforce_admins=false \
        --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true,"require_code_owner_reviews":false}' \
        --field restrictions=null \
        --field required_linear_history=true \
        --field allow_force_pushes=false \
        --field allow_deletions=false >/dev/null 2>&1; then
        log_success "Main branch protection configured"
    else
        log_warn "Could not configure main branch protection automatically"
        log_info "Please configure manually in GitHub repository settings"
    fi
    
    # Configure dev branch protection
    if gh api "repos/$REPO_FULL_NAME/branches/dev/protection" \
        --method PUT \
        --field required_status_checks='{"strict":true,"contexts":["build-and-test"]}' \
        --field enforce_admins=false \
        --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
        --field restrictions=null \
        --field required_linear_history=false \
        --field allow_force_pushes=false \
        --field allow_deletions=false >/dev/null 2>&1; then
        log_success "Dev branch protection configured"
    else
        log_warn "Could not configure dev branch protection automatically"
        log_info "Please configure manually in GitHub repository settings"
    fi
}

# Display manual configuration instructions
display_manual_instructions() {
    log_title "📋 Manual Configuration Instructions"
    
    echo ""
    echo "🔒 Branch Protection Rules to Configure in GitHub:"
    echo ""
    echo "📍 Main Branch Protection:"
    echo "  • Require pull request before merging"
    echo "  • Require status checks (CI/tests)"
    echo "  • Require linear history"
    echo "  • Require signed commits (optional)"
    echo "  • Disable direct commits"
    echo ""
    echo "📍 Dev Branch Protection:"
    echo "  • Require pull request before merging"
    echo "  • Require status checks (CI/tests)"
    echo "  • Disable direct commits"
    echo ""
    echo "🔧 GitHub Repository Settings:"
    if [ -n "$REPO_URL" ]; then
        echo "  • Go to: $REPO_URL/settings/branches"
    else
        echo "  • Go to: https://github.com/your-username/your-repo/settings/branches"
    fi
    echo "  • Add protection rules for main and dev branches"
    echo "  • Configure according to the rules above"
}

# Main setup function
main() {
    log_title "🎯 Complete Project Setup (Steps 3-8)"
    
    # Verify we're in a git repository
    check_git_repo
    
    # Execute all steps
    install_dependencies           # Step 3
    edit_initial_commit           # Step 4
    configure_gitignore           # Step 5
    commit_changes                # Step 6
    create_dev_branch             # Step 7
    configure_branch_protection   # Step 8
    
    # Display manual instructions
    display_manual_instructions
    
    # Success message
    log_title "🎉 Project Setup Complete!"
    log_success "Your project is now ready for development"
    
    echo ""
    echo "🚀 Next Steps:"
    echo "  • Start development: pnpm dev"
    echo "  • Create feature branch: git checkout -b feature/your-feature"
    echo "  • Use AI helpers: @frontend-helper, @backend-helper, etc."
    echo "  • Follow development workflow with PRs to dev branch"
}

# Run the main function
main "$@"

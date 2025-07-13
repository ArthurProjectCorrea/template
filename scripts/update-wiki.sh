#!/bin/bash

# 🤖 Wiki Auto-Update Script
# Uses documentation-helper to generate and update wiki content

set -e

echo "🚀 Starting wiki auto-update process..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Not in project root directory. Please run from project root."
    exit 1
fi

# Create wiki directory if it doesn't exist
WIKI_DIR=".github/wiki"
if [ ! -d "$WIKI_DIR" ]; then
    print_status "Creating wiki directory..."
    mkdir -p "$WIKI_DIR"
fi

# Generate wiki using Node.js script
print_status "Generating wiki content..."
if node scripts/generate-wiki.js; then
    print_success "Wiki generation completed successfully!"
else
    print_error "Wiki generation failed!"
    exit 1
fi

# Optional: Commit changes if in CI or auto-commit enabled
if [ "$GITHUB_ACTIONS" = "true" ] || [ "$AUTO_COMMIT" = "true" ]; then
    print_status "Auto-committing wiki changes..."
    
    # Check if there are changes
    if [ -n "$(git status --porcelain $WIKI_DIR)" ]; then
        git add "$WIKI_DIR"
        git commit -m "docs: auto-update wiki documentation

- Updated by documentation-helper
- Generated on $(date -u +%Y-%m-%dT%H:%M:%SZ)
- Includes latest API, component, and workflow docs

[skip ci]"
        
        print_success "Wiki changes committed successfully!"
    else
        print_warning "No wiki changes detected, skipping commit."
    fi
fi

# Generate summary
print_status "Wiki update summary:"
echo "📁 Wiki directory: $WIKI_DIR"
echo "📄 Generated files:"
find "$WIKI_DIR" -name "*.md" -type f | while read file; do
    echo "   - $(basename "$file")"
done

print_success "Wiki auto-update process completed! 🎉"

# Optional: Open wiki in browser (development only)
if [ "$OPEN_WIKI" = "true" ] && [ "$GITHUB_ACTIONS" != "true" ]; then
    if command -v open >/dev/null 2>&1; then
        open "$WIKI_DIR/HOME.md"
    elif command -v xdg-open >/dev/null 2>&1; then
        xdg-open "$WIKI_DIR/HOME.md"
    fi
fi

# 🚀 Project Setup Scripts

This directory contains scripts to automatically initialize and set up projects from the template.

## 📁 Available Scripts

### Setup Scripts

- **`complete-setup.js`** - Complete project setup (Steps 3-8)
- **`complete-setup.sh`** - Shell version for Unix/Linux/macOS
- **`complete-setup.bat`** - Batch version for Windows

### Initialization Scripts

- **`initialize-project.js`** - Template initialization and customization

### Documentation Scripts

- **`generate-wiki.js`** - Automatic wiki generation

## 🎯 Script Functions

### Complete Setup (`complete-setup.*`)

Automates the professional setup workflow (Steps 3-8):

1. **Install dependencies** - `pnpm install`
2. **Edit initial commit** - Standard commit message
3. **Configure .gitignore** - Ignore docs folders
4. **Commit changes** - Setup configuration
5. **Create dev branch** - From main branch
6. **Configure branch protection** - GitHub rules

### Template Initialization (`initialize-project.js`)

Customizes the template for your specific project:

1. Installing dependencies
2. Making initial git commit
3. Pushing to remote repository
4. Fetching repository information from GitHub
5. Updating project files with actual project details
6. Contextualizing AI agents with project description

## 🚀 Usage

### Complete Setup (Recommended)

```bash
# Cross-platform (recommended)
pnpm setup:complete

# Platform-specific
pnpm setup:complete:sh    # Linux/macOS
pnpm setup:complete:bat   # Windows
```

### Template Initialization

```bash
# Template customization
pnpm init:template
```

### What Gets Updated

#### Package.json

```json
{
  "name": "actual-project-name",
  "description": "Description from GitHub repository",
  "repository": "https://github.com/owner/repo",
  "bugs": "https://github.com/owner/repo/issues",
  "homepage": "https://github.com/owner/repo#readme"
}
```

#### Copilot Instructions

Adds project context:

```markdown
## 🎯 Contexto do Projeto

**Nome**: actual-project-name **Descrição**: Description from repository **Repositório**:
https://github.com/owner/repo

### 📋 Sobre Este Projeto

This project is: [repository description]
```

#### Chat Modes

Each helper gets project context:

```markdown
**Contexto do Projeto**: project-name - description
```

#### README.md

- Replaces "template" with actual project name
- Updates description and repository links
- Customizes badges and links

## 🔧 How It Works

### 1. Git Operations

```bash
pnpm install                                              # Install deps
git commit --amend -m "chore(main): initialize..."      # Initial commit
git push --force origin main                            # Push to remote
```

### 2. Repository Detection

```javascript
// Get remote URL
const remoteUrl = execSync('git config --get remote.origin.url')

// Parse GitHub owner/repo
const match = remoteUrl.match(/github\.com[:/]([^/]+)\/([^/.]+)/)

// Fetch description from GitHub API
const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`)
```

### 3. File Updates

```javascript
// Update multiple files with repository information
const updates = {
  template: repoInfo.name,
  Template: capitalizedName,
  'ArthurProjectCorrea/template': repoInfo.fullName,
}
```

### 4. Final Commit

```bash
git add .
git commit -m "feat: customize project for ${projectName}"
git push origin main
```

## 🛡️ Error Handling

### Git Repository Check

```javascript
isGitRepository() {
  try {
    execSync('git rev-parse --git-dir');
    return true;
  } catch {
    return false;
  }
}
```

### Fallback Strategies

- If `--amend` fails, creates new commit
- If `--force-with-lease` fails, uses `--force`
- If GitHub API fails, continues without description
- If files don't exist, logs warning and continues

### Cross-Platform Support

- Node.js script works on all platforms
- Bash script for Unix-like systems
- Batch script for Windows
- Automatic detection of git and pnpm

## 🔍 Debugging

### Verbose Output

```bash
# Run with debug information
DEBUG=1 node scripts/initialize-project.js
```

### Manual Steps

```bash
# If script fails, run steps manually:
pnpm install
git add .
git commit -m "chore: initialize project"
git push origin main

# Then run customization only:
node scripts/initialize-project.js
```

### Common Issues

1. **Not in git repository**

   ```bash
   git init
   git remote add origin https://github.com/user/repo.git
   ```

2. **No remote origin**

   ```bash
   git remote add origin https://github.com/user/repo.git
   ```

3. **Permission denied (Linux/macOS)**

   ```bash
   chmod +x scripts/initialize-project.sh
   ```

4. **GitHub API rate limit**
   - Script continues without description
   - Add description manually later

## 🎯 Best Practices

1. **Use template button** on GitHub for new repositories
2. **Add repository description** on GitHub before initialization
3. **Run initialization immediately** after cloning
4. **Check git status** before running script
5. **Review changes** in the final commit

## 📈 Success Indicators

After successful initialization:

✅ Dependencies installed  
✅ Initial commit created and pushed  
✅ Repository information detected  
✅ All files updated with project details  
✅ AI helpers contextualized  
✅ Final customization commit created

## 🔄 Re-running

Safe to re-run if needed:

- Only updates files that exist
- Won't break existing customizations
- Skips steps that already completed
- Updates only repository-related information

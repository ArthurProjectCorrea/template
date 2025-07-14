@echo off
REM 🚀 Complete Project Setup Script (Windows)
REM 
REM This script performs the complete setup from steps 3-8:
REM 3. Install dependencies
REM 4. Edit initial commit
REM 5. Configure .gitignore for docs folders
REM 6. Commit changes
REM 7. Create dev branch from main
REM 8. Configure branch protection rules

setlocal enabledelayedexpansion

echo 🎯 Complete Project Setup (Steps 3-8)
echo.

REM Check if we're in a git repository
git rev-parse --git-dir >nul 2>&1
if errorlevel 1 (
    echo ❌ Not in a git repository. Please run this from the project root.
    exit /b 1
)

REM Step 3: Install dependencies
echo 🚀 Step 3: Installing dependencies...
where pnpm >nul 2>&1
if not errorlevel 1 (
    pnpm install
    if errorlevel 1 (
        echo ❌ Failed to install dependencies with pnpm
        exit /b 1
    )
    echo ✅ Dependencies installed successfully with pnpm
) else (
    where npm >nul 2>&1
    if not errorlevel 1 (
        npm install
        if errorlevel 1 (
            echo ❌ Failed to install dependencies with npm
            exit /b 1
        )
        echo ✅ Dependencies installed successfully with npm
    ) else (
        echo ❌ Neither pnpm nor npm found. Please install a package manager.
        exit /b 1
    )
)

REM Step 4: Edit initial commit
echo 🚀 Step 4: Editing initial commit...
git add .
git commit --amend -m "chore(setup): initial setup of the fullstack project with monorepo (#0)" >nul 2>&1
if errorlevel 1 (
    echo ⚠️ Could not amend existing commit, creating new commit
    git commit -m "chore(setup): initial setup of the fullstack project with monorepo (#0)"
    if errorlevel 1 (
        echo ❌ Failed to create commit
        exit /b 1
    )
    echo ✅ New initial commit created
) else (
    echo ✅ Initial commit updated with standard message
)

REM Step 5: Configure .gitignore for docs folders
echo 🚀 Step 5: Configuring .gitignore files...

REM Create temporary file for docs ignore content
echo. > temp_docs_ignore.txt
echo # Documentation folders (local only) >> temp_docs_ignore.txt
echo docs/ >> temp_docs_ignore.txt
echo docs/** >> temp_docs_ignore.txt

set "updated=false"

REM Update root .gitignore
if exist ".gitignore" (
    findstr /c:"docs/" .gitignore >nul 2>&1
    if errorlevel 1 (
        type temp_docs_ignore.txt >> .gitignore
        echo ✅ Updated: .gitignore
        set "updated=true"
    ) else (
        echo ℹ Already configured: .gitignore
    )
)

REM Update web app .gitignore
if exist "apps\web\.gitignore" (
    findstr /c:"docs/" apps\web\.gitignore >nul 2>&1
    if errorlevel 1 (
        type temp_docs_ignore.txt >> apps\web\.gitignore
        echo ✅ Updated: apps\web\.gitignore
        set "updated=true"
    ) else (
        echo ℹ Already configured: apps\web\.gitignore
    )
)

REM Update api .gitignore
if exist "apps\api\.gitignore" (
    findstr /c:"docs/" apps\api\.gitignore >nul 2>&1
    if errorlevel 1 (
        type temp_docs_ignore.txt >> apps\api\.gitignore
        echo ✅ Updated: apps\api\.gitignore
        set "updated=true"
    ) else (
        echo ℹ Already configured: apps\api\.gitignore
    )
)

REM Clean up temporary file
del temp_docs_ignore.txt

if "!updated!"=="true" (
    echo ✅ GitIgnore files configured to ignore docs folders
) else (
    echo ℹ GitIgnore files already properly configured
)

REM Step 6: Commit changes
echo 🚀 Step 6: Committing setup changes...
git status --porcelain | findstr /r ".*" >nul 2>&1
if not errorlevel 1 (
    git add .
    git commit -m "chore(setup): configure gitignore and project settings" -m "" -m "- Configure .gitignore to ignore docs folders" -m "- Set up project structure for development"
    if errorlevel 1 (
        echo ❌ Failed to commit changes
        exit /b 1
    )
    echo ✅ Setup changes committed
) else (
    echo ℹ No changes to commit
)

REM Step 7: Create dev branch
echo 🚀 Step 7: Creating dev branch...
git rev-parse --verify dev >nul 2>&1
if not errorlevel 1 (
    echo ℹ Dev branch already exists
) else (
    git checkout -b dev
    if errorlevel 1 (
        echo ❌ Failed to create dev branch
        exit /b 1
    )
    echo ✅ Dev branch created from main
    
    git push -u origin dev
    if errorlevel 1 (
        echo ⚠️ Failed to push dev branch to remote
    ) else (
        echo ✅ Dev branch pushed to remote
    )
    
    git checkout main
    echo ℹ Switched back to main branch
)

REM Step 8: Configure branch protection rules
echo 🚀 Step 8: Configuring branch protection rules...
echo ℹ Setting up branch protection rules...
echo ⚠️ Note: Branch protection requires GitHub CLI (gh) and appropriate permissions

where gh >nul 2>&1
if errorlevel 1 (
    echo ❌ GitHub CLI (gh) is not installed. Please install it to configure branch protection.
    echo ℹ Manual setup required - see documentation for branch protection rules
) else (
    REM Try to get repository info
    for /f "tokens=*" %%i in ('git config --get remote.origin.url 2^>nul') do set "remote_url=%%i"
    
    if defined remote_url (
        echo ℹ Repository URL: !remote_url!
        echo ⚠️ Please configure branch protection rules manually in GitHub repository settings
    ) else (
        echo ⚠️ Could not determine repository information
    )
)

REM Display manual instructions
echo.
echo 🎯 📋 Manual Configuration Instructions
echo.
echo 🔒 Branch Protection Rules to Configure in GitHub:
echo.
echo 📍 Main Branch Protection:
echo   • Require pull request before merging
echo   • Require status checks (CI/tests)
echo   • Require linear history
echo   • Require signed commits (optional)
echo   • Disable direct commits
echo.
echo 📍 Dev Branch Protection:
echo   • Require pull request before merging
echo   • Require status checks (CI/tests)
echo   • Disable direct commits
echo.
echo 🔧 GitHub Repository Settings:
echo   • Go to: https://github.com/your-username/your-repo/settings/branches
echo   • Add protection rules for main and dev branches
echo   • Configure according to the rules above

REM Success message
echo.
echo 🎯 🎉 Project Setup Complete!
echo ✅ Your project is now ready for development
echo.
echo 🚀 Next Steps:
echo   • Start development: pnpm dev
echo   • Create feature branch: git checkout -b feature/your-feature
echo   • Use AI helpers: @frontend-helper, @backend-helper, etc.
echo   • Follow development workflow with PRs to dev branch
echo.

pause

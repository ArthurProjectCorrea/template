@echo off
REM 🚀 Template Initialization Script (Windows Batch)
REM Simple version for Windows systems

echo 🎯 Initializing Template Project...

REM Step 1: Install dependencies
echo ℹ️ Installing dependencies...
call pnpm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    exit /b 1
)
echo ✅ Dependencies installed

REM Step 2: Initial commit
echo ℹ️ Making initial commit...
git add .
git commit --amend -m "chore(main): initialize project structure" >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️ Could not amend, creating new commit
    git commit -m "chore(main): initialize project structure"
    if %errorlevel% neq 0 (
        echo ❌ Failed to create commit
        exit /b 1
    )
) else (
    echo ✅ Amended existing commit
)

REM Step 3: Push to remote
echo ℹ️ Pushing to remote...
git push --force-with-lease origin main >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️ Using --force push
    git push --force origin main
    if %errorlevel% neq 0 (
        echo ❌ Failed to push to remote
        exit /b 1
    )
) else (
    echo ✅ Pushed with --force-with-lease
)

REM Step 4: Run Node.js initialization script
echo ℹ️ Running project customization...
node scripts/initialize-project.js
if %errorlevel% neq 0 (
    echo ❌ Project customization failed
    exit /b 1
)

echo.
echo 🎉 Template initialization complete!
echo Next steps:
echo   • Start development: pnpm dev
echo   • Run tests: pnpm test
echo   • Use AI helpers with @frontend-helper, @backend-helper, etc.

pause

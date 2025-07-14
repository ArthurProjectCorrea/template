#!/usr/bin/env node

/**
 * 🚀 Complete Project Setup Script
 * 
 * This script performs the complete setup from steps 3-8:
 * 3. Install dependencies
 * 4. Edit initial commit
 * 5. Configure .gitignore for docs folders
 * 6. Commit changes
 * 7. Create dev branch from main
 * 8. Configure branch protection rules
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

const log = {
    info: (msg) => console.log(`${colors.blue}ℹ ${msg}${colors.reset}`),
    success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
    warn: (msg) => console.log(`${colors.yellow}⚠️ ${msg}${colors.reset}`),
    error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
    step: (msg) => console.log(`${colors.cyan}🚀 ${msg}${colors.reset}`),
    title: (msg) => console.log(`${colors.magenta}${colors.bright}🎯 ${msg}${colors.reset}`)
};

class ProjectSetup {
    constructor() {
        this.projectRoot = process.cwd();
        this.repoInfo = null;
    }

    /**
     * Execute shell command
     */
    exec(command, options = {}) {
        try {
            const result = execSync(command, { 
                cwd: this.projectRoot, 
                encoding: 'utf8',
                stdio: 'pipe',
                ...options 
            });
            return result.trim();
        } catch (error) {
            throw new Error(`Command failed: ${command}\n${error.message}`);
        }
    }

    /**
     * Check if we're in a git repository
     */
    isGitRepository() {
        try {
            this.exec('git rev-parse --git-dir');
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Get repository information
     */
    getRepositoryInfo() {
        try {
            const remoteUrl = this.exec('git config --get remote.origin.url');
            let owner, repoName;
            
            if (remoteUrl.includes('github.com')) {
                const match = remoteUrl.match(/github\.com[:/]([^/]+)\/([^/.]+)/);
                if (match) {
                    owner = match[1];
                    repoName = match[2].replace('.git', '');
                }
            }

            if (!owner || !repoName) {
                throw new Error('Could not parse repository information');
            }

            return {
                owner,
                name: repoName,
                fullName: `${owner}/${repoName}`,
                url: `https://github.com/${owner}/${repoName}`
            };
        } catch (error) {
            throw new Error(`Failed to get repository info: ${error.message}`);
        }
    }

    /**
     * Step 3: Install dependencies
     */
    installDependencies() {
        log.step('Step 3: Installing dependencies...');
        
        try {
            this.exec('pnpm install');
            log.success('Dependencies installed successfully');
        } catch (error) {
            throw new Error(`Failed to install dependencies: ${error.message}`);
        }
    }

    /**
     * Step 4: Edit initial commit
     */
    editInitialCommit() {
        log.step('Step 4: Editing initial commit...');
        
        try {
            // Add all files to staging
            this.exec('git add .');
            
            // Amend the initial commit with the standard message
            const commitMessage = 'chore(setup): initial setup of the fullstack project with monorepo (#0)';
            this.exec(`git commit --amend -m "${commitMessage}"`);
            
            log.success('Initial commit updated with standard message');
        } catch (error) {
            log.warn('Could not amend existing commit, creating new commit');
            try {
                const commitMessage = 'chore(setup): initial setup of the fullstack project with monorepo (#0)';
                this.exec(`git commit -m "${commitMessage}"`);
                log.success('New initial commit created');
            } catch (commitError) {
                throw new Error(`Failed to create commit: ${commitError.message}`);
            }
        }
    }

    /**
     * Step 5: Configure .gitignore for docs folders
     */
    configureGitIgnore() {
        log.step('Step 5: Configuring .gitignore files...');

        const docsIgnoreEntries = [
            '',
            '# Documentation folders (local only)',
            'docs/',
            'docs/**'
        ];

        const gitIgnoreFiles = [
            join(this.projectRoot, '.gitignore'),
            join(this.projectRoot, 'apps/web/.gitignore'),
            join(this.projectRoot, 'apps/api/.gitignore')
        ];

        let updated = false;

        gitIgnoreFiles.forEach(filePath => {
            if (existsSync(filePath)) {
                try {
                    let content = readFileSync(filePath, 'utf8');
                    
                    if (!content.includes('docs/')) {
                        if (!content.endsWith('\n')) {
                            content += '\n';
                        }
                        content += docsIgnoreEntries.join('\n') + '\n';
                        
                        writeFileSync(filePath, content, 'utf8');
                        log.success(`Updated: ${filePath}`);
                        updated = true;
                    } else {
                        log.info(`Already configured: ${filePath}`);
                    }
                } catch (error) {
                    log.error(`Failed to update ${filePath}: ${error.message}`);
                }
            }
        });

        if (updated) {
            log.success('GitIgnore files configured to ignore docs folders');
        } else {
            log.info('GitIgnore files already properly configured');
        }
    }

    /**
     * Step 6: Commit changes
     */
    commitChanges() {
        log.step('Step 6: Committing setup changes...');

        try {
            // Check if there are changes to commit
            const status = this.exec('git status --porcelain');
            
            if (status.trim()) {
                this.exec('git add .');
                this.exec('git commit -m "chore(setup): configure gitignore and project settings\n\n- Configure .gitignore to ignore docs folders\n- Set up project structure for development"');
                log.success('Setup changes committed');
            } else {
                log.info('No changes to commit');
            }
        } catch (error) {
            throw new Error(`Failed to commit changes: ${error.message}`);
        }
    }

    /**
     * Step 7: Create dev branch
     */
    createDevBranch() {
        log.step('Step 7: Creating dev branch...');

        try {
            // Check if dev branch already exists
            try {
                this.exec('git rev-parse --verify dev');
                log.info('Dev branch already exists');
                return;
            } catch {
                // Branch doesn't exist, create it
            }

            // Create and switch to dev branch
            this.exec('git checkout -b dev');
            log.success('Dev branch created from main');

            // Push dev branch to remote
            this.exec('git push -u origin dev');
            log.success('Dev branch pushed to remote');

            // Switch back to main
            this.exec('git checkout main');
            log.info('Switched back to main branch');

        } catch (error) {
            throw new Error(`Failed to create dev branch: ${error.message}`);
        }
    }

    /**
     * Step 8: Configure branch protection rules
     */
    configureBranchProtection() {
        log.step('Step 8: Configuring branch protection rules...');

        try {
            // Get repository info
            this.repoInfo = this.getRepositoryInfo();

            log.info('Setting up branch protection rules...');
            log.warn('Note: Branch protection requires GitHub CLI (gh) and appropriate permissions');

            // Check if GitHub CLI is available
            try {
                this.exec('gh --version');
            } catch {
                log.error('GitHub CLI (gh) is not installed. Please install it to configure branch protection.');
                log.info('Manual setup required - see documentation for branch protection rules');
                return;
            }

            // Configure main branch protection
            try {
                const mainProtectionCmd = `gh api repos/${this.repoInfo.fullName}/branches/main/protection --method PUT --field required_status_checks='{"strict":true,"contexts":["build-and-test"]}' --field enforce_admins=false --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true,"require_code_owner_reviews":false}' --field restrictions=null --field required_linear_history=true --field allow_force_pushes=false --field allow_deletions=false`;
                
                this.exec(mainProtectionCmd);
                log.success('Main branch protection configured');
            } catch (error) {
                log.warn('Could not configure main branch protection automatically');
                log.info('Please configure manually in GitHub repository settings');
            }

            // Configure dev branch protection
            try {
                const devProtectionCmd = `gh api repos/${this.repoInfo.fullName}/branches/dev/protection --method PUT --field required_status_checks='{"strict":true,"contexts":["build-and-test"]}' --field enforce_admins=false --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' --field restrictions=null --field required_linear_history=false --field allow_force_pushes=false --field allow_deletions=false`;
                
                this.exec(devProtectionCmd);
                log.success('Dev branch protection configured');
            } catch (error) {
                log.warn('Could not configure dev branch protection automatically');
                log.info('Please configure manually in GitHub repository settings');
            }

        } catch (error) {
            log.warn(`Branch protection setup failed: ${error.message}`);
            log.info('Please configure branch protection manually in GitHub repository settings');
        }
    }

    /**
     * Display manual configuration instructions
     */
    displayManualInstructions() {
        log.title('📋 Manual Configuration Instructions');
        
        console.log('\n🔒 Branch Protection Rules to Configure in GitHub:');
        console.log('\n📍 Main Branch Protection:');
        console.log('  • Require pull request before merging');
        console.log('  • Require status checks (CI/tests)');
        console.log('  • Require linear history');
        console.log('  • Require signed commits (optional)');
        console.log('  • Disable direct commits');
        
        console.log('\n📍 Dev Branch Protection:');
        console.log('  • Require pull request before merging');
        console.log('  • Require status checks (CI/tests)');
        console.log('  • Disable direct commits');
        
        console.log('\n🔧 GitHub Repository Settings:');
        console.log(`  • Go to: ${this.repoInfo?.url || 'https://github.com/your-username/your-repo'}/settings/branches`);
        console.log('  • Add protection rules for main and dev branches');
        console.log('  • Configure according to the rules above');
    }

    /**
     * Main setup process
     */
    async setup() {
        try {
            log.title('🎯 Complete Project Setup (Steps 3-8)');

            // Verify we're in a git repository
            if (!this.isGitRepository()) {
                log.error('Not in a git repository. Please run this from the project root.');
                process.exit(1);
            }

            // Execute all steps
            this.installDependencies();           // Step 3
            this.editInitialCommit();            // Step 4
            this.configureGitIgnore();           // Step 5
            this.commitChanges();                // Step 6
            this.createDevBranch();              // Step 7
            this.configureBranchProtection();    // Step 8

            // Display manual instructions
            this.displayManualInstructions();

            // Success message
            log.title('🎉 Project Setup Complete!');
            log.success('Your project is now ready for development');
            
            console.log('\n🚀 Next Steps:');
            console.log('  • Start development: pnpm dev');
            console.log('  • Create feature branch: git checkout -b feature/your-feature');
            console.log('  • Use AI helpers: @frontend-helper, @backend-helper, etc.');
            console.log('  • Follow development workflow with PRs to dev branch');

        } catch (error) {
            log.error(`Setup failed: ${error.message}`);
            console.log('\n🔧 Troubleshooting:');
            console.log('  • Ensure you have git, pnpm, and gh CLI installed');
            console.log('  • Verify you have push access to the repository');
            console.log('  • Check network connectivity');
            process.exit(1);
        }
    }
}

// Run the setup
const setup = new ProjectSetup();
setup.setup().catch(error => {
    console.error('Setup failed:', error);
    process.exit(1);
});

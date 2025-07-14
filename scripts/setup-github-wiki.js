#!/usr/bin/env node

/**
 * 🚀 GitHub Wiki Setup and Sync Script
 * 
 * This script configures and synchronizes the local wiki with GitHub Wiki.
 * It handles the setup of GitHub Wiki repository and content synchronization.
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, basename, extname } from 'path';

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

class GitHubWikiSetup {
    constructor() {
        this.projectRoot = process.cwd();
        this.wikiDir = join(this.projectRoot, '.github', 'wiki');
        this.tempWikiDir = join(this.projectRoot, '.temp-wiki');
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
                url: `https://github.com/${owner}/${repoName}`,
                wikiUrl: `https://github.com/${owner}/${repoName}.wiki.git`
            };
        } catch (error) {
            throw new Error(`Failed to get repository info: ${error.message}`);
        }
    }

    /**
     * Check if GitHub CLI is available
     */
    checkGitHubCLI() {
        try {
            this.exec('gh --version');
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Enable GitHub Wiki for the repository
     */
    enableGitHubWiki() {
        log.step('Enabling GitHub Wiki for repository...');
        
        if (!this.checkGitHubCLI()) {
            log.warn('GitHub CLI not found. You need to enable Wiki manually:');
            log.info(`1. Go to ${this.repoInfo.url}/settings`);
            log.info('2. Scroll to "Features" section');
            log.info('3. Check "Wikis" checkbox');
            log.info('4. Click "Save changes"');
            return false;
        }

        try {
            // Enable wiki using GitHub API
            this.exec(`gh api repos/${this.repoInfo.fullName} --method PATCH --field has_wiki=true`);
            log.success('GitHub Wiki enabled successfully');
            return true;
        } catch (error) {
            log.warn('Could not enable wiki automatically. Please enable manually in repository settings.');
            return false;
        }
    }

    /**
     * Clone the GitHub Wiki repository
     */
    cloneWikiRepo() {
        log.step('Cloning GitHub Wiki repository...');
        
        try {
            // Remove existing temp directory
            if (existsSync(this.tempWikiDir)) {
                this.exec(`rm -rf "${this.tempWikiDir}"`);
            }

            // Clone the wiki repository
            this.exec(`git clone ${this.repoInfo.wikiUrl} "${this.tempWikiDir}"`);
            log.success('Wiki repository cloned successfully');
            return true;
        } catch (error) {
            log.warn('Wiki repository not found or empty. Will create initial wiki.');
            
            // Create empty wiki directory
            this.exec(`mkdir -p "${this.tempWikiDir}"`);
            this.exec('git init', { cwd: this.tempWikiDir });
            this.exec('git remote add origin ' + this.repoInfo.wikiUrl, { cwd: this.tempWikiDir });
            
            return false;
        }
    }

    /**
     * Convert file name to GitHub Wiki format
     */
    convertToWikiFileName(fileName) {
        // Remove .md extension and convert to wiki format
        const baseName = basename(fileName, '.md');
        
        // Special cases for GitHub Wiki naming
        if (baseName === 'HOME') {
            return 'Home.md';
        }
        
        // Convert underscores and spaces to dashes, capitalize words
        return baseName
            .replace(/_/g, '-')
            .replace(/\s+/g, '-')
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('-') + '.md';
    }

    /**
     * Copy wiki files to temp directory
     */
    copyWikiFiles() {
        log.step('Copying wiki files...');
        
        if (!existsSync(this.wikiDir)) {
            log.error('Wiki directory not found. Please ensure .github/wiki exists.');
            return false;
        }

        const files = readdirSync(this.wikiDir).filter(file => file.endsWith('.md'));
        let copiedCount = 0;

        for (const file of files) {
            try {
                const sourcePath = join(this.wikiDir, file);
                const wikiFileName = this.convertToWikiFileName(file);
                const destPath = join(this.tempWikiDir, wikiFileName);
                
                // Read and copy content
                const content = readFileSync(sourcePath, 'utf8');
                writeFileSync(destPath, content, 'utf8');
                
                log.info(`Copied: ${file} → ${wikiFileName}`);
                copiedCount++;
            } catch (error) {
                log.error(`Failed to copy ${file}: ${error.message}`);
            }
        }

        log.success(`Copied ${copiedCount} wiki files successfully`);
        return copiedCount > 0;
    }

    /**
     * Create wiki sidebar
     */
    createWikiSidebar() {
        log.step('Creating wiki sidebar...');
        
        const sidebarContent = `## 📚 Template Documentation

### 🚀 Getting Started
* [Home](Home)
* [Quick Start](Quick-Start)
* [Installation Workflow](Installation-Workflow)
* [Template Usage](Template-Usage)

### 🏗️ Architecture & Setup
* [Architecture Overview](Architecture)
* [Workspace Config](Workspace-Config)
* [CI/CD Config](Ci-Cd-Config)
* [Tailwind Setup](Tailwind-Setup)

### 🤖 AI & Development
* [Copilot Helpers](Copilot-Helpers)
* [Development Workflow](Development-Workflow)
* [Testing Strategy](Testing-Strategy)

### 🔧 Advanced
* [Initialization Scripts](Initialization-Scripts)
* [Template Validation](Template-Validation)
* [Migration Notes](Migration-Notes)
* [Google Fonts Migration](Google-Fonts-Migration)

---
📋 **Need help?** Check our [troubleshooting guide](Template-Validation) or [open an issue](${this.repoInfo.url}/issues).`;

        try {
            const sidebarPath = join(this.tempWikiDir, '_Sidebar.md');
            writeFileSync(sidebarPath, sidebarContent, 'utf8');
            log.success('Wiki sidebar created');
            return true;
        } catch (error) {
            log.error(`Failed to create sidebar: ${error.message}`);
            return false;
        }
    }

    /**
     * Create wiki footer
     */
    createWikiFooter() {
        log.step('Creating wiki footer...');
        
        const footerContent = `---
📚 **${this.repoInfo.name} Wiki** | 🚀 [Repository](${this.repoInfo.url}) | 📝 [Issues](${this.repoInfo.url}/issues) | 🔄 [Pull Requests](${this.repoInfo.url}/pulls)

*Last updated: ${new Date().toISOString().split('T')[0]}*`;

        try {
            const footerPath = join(this.tempWikiDir, '_Footer.md');
            writeFileSync(footerPath, footerContent, 'utf8');
            log.success('Wiki footer created');
            return true;
        } catch (error) {
            log.error(`Failed to create footer: ${error.message}`);
            return false;
        }
    }

    /**
     * Commit and push wiki changes
     */
    pushWikiChanges() {
        log.step('Committing and pushing wiki changes...');
        
        try {
            // Configure git user if needed
            try {
                this.exec('git config user.email', { cwd: this.tempWikiDir });
            } catch {
                this.exec('git config user.email "action@github.com"', { cwd: this.tempWikiDir });
                this.exec('git config user.name "GitHub Action"', { cwd: this.tempWikiDir });
            }

            // Add all files
            this.exec('git add .', { cwd: this.tempWikiDir });
            
            // Check if there are changes to commit
            try {
                const status = this.exec('git status --porcelain', { cwd: this.tempWikiDir });
                if (!status.trim()) {
                    log.info('No changes to commit');
                    return true;
                }
            } catch (error) {
                // Continue if status check fails
            }

            // Commit changes
            const commitMessage = `docs: sync wiki content from .github/wiki

- Update all documentation pages
- Add sidebar and footer navigation
- Sync with repository structure

Auto-generated from: ${this.repoInfo.fullName}`;

            this.exec(`git commit -m "${commitMessage}"`, { cwd: this.tempWikiDir });
            
            // Push to wiki repository
            this.exec('git push origin master', { cwd: this.tempWikiDir });
            
            log.success('Wiki changes pushed successfully');
            return true;
        } catch (error) {
            // Try pushing to main branch if master fails
            try {
                this.exec('git push origin main', { cwd: this.tempWikiDir });
                log.success('Wiki changes pushed successfully (main branch)');
                return true;
            } catch (secondError) {
                log.error(`Failed to push wiki changes: ${error.message}`);
                return false;
            }
        }
    }

    /**
     * Cleanup temporary files
     */
    cleanup() {
        log.step('Cleaning up temporary files...');
        
        try {
            if (existsSync(this.tempWikiDir)) {
                this.exec(`rm -rf "${this.tempWikiDir}"`);
            }
            log.success('Cleanup completed');
        } catch (error) {
            log.warn(`Cleanup failed: ${error.message}`);
        }
    }

    /**
     * Main setup process
     */
    async setup() {
        try {
            log.title('🎯 GitHub Wiki Setup and Sync');
            
            // Get repository information
            this.repoInfo = this.getRepositoryInfo();
            log.success(`Repository: ${this.repoInfo.fullName}`);
            log.info(`Wiki URL: ${this.repoInfo.wikiUrl}`);

            // Enable GitHub Wiki
            this.enableGitHubWiki();
            
            // Clone wiki repository
            this.cloneWikiRepo();
            
            // Copy wiki files
            if (!this.copyWikiFiles()) {
                log.error('No wiki files to sync');
                return;
            }
            
            // Create sidebar and footer
            this.createWikiSidebar();
            this.createWikiFooter();
            
            // Push changes
            this.pushWikiChanges();
            
            // Success message
            log.title('🎉 GitHub Wiki Setup Complete!');
            log.success('Your wiki is now available at:');
            log.info(`📚 Wiki: ${this.repoInfo.url}/wiki`);
            log.info(`🔗 Direct: ${this.repoInfo.wikiUrl}`);
            
            console.log('\n🚀 Next Steps:');
            console.log('  • Visit your GitHub repository wiki tab');
            console.log('  • Wiki pages are now synced with .github/wiki/');
            console.log('  • Use "pnpm wiki:sync" to update wiki in the future');
            console.log('  • Enable wiki editing permissions in repository settings');

        } catch (error) {
            log.error(`Wiki setup failed: ${error.message}`);
            process.exit(1);
        } finally {
            this.cleanup();
        }
    }
}

// Run the setup
const wikiSetup = new GitHubWikiSetup();
wikiSetup.setup().catch(error => {
    console.error('Wiki setup failed:', error);
    process.exit(1);
});

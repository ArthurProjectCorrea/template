#!/usr/bin/env node

/**
 * 🚀 Template Initialization Script
 * 
 * This script initializes a new project from the template by:
 * 1. Installing dependencies
 * 2. Making initial commit
 * 3. Fetching repository information
 * 4. Updating project files with actual project details
 * 5. Contextualizing AI agents with project description
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

class TemplateInitializer {
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
            this.exec('git rev-parse --git-dir', { stdio: 'ignore' });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Get repository information from git remote
     */
    getRepositoryInfo() {
        try {
            // Get remote URL
            const remoteUrl = this.exec('git config --get remote.origin.url');
            
            // Extract owner and repo name from URL
            let owner, repoName;
            
            if (remoteUrl.includes('github.com')) {
                const match = remoteUrl.match(/github\.com[:/]([^/]+)\/([^/.]+)/);
                if (match) {
                    owner = match[1];
                    repoName = match[2].replace('.git', '');
                }
            }

            if (!owner || !repoName) {
                throw new Error('Could not parse repository information from remote URL');
            }

            // Try to get repository description from GitHub API
            let description = '';
            try {
                const apiResponse = this.exec(`curl -s https://api.github.com/repos/${owner}/${repoName}`);
                const repoData = JSON.parse(apiResponse);
                description = repoData.description || '';
            } catch (error) {
                log.warn('Could not fetch repository description from GitHub API');
                log.info('You can manually set the description later');
            }

            return {
                owner,
                name: repoName,
                description,
                fullName: `${owner}/${repoName}`,
                url: `https://github.com/${owner}/${repoName}`
            };
        } catch (error) {
            throw new Error(`Failed to get repository info: ${error.message}`);
        }
    }

    /**
     * Update file content with project information
     */
    updateFile(filePath, updates) {
        if (!existsSync(filePath)) {
            log.warn(`File not found: ${filePath}`);
            return;
        }

        try {
            let content = readFileSync(filePath, 'utf8');
            
            // Apply updates
            for (const [search, replace] of Object.entries(updates)) {
                content = content.replace(new RegExp(search, 'g'), replace);
            }

            writeFileSync(filePath, content, 'utf8');
            log.success(`Updated: ${filePath}`);
        } catch (error) {
            log.error(`Failed to update ${filePath}: ${error.message}`);
        }
    }

    /**
     * Update package.json with project information
     */
    updatePackageJson() {
        const packagePath = join(this.projectRoot, 'package.json');
        
        try {
            const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
            
            // Update package.json fields
            packageJson.name = this.repoInfo.name;
            packageJson.description = this.repoInfo.description || `${this.repoInfo.name} - Generated from template`;
            packageJson.repository = {
                type: 'git',
                url: `git+${this.repoInfo.url}.git`
            };
            packageJson.bugs = {
                url: `${this.repoInfo.url}/issues`
            };
            packageJson.homepage = `${this.repoInfo.url}#readme`;

            writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n', 'utf8');
            log.success('Updated package.json');
        } catch (error) {
            log.error(`Failed to update package.json: ${error.message}`);
        }
    }

    /**
     * Update README.md with project information
     */
    updateReadme() {
        const updates = {
            'template': this.repoInfo.name,
            'Template': this.repoInfo.name.charAt(0).toUpperCase() + this.repoInfo.name.slice(1),
            'Template repository for fullstack development': this.repoInfo.description || `${this.repoInfo.name} - Fullstack application`,
            'ArthurProjectCorrea/template': this.repoInfo.fullName
        };

        this.updateFile(join(this.projectRoot, 'README.md'), updates);
    }

    /**
     * Update Copilot instructions with project context
     */
    updateCopilotInstructions() {
        const instructionsPath = join(this.projectRoot, '.github/instructions/copilot.instructions.md');
        
        if (!existsSync(instructionsPath)) {
            log.warn('Copilot instructions file not found');
            return;
        }

        try {
            let content = readFileSync(instructionsPath, 'utf8');
            
            // Add project context section
            const projectContext = `
## 🎯 Contexto do Projeto

**Nome**: ${this.repoInfo.name}
**Descrição**: ${this.repoInfo.description || 'Projeto baseado no template fullstack'}
**Repositório**: ${this.repoInfo.url}

### 📋 Sobre Este Projeto

${this.repoInfo.description ? `Este projeto é: ${this.repoInfo.description}` : `Este projeto (${this.repoInfo.name}) foi inicializado a partir do template fullstack.`}

Todos os helpers de IA devem considerar este contexto ao implementar funcionalidades e tomar decisões arquiteturais.

`;

            // Insert project context after the title
            content = content.replace(
                /^# Copilot - Fullstack Developer Instructions/m,
                `# Copilot - Fullstack Developer Instructions\n${projectContext}`
            );

            writeFileSync(instructionsPath, content, 'utf8');
            log.success('Updated Copilot instructions with project context');
        } catch (error) {
            log.error(`Failed to update Copilot instructions: ${error.message}`);
        }
    }

    /**
     * Update chat modes with project context
     */
    updateChatModes() {
        const chatModesDir = join(this.projectRoot, '.github/chatmodes');
        
        if (!existsSync(chatModesDir)) {
            log.warn('Chat modes directory not found');
            return;
        }

        const projectContext = `
**Contexto do Projeto**: ${this.repoInfo.name} - ${this.repoInfo.description || 'Projeto fullstack'}
`;

        // Update each chat mode file
        const chatModes = ['frontend-helper', 'backend-helper', 'documentation-helper', 'dev-helper'];
        
        chatModes.forEach(mode => {
            const filePath = join(chatModesDir, `${mode}.chatmode.md`);
            
            if (existsSync(filePath)) {
                try {
                    let content = readFileSync(filePath, 'utf8');
                    
                    // Add project context after the title
                    content = content.replace(
                        /^# (.+)$/m,
                        `# $1\n${projectContext}`
                    );

                    writeFileSync(filePath, content, 'utf8');
                    log.success(`Updated ${mode} chat mode`);
                } catch (error) {
                    log.error(`Failed to update ${mode} chat mode: ${error.message}`);
                }
            }
        });
    }

    /**
     * Update CI/CD configuration with project name
     */
    updateCIConfig() {
        const ciConfigPath = join(this.projectRoot, 'CI_CD_CONFIG.md');
        
        if (existsSync(ciConfigPath)) {
            const updates = {
                'template': this.repoInfo.name,
                'Template': this.repoInfo.name.charAt(0).toUpperCase() + this.repoInfo.name.slice(1)
            };
            
            this.updateFile(ciConfigPath, updates);
        }
    }

    /**
     * Update .gitignore files to ignore documentation folders
     */
    updateGitIgnoreFiles() {
        log.step('📄 Updating .gitignore files to ignore docs folders...');

        const docsIgnoreEntries = [
            '',
            '# Documentation folders (local only)',
            'docs/',
            'docs/**'
        ];

        // Update root .gitignore
        this.addToGitIgnore(join(this.projectRoot, '.gitignore'), docsIgnoreEntries);

        // Update web app .gitignore
        const webGitIgnorePath = join(this.projectRoot, 'apps/web/.gitignore');
        this.addToGitIgnore(webGitIgnorePath, docsIgnoreEntries);

        // Update API app .gitignore
        const apiGitIgnorePath = join(this.projectRoot, 'apps/api/.gitignore');
        this.addToGitIgnore(apiGitIgnorePath, docsIgnoreEntries);

        log.success('Updated .gitignore files to ignore docs folders');
    }

    /**
     * Add entries to a .gitignore file if they don't already exist
     */
    addToGitIgnore(gitIgnorePath, entries) {
        if (!existsSync(gitIgnorePath)) {
            log.warn(`File not found: ${gitIgnorePath}`);
            return;
        }

        try {
            let content = readFileSync(gitIgnorePath, 'utf8');
            let modified = false;

            // Check if docs/ is already ignored
            if (!content.includes('docs/')) {
                // Ensure content ends with newline
                if (!content.endsWith('\n')) {
                    content += '\n';
                }

                // Add entries
                content += entries.join('\n') + '\n';
                modified = true;
            }

            if (modified) {
                writeFileSync(gitIgnorePath, content, 'utf8');
                log.success(`Updated: ${gitIgnorePath}`);
            } else {
                log.info(`Already configured: ${gitIgnorePath}`);
            }
        } catch (error) {
            log.error(`Failed to update ${gitIgnorePath}: ${error.message}`);
        }
    }

    /**
     * Main initialization process
     */
    async initialize() {
        try {
            log.title('🎯 Initializing Template Project');
            log.info(`Working directory: ${this.projectRoot}`);

            // Step 1: Install dependencies
            log.step('📦 Installing dependencies...');
            this.exec('pnpm install');
            log.success('Dependencies installed');

            // Step 2: Check if we're in a git repository
            if (!this.isGitRepository()) {
                log.error('Not in a git repository. Please initialize git first.');
                process.exit(1);
            }

            // Step 3: Make initial commit
            log.step('📝 Making initial commit...');
            try {
                this.exec('git add .');
                this.exec('git commit --amend -m "chore(main): initialize project structure"');
                log.success('Initial commit created');
            } catch (error) {
                log.warn('Could not amend commit, creating new commit instead');
                this.exec('git add .');
                this.exec('git commit -m "chore(main): initialize project structure"');
            }

            // Step 4: Push to remote
            log.step('🚀 Pushing to remote...');
            try {
                this.exec('git push --force-with-lease origin main');
                log.success('Pushed to remote');
            } catch (error) {
                log.warn('Could not push with --force-with-lease, trying --force');
                this.exec('git push --force origin main');
                log.success('Force pushed to remote');
            }

            // Step 5: Get repository information
            log.step('📊 Fetching repository information...');
            this.repoInfo = this.getRepositoryInfo();
            log.success(`Repository: ${this.repoInfo.fullName}`);
            if (this.repoInfo.description) {
                log.info(`Description: ${this.repoInfo.description}`);
            }

            // Step 6: Update project files
            log.step('📝 Updating project files...');
            this.updatePackageJson();
            this.updateReadme();
            this.updateCopilotInstructions();
            this.updateChatModes();
            this.updateCIConfig();
            this.updateGitIgnoreFiles();
            this.updateGitIgnoreFiles();

            // Step 7: Final commit with updates
            log.step('💾 Committing project customization...');
            this.exec('git add .');
            this.exec(`git commit -m "feat: customize project for ${this.repoInfo.name}

- Update package.json with repository information
- Customize README.md with project details
- Add project context to Copilot instructions and chat modes
- Configure CI/CD for ${this.repoInfo.name}"`);

            this.exec('git push origin main');
            log.success('Project customization committed and pushed');

            // Success message
            log.title('🎉 Template Initialization Complete!');
            log.success(`Project ${this.repoInfo.name} is ready for development`);
            log.info('Next steps:');
            console.log('  • Start development: pnpm dev');
            console.log('  • Run tests: pnpm test');
            console.log('  • Use AI helpers with @frontend-helper, @backend-helper, etc.');
            
            if (!this.repoInfo.description) {
                log.warn('Consider adding a description to your GitHub repository for better AI context');
            }

        } catch (error) {
            log.error(`Initialization failed: ${error.message}`);
            process.exit(1);
        }
    }
}

// Run the initializer
const initializer = new TemplateInitializer();
initializer.initialize().catch(error => {
    console.error('Initialization failed:', error);
    process.exit(1);
});

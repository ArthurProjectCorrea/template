#!/usr/bin/env node

/**
 * 🔄 GitHub Wiki Sync Script
 * 
 * Synchronizes local wiki files (.github/wiki/) with GitHub Wiki
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join, basename } from 'path';

const log = {
    info: (msg) => console.log(`\x1b[34mℹ ${msg}\x1b[0m`),
    success: (msg) => console.log(`\x1b[32m✅ ${msg}\x1b[0m`),
    warn: (msg) => console.log(`\x1b[33m⚠️ ${msg}\x1b[0m`),
    error: (msg) => console.log(`\x1b[31m❌ ${msg}\x1b[0m`),
    step: (msg) => console.log(`\x1b[36m🚀 ${msg}\x1b[0m`)
};

class WikiSync {
    constructor() {
        this.projectRoot = process.cwd();
        this.wikiDir = join(this.projectRoot, '.github', 'wiki');
        this.tempWikiDir = join(this.projectRoot, '.temp-wiki-sync');
        this.repoInfo = this.getRepoInfo();
    }

    exec(command, options = {}) {
        try {
            return execSync(command, { 
                cwd: options.cwd || this.projectRoot, 
                encoding: 'utf8',
                stdio: 'pipe',
                shell: true
            }).trim();
        } catch (error) {
            throw new Error(`Command failed: ${command}\n${error.message}`);
        }
    }

    removeDir(dirPath) {
        // Cross-platform directory removal
        const isWindows = process.platform === 'win32';
        const command = isWindows 
            ? `if exist "${dirPath}" rmdir /s /q "${dirPath}"`
            : `rm -rf "${dirPath}"`;
        
        try {
            this.exec(command);
        } catch (error) {
            // Ignore errors if directory doesn't exist
        }
    }

    getRepoInfo() {
        const remoteUrl = this.exec('git config --get remote.origin.url');
        const match = remoteUrl.match(/github\.com[:/]([^/]+)\/([^/.]+)/);
        if (!match) throw new Error('Not a GitHub repository');
        
        const owner = match[1];
        const name = match[2].replace('.git', '');
        
        // Use GitHub token if available (for CI environments)
        const token = process.env.GITHUB_TOKEN;
        const wikiUrl = token 
            ? `https://x-access-token:${token}@github.com/${owner}/${name}.wiki.git`
            : `https://github.com/${owner}/${name}.wiki.git`;
            
        return {
            owner,
            name,
            fullName: `${owner}/${name}`,
            wikiUrl
        };
    }

    convertFileName(fileName) {
        const baseName = basename(fileName, '.md');
        if (baseName === 'HOME') return 'Home.md';
        
        return baseName
            .replace(/_/g, '-')
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('-') + '.md';
    }

    async sync() {
        try {
            log.step('Starting wiki synchronization...');

            // Clone wiki repo
            this.removeDir(this.tempWikiDir);

            try {
                this.exec(`git clone ${this.repoInfo.wikiUrl} "${this.tempWikiDir}"`);
            } catch {
                log.warn('Wiki not found, creating new one...');
                this.exec(`mkdir "${this.tempWikiDir}"`);
                this.exec('git init', { cwd: this.tempWikiDir });
                this.exec(`git remote add origin ${this.repoInfo.wikiUrl}`, { cwd: this.tempWikiDir });
            }

            // Copy files
            const files = readdirSync(this.wikiDir).filter(f => f.endsWith('.md'));
            let synced = 0;

            for (const file of files) {
                const content = readFileSync(join(this.wikiDir, file), 'utf8');
                const wikiName = this.convertFileName(file);
                writeFileSync(join(this.tempWikiDir, wikiName), content);
                synced++;
            }

            // Configure git and commit
            try {
                this.exec('git config user.email', { cwd: this.tempWikiDir });
            } catch {
                this.exec('git config user.email "action@github.com"', { cwd: this.tempWikiDir });
                this.exec('git config user.name "Wiki Sync"', { cwd: this.tempWikiDir });
            }

            this.exec('git add .', { cwd: this.tempWikiDir });
            
            const status = this.exec('git status --porcelain', { cwd: this.tempWikiDir });
            if (status.trim()) {
                this.exec('git commit -m "docs: sync wiki content"', { cwd: this.tempWikiDir });
                
                try {
                    this.exec('git push origin master', { cwd: this.tempWikiDir });
                } catch {
                    this.exec('git push origin main', { cwd: this.tempWikiDir });
                }
                
                log.success(`Synced ${synced} wiki pages successfully`);
            } else {
                log.info('No changes to sync');
            }

            // Cleanup
            this.removeDir(this.tempWikiDir);
            
            log.success('Wiki synchronization completed!');
            log.info(`📚 Visit: https://github.com/${this.repoInfo.fullName}/wiki`);

        } catch (error) {
            log.error(`Sync failed: ${error.message}`);
            process.exit(1);
        }
    }
}

new WikiSync().sync();

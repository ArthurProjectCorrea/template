---
applyTo: '**'
---

# Copilot - Fullstack Developer Instructions

## 🧠 Papel

Você é um desenvolvedor fullstack que trabalha neste monorepo com Next.js (frontend) e NestJS
(backend). Siga as instruções da issue atribuída para implementar a funcionalidade.

## 🚀 Fluxo de Trabalho

1. Leia a descrição da issue.
2. Localize o app ou pacote correto no monorepo.
3. Implemente a feature conforme descrito.
4. Adicione testes unitários e E2E.
5. Faça um commit com mensagem no padrão Conventional Commits.
6. Crie um PR para `main` com link da issue.
7. Aguarde revisão e merge automático.

## 📦 Estrutura do Monorepo

- **Frontend**: `/apps/web` - Next.js 15 com App Router
- **Backend**: `/apps/api` - NestJS com TypeScript
- **Componentes**: `/packages/ui` - Biblioteca de componentes React compartilhados
- **ESLint Config**: `/packages/eslint-config` - Configurações de linting compartilhadas
- **TypeScript Config**: `/packages/typescript-config` - Configurações TypeScript base
- **Tailwind Config**: `/packages/tailwind-config` - Configurações Tailwind CSS

## 🛠️ Stack Tecnológica

### Frontend (`apps/web`)

- **Framework**: Next.js 15 com App Router
- **Styling**: Tailwind CSS
- **Testes**: Jest + React Testing Library + Playwright
- **Linting**: ESLint + Prettier

### Backend (`apps/api`)

- **Framework**: NestJS
- **Testes**: Jest (unit) + Supertest (e2e)
- **Linting**: ESLint + Prettier

### Ferramentas do Monorepo

- **Package Manager**: pnpm
- **Build System**: Turborepo
- **Git Hooks**: Husky + lint-staged
- **Commits**: Conventional Commits com commitlint

## 🧪 Estratégia de Testes

### Web App

- **Unit**: React Testing Library para componentes
- **E2E**: Playwright para fluxos completos
- **Localização**: `apps/web/__tests__/`

### API

- **Unit**: Jest para serviços e controladores
- **E2E**: Supertest para endpoints
- **Localização**: `apps/api/test/`

### Packages

- **Unit**: Jest para funções e componentes
- **Localização**: `packages/*/test/` ou `packages/*/__tests__/`

## 📝 Padrões de Código

### Conventional Commits

Tipos permitidos:

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação, ponto e vírgula, etc
- `refactor`: Refatoração de código
- `test`: Adicionar ou modificar testes
- `chore`: Manutenção
- `ci`: Configuração de CI/CD
- `build`: Sistema de build
- `perf`: Melhoria de performance
- `revert`: Reverter commit
- `ui`: Mudanças de interface
- `deps`: Dependências

### Scopes (opcional)

- `web`: Frontend
- `api`: Backend
- `ui`: Componentes
- `config`: Configurações
- `docs`: Documentação

**Exemplo**: `feat(web): adiciona página de login`

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
pnpm dev                    # Inicia todos os apps
pnpm dev --filter=web      # Inicia apenas o frontend
pnpm dev --filter=api      # Inicia apenas o backend

# Build e Deploy
pnpm build                 # Build de todos os projetos
pnpm build --filter=web    # Build apenas do frontend

# Testes
pnpm test                  # Roda todos os testes
pnpm test --filter=web     # Testes apenas do frontend
pnpm test --filter=api     # Testes apenas do backend

# Code Quality
pnpm lint                  # Lint de todo o monorepo
pnpm lint:fix              # Fix automático de lint issues
pnpm format                # Formatação com Prettier
pnpm format:check          # Verifica formatação

# Package específico
pnpm turbo run test --filter=ui    # Testa apenas package ui
```

## 🎯 Diretrizes de Desenvolvimento

1. **Sempre rode os testes** antes de fazer commit
2. **Use TypeScript** em todo o código
3. **Siga os padrões ESLint** configurados
4. **Escreva testes** para novas funcionalidades
5. **Use componentes** do package `ui` quando possível
6. **Documente APIs** com JSDoc/TSDoc
7. **Commits pequenos e focados** em uma funcionalidade
8. **PRs descritivos** com contexto da mudança

## 🔍 Debugging

- Use o VS Code com as extensões recomendadas
- Configurações de debug estão em `.vscode/`
- Logs estruturados no backend com NestJS Logger
- React DevTools para o frontend

## 🚦 Quality Gates

Todos os commits passam por:

1. **Pre-commit**: lint-staged roda ESLint + Prettier
2. **Commit-msg**: commitlint valida mensagem
3. **CI/CD**: Testes automatizados e build verification

## 🔄 Workflows de CI/CD

### 🔍 Continuous Integration (CI)

O workflow de CI é executado em todos os PRs e pushes para `main`/`develop`:

1. **Code Quality**: ESLint, Prettier, TypeScript check
2. **Tests**: Unit tests (Jest) e E2E tests (Playwright/Supertest)
3. **Build**: Verificação se todos os packages fazem build
4. **Security**: Scan de vulnerabilidades com Trivy

### 🚀 Continuous Deployment (CD)

O workflow de CD é executado apenas em pushes para `main`:

1. **Deploy API**: Build e deploy do backend
2. **Deploy Frontend**: Build e deploy para Vercel
3. **Notifications**: Notificações de sucesso/falha

### 🤖 Auto Merge

PRs são automaticamente merged quando:

- São criados pelo Dependabot
- Ou têm a label `auto-merge`
- E passam em todos os checks de CI

### 📦 Release

Releases automáticos são criados quando:

- Há push para `main`
- Todos os testes passam
- Changelog é gerado automaticamente

## 🎯 Fluxo de Desenvolvimento com CI/CD

### Para Features/Bugs:

1. 📋 **Crie issue** usando templates apropriados
2. 🌿 **Crie branch** a partir de `develop`
3. 💻 **Desenvolva** seguindo as diretrizes
4. 🧪 **Teste localmente**: `pnpm test`
5. ✅ **Commit**: Com conventional commits
6. 📤 **Push** e abra PR para `develop`
7. ⏳ **Aguarde CI** passar automaticamente
8. 👀 **Code Review** será solicitado
9. 🔀 **Merge** automático após aprovação

### Para Dependabot:

1. 🤖 **Dependabot** cria PR automaticamente
2. ✅ **CI** executa testes
3. 🔀 **Auto-merge** se tudo passar

### Para Releases:

1. 🔀 **Merge** de `develop` para `main`
2. 🚀 **CD** faz deploy automático
3. 📦 **Release** criado automaticamente
4. 📢 **Notificações** enviadas

## 📋 Issue Templates

Use os templates corretos para diferentes tipos de trabalho:

- 🚀 **Feature Request**: Para novas funcionalidades
- 🐛 **Bug Report**: Para reportar bugs
- 📚 **Documentation**: Para melhorias na documentação
- 🧹 **Maintenance**: Para tarefas de manutenção

Cada template coleta informações específicas necessárias para implementação eficiente.

## 🔧 Comandos para CI/CD Local

```bash
# Simular CI completo localmente
pnpm lint && pnpm format:check && pnpm build && pnpm test

# Verificar se está pronto para PR
pnpm turbo run lint build test

# Limpar antes de commit
pnpm clean && pnpm install
```

Provide project context and coding guidelines that AI should follow when generating code, answering
questions, or reviewing changes.

# 🔄 Fluxo de Desenvolvimento

Este documento define o fluxo completo de desenvolvimento no template, desde a criação de issues até
o deploy em produção.

## 🎯 Visão Geral do Workflow

### Princípios do Fluxo

- **Automação Máxima**: CI/CD automatizado
- **Qualidade Garantida**: Quality gates obrigatórios
- **IA Assistida**: Copilot helpers especializados
- **Feedback Rápido**: Builds e testes otimizados
- **Documentação Contínua**: Docs sempre atualizadas

### Atores Principais

- **Developer**: Implementa features e fixes
- **AI Helpers**: Assistem desenvolvimento especializado
- **CI/CD**: Automatiza build, test e deploy
- **Quality Gates**: Garantem padrões de código

## 📋 Fluxo Completo

```mermaid
graph TD
    A[Issue Created] --> B[@dev-helper Analysis]
    B --> C{Issue Type}
    C -->|Simple| D[Direct Implementation]
    C -->|Complex| E[Architecture Design]

    D --> F[Choose Helper]
    E --> F

    F --> G[@frontend-helper]
    F --> H[@backend-helper]
    F --> I[@documentation-helper]

    G --> J[Implementation]
    H --> J
    I --> J

    J --> K[Local Testing]
    K --> L[Git Commit]
    L --> M[Push to Branch]
    M --> N[CI Pipeline]

    N --> O{Quality Gates}
    O -->|Pass| P[Auto Merge]
    O -->|Fail| Q[Fix Issues]
    Q --> J

    P --> R[Deploy to Production]
    R --> S[@documentation-helper]
    S --> T[Update Docs]
```

## 🎯 Etapas Detalhadas

### 1. Criação e Análise de Issues

#### Templates de Issue

```markdown
## 🚀 Feature Request

- **Descrição**: O que deve ser implementado
- **Critérios de Aceitação**: Como validar sucesso
- **Impacto**: Usuários afetados
- **Prioridade**: Alta/Média/Baixa

## 🐛 Bug Report

- **Descrição**: O que está acontecendo
- **Reprodução**: Passos para reproduzir
- **Comportamento Esperado**: O que deveria acontecer
- **Evidências**: Screenshots, logs, etc.
```

#### Análise com Dev Helper

```bash
@dev-helper "Analise esta issue e distribua as tarefas:

**Issue**: Sistema de notificações em tempo real
**Descrição**: Implementar notificações push para usuários
**Complexidade**: Alta (arquitetura + frontend + backend)
**Impacto**: Alto (todos os usuários)
**Urgência**: Média (próximo sprint)"
```

**Output Esperado**:

```markdown
## 📊 Análise da Issue

- **Complexidade**: 4/5 (requer WebSocket + UI + persistência)
- **Impacto**: 5/5 (feature core para todos usuários)
- **Urgência**: 3/5 (próximo sprint)
- **Prioridade**: High Impact + Medium Urgency = Next Sprint Priority

## 🏗️ Arquitetura Proposta

1. **Backend**: WebSocket server + notification service
2. **Frontend**: Real-time UI + notification center
3. **Database**: Notification persistence + user preferences

## 📋 Distribuição de Tarefas

1. @backend-helper: Implementar WebSocket + API
2. @frontend-helper: UI de notificações + integração
3. @documentation-helper: Documentar sistema completo
```

### 2. Implementação por Helpers

#### Backend Implementation

```bash
@backend-helper "Implementar sistema de notificações:

**Requisitos**:
- WebSocket server para notificações em tempo real
- API REST para histórico de notificações
- Persistência no banco de dados
- Autenticação via JWT
- Rate limiting para prevenção de spam

**Endpoints necessários**:
- GET /notifications - Listar notificações do usuário
- POST /notifications - Criar notificação (admin)
- PATCH /notifications/:id/read - Marcar como lida
- WebSocket /notifications - Real-time updates"
```

#### Frontend Implementation

```bash
@frontend-helper "Implementar UI de notificações:

**Componentes necessários**:
- NotificationCenter: Dropdown com lista
- NotificationItem: Item individual
- NotificationBadge: Contador não lidas
- Toast: Notificações temporárias

**Integração**:
- WebSocket connection para real-time
- API calls para histórico
- Estado global com Zustand
- Animações suaves"
```

#### Documentation

```bash
@documentation-helper "Documentar sistema de notificações:

**Documentação necessária**:
- OpenAPI spec para endpoints
- WebSocket protocol documentation
- Component usage guide
- Integration examples
- Troubleshooting guide"
```

### 3. Desenvolvimento Local

#### Setup do Ambiente

```bash
# 1. Clone e setup inicial
git clone <repo>
cd <project>
pnpm template:init

# 2. Desenvolvimento
pnpm dev              # Inicia todos os serviços
pnpm dev --filter=web # Apenas frontend
pnpm dev --filter=api # Apenas backend
```

#### Branch Strategy

```bash
# 1. Criar branch para feature
git checkout -b feature/notifications-system

# 2. Implementar mudanças
# ... desenvolvimento ...

# 3. Testes locais
pnpm test
pnpm build
pnpm lint
```

### 4. Quality Gates Locais

#### Pre-commit Hooks

```bash
# Configurado via Husky
# Executa automaticamente em cada commit:
1. ESLint fix
2. Prettier format
3. TypeScript check
4. Unit tests
5. Commit message validation
```

#### Validação Manual

```bash
# Simular CI completo localmente
pnpm lint && pnpm format:check && pnpm build && pnpm test

# Verificar coverage
pnpm test:coverage

# Análise de bundle
pnpm analyze
```

### 5. Git Workflow

#### Conventional Commits

```bash
# Padrão enforçado por commitlint
git commit -m "feat(notifications): add real-time notification system

- Implement WebSocket server for real-time updates
- Add notification API endpoints
- Create notification center UI component
- Add persistent notification storage

Closes #123"
```

#### Commit Types

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação
- `refactor`: Refatoração
- `test`: Testes
- `chore`: Manutenção

#### Scopes

- `web`: Frontend changes
- `api`: Backend changes
- `ui`: Component library
- `docs`: Documentation
- `ci`: CI/CD changes

### 6. CI/CD Pipeline

#### Pipeline Stages

```yaml
# .github/workflows/test-and-deploy.yml
1. Setup (Node.js 20, pnpm cache) 2. Install dependencies 3. Lint & Format check 4. TypeScript
compilation 5. Build all packages 6. Unit tests (80%+ coverage required) 7. Integration tests 8. E2E
tests (Playwright) 9. Security scan 10. Deploy (if main branch)
```

#### Quality Requirements

```yaml
# Falha se não atender:
Coverage:
  Frontend: 75% minimum
  Backend: 80% minimum

Build: Zero TypeScript errors Zero ESLint errors Successful build for all packages

Tests: All unit tests pass All integration tests pass All E2E tests pass
```

### 7. Auto Merge Process

#### Condições para Auto Merge

1. **CI Pipeline**: 100% success
2. **Coverage**: Atende mínimos
3. **Reviews**: Aprovado (se configurado)
4. **Branch**: Target é `main`
5. **Labels**: `auto-merge` ou Dependabot

#### Merge Strategy

```bash
# Configurado para squash merge
# Mantém histórico limpo
# Mensagem combinada de todos commits
```

### 8. Deploy Automático

#### Deploy Pipeline

```yaml
# Executa apenas em push para main
Deploy:
  1. Build production assets 2. Deploy API to production 3. Deploy frontend to Vercel 4. Update
  environment variables 5. Run post-deploy tests 6. Notify team (Slack/Discord)
```

#### Rollback Strategy

```bash
# Em caso de falha
1. Automated rollback to previous version
2. Incident notification
3. Post-mortem issue creation
```

### 9. Documentation Update

#### Automatic Documentation

```bash
# Executado após deploy
@documentation-helper "Update documentation for new notification system:

- Add API endpoints to OpenAPI spec
- Update component documentation
- Create integration guide
- Update changelog
- Generate release notes"
```

## 🎯 Fluxos Específicos

### Bug Fix Workflow

```bash
# 1. Análise de urgência
@dev-helper "Bug crítico: Login não funciona"

# 2. Hotfix branch
git checkout -b hotfix/login-fix

# 3. Implementação rápida
@backend-helper "Fix authentication JWT validation"

# 4. Deploy emergencial
# Pipeline express (pula alguns testes E2E)
```

### Feature Development

```bash
# 1. Planning
@dev-helper "Feature: User dashboard with analytics"

# 2. Architecture design
# Define data flow, components, APIs

# 3. Parallel development
# Backend + Frontend + Docs simultâneo

# 4. Integration testing
# Testes de integração entre componentes
```

### Refactoring Workflow

```bash
# 1. Impact analysis
@dev-helper "Refactor: Migrate to new state management"

# 2. Incremental changes
# Pequenas mudanças testáveis

# 3. Backward compatibility
# Garantir não quebrar funcionalidades

# 4. Performance validation
# Verificar melhorias de performance
```

## 📊 Métricas e Monitoring

### Development Metrics

- **Lead Time**: Issue creation → Production
- **Cycle Time**: Development start → Merge
- **Deployment Frequency**: Deploys per day/week
- **Change Failure Rate**: % of deploys causing issues
- **Mean Time to Recovery**: Time to fix issues

### Quality Metrics

- **Test Coverage**: Frontend 75%+, Backend 80%+
- **Build Success Rate**: 95%+ CI success
- **Code Review Time**: <24h median
- **Bug Escape Rate**: Bugs found in production

### AI Helper Metrics

- **Helper Usage**: Distribution por helper
- **Task Success Rate**: Successful implementations
- **Response Quality**: User satisfaction
- **Integration Efficiency**: Cross-helper coordination

## 🚀 Melhores Práticas

### Para Desenvolvedores

1. **Sempre comece com @dev-helper** para issues complexas
2. **Use conventional commits** rigorosamente
3. **Teste localmente** antes de push
4. **Mantenha PRs pequenos** e focados
5. **Documente decisões** importantes

### Para AI Helpers

1. **Mantenha escopo específico** da especialização
2. **Considere impacto** em outros componentes
3. **Implemente testes** apropriados
4. **Documente mudanças** significativas
5. **Coordene via dev-helper** quando necessário

### Para Quality Gates

1. **Falhe rápido** em problemas óbvios
2. **Forneça feedback claro** sobre falhas
3. **Mantenha builds rápidos** (<10min)
4. **Cache agressivamente** dependências
5. **Parallelize quando possível**

Este fluxo garante desenvolvimento eficiente, código de qualidade e deploys confiáveis através de
automação inteligente e assistência de IA especializada.

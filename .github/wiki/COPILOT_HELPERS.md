# 🤖 Sistema de Copilot Helpers

Este projeto implementa um sistema avançado de **Copilot Chat Helpers** que organiza a IA em
especialistas focados, melhorando significativamente a qualidade e eficiência do desenvolvimento.

## 🎯 Visão Geral do Sistema

### Estrutura Organizada

```
.github/
├── chatmodes/           # Chat modes do GitHub Copilot
├── instructions/        # Instruções gerais
├── prompts/            # Templates para consultas
└── copilot-profiles/   # Perfis originais (referência)

.vscode/
└── copilot-profiles.json # Configuração do VS Code
```

## 🧠 Helpers Especializados

### 🎨 Frontend Helper (`@frontend-helper`)

**Especialista em**: Next.js 15, React, TypeScript, Tailwind CSS

```bash
# Exemplos de uso
@frontend-helper "Crie um componente Button com variants"
@frontend-helper "Implemente página de login com validação"
@frontend-helper "Adicione testes E2E para checkout"
```

**Responsabilidades**:

- Desenvolvimento de componentes React
- Implementação de páginas Next.js
- Styling com Tailwind CSS
- Testes frontend (Jest + RTL + Playwright)
- Otimização de performance
- Integração com APIs

**Escopo**: `/apps/web/**` e `/packages/ui/**`

### ⚙️ Backend Helper (`@backend-helper`)

**Especialista em**: NestJS, APIs REST, banco de dados, segurança

```bash
# Exemplos de uso
@backend-helper "Crie endpoint GET /api/users com paginação"
@backend-helper "Implemente autenticação JWT"
@backend-helper "Configure cache Redis"
```

**Responsabilidades**:

- Desenvolvimento de APIs REST
- Implementação de autenticação
- Modelagem de banco de dados
- Testes backend (Jest + Supertest)
- Documentação OpenAPI
- Segurança e validação

**Escopo**: `/apps/api/**`

### 📚 Documentation Helper (`@documentation-helper`)

**Especialista em**: Documentação técnica, APIs, guias

```bash
# Exemplos de uso
@documentation-helper "Documente API de usuários"
@documentation-helper "Crie README para package UI"
@documentation-helper "Gere diagrama de arquitetura"
```

**Responsabilidades**:

- Documentação de APIs (Swagger/OpenAPI)
- READMEs detalhados
- Diagramas de arquitetura
- Guias de desenvolvimento
- Changelogs e release notes
- Templates de issues/PRs

**Escopo**: Todo o projeto (`**`)

### 🎯 Dev Helper (`@dev-helper`)

**Coordenador Técnico**: Avaliação, distribuição, arquitetura

```bash
# Exemplos de uso
@dev-helper "Analise esta issue e distribua tarefas"
@dev-helper "Defina arquitetura para sistema de notificações"
@dev-helper "Coordene integração frontend + backend"
```

**Responsabilidades**:

- Avaliação de issues (complexidade + impacto + urgência)
- Distribuição inteligente de tarefas
- Definição de arquitetura
- Coordenação entre helpers
- Garantia de qualidade
- Infraestrutura e DevOps

**Escopo**: Todo o projeto (`**`)

## 🔄 Fluxos de Trabalho

### Para Issues Complexas

```mermaid
graph TD
    A[Issue Criada] --> B[@dev-helper analisa]
    B --> C{Tipo de Issue}
    C -->|Frontend| D[@frontend-helper]
    C -->|Backend| E[@backend-helper]
    C -->|Docs| F[@documentation-helper]
    C -->|Arquitetura| G[@dev-helper coordena]
    D --> H[Implementação]
    E --> H
    F --> H
    G --> H
    H --> I[@documentation-helper documenta]
    I --> J[PR Review]
```

### Para Desenvolvimento Focado

```bash
# Desenvolvimento direto com helper específico
@frontend-helper "Feature: Componente de upload de arquivos"
@backend-helper "Feature: API de upload com validação"
@documentation-helper "Documente processo de upload"
```

### Para Integração Multi-Componente

```bash
# 1. Coordenação inicial
@dev-helper "Feature: Sistema de notificações em tempo real"

# 2. Backend primeiro
@backend-helper "Implemente WebSocket para notificações"

# 3. Frontend depois
@frontend-helper "Integre notificações no Header"

# 4. Documentação
@documentation-helper "Documente sistema de notificações"
```

## 🎯 Framework de Avaliação (Dev Helper)

### Critérios de Análise

- **Complexidade** (1-5): Simple fix → Major architecture change
- **Impacto** (1-5): Minor improvement → Critical/blocking
- **Urgência** (1-5): When time allows → Immediate attention

### Matrix de Decisão

```
High Impact + High Urgency = Immediate Priority
High Impact + Low Urgency = Next Sprint Priority
Low Impact + High Urgency = Quick Win
Low Impact + Low Urgency = Backlog
```

### Distribuição Inteligente

| Tipo de Issue | Helper Responsável   | Critério                       |
| ------------- | -------------------- | ------------------------------ |
| UI/UX changes | frontend-helper      | React, páginas, styling        |
| API endpoints | backend-helper       | REST, database, business logic |
| Documentation | documentation-helper | Docs, guides, diagrams         |
| Architecture  | dev-helper           | System design, integration     |

## 📊 Métricas de Qualidade

### Coverage Esperada

- **Frontend**: 80%+ para componentes críticos
- **Backend**: 85%+ para services e controllers
- **Documentation**: 100% de APIs documentadas

### Padrões de Resposta

- **Código prático**: Sempre com exemplos funcionais
- **Contexto específico**: Focado no escopo do helper
- **Integração clara**: Como conecta com outros componentes
- **Testes incluídos**: Sempre que aplicável

## 🛠️ Configuração Técnica

### VS Code Integration

```json
// .vscode/copilot-profiles.json
{
  "github.copilot.chat.profiles": {
    "frontend-helper": {
      "instructions": ".github/chatmodes/frontend-helper.chatmode.md",
      "scope": "apps/web/**"
    }
    // ... outros helpers
  }
}
```

### Chat Modes Structure

```markdown
---
description: 'Especialista em [área]'
tools: []
---

# Helper Name

Definição do comportamento, responsabilidades e limitações
```

### Prompts Templates

- `issue-evaluation.prompt.md`: Framework de avaliação
- `architecture-coordination.prompt.md`: Coordenação arquitetural

## 🚀 Melhores Práticas

### Para Desenvolvedores

1. **Use o helper correto** para cada tipo de tarefa
2. **Comece com dev-helper** para issues complexas
3. **Seja específico** nas solicitações
4. **Valide integração** entre componentes
5. **Documente mudanças** importantes

### Para Helpers

1. **Mantenha escopo focado** na especialização
2. **Consulte outros helpers** quando necessário
3. **Implemente testes** sempre que aplicável
4. **Considere impacto** em outros componentes
5. **Documente decisões** arquiteturais

## 🔧 Comandos Úteis

```bash
# Desenvolvimento com helpers específicos
pnpm dev --filter=web    # Para frontend-helper
pnpm dev --filter=api    # Para backend-helper

# Testes por área
pnpm test --filter=web   # Frontend tests
pnpm test --filter=api   # Backend tests

# Qualidade geral (dev-helper)
pnpm lint && pnpm build && pnpm test
```

## 🎓 Exemplos Práticos

### Cenário 1: Bug Crítico

```bash
@dev-helper "Bug crítico: Login não funciona em produção"
# → Avalia urgência/impacto → Distribui para backend-helper
```

### Cenário 2: Nova Feature

```bash
@dev-helper "Feature: Sistema de comentários"
# → Define arquitetura → Distribui backend → frontend → docs
```

### Cenário 3: Melhoria de Performance

```bash
@frontend-helper "Otimize performance da página de produtos"
# → Foco em Core Web Vitals, bundle size, lazy loading
```

### Cenário 4: Documentação API

```bash
@documentation-helper "Documente nova API de pagamentos"
# → OpenAPI spec, exemplos, guias de integração
```

Este sistema de helpers garante desenvolvimento organizado, eficiente e de alta qualidade através da
especialização e coordenação inteligente.

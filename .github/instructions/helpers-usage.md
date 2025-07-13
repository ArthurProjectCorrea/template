---
applyTo: '**'
---

# 🤖 Guia de Uso dos Copilot Chat Helpers

## 🎯 Overview

Os Chat Modes organizam a IA em especialistas focados, melhorando a qualidade e eficiência do
desenvolvimento no monorepo.

## 🚀 Como Usar os Chat Modes

### 1. 📋 Para Issues Complexas - Use `dev-helper`

```bash
# Comece sempre com dev-helper para análise e coordenação
@dev-helper "Analise esta issue e distribua as tarefas: [descrição da issue]"

# O dev-helper irá:
# - Avaliar complexidade e impacto
# - Definir arquitetura se necessário
# - Distribuir tarefas para helpers específicos
# - Coordenar a implementação
```

### 2. 🎨 Para Desenvolvimento Frontend - Use `frontend-helper`

```bash
# Use frontend-helper diretamente para:
@frontend-helper "Crie um componente Button com variants primary, secondary e ghost"
@frontend-helper "Implemente a página de login com validação de formulário"
@frontend-helper "Adicione testes E2E para o fluxo de checkout"
@frontend-helper "Otimize performance da página de produtos"
```

### 3. ⚙️ Para Desenvolvimento Backend - Use `backend-helper`

```bash
# Use backend-helper diretamente para:
@backend-helper "Crie endpoint GET /api/users com paginação"
@backend-helper "Implemente autenticação JWT com refresh token"
@backend-helper "Adicione validação para o DTO CreateUserDto"
@backend-helper "Configure cache Redis para queries de produtos"
```

### 4. 📚 Para Documentação - Use `documentation-helper`

```bash
# Use documentation-helper para:
@documentation-helper "Documente a API de usuários com OpenAPI"
@documentation-helper "Crie README para o package de componentes UI"
@documentation-helper "Gere diagrama de arquitetura do sistema"
@documentation-helper "Atualize guia de onboarding de desenvolvedores"
```

## 🎯 Estratégias por Tipo de Trabalho

### 🐛 Bug Fixes

1. **Dev-helper**: Analisa e determina severity
2. **Helper específico**: Implementa fix
3. **Documentation-helper**: Atualiza docs se necessário

### ✨ New Features

1. **Dev-helper**: Define arquitetura e distribui
2. **Backend-helper**: APIs e lógica de negócio
3. **Frontend-helper**: UI e integração
4. **Documentation-helper**: Documenta feature

### 🔧 Maintenance

1. **Dev-helper**: Avalia escopo e coordena
2. **Helper apropriado**: Executa manutenção
3. **Documentation-helper**: Atualiza documentação

### 🏗️ Architecture Changes

1. **Dev-helper**: Lidera design da solução
2. **Múltiplos helpers**: Implementam componentes
3. **Dev-helper**: Coordena integração
4. **Documentation-helper**: Documenta arquitetura

## 🔄 Fluxos Avançados

### Integração Frontend + Backend

```bash
# 1. Coordenação inicial
@dev-helper "Feature: Sistema de notificações em tempo real"

# 2. Backend primeiro
@backend-helper "Implemente WebSocket para notificações"

# 3. Frontend depois
@frontend-helper "Integre notificações em tempo real no componente Header"

# 4. Documentação
@documentation-helper "Documente sistema de notificações"
```

### Refatoração Major

```bash
# 1. Análise arquitetural
@dev-helper "Refatorar sistema de autenticação para usar OAuth2"

# 2. Distribuição coordenada
# Backend: Novos providers OAuth
# Frontend: Novos fluxos de login
# Docs: Guias atualizados
```

## 📊 Métricas de Qualidade

### Coverage Esperada por Helper

- **frontend-helper**: 80%+ para componentes críticos
- **backend-helper**: 85%+ para services e controllers
- **documentation-helper**: 100% de APIs documentadas

### Padrões de Resposta

- **Código prático**: Sempre com exemplos funcionais
- **Contexto específico**: Focado no escopo do helper
- **Integração clara**: Como conecta com outros componentes
- **Testes incluídos**: Sempre que aplicável

## 🚦 Qualidade Gates

Todos os helpers devem:

1. **Seguir padrões**: ESLint, Prettier, TypeScript
2. **Incluir testes**: Coverage adequada por tipo
3. **Documentar código**: JSDoc/TSDoc inline
4. **Considerar performance**: Otimizações específicas
5. **Validar segurança**: Especialmente backend-helper

## 🎓 Melhores Práticas

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

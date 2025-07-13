# 🤖 GitHub Copilot Helpers - Estrutura Organizada

Este diretório contém os helpers especializados do GitHub Copilot organizados em formatos
reconhecidos pelo sistema.

## 📁 Estrutura de Arquivos

### 🗣️ Chat Modes (`.github/chatmodes/`)

Definem comportamentos específicos e interativos para o Copilot Chat:

- **`frontend-helper.chatmode.md`** - Especialista em Next.js, React, Tailwind CSS
- **`backend-helper.chatmode.md`** - Especialista em NestJS, APIs, banco de dados
- **`documentation-helper.chatmode.md`** - Especialista em documentação técnica
- **`dev-helper.chatmode.md`** - Coordenador técnico e arquiteto de soluções

### 📋 Instructions (`.github/instructions/`)

Instruções gerais de desenvolvimento e coordenação:

- **`copilot.instructions.md`** - Instruções principais do projeto
- **`helpers-usage.md`** - Guia completo de uso dos helpers

### 🎯 Prompts (`.github/prompts/`)

Templates para consultas e análises específicas:

- **`issue-evaluation.prompt.md`** - Framework para avaliar e distribuir issues
- **`architecture-coordination.prompt.md`** - Coordenação de mudanças arquiteturais

## 🚀 Como Usar

### Para Issues Complexas

```bash
@dev-helper "Analise esta issue e distribua as tarefas"
```

### Para Desenvolvimento Específico

```bash
@frontend-helper "Crie componente de login"
@backend-helper "Implemente API de usuários"
@documentation-helper "Documente nova feature"
```

### Para Avaliação e Coordenação

Use os prompts para análises estruturadas:

- `issue-evaluation.prompt.md` para priorizar issues
- `architecture-coordination.prompt.md` para coordenar mudanças

## 🎯 Benefícios

1. **Especialização**: Cada helper foca em sua área de expertise
2. **Coordenação**: dev-helper organiza e distribui trabalho
3. **Qualidade**: Padrões específicos por tipo de desenvolvimento
4. **Eficiência**: Respostas mais precisas e contextualizadas
5. **Documentação**: documentation-helper mantém tudo documentado

## 🔄 Migração dos Copilot Profiles

Os arquivos originais em `.github/copilot-profiles/` foram convertidos para:

- **Profiles → Chat Modes**: Comportamentos interativos específicos
- **Coordenação → Instructions**: Diretrizes gerais de desenvolvimento
- **Avaliação → Prompts**: Templates para análises estruturadas

## 📚 Documentação Completa

Para instruções detalhadas, consulte:

- `helpers-usage.md` - Guia completo de uso
- `copilot.instructions.md` - Instruções do projeto
- Cada chat mode individual para especificações técnicas

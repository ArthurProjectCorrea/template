# 🎯 Quick Start - Template Initialization

## 📋 Pré-requisitos

- Node.js 18+ instalado
- pnpm instalado (`npm install -g pnpm`)
- Git configurado
- Repositório GitHub criado

## 🚀 Inicialização Rápida

### 1. Use o Template

**Opção A: GitHub Template (Recomendado)**

1. Vá para https://github.com/ArthurProjectCorrea/template
2. Clique em "Use this template"
3. Crie seu novo repositório
4. Clone localmente:

```bash
git clone https://github.com/seu-usuario/seu-projeto.git
cd seu-projeto
```

**Opção B: Clone Manual**

```bash
git clone https://github.com/ArthurProjectCorrea/template.git meu-projeto
cd meu-projeto
git remote set-url origin https://github.com/seu-usuario/meu-projeto.git
```

### 2. Execute a Inicialização

**Linux/macOS:**

```bash
pnpm init:template
```

**Windows:**

```bash
pnpm init:template:win
```

### 3. O que Acontece Automaticamente

```
🎯 Initializing Template Project...
📦 Installing dependencies...
✅ Dependencies installed
📝 Making initial commit...
✅ Initial commit created
🚀 Pushing to remote...
✅ Pushed to remote
📊 Fetching repository information...
✅ Repository: seu-usuario/seu-projeto
ℹ️ Description: Descrição do seu projeto
📝 Updating project files...
✅ Updated package.json
✅ Updated README.md
✅ Updated Copilot instructions with project context
✅ Updated frontend-helper chat mode
✅ Updated backend-helper chat mode
✅ Updated documentation-helper chat mode
✅ Updated dev-helper chat mode
💾 Committing project customization...
✅ Project customization committed and pushed

🎉 Template Initialization Complete!
✅ Project seu-projeto is ready for development

Next steps:
  • Start development: pnpm dev
  • Run tests: pnpm test
  • Use AI helpers with @frontend-helper, @backend-helper, etc.
```

## 🎯 Resultado Final

Após a inicialização, você terá:

### ✅ Projeto Personalizado

```json
// package.json atualizado
{
  "name": "seu-projeto",
  "description": "Descrição do seu repositório GitHub",
  "repository": "https://github.com/seu-usuario/seu-projeto"
}
```

### ✅ README Customizado

```markdown
# Seu Projeto

Descrição do seu repositório GitHub

[![Build](https://github.com/seu-usuario/seu-projeto/workflows/CI/badge.svg)]
```

### ✅ AI Helpers Contextualizados

```markdown
## 🎯 Contexto do Projeto

**Nome**: seu-projeto **Descrição**: Descrição do seu repositório GitHub **Repositório**:
https://github.com/seu-usuario/seu-projeto
```

### ✅ Pronto para Desenvolvimento

```bash
# Iniciar desenvolvimento
pnpm dev

# Executar testes
pnpm test

# Usar AI helpers contextualizados
@frontend-helper "Crie um componente Header para este projeto"
@backend-helper "Implemente autenticação para este sistema"
```

## 🤖 AI Helpers Contextualizados

Após a inicialização, todos os helpers conhecem seu projeto:

```bash
# Frontend Helper - Sabe que é seu projeto específico
@frontend-helper "Crie uma página de dashboard para [seu-projeto]"

# Backend Helper - Entende o contexto do projeto
@backend-helper "Implemente API de usuários para [seu-projeto]"

# Documentation Helper - Documenta especificamente seu projeto
@documentation-helper "Crie documentação de onboarding para [seu-projeto]"

# Dev Helper - Coordena considerando o contexto
@dev-helper "Analise esta issue e distribua as tarefas para [seu-projeto]"
```

## 🔧 Comandos Disponíveis

```bash
# Desenvolvimento
pnpm dev          # Inicia todos os apps em watch mode
pnpm build        # Build de produção
pnpm test         # Executa todos os testes
pnpm lint         # Lint de todo o código
pnpm format       # Formata código com Prettier

# Quality Assurance
pnpm quality:check    # Executa todos os checks de qualidade
pnpm test:cov         # Coverage report
pnpm check-types      # TypeScript check

# Git & Commits
pnpm commit           # Guided commit com commitizen
git add . && pnpm commit   # Commit com padrão semântico

# Documentação
pnpm wiki:generate    # Gera documentação wiki
pnpm wiki:update      # Atualiza wiki existente
```

## 🎯 Próximos Passos

1. **📝 Adicione mais detalhes** no README específico do seu projeto
2. **⚙️ Configure secrets** do GitHub para deploy (se necessário)
3. **🎨 Customize** apps/web para sua aplicação
4. **⚙️ Configure** apps/api para seus endpoints
5. **📚 Use @documentation-helper** para manter documentação atualizada

## 🆘 Troubleshooting

### Script falha na execução?

```bash
# Verifique pré-requisitos
node --version    # Deve ser 18+
pnpm --version    # Deve estar instalado
git status        # Deve estar em repositório git

# Execute manualmente
node scripts/initialize-project.js
```

### Não detectou descrição do repositório?

1. Adicione descrição no GitHub
2. Execute novamente: `pnpm init:project`

### Permissão negada (Linux/macOS)?

```bash
chmod +x scripts/initialize-project.sh
bash scripts/initialize-project.sh
```

## 🎉 Sucesso!

Seu projeto está agora totalmente configurado e pronto para desenvolvimento com:

- ✅ Infraestrutura completa
- ✅ AI helpers contextualizados
- ✅ CI/CD configurado
- ✅ Quality gates ativos
- ✅ Documentação automática

**Happy coding! 🚀**

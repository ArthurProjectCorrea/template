# 🚀 Template Usage Guide

Este é um template de projeto fullstack que pode ser usado para inicializar rapidamente novos
projetos com toda a infraestrutura pré-configurada.

## 📋 O que está Incluído

### 🏗️ Infraestrutura

- **Monorepo**: Turborepo com pnpm workspaces
- **Frontend**: Next.js 15 com App Router
- **Backend**: NestJS com TypeScript
- **CI/CD**: GitHub Actions com auto-merge
- **Quality Gates**: ESLint, Prettier, Husky, commitlint

### 🤖 AI Helpers

- **Chat Modes**: Helpers especializados para Copilot Chat
- **Instructions**: Contexto para desenvolvimento guiado por IA
- **Prompts**: Templates para análises estruturadas

### 🧪 Testing & Quality

- **Test Coverage**: Configuração com thresholds mínimos
- **Automated Tests**: Jest + React Testing Library + Playwright
- **Code Quality**: ESLint + Prettier + commitlint

### 📚 Documentation

- **Wiki Automation**: Geração automática de documentação
- **API Docs**: Swagger/OpenAPI configurado
- **Guides**: Documentação de desenvolvimento

## 🎯 Como Usar o Template

### 1. 📥 Criando Novo Projeto

#### Método 1: GitHub Template (Recomendado)

```bash
# 1. Use este repositório como template no GitHub
# 2. Clone seu novo repositório
git clone https://github.com/seu-usuario/seu-projeto.git
cd seu-projeto

# 3. Execute a inicialização
pnpm init:template
```

#### Método 2: Clone Manual

```bash
# 1. Clone o template
git clone https://github.com/ArthurProjectCorrea/template.git meu-projeto
cd meu-projeto

# 2. Remova o remote origin atual
git remote remove origin

# 3. Adicione seu repositório
git remote add origin https://github.com/seu-usuario/meu-projeto.git

# 4. Execute a inicialização
pnpm init:template
```

### 2. 🔧 O que o Script de Inicialização Faz

O script `initialize-project.sh` (ou `.bat` no Windows) executa automaticamente:

1. **📦 Instala dependências**: `pnpm install`
2. **📝 Commit inicial**: Amenda ou cria commit de inicialização
3. **🚀 Push inicial**: Force push para o repositório
4. **📊 Busca informações do repo**: Nome, descrição via GitHub API
5. **📝 Personaliza arquivos**:
   - `package.json` - nome, descrição, repositório
   - `README.md` - substitui informações do template
   - Copilot instructions - adiciona contexto do projeto
   - Chat modes - contextualiza helpers com o projeto
6. **💾 Commit final**: Commit das personalizações

### 3. 🎯 Configuração Automática

#### Informações Detectadas

- **Nome do projeto**: Extraído do repositório GitHub
- **Descrição**: Obtida via GitHub API (se disponível)
- **Owner**: Proprietário do repositório
- **URL**: Link para o repositório

#### Arquivos Atualizados

```
package.json              # Metadata do projeto
README.md                 # Documentação principal
.github/instructions/     # Contexto para AI helpers
.github/chatmodes/        # Helpers especializados
CI_CD_CONFIG.md          # Configuração de CI/CD
```

### 4. 📋 Pós-Inicialização

Após a inicialização, seu projeto estará pronto com:

#### ✅ Dependências Instaladas

```bash
pnpm dev          # Iniciar desenvolvimento
pnpm test         # Executar testes
pnpm build        # Build de produção
```

#### ✅ AI Helpers Contextualizados

```bash
@frontend-helper "Crie componente para este projeto"
@backend-helper "Implemente API para este sistema"
@documentation-helper "Documente esta funcionalidade"
@dev-helper "Analise esta issue do projeto"
```

#### ✅ CI/CD Configurado

- Auto-merge para Dependabot
- Testes automatizados
- Deploy workflows
- Coverage verification

#### ✅ Quality Gates Ativos

- Pre-commit hooks
- Conventional commits
- Test coverage thresholds
- Code formatting

## 🛠️ Personalizações Adicionais

### Após a Inicialização

1. **📝 Atualize a descrição** no GitHub se não foi detectada
2. **🎨 Customize o README** com detalhes específicos do projeto
3. **⚙️ Configure secrets** para deploy (se necessário)
4. **📊 Ajuste thresholds** de coverage se necessário

### Configuração Manual (Opcional)

Se preferir não usar o script automático:

```bash
# Inicialização manual básica
pnpm install
git add .
git commit -m "chore: initialize from template"
git push origin main

# Execute apenas a personalização
pnpm init:project
```

## 🔧 Scripts Disponíveis

```bash
# Inicialização completa (Unix/Linux/macOS)
pnpm init:template

# Inicialização completa (Windows)
pnpm init:template:win

# Apenas personalização (sem install/git)
pnpm init:project

# Desenvolvimento
pnpm dev
pnpm test
pnpm build

# Qualidade
pnpm lint
pnpm format
pnpm quality:check

# Documentação
pnpm wiki:generate
```

## 🎯 Vantagens do Template

1. **⚡ Setup Instantâneo**: Projeto funcional em minutos
2. **🤖 AI-Ready**: Helpers contextualizados desde o início
3. **🧪 Quality First**: Testes e quality gates configurados
4. **📚 Auto-Documentation**: Wiki e docs gerados automaticamente
5. **🔄 CI/CD Ready**: Deploy e automação configurados
6. **📦 Monorepo**: Estrutura escalável para múltiplos apps

## 🆘 Troubleshooting

### Script de Inicialização Falha

```bash
# Verifique se está em um repositório git
git status

# Verifique se tem remote origin
git remote -v

# Execute manualmente
node scripts/initialize-project.js
```

### Permissões no Linux/macOS

```bash
# Torne o script executável
chmod +x scripts/initialize-project.sh

# Execute com bash explicitamente
bash scripts/initialize-project.sh
```

### Problemas com GitHub API

Se a descrição não for detectada:

1. Adicione a descrição manualmente no GitHub
2. Execute novamente: `pnpm init:project`
3. Ou edite manualmente os arquivos necessários

## 📞 Suporte

- 📖 **Documentação**: Consulte os arquivos em `/docs`
- 🤖 **AI Helpers**: Use `@dev-helper` para coordenação
- 🐛 **Issues**: Abra issue no repositório do template
- 💬 **Discussões**: GitHub Discussions do template

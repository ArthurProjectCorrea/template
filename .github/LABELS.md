# GitHub Labels Configuration

## 📋 Labels para Issues e PRs

### Tipos (Type)

- `bug` - 🐛 Bugs e correções
- `enhancement` - ✨ Novas funcionalidades
- `documentation` - 📚 Documentação
- `maintenance` - 🧹 Manutenção e refatoração
- `dependencies` - 📦 Atualizações de dependências

### Componentes (Component)

- `web` - 🌐 Frontend (apps/web)
- `api` - ⚙️ Backend (apps/api)
- `ui` - 🎨 Componentes UI (packages/ui)
- `config` - ⚙️ Configurações (packages/\*)
- `ci` - 🔄 CI/CD e workflows

### Prioridade (Priority)

- `priority/low` - 🟢 Baixa prioridade
- `priority/medium` - 🟡 Média prioridade
- `priority/high` - 🟠 Alta prioridade
- `priority/critical` - 🔴 Crítica

### Status (Status)

- `needs-triage` - 🏷️ Precisa ser triado
- `ready` - ✅ Pronto para desenvolvimento
- `in-progress` - 🚧 Em desenvolvimento
- `needs-review` - 👀 Precisa de revisão
- `auto-merge` - 🤖 Merge automático habilitado

### Dificuldade (Difficulty)

- `good-first-issue` - 🌱 Bom para iniciantes
- `help-wanted` - 🙋 Ajuda necessária
- `complex` - 🧠 Complexo

## 🔧 Comandos para Configurar Labels

```bash
# Instalar GitHub CLI se necessário
# gh auth login

# Criar labels (executar na raiz do projeto)
gh label create "bug" --color "d73a4a" --description "🐛 Bugs e correções"
gh label create "enhancement" --color "a2eeef" --description "✨ Novas funcionalidades"
gh label create "documentation" --color "0075ca" --description "📚 Documentação"
gh label create "maintenance" --color "fbca04" --description "🧹 Manutenção e refatoração"
gh label create "dependencies" --color "0366d6" --description "📦 Atualizações de dependências"

gh label create "web" --color "7057ff" --description "🌐 Frontend (apps/web)"
gh label create "api" --color "008672" --description "⚙️ Backend (apps/api)"
gh label create "ui" --color "e99695" --description "🎨 Componentes UI (packages/ui)"
gh label create "config" --color "5319e7" --description "⚙️ Configurações (packages/*)"
gh label create "ci" --color "1d76db" --description "🔄 CI/CD e workflows"

gh label create "priority/low" --color "28a745" --description "🟢 Baixa prioridade"
gh label create "priority/medium" --color "ffc107" --description "🟡 Média prioridade"
gh label create "priority/high" --color "fd7e14" --description "🟠 Alta prioridade"
gh label create "priority/critical" --color "dc3545" --description "🔴 Crítica"

gh label create "needs-triage" --color "ededed" --description "🏷️ Precisa ser triado"
gh label create "ready" --color "28a745" --description "✅ Pronto para desenvolvimento"
gh label create "in-progress" --color "0052cc" --description "🚧 Em desenvolvimento"
gh label create "needs-review" --color "fbca04" --description "👀 Precisa de revisão"
gh label create "auto-merge" --color "7057ff" --description "🤖 Merge automático habilitado"

gh label create "good-first-issue" --color "7057ff" --description "🌱 Bom para iniciantes"
gh label create "help-wanted" --color "008672" --description "🙋 Ajuda necessária"
gh label create "complex" --color "d4c5f9" --description "🧠 Complexo"
```

## 📋 Uso das Labels

### Em Issues:

- **Obrigatórias**: Tipo (`bug`, `enhancement`, etc.) + Componente (`web`, `api`, etc.)
- **Recomendadas**: Prioridade + Status
- **Opcionais**: Dificuldade

### Em PRs:

- **Automáticas**: Aplicadas pelos workflows baseado no título do commit
- **Manuais**: Status (`needs-review`, `auto-merge`) conforme necessário

### Para Dependabot:

- **Automáticas**: `dependencies` + componente específico + `auto-merge`

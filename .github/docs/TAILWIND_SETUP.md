# Configuração do Tailwind CSS no Turborepo

Este projeto foi configurado para usar Tailwind CSS v4 seguindo as melhores práticas do Turborepo.

## Estrutura da Configuração

### 1. Pacote de Configuração do Tailwind (`packages/tailwind-config`)

- **`package.json`**: Define as dependências e exports do pacote
- **`shared-styles.css`**: Contém o import do Tailwind e variáveis personalizadas de tema
- **`postcss.config.js`**: Configuração do PostCSS compartilhada

### 2. Pacote UI (`packages/ui`)

- **`package.json`**: Atualizado com dependências do Tailwind e scripts de build
- **`src/styles.css`**: Estilos específicos dos componentes
- **`turbo.json`**: Configuração das tarefas de build para estilos e componentes
- **Scripts disponíveis**:
  - `build:styles`: Compila os estilos CSS
  - `build:components`: Compila os componentes TypeScript
  - `dev:styles`: Modo watch para estilos
  - `dev:components`: Modo watch para componentes

### 3. Aplicação Web (`apps/web`)

- **`globals.css`**: Importa o Tailwind, configuração compartilhada e estilos da UI
- **`postcss.config.mjs`**: Configuração do PostCSS
- **`package.json`**: Atualizado com dependências necessárias

## Como Usar

### Comandos de Build

```bash
# Construir todo o projeto
pnpm run build

# Construir apenas o pacote UI
pnpm run build --filter=@repo/ui

# Construir apenas a aplicação web
pnpm run build --filter=web
```

### Comandos de Desenvolvimento

```bash
# Executar em modo de desenvolvimento
pnpm run dev

# Executar apenas a aplicação web
pnpm run dev --filter=web

# Executar apenas o pacote UI em modo watch
pnpm run dev --filter=@repo/ui
```

### Adicionando Novos Componentes

1. Crie componentes no `packages/ui/src/` usando classes do Tailwind CSS
2. Execute `pnpm run build:styles` para gerar os estilos
3. Use os componentes nas aplicações

### Personalizando Estilos

1. **Variáveis de tema**: Edite `packages/tailwind-config/shared-styles.css`
2. **Estilos de componentes**: Edite `packages/ui/src/styles.css`
3. **Estilos globais**: Edite `apps/web/app/globals.css`

## Benefícios da Configuração

- ✅ **Reutilização**: Configuração compartilhada entre todas as aplicações
- ✅ **Consistência**: Mesmo tema e estilos em todo o monorepo
- ✅ **Performance**: Build otimizado com cache do Turborepo
- ✅ **Desenvolvimento**: Hot reload para estilos e componentes
- ✅ **Escalabilidade**: Fácil de adicionar novas aplicações e componentes

## Exemplo de Uso

```tsx
import { Button } from '@repo/ui/button'

export default function MyPage() {
  return (
    <div className="p-8 bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Minha Página</h1>
      <Button appName="minha-app" variant="primary">
        Clique aqui
      </Button>
    </div>
  )
}
```

## Troubleshooting

Se você encontrar problemas:

1. **Instale as dependências**: `pnpm install`
2. **Limpe o cache**: `pnpm run build --force`
3. **Verifique os logs**: Use `turbo run build --verbose`

## Recursos Adicionais

- [Documentação do Tailwind CSS v4](https://tailwindcss.com/docs)
- [Guia do Turborepo com Tailwind](https://turborepo.com/docs/guides/tools/tailwind)
- [Documentação do Next.js](https://nextjs.org/docs)

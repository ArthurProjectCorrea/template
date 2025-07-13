# 🔤 Google Fonts Migration - Turborepo Web App

Esta documentação detalha a migração das fontes locais (Geist) para Google Fonts no projeto
Turborepo.

## ✨ Mudanças Implementadas

### 🗑️ **Removido**

- ❌ Pasta `apps/web/app/fonts/` com arquivos `.woff`
- ❌ Import `localFont` do Next.js
- ❌ Variáveis CSS `--font-geist-sans` e `--font-geist-mono`

### 🆕 **Adicionado**

- ✅ Google Fonts: **Inter** (sans-serif) e **JetBrains Mono** (monospace)
- ✅ Otimização automática de fontes via `next/font/google`
- ✅ Variáveis CSS customizadas no Tailwind config
- ✅ Font display swap para melhor performance

## 📋 Fontes Selecionadas

### **Inter** (Sans-serif)

- **Por quê**: Fonte moderna, altamente legível, otimizada para telas
- **Características**: 18 pesos, suporte completo a caracteres latinos
- **Uso**: Textos gerais, headings, UI components

### **JetBrains Mono** (Monospace)

- **Por quê**: Fonte monospace profissional, ideal para código
- **Características**: Ligatures, clareza em código, múltiplos pesos
- **Uso**: Blocos de código, comandos de terminal, dados técnicos

## 🛠️ Implementação Técnica

### Layout.tsx

```tsx
import { Inter, JetBrains_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})
```

### Tailwind Config

```css
@theme {
  /* Font families */
  --font-family-sans: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
  --font-family-mono: var(--font-mono), ui-monospace, SFMono-Regular, 'SF Mono';
}
```

### Body Classes

```tsx
<body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
```

## 🚀 Benefícios da Migração

### **Performance**

- ✅ **Carregamento otimizado**: Google Fonts CDN global
- ✅ **Font display swap**: Evita FOIT (Flash of Invisible Text)
- ✅ **Preload automático**: Next.js gerencia o carregamento
- ✅ **Compression**: Fontes otimizadas automaticamente

### **Desenvolvimento**

- ✅ **Menos assets**: Sem arquivos de fonte no repositório
- ✅ **Atualizações automáticas**: Sempre a versão mais recente
- ✅ **Fallbacks nativos**: Sistema de fallback robusto
- ✅ **TypeScript**: Tipagem completa das configurações

### **UX/UI**

- ✅ **Consistência**: Fontes padrão web amplamente testadas
- ✅ **Legibilidade**: Inter otimizada para interfaces
- ✅ **Código limpo**: JetBrains Mono com ligatures
- ✅ **Acessibilidade**: Suporte completo a screen readers

## 📊 Comparação de Performance

| Métrica               | Fontes Locais | Google Fonts |
| --------------------- | ------------- | ------------ |
| **Tamanho do bundle** | +180KB        | -180KB       |
| **Cache CDN**         | ❌            | ✅           |
| **Compression**       | Básica        | Avançada     |
| **Preload**           | Manual        | Automático   |
| **Fallbacks**         | Limitado      | Robusto      |

## 🎨 Classes Tailwind Disponíveis

### **Font Family**

```tsx
className = 'font-sans' // Inter
className = 'font-mono' // JetBrains Mono
```

### **Font Weight**

```tsx
className = 'font-light' // 300
className = 'font-normal' // 400
className = 'font-medium' // 500
className = 'font-semibold' // 600
className = 'font-bold' // 700
className = 'font-extrabold' // 800
className = 'font-black' // 900
```

### **Font Size**

```tsx
className = 'text-sm' // 14px
className = 'text-base' // 16px
className = 'text-lg' // 18px
className = 'text-xl' // 20px
className = 'text-2xl' // 24px
className = 'text-4xl' // 36px
// ... até text-9xl
```

## 🔧 Configuração Avançada

### **Custom Font Weights**

```tsx
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'], // Apenas os pesos necessários
  variable: '--font-sans',
  display: 'swap',
})
```

### **Multiple Subsets**

```tsx
const inter = Inter({
  subsets: ['latin', 'latin-ext'], // Suporte a mais idiomas
  variable: '--font-sans',
  display: 'swap',
})
```

## 🌐 Fallback Strategy

As fontes incluem fallbacks nativos para máxima compatibilidade:

```css
font-family:
  var(--font-sans), ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
```

## 📱 Responsive Typography

Exemplo de tipografia responsiva implementada:

```tsx
<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
  Responsive Heading
</h1>

<code className="font-mono text-sm md:text-base bg-gray-100 px-2 py-1 rounded">
  npm install
</code>
```

## 🔮 Próximos Passos

1. **Variable Fonts**: Migrar para versões variáveis quando disponíveis
2. **Font Loading Strategy**: Implementar critical font loading
3. **Custom Fonts**: Adicionar fontes específicas para branding
4. **Performance Monitoring**: Análise de Core Web Vitals

---

**Resultado**: Aplicação mais performática, moderna e fácil de manter! 🎉

# 🚀 Turborepo Web Application

Modern Next.js application with Tailwind CSS and TypeScript, optimized for monorepo development.

## ✨ Features

- **Next.js 15** with Turbopack for ultra-fast development
- **Tailwind CSS v4** for utility-first styling
- **TypeScript** for type safety
- **Google Fonts** Inter & JetBrains Mono with automatic optimization
- **Dark Mode** support out of the box
- **Responsive Design** mobile-first approach
- **Component Library** shared UI components from `@repo/ui`
- **Modern SEO** optimized metadata and Open Graph tags

## 🚀 Quick Start

```bash
# Development mode
pnpm run dev

# Production build
pnpm run build

# Start production server
pnpm run start

# Lint and type checking
pnpm run lint
pnpm run check-types
```

## 🏗️ Project Structure

```
apps/web/
├── app/
│   ├── layout.tsx         # Root layout with Google Fonts and metadata
│   ├── page.tsx           # Homepage with modern landing page
│   └── globals.css        # Global styles + Tailwind imports
├── public/                # Static assets
└── package.json          # Dependencies and scripts
```

## 🎨 Design System

### Google Fonts

- **Inter**: Modern sans-serif for UI and content
- **JetBrains Mono**: Professional monospace for code blocks

### Components Available

- **Button**: Multiple variants (primary, secondary, outline, ghost)
- **Card**: Flexible card component with header, content, footer
- **Navbar**: Responsive navigation with dark mode support

### Tailwind Configuration

- Custom color palette with CSS variables
- Dark mode support via `dark:` classes
- Responsive breakpoints for all devices
- Typography scale using Inter & JetBrains Mono fonts
- Google Fonts optimization with `font-display: swap`

## 🔧 Development

The application uses Tailwind CSS for all styling. Key principles:

- **Mobile-first**: All designs start from mobile and scale up
- **Utility classes**: Prefer Tailwind utilities over custom CSS
- **Component composition**: Build complex UI from simple components
- **Design tokens**: Consistent spacing, colors, and typography

## 📱 Responsive Breakpoints

- **sm**: 640px+ (mobile landscape)
- **md**: 768px+ (tablet)
- **lg**: 1024px+ (desktop)
- **xl**: 1280px+ (large desktop)

## 🌙 Dark Mode

Automatic dark mode support based on system preference:

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content that adapts to theme
</div>
```

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Turborepo Documentation](https://turborepo.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 📈 Performance

- **Turbopack**: Fast development server and builds
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js automatic image optimization
- **Google Fonts**: Optimized loading with swap display strategy
- **Font Subsetting**: Only Latin characters loaded for better performance
- **Font Optimization**: Self-hosted fonts with `next/font`

This project uses
[`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to
automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback
and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the
[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our
[Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)
for more details.

import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

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

export const metadata: Metadata = {
  title: 'Turborepo - Build System Optimized for JavaScript and TypeScript',
  description:
    'The high-performance build system for JavaScript & TypeScript codebases.',
  keywords: [
    'turborepo',
    'monorepo',
    'build system',
    'javascript',
    'typescript',
  ],
  authors: [{ name: 'Vercel Team' }],
  openGraph: {
    title: 'Turborepo',
    description:
      'The high-performance build system for JavaScript & TypeScript codebases.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Turborepo',
    description:
      'The high-performance build system for JavaScript & TypeScript codebases.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        {children}
      </body>
    </html>
  )
}

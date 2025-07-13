'use client'

import { ReactNode } from 'react'

interface NavbarProps {
  children?: ReactNode
  className?: string
}

export const Navbar = ({ children, className = '' }: NavbarProps) => {
  return (
    <nav
      className={`fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <TurborepoLogo />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Turborepo
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="/docs">Documentation</NavLink>
            <NavLink href="/examples">Examples</NavLink>
            <NavLink href="https://github.com/vercel/turborepo">GitHub</NavLink>
          </div>
          {children}
        </div>
      </div>
    </nav>
  )
}

interface NavLinkProps {
  href: string
  children: ReactNode
  external?: boolean
}

export const NavLink = ({ href, children, external = false }: NavLinkProps) => {
  const props = external
    ? {
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {}

  return (
    <a
      href={href}
      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
      {...props}
    >
      {children}
    </a>
  )
}

export const TurborepoLogo = ({ className = '' }: { className?: string }) => (
  <div className={`relative w-8 h-8 ${className}`}>
    <img
      src="/turborepo-dark.svg"
      alt="Turborepo logo"
      className="w-full h-full dark:hidden"
    />
    <img
      src="/turborepo-light.svg"
      alt="Turborepo logo"
      className="w-full h-full hidden dark:block"
    />
  </div>
)

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../app/page'

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(<Home />)

    // Check if the component renders successfully
    const container = screen.getByText('🚀 Quick Start')
    expect(container).toBeInTheDocument()
  })

  it('renders the Turborepo logo', () => {
    render(<Home />)

    const logos = screen.getAllByAltText('Turborepo logo')
    expect(logos.length).toBeGreaterThan(0)
    expect(logos[0]).toBeInTheDocument()
  })

  it('renders the deploy button', () => {
    render(<Home />)

    const deployButton = screen.getByText('Deploy Template')
    expect(deployButton).toBeInTheDocument()
  })

  it('renders the documentation link', () => {
    render(<Home />)

    const docsLink = screen.getByText('Read Documentation')
    expect(docsLink).toBeInTheDocument()
  })

  it('renders the features section', () => {
    render(<Home />)

    // Check for the description text instead
    const description = screen.getByText(
      /Scale your JavaScript & TypeScript monorepos/
    )
    expect(description).toBeInTheDocument()
  })

  it('renders the quick start section', () => {
    render(<Home />)

    const quickStartHeading = screen.getByText('🚀 Quick Start')
    expect(quickStartHeading).toBeInTheDocument()
  })

  it('renders command instructions', () => {
    render(<Home />)

    // Check for the first command without duplicates
    const commands = screen.getAllByText('npx create-turbo@latest')
    expect(commands.length).toBeGreaterThan(0)
    expect(commands[0]).toBeInTheDocument()
  })
})

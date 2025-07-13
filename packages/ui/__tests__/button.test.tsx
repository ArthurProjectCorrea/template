import { render, screen } from '@testing-library/react'
import { Button } from '../src/button'

// Mock button tests
describe('Button Component', () => {
  it('renders children correctly', () => {
    render(<Button>Test Button</Button>)

    const button = screen.getByText('Test Button')
    expect(button).toBeInTheDocument()
  })

  it('applies primary variant classes by default', () => {
    render(<Button>Primary Button</Button>)

    const button = screen.getByText('Primary Button')
    expect(button).toHaveClass('bg-gray-900')
  })

  it('applies secondary variant classes', () => {
    render(<Button variant="secondary">Secondary Button</Button>)

    const button = screen.getByText('Secondary Button')
    expect(button).toHaveClass('bg-gray-100')
  })

  it('shows loading state', () => {
    render(<Button isLoading>Loading Button</Button>)

    const loadingText = screen.getByText('Loading...')
    expect(loadingText).toBeInTheDocument()
  })

  it('can be disabled', () => {
    render(<Button disabled>Disabled Button</Button>)

    const button = screen.getByText('Disabled Button')
    expect(button).toBeDisabled()
  })

  it('handles onClick events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click Me</Button>)

    const button = screen.getByText('Click Me')
    button.click()

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})

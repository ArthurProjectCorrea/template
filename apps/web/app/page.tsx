import Image, { type ImageProps } from 'next/image'
import { Button } from '@repo/ui/button'
import { Card, CardHeader, CardContent } from '@repo/ui/card'

type Props = Omit<ImageProps, 'src'> & {
  srcLight: string
  srcDark: string
}

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  )
}

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) => (
  <Card
    variant="elevated"
    className="text-center hover:scale-105 transition-transform"
  >
    <CardContent>
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </CardContent>
  </Card>
)

const StepCard = ({
  step,
  title,
  description,
  code,
}: {
  step: number
  title: string
  description: string
  code?: string
}) => (
  <Card className="relative">
    <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
      {step}
    </div>
    <CardContent className="pt-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      {code && (
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 font-mono text-sm overflow-x-auto">
          <code className="text-gray-800 dark:text-gray-200">{code}</code>
        </div>
      )}
    </CardContent>
  </Card>
)

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent dark:from-blue-900/10"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <div className="mb-8 flex justify-center">
            <ThemeImage
              srcLight="turborepo-dark.svg"
              srcDark="turborepo-light.svg"
              alt="Turborepo logo"
              width={240}
              height={60}
              priority
              className="mb-8"
            />
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            The{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              High-Performance
            </span>
            <br />
            Build System
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Scale your JavaScript & TypeScript monorepos with intelligent
            caching, parallel execution, and seamless development workflows.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="https://vercel.com/new/clone?demo-description=Learn+to+implement+a+monorepo+with+a+two+Next.js+sites+that+has+installed+three+local+packages.&demo-image=%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F4K8ZISWAzJ8X1504ca0zmC%2F0b21a1c6246add355e55816278ef54bc%2FBasic.png&demo-title=Monorepo+with+Turborepo&demo-url=https%3A%2F%2Fexamples-basic-web.vercel.sh%2F&from=templates&project-name=Monorepo+with+Turborepo&repository-name=monorepo-turborepo&repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fturborepo%2Ftree%2Fmain%2Fexamples%2Fbasic&root-directory=apps%2Fdocs&skippable-integrations=1&teamSlug=vercel&utm_source=create-turbo"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Button
                size="lg"
                className="group-hover:shadow-lg transition-shadow"
              >
                <Image
                  src="/vercel.svg"
                  alt="Vercel logomark"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Deploy Template
              </Button>
            </a>

            <a
              href="https://turborepo.com/docs?utm_source"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg">
                Read Documentation
              </Button>
            </a>
          </div>

          {/* Quick Start Section */}
          <Card variant="elevated" className="max-w-2xl mx-auto text-left">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                🚀 Quick Start
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Get started with Turborepo in seconds
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <div className="text-gray-400 mb-2">
                    # Create a new turborepo
                  </div>
                  <code className="text-green-400">
                    npx create-turbo@latest
                  </code>
                </div>
                <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <div className="text-gray-400 mb-2"># Start development</div>
                  <code className="text-blue-400">
                    cd my-turborepo && npm run dev
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Turborepo?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Built for teams that want to move fast without breaking things
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <FeatureCard
              icon="⚡"
              title="Lightning Fast"
              description="Intelligent caching and parallel execution make builds up to 85% faster"
            />
            <FeatureCard
              icon="🔄"
              title="Incremental Builds"
              description="Only rebuild what changed. Skip work that's already been done."
            />
            <FeatureCard
              icon="📦"
              title="Monorepo Ready"
              description="Perfect for managing multiple packages, apps, and shared libraries"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard
              icon="🎯"
              title="Smart Caching"
              description="Local and remote caching ensures you never build the same thing twice"
            />
            <FeatureCard
              icon="🛠️"
              title="Zero Config"
              description="Works with any build tool. No migration required."
            />
          </div>
        </div>
      </section>

      {/* Getting Started Steps */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Get Started in 3 Steps
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Transform your development workflow in minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              step={1}
              title="Create Project"
              description="Start with our template or add to existing repo"
              code="npx create-turbo@latest"
            />
            <StepCard
              step={2}
              title="Configure Tasks"
              description="Define your build pipeline in turbo.json"
              code={`{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"]
    }
  }
}`}
            />
            <StepCard
              step={3}
              title="Run & Scale"
              description="Execute tasks across your entire monorepo"
              code="turbo run build test lint"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
            <div className="flex items-center space-x-4">
              <ThemeImage
                srcLight="turborepo-light.svg"
                srcDark="turborepo-light.svg"
                alt="Turborepo logo"
                width={32}
                height={32}
              />
              <span className="text-xl font-bold">Turborepo</span>
            </div>

            <div className="flex flex-wrap justify-center md:justify-end gap-8 text-sm">
              <a
                href="https://vercel.com/templates?search=turborepo&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
              >
                <Image
                  aria-hidden
                  src="/window.svg"
                  alt="Window icon"
                  width={16}
                  height={16}
                />
                <span>Templates</span>
              </a>
              <a
                href="https://turborepo.com?utm_source=create-turbo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
              >
                <Image
                  aria-hidden
                  src="/globe.svg"
                  alt="Globe icon"
                  width={16}
                  height={16}
                />
                <span>turborepo.com →</span>
              </a>
              <a
                href="https://github.com/vercel/turborepo"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://turborepo.com/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                Documentation
              </a>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 Vercel Inc. Built with Turborepo and Next.js.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

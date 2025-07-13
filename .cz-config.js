module.exports = {
  types: [
    {
      value: 'feat',
      name: '✨ feat:     Uma nova funcionalidade',
      emoji: '✨'
    },
    {
      value: 'fix',
      name: '🐛 fix:      Uma correção de bug',
      emoji: '🐛'
    },
    {
      value: 'docs',
      name: '📚 docs:     Apenas mudanças de documentação',
      emoji: '📚'
    },
    {
      value: 'style',
      name: '💄 style:    Mudanças que não afetam o significado do código (espaços, formatação, etc)',
      emoji: '💄'
    },
    {
      value: 'refactor',
      name: '♻️  refactor: Uma mudança de código que não corrige um bug nem adiciona uma feature',
      emoji: '♻️'
    },
    {
      value: 'perf',
      name: '⚡ perf:     Uma mudança de código que melhora a performance',
      emoji: '⚡'
    },
    {
      value: 'test',
      name: '🧪 test:     Adicionando testes ausentes ou corrigindo testes existentes',
      emoji: '🧪'
    },
    {
      value: 'build',
      name: '🏗️  build:    Mudanças que afetam o sistema de build ou dependências externas',
      emoji: '🏗️'
    },
    {
      value: 'ci',
      name: '🎡 ci:       Mudanças nos arquivos e scripts de CI',
      emoji: '🎡'
    },
    {
      value: 'chore',
      name: '🔧 chore:    Outras mudanças que não modificam src ou arquivos de teste',
      emoji: '🔧'
    },
    {
      value: 'revert',
      name: '⏪ revert:   Reverte um commit anterior',
      emoji: '⏪'
    },
    {
      value: 'ui',
      name: '🎨 ui:       Mudanças relacionadas à interface do usuário',
      emoji: '🎨'
    },
    {
      value: 'deps',
      name: '📦 deps:     Atualizações de dependências',
      emoji: '📦'
    }
  ],

  scopes: [
    { name: 'web', description: 'Frontend (Next.js app)' },
    { name: 'api', description: 'Backend (NestJS app)' },
    { name: 'ui', description: 'UI components package' },
    { name: 'config', description: 'Configuration packages' },
    { name: 'docs', description: 'Documentation' },
    { name: 'ci', description: 'CI/CD pipelines' },
    { name: 'deps', description: 'Dependencies' },
    { name: 'workspace', description: 'Workspace configuration' }
  ],

  allowTicketNumber: true,
  isTicketNumberRequired: false,
  ticketNumberPrefix: '#',
  ticketNumberRegExp: '\\d{1,5}',

  // Override the messages
  messages: {
    type: '🎯 Selecione o tipo de mudança que você está commitando:',
    scope: '📦 Denote o escopo desta mudança (opcional):',
    customScope: '📦 Denote o escopo desta mudança:',
    subject: '📝 Escreva uma descrição curta e imperativa da mudança:\n',
    body: '📋 Forneça uma descrição mais longa da mudança (opcional). Use "|" para quebrar nova linha:\n',
    breaking: '💥 Liste qualquer BREAKING CHANGE (opcional):\n',
    footer: '🔗 Liste qualquer issue fechada por esta mudança (opcional). Ex.: #31, #34:\n',
    confirmCommit: '✅ Você tem certeza de que quer proceder com o commit acima?'
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['ticketNumber'],

  // Limit subject length
  subjectLimit: 100,
  
  // Break line char
  breaklineChar: '|',
  footerPrefix: 'ISSUES FECHADAS:',
  askForBreakingChangeFirst: true
}

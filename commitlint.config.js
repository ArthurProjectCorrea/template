export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Tipos permitidos (reordenados por prioridade)
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
        'ui',
        'deps',
      ],
    ],
    
    // Scopes permitidos (simplificados)
    'scope-enum': [
      1, // Warning level (não obrigatório)
      'always',
      [
        'web',
        'api',
        'ui',
        'config',
        'docs',
        'ci',
        'deps',
        'workspace',
      ],
    ],
    
    // Configurações de formato
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-max-length': [2, 'always', 100],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'header-max-length': [2, 'always', 100],
    
    // Formatação do body e footer
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
  },
};

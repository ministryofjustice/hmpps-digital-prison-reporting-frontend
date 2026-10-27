import typescriptParser from '@typescript-eslint/parser'
import cypress from 'eslint-plugin-cypress'
import { importX } from 'eslint-plugin-import-x'
import noOnlyTests from 'eslint-plugin-no-only-tests'

export default [
  {
    ignores: ['cypress-tests/mockApis/**/*'],
  },
  {
    ...cypress.configs.recommended,
    files: ['**/*.{js,jsx,ts,tsx}'],
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      cypress,
      'import-x': importX,
      'no-only-tests': noOnlyTests,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: 'cypress-tests/tsconfig.json',
      },
    },
    rules: {
      'import-x/prefer-default-export': 'off',
      'import-x/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
        },
      ],
      'no-only-tests/no-only-tests': 'error',
    },
  },
]

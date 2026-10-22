/* eslint-disable import/no-extraneous-dependencies */

import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import { defineConfig, globalIgnores } from '@eslint/config-helpers'
import { FlatCompat } from '@eslint/eslintrc'
import TypescriptEslint from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import Import from 'eslint-plugin-import'
import NoOnlyTests from 'eslint-plugin-no-only-tests'
import globals from 'globals'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})
export default defineConfig([
  globalIgnores([
    'node_modules/',
    'package/',
    'assets/',
    'docs/',
    'dist/',
    'dist-test-app/',
    'dist-docs',
    '**/init.js',
    'test-app/',
    'playwright-report/',
    'logs',
    '*.log',
    'npm-debug.log*',
    'yarn-debug.log*',
    'yarn-error.log*',
    'lerna-debug.log*',
    '.pnpm-debug.log*',
    'report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json',
    'pids',
    '*.pid',
    '*.seed',
    '*.pid.lock',
    'lib-cov',
    'coverage',
    '*.lcov',
    '.nyc_output',
    '.grunt',
    'bower_components',
    '.lock-wscript',
    'build/Release',
    'node_modules/',
    'jspm_packages/',
    'web_modules/',
    '*.tsbuildinfo',
    '.npm',
    '.eslintcache',
    '.stylelintcache',
    '.rpt2_cache/',
    '.rts2_cache_cjs/',
    '.rts2_cache_es/',
    '.rts2_cache_umd/',
    '.node_repl_history',
    '*.tgz',
    '.yarn-integrity',
    '.env',
    '.env.development.local',
    '.env.test.local',
    '.env.production.local',
    '.env.local',
    '.cache',
    '.parcel-cache',
    '.next',
    'out',
    '.nuxt',
    'dist',
    '.cache/',
    '.vuepress/dist',
    '.temp',
    '.docusaurus',
    '.serverless/',
    '.fusebox/',
    '.dynamodb/',
    '.tern-port',
    '.vscode-test',
    '.yarn/cache',
    '.yarn/unplugged',
    '.yarn/build-state.yml',
    '.yarn/install-state.gz',
    '.pnp.*',
    '.DS_Store',
    '.port.tmp',
    '.tmp',
    '.vscode/',
    'node_modules',
    'npm-debug.log',
    'sass-cache',
    'settings.json',
    'tmp-uploads',
    'pre-package/',
    'package/*/',
    'package/package.zip',
    '/.idea/',
    '/test_results/',
    '/cypress-tests/**/videos/',
    '/cypress-tests/**/screenshots/',
    'axe_results.json',
    'dist-test-app',
    'dist-docs',
    'all-imports-bundle.scss',
    'cypress',
    '/test-results/',
    '/playwright-report/',
    '/blob-report/',
    '/playwright/.cache/',
    '/playwright/.auth/',
    'src/dpr/components/_dashboards/visual-regression-tests/**/*-darwin.png',
    'cypress-tests/mockApis/**/*',
  ]),
  {
    extends: fixupConfigRules(
      compat.extends('plugin:@typescript-eslint/eslint-recommended', 'plugin:prettier/recommended'),
    ),
    plugins: {
      import: fixupPluginRules(Import),
      'no-only-tests': fixupPluginRules(NoOnlyTests),
    },
    settings: {
      'import/resolver': {
        typescript: true,
      },
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
      parser: typescriptParser,
    },
    rules: {
      'dot-notation': 'off',
      'import/prefer-default-export': 'off',
      'no-use-before-define': 0,
      semi: 0,
      'import/no-unresolved': 'error',
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          mjs: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'comma-dangle': ['error', 'always-multiline'],
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.spec.ts',
            '**/*.test.js',
            '**/*.test.ts',
            '**/testutils/**',
            'playwright.config.ts',
            'cypress.config.ts',
            'cypress.testapp.config.ts',
            'sharedCypressConfig.ts',
          ],
        },
      ],
      'no-only-tests/no-only-tests': 'error',
      'prettier/prettier': [
        'error',
        {
          trailingComma: 'all',
          singleQuote: true,
          printWidth: 120,
          semi: false,
        },
      ],
      'no-unused-vars': [
        1,
        {
          argsIgnorePattern: 'res|next|^err|_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    files: ['**/*.ts'],
    ignores: ['*.js'],
    extends: fixupConfigRules(
      compat.extends('plugin:@typescript-eslint/eslint-recommended', 'plugin:prettier/recommended'),
    ),
    plugins: {
      '@typescript-eslint': fixupPluginRules(TypescriptEslint),
    },
    settings: {
      'import/resolver': {
        typescript: true,
      },
    },
    languageOptions: {
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        project: '**/tsconfig.json',
      },
    },
    rules: {
      'import/no-named-as-default': 0,
      'import/no-named-as-default-member': 0,
      'class-methods-use-this': 0,
      'no-useless-constructor': 0,
      'no-unused-vars': 'off',
      'no-console': 'error',
      'no-param-reassign': ['error', { props: false }],
      'import/no-unresolved': 'error',
      'prettier/prettier': [
        'error',
        {
          trailingComma: 'all',
          singleQuote: true,
          printWidth: 120,
          semi: false,
        },
      ],
      'no-shadow': 'off',
      '@typescript-eslint/no-use-before-define': 0,
      '@typescript-eslint/no-shadow': ['error'],
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        1,
        {
          argsIgnorePattern: 'res|next|^err|_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/semi': 0,
    },
  },
])

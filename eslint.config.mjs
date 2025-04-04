import hmppsConfig from '@ministryofjustice/eslint-config-hmpps'

export default hmppsConfig({
  extraIgnorePaths: [
    'cypress-tests/**',
    'node_modules/**',
    'package/**',
    'assets/**',
    'docs/**',
    '**/init.js',
    'gulpfile.js',
    'gulp/**',
    'test-app/',
    '.eleventy.js',
    '**/*.test.ts',
  ],
})

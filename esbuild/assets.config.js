/* eslint-disable import/no-extraneous-dependencies */

const path = require('node:path')
const { copy } = require('esbuild-plugin-copy')
const { sassPlugin } = require('esbuild-sass-plugin')
const { clean } = require('esbuild-plugin-clean')
const manifestPlugin = require('esbuild-plugin-manifest')
const esbuild = require('esbuild')
const { glob } = require('glob')

/**
 * Copy additional assets into distribution
 * @type {import('./types').BuildStep}
 */
const buildAdditionalAssets = (buildConfig) => {
  return esbuild.build({
    outdir: buildConfig.assets.outDir,
    plugins: [
      copy({
        resolveFrom: 'cwd',
        assets: buildConfig.assets.copy,
      }),
    ],
  })
}

/**
 * Build scss and javascript assets
 * @type {import('./types').BuildStep}
 */
const buildAssets = (buildConfig) => {
  return esbuild.build({
    entryPoints: buildConfig.assets.entryPoints,
    outdir: buildConfig.assets.outDir,
    entryNames: '[ext]/app',
    minify: false,
    sourcemap: !buildConfig.isProduction,
    platform: 'browser',
    target: 'es2018',
    external: ['/assets/*'],
    bundle: buildConfig.app.bundle ?? false,
    plugins: [
      clean({
        patterns: glob.sync(buildConfig.assets.clear),
      }),
      manifestPlugin({
        generate: (entries) =>
          Object.fromEntries(
            Object.entries(entries).map((paths) => paths.map((p) => p.replace(/^dist-test-app\//, '/'))),
          ),
      }),
      sassPlugin({
        quietDeps: true,
        loadPaths: [process.cwd(), path.join(process.cwd(), 'node_modules')],
      }),
    ],
  })
}

/**
 * @param {BuildConfig} buildConfig
 * @returns {Promise}
 */
module.exports = (buildConfig) => {
  process.stderr.write('\u{1b}[1m\u{2728} Building assets...\u{1b}[0m\n')

  return Promise.all([buildAssets(buildConfig), buildAdditionalAssets(buildConfig)])
}

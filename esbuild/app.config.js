// /* eslint-disable import/no-extraneous-dependencies */

// const { copy } = require('esbuild-plugin-copy')
// const esbuild = require('esbuild')
// const glob = require('glob')
// const path = require('path')

// /**
//  * Build typescript application into CommonJS
//  * @type {BuildStep}
//  */
// const buildApp = (buildConfig) => {
//   return esbuild.build({
//     entryPoints: glob.sync(buildConfig.app.entryPoints),
//     outdir: buildConfig.app.outDir,
//     bundle: false,
//     sourcemap: true,
//     // minify: buildConfig.app.minify,
//     // external: ['dtrace-provider', 'fsevents'],
//     platform: 'node',
//     format: 'cjs',
//     plugins: [
//       typecheckPlugin({
//         configFile: path.join(process.cwd(), 'tsconfig.json')
//       }),
//       copy({
//         resolveFrom: 'cwd',
//         assets: buildConfig.app.copy,
//       }),
//     ],
//   })
// }

// /**
//  * @param {BuildConfig} buildConfig
//  * @returns {Promise}
//  */
// module.exports = (buildConfig) => {
//   process.stderr.write('\u{1b}[1m\u{2728} Building app...\u{1b}[0m\n')

//   return buildApp(buildConfig)
// }


const { copy } = require('esbuild-plugin-copy')
const { typecheckPlugin } = require('@jgoz/esbuild-plugin-typecheck')
const esbuild = require('esbuild')
const glob = require('glob')

/**
 * Build typescript application into CommonJS
 * @type {BuildStep}
 */
const buildApp = buildConfig => {
  return esbuild.build({
    entryPoints: glob.sync(buildConfig.app.entryPoints),
    outdir: buildConfig.app.outDir,
    bundle: buildConfig.app.bundle,
    minify: buildConfig.app.minify,
    sourcemap: true,
    platform: 'node',
    format: 'cjs',
    plugins: [
      copy({
        resolveFrom: 'cwd',
        assets: buildConfig.app.copy,
      }),
    ],
  })
}

/**
 * @param {BuildConfig} buildConfig
 * @returns {Promise}
 */
module.exports = buildConfig => {
  process.stderr.write('\u{1b}[1m\u{2728} Building app...\u{1b}[0m\n')

  return buildApp(buildConfig)
}
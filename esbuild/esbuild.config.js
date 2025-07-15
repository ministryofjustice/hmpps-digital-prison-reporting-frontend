/* eslint-disable import/no-extraneous-dependencies */

const { spawn } = require('node:child_process')
const path = require('node:path')
const fs = require('fs')

const { glob } = require('glob')
const chokidar = require('chokidar')
const buildAssets = require('./assets.config')
const buildApp = require('./app.config')

const cwd = process.cwd()

const buildConfigLib = () => ({
  isProduction: process.env.NODE_ENV === 'production',

  app: {
    bundle: true,
    minify: true,
    outDir: path.join(cwd, 'dist/dpr'),
    entryPoints: glob
      .sync([path.join(cwd, 'src/**/*.js'), path.join(cwd, 'src/**/*.ts')])
      .filter((file) => !file.endsWith('.test.ts')),
    copy: [
      {
        from: path.join(cwd, 'src/dpr/**/*'),
        to: path.join(cwd, 'dist/dpr'),
      },
      {
        from: path.join(cwd, 'publishing/*'),
        to: path.join(cwd, 'dist'),
      },
    ],
  },
})

const buildLibrary = async () => {
  await buildApp(buildConfigLib()).catch((e) => {
    process.stderr.write(`${e}\n`)
    process.exit(1)
  })
  const scssFiles = glob.sync(['src/**/*.scss'])
  scssFiles.forEach((file) =>
    fs.appendFileSync(path.join(cwd, 'dist/dpr/all.scss'), fs.readFileSync(path.join(cwd, file))),
  )
}

/**
 * Configuration for build steps
 * @type {BuildConfig}
 */
const buildConfig = {
  isProduction: process.env.NODE_ENV === 'production',

  app: {
    bundle: false,
    minify: false,
    outDir: path.join(cwd, 'dist-test-app'),
    entryPoints: glob
      .sync([
        path.join(cwd, 'test-app/*.js'),
        path.join(cwd, 'test-app/**/*.js'),
        path.join(cwd, 'test-app/*.ts'),
        path.join(cwd, 'test-app/**/*.ts'),
      ])
      .filter((file) => !file.endsWith('.test.ts') && !file.endsWith('.test.js')),
    copy: [
      {
        from: path.join(cwd, 'test-app/views/**/*'),
        to: path.join(cwd, 'dist-test-app/views'),
      },
      {
        from: path.join(cwd, 'routes/**/*'),
        to: path.join(cwd, 'dist-test-app/routes'),
      },
    ],
  },

  assets: {
    outDir: path.join(cwd, 'dist-test-app/assets'),
    entryPoints: glob.sync([
      path.join(cwd, 'test-app/assets/application.js'),
      path.join(cwd, 'test-app/assets/application.scss'),
    ]),
    clear: glob.sync([path.join(cwd, 'dist-test-app/assets/{css,js}')]),
  },
}

const buildLibraryThenApp = async () => {
  await buildLibrary().catch((e) => {
    process.stderr.write(`${e}\n`)
    process.exit(1)
  })
  await Promise.all([buildApp(buildConfig), buildAssets(buildConfig)]).catch((e) => {
    process.stderr.write(`${e}\n`)
    process.exit(1)
  })
}

const main = async () => {
  await buildLibrary()
  /**
   * @type {chokidar.WatchOptions}
   */
  const chokidarOptions = {
    persistent: true,
    ignoreInitial: true,
  }

  const args = process.argv
  if (args.includes('--build')) {
    Promise.all([buildApp(buildConfig), buildAssets(buildConfig)]).catch((e) => {
      process.stderr.write(`${e}\n`)
      process.exit(1)
    })
  }

  if (args.includes('--dev-server')) {
    let serverProcess = null
    chokidar
      .watch(['dist-test-app/**/*', 'dist/**/*'], {
        ignored: ['**/*.cy.ts'],
      })
      .on('all', () => {
        if (serverProcess) serverProcess.kill()
        serverProcess = spawn('node', ['dist-test-app/server.js'], { stdio: 'inherit' })
      })
  }

  if (args.includes('--watch')) {
    process.stderr.write('\u{1b}[1m\u{1F52D} Watching for changes...\u{1b}[0m\n')
    // Assets
    chokidar
      .watch(['src/dpr/assets/**/*'], chokidarOptions)
      .on('all', () => buildAssets(buildConfig).catch((e) => process.stderr.write(`${e}\n`)))

    // App
    chokidar
      .watch(['test-app/**/*'], { ...chokidarOptions, ignored: ['**/*.test.ts', '**/*.cy.ts', 'manifest.json'] })
      .on('all', () =>
        Promise.all([buildApp(buildConfig), buildAssets(buildConfig)]).catch((e) => process.stderr.write(`${e}\n`)),
      )

    chokidar
      .watch(['src/**/*'], { ...chokidarOptions, ignored: ['**/*.test.ts', '**/*.cy.ts', 'manifest.json'] })
      .on('all', () => buildLibraryThenApp().catch((e) => process.stderr.write(`${e}\n`)))
  }
}

main()

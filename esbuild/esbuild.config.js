const fs = require('fs')
const { spawn } = require('node:child_process')
const path = require('node:path')

const { glob } = require('glob')
const chokidar = require('chokidar')
const buildAssets = require('./assets.config')
const buildApp = require('./app.config')

const cwd = process.cwd()

/**
 * Configuration for build steps
 * @type {BuildConfig}
 */
const buildConfig = {
  isProduction: process.env.NODE_ENV === 'production',

  app: {
    outDir: path.join(cwd, 'dist'),
    entryPoints: glob
      .sync([path.join(cwd, '*.ts'), path.join(cwd, '*.js'),path.join(cwd, 'test-app/**/*.ts'), path.join(cwd, 'test-app/**/*.js'), path.join(cwd, 'src/**/*.js'), path.join(cwd, 'src/**/*.ts')])
      .filter(file => !file.endsWith('.test.ts')),
    copy: [
      {
        from: path.join(cwd, 'server/views/**/*'),
        to: path.join(cwd, 'dist/server/views'),
      },
      {
        from: path.join(cwd, 'server/routes/journeys/**/*'),
        to: path.join(cwd, 'dist/server/routes/journeys'),
      },
      {
        from: path.join(cwd, 'server/routes/**/*'),
        to: path.join(cwd, 'dist/server/routes'),
      },
      {
        from: path.join(cwd, 'src/dpr/**/*'),
        to: path.join(cwd, 'dist/src/dpr'),
      },
      {
        from: path.join(cwd, 'test-app/**/*'),
        to: path.join(cwd, 'dist/test-app'),
      },
    ],
  },

  assets: {
    outDir: path.join(cwd, 'dist/assets'),
    entryPoints: glob.sync([path.join(cwd, 'assets/js/index.js'), path.join(cwd, 'assets/scss/application.scss'), path.join(cwd, 'assets/all-imports-bundle.scss'),]),
    copy: [
      {
        from: path.join(cwd, 'assets/images/**/*'),
        to: path.join(cwd, 'dist/assets/images'),
      },
    ],
    clear: glob.sync([path.join(cwd, 'dist/assets/{css,js}')]),
  },
}

const main = () => {
  /**
   * @type {chokidar.WatchOptions}
   */
  const chokidarOptions = {
    persistent: true,
    ignoreInitial: true,
  }

  const args = process.argv
  const scssFiles = glob.sync(['src/**/*.scss'])
  const imports = scssFiles.map(file => `@import '${file}';`).join('\n')
  const allImportsBundle = 'assets/all-imports-bundle.scss'
  fs.writeFileSync(allImportsBundle, imports, {
    flush: true
  })
  
  if (args.includes('--build')) {
    Promise.all([buildApp(buildConfig), buildAssets(buildConfig)]).catch(e => {
      process.stderr.write(`${e}\n`)
      process.exit(1)
    })
  }

  if (args.includes('--dev-server')) {
    let serverProcess = null
    chokidar
      .watch(['dist'], {
        ignored: ['**/*.cy.ts'],
      })
      .on('all', () => {
        if (serverProcess) serverProcess.kill()
        serverProcess = spawn('node', ['--env-file=.env', 'dist/test-app/server.js'], { stdio: 'inherit' })
      })
  }
  if (args.includes('--dev-test-server')) {
    let serverProcess = null
    chokidar
      .watch(['dist'], {
        ignored: ['**/*.cy.ts'],
      })
      .on('all', () => {
        if (serverProcess) serverProcess.kill()
        serverProcess = spawn('node', ['--env-file=e2e-test.env', 'dist/test-app/server.js'], { stdio: 'inherit' })
      })
  }

  if (args.includes('--watch')) {
    process.stderr.write('\u{1b}[1m\u{1F52D} Watching for changes...\u{1b}[0m\n')
    // Assets
    chokidar
      .watch(['assets/**/*'], chokidarOptions)
      .on('all', () => buildAssets(buildConfig).catch(e => process.stderr.write(`${e}\n`)))

    // App
    chokidar
      .watch(['test-app/**/*', 'src/**/*'], { ...chokidarOptions, ignored: ['**/*.test.ts', '**/*.cy.ts'] })
      .on('all', () => buildApp(buildConfig).catch(e => process.stderr.write(`${e}\n`)))
  }
}

main()
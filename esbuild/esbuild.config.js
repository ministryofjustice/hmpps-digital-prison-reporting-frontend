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
    bundle: true,
    minify: true,
    outDir: path.join(cwd, 'dist/dpr'),
    entryPoints: glob
      .sync([path.join(cwd, 'src/**/*.js'), path.join(cwd, 'src/**/*.ts')])
      .filter(file => !file.endsWith('.test.ts')),
    copy: [
      {
        // from: path.join(cwd, 'src/dpr/**/{css,js,ts,njk,scss}'),
        from: path.join(cwd, 'src/dpr/**/*'),
        to: path.join(cwd, 'dist/dpr'),

      },
    ],
  },

  assets: {
    outDir: path.join(cwd, 'dist/dpr'),
    entryPoints: glob.sync([
      path.join(cwd, 'src/dpr/assets/app.js'),
      path.join(cwd, 'esbuild/all-imports-bundle.scss')
    ]),
    copy: [
      {
        from: path.join(cwd, 'assets/images/**/*'),
        to: path.join(cwd, 'dist/assets/images'),
      },
    ],
    clear: glob.sync([path.join(cwd, 'dist/dpr/js/{css,js}')]),
  },
}

const buildLibrary = async () => {
  const scssFiles = glob.sync(['src/**/*.scss'])
  const imports = scssFiles.map(file => `@import '${file}';`).join('\n')

  const allImportsBundle = 'esbuild/all-imports-bundle.scss'
  fs.writeFileSync(allImportsBundle, imports, {
    flush: true
  })

  await Promise.all([
    buildApp(buildConfig), 
    buildAssets(buildConfig)
  ]).catch(e => {
    process.stderr.write(`${e}\n`)
    process.exit(1)
  })
}

/**
 * Configuration for build steps
 * @type {BuildConfig}
 */
const buildConfigTestApp = {
  isProduction: process.env.NODE_ENV === 'production',

  app: {
    bundle: false,
    minify: false,
    outDir: path.join(cwd, 'dist-test-app'),
    entryPoints: glob
      .sync([path.join(cwd, 'test-app/**/*.js'), path.join(cwd, 'test-app/**/*.ts')])
      .filter(file => !file.endsWith('.test.ts')),
    copy: [
      {
        // from: path.join(cwd, 'src/dpr/**/{css,js,ts,njk,scss}'),
        from: path.join(cwd, 'test-app/**/*'),
        to: path.join(cwd, 'dist-test-app'),

      },
    ],
  },

  assets: {
    outDir: path.join(cwd, 'dist-test-app'),
    entryPoints: glob.sync([
      path.join(cwd, 'test-app/serverjs'),
    ]),
    clear: glob.sync([path.join(cwd, 'dist-test-app/js/{js}'), path.join(cwd, 'dist-test-app/css/{css}')]),
  },
}

const main = async () => {
  await buildLibrary()
  Promise.all([
    buildApp(buildConfigTestApp),
    buildAssets(buildConfigTestApp)
  ]).catch(e => {
      process.stderr.write(`${e}\n`)
      process.exit(1)
    })

  const args = process.argv
  /**
   * @type {chokidar.WatchOptions}
   */
  const chokidarOptions = {
    persistent: true,
    ignoreInitial: true,
  }

  if (args.includes('--dev-server')) {
    let serverProcess = null
    chokidar
      .watch(['dist-test-app'], {
        ignored: ['**/*.cy.ts'],
      })
      .on('all', () => {
        if (serverProcess) serverProcess.kill()
        serverProcess = spawn('node', ['--env-file=.env', 'dist-test-app/server.js'], { stdio: 'inherit' })
      })
  }
  if (args.includes('--dev-test-server')) {
    let serverProcess = null
    chokidar
      .watch(['dist-test-app'], {
        ignored: ['**/*.cy.ts'],
      })
      .on('all', () => {
        if (serverProcess) serverProcess.kill()
        serverProcess = spawn('node', ['--env-file=e2e-test.env', 'dist-test-app/server.js'], { stdio: 'inherit' })
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
      .watch(['src/**/*'], { ...chokidarOptions, ignored: ['**/*.test.ts', '**/*.cy.ts'] })
      .on('all', () => buildLibrary(buildConfig).catch(e => process.stderr.write(`${e}\n`)))

    chokidar
      .watch(['test-app/**/*'], { ...chokidarOptions, ignored: ['**/*.test.ts', '**/*.cy.ts'] })
      .on('all', () => buildApp(buildConfig).catch(e => process.stderr.write(`${e}\n`)))
  }
}

main()
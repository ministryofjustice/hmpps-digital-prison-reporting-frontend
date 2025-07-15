/* eslint-disable import/no-extraneous-dependencies */

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
 * This needs to be a function because some of the files input into glob.sync dont exist until the build process has started
 * @type {BuildConfig}
 */
const buildConfig = () => ({
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
        // from: path.join(cwd, 'src/dpr/**/{css,js,ts,njk,scss}'),
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
  await Promise.all([buildApp(buildConfig())]).catch((e) => {
    process.stderr.write(`${e}\n`)
    process.exit(1)
  })
  const scssFiles = glob.sync(['src/**/*.scss'])
  scssFiles.forEach(file => fs.appendFileSync(path.join(cwd, 'dist/dpr/all.scss'), fs.readFileSync(path.join(cwd, file))))
}

/**
 * Configuration for build steps
 * @type {BuildConfig}
 */
const buildConfigTestApp = () => ({
  isProduction: process.env.NODE_ENV === 'production',

  app: {
    bundle: true,
    minify: false,
    outDir: path.join(cwd, 'dist-test-app'),
    entryPoints: glob
      .sync([path.join(cwd, 'test-app/**/*.js'), path.join(cwd, 'test-app/**/*.ts')])
      .filter((file) => !file.endsWith('.test.ts')),
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
      path.join(cwd, 'test-app/application.js'),
      path.join(cwd, 'test-app/application.scss'),
    ]),
    copy: [
      {
        from: path.join(cwd, 'assets/images/**/*'),
        to: path.join(cwd, 'dist-test-app/assets/images'),
      },
    ],
    clear: glob.sync([path.join(cwd, 'dist-test-app/**/{css,js}')]),
  },
})

const main = async () => {
  // await buildLibrary()
  await Promise.all([buildApp(buildConfigTestApp()), 
    // buildAssets(buildConfigTestApp())
  ]).catch((e) => {
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
        serverProcess = spawn('node', ['dist-test-app/server.js'], { stdio: 'inherit' })
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
        serverProcess = spawn('node', ['dist-test-app/server.js'], { stdio: 'inherit' })
      })
  }

  if (args.includes('--watch')) {
    process.stderr.write('\u{1b}[1m\u{1F52D} Watching for changes...\u{1b}[0m\n')
    // App
    chokidar
      .watch(['src/**/*'], { ...chokidarOptions, ignored: ['**/*.test.ts', '**/*.cy.ts'] })
      .on('all', () => buildLibrary(buildConfig()).catch((e) => process.stderr.write(`${e}\n`)))

    chokidar
      .watch(['test-app/**/*'], { ...chokidarOptions, ignored: ['**/*.test.ts', '**/*.cy.ts'] })
      .on('all', () => buildApp(buildConfigTestApp).catch((e) => process.stderr.write(`${e}\n`)))
  }
}

main()

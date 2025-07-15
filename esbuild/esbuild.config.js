const { spawn } = require('node:child_process')
const path = require('node:path')

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

  assets: {
    outDir: path.join(cwd, 'dist/dpr'),
    entryPoints: glob.sync([
      path.join(cwd, 'src/dpr/assets/app.js'),
      path.join(cwd, 'esbuild/all-imports-bundle.scss'),
    ]),
    copy: [
      {
        from: path.join(cwd, 'assets/images/**/*'),
        to: path.join(cwd, 'dist/assets/images'),
      },
    ],
    clear: glob.sync([path.join(cwd, 'dist/dpr/js/{css,js}')]),
  },
})

const buildLibrary = async () => {
  const scssFiles = glob.sync(['src/**/*.scss'])
  const imports = scssFiles.map((file) => `@import '${file}';`).join('\n')

  const allImportsBundle = 'esbuild/all-imports-bundle.scss'
  fs.writeFileSync(allImportsBundle, imports, {
    flush: true,
  })

  await Promise.all([buildApp(buildConfigLib()), buildAssets(buildConfigLib())]).catch((e) => {
    process.stderr.write(`${e}\n`)
    process.exit(1)
  })
  fs.copyFileSync(path.join(cwd, 'dist/dpr/css/app.css'), path.join(cwd, 'dist/dpr/all.css'))
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
      .sync([path.join(cwd, 'test-app/*.js'), path.join(cwd, 'test-app/**/*.js'), path.join(cwd, 'test-app/*.ts'), path.join(cwd, 'test-app/**/*.ts')])
      .filter(file => !file.endsWith('.test.ts') && !file.endsWith('.test.js')),
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
    entryPoints: glob.sync([path.join(cwd, 'test-app/assets/application.js'), path.join(cwd, 'test-app/assets/application.scss')]),
    // copy: [
    //   {
    //     from: path.join(cwd, 'assets/images/**/*'),
    //     to: path.join(cwd, 'dist/assets/images'),
    //   },
    // ],
    clear: glob.sync([path.join(cwd, 'dist-test-app/assets/{css,js}')]),
  },
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
    Promise.all([buildApp(buildConfig), buildAssets(buildConfig)]).catch(e => {
      process.stderr.write(`${e}\n`)
      process.exit(1)
    })
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

  if (args.includes('--watch')) {
    process.stderr.write('\u{1b}[1m\u{1F52D} Watching for changes...\u{1b}[0m\n')
    // Assets
    chokidar
      .watch(['assets/**/*'], chokidarOptions)
      .on('all', () => buildAssets(buildConfig).catch(e => process.stderr.write(`${e}\n`)))

    // App
    chokidar
      .watch(['test-app/**/*'], { ...chokidarOptions, ignored: ['**/*.test.ts', '**/*.cy.ts', 'manifest.json'] })
      .on('all', () => buildApp(buildConfig).catch(e => process.stderr.write(`${e}\n`)))
  }
}

main()
const fs = require('fs')
const { spawn, execSync } = require('node:child_process')
const path = require('node:path')
const Eleventy = require("@11ty/eleventy");
const { glob } = require('glob')
const chokidar = require('chokidar')
const cwd = process.cwd()
const buildAssets = require('./assets.config')
const buildApp = require('./app.config')

/**
 * Configuration for build steps
 * @type {BuildConfig}
 */
const buildConfig = {
  isProduction: process.env.NODE_ENV === 'production',

  app: {
    bundle: true,
    minify: true,
    outDir: path.join(cwd, 'dist-docs/dpr'),
    entryPoints: glob
      .sync([path.join(cwd, 'src/**/*.js'), path.join(cwd, 'src/**/*.ts')])
      .filter(file => !file.endsWith('.test.ts')),
    copy: [
        {
          from: path.join(cwd, 'src/dpr/**/*.{png,jpg,jpeg,gif,svg}'),
          to: path.join(cwd, 'dist-docs')
        },
      {
        from: path.join(cwd, 'src/dpr/**/*'),
        to: path.join(cwd, 'dist-docs/dpr'),

      },
      {
        from: path.join(cwd, 'publishing/*'),
        to: path.join(cwd, 'dist-docs')
      },
    ],
  },

  assets: {
    outDir: path.join(cwd, 'dist-docs/dpr/assets'),
    entryPoints: glob.sync([
      path.join(cwd, 'src/dpr/assets/app.js'),
      path.join(cwd, 'esbuild/all-imports-bundle.scss')
    ]),
    copy: [
      {
        from: path.join(cwd, 'assets/images/**/*'),
        to: path.join(cwd, 'dist-docs/assets/dpr/images'),
      },
      {
        from: path.join(cwd, 'docs/assets/**/*'),
        to: path.join(cwd, 'dist-docs/dpr/assets'),
      },
      {
        from: path.join(cwd, 'node_modules/govuk-frontend/dist/govuk/assets/**/*'),
        to: path.join(cwd, 'dist-docs/dpr/assets/govuk')
      }
    ],
    clear: glob.sync([path.join(cwd, 'dist-docs/dpr/js/{css,js}')]),
  },
}

const buildLibrary = async () => {
    const args = process.argv
    const scssFiles = glob.sync([
        'docs/scss/paths.scss',
        'docs/scss/base.scss',
        'docs/scss/tabs.scss',
        'docs/scss/example.scss',
        'src/dpr/components/**/*.scss',])
    const imports = scssFiles.map(file => `@import '${file}';`).join('\n')

    const allImportsBundle = 'esbuild/all-imports-bundle.scss'
    fs.writeFileSync(allImportsBundle, imports, {
        flush: true
    })
    const pathPrefix = 'hmpps-digital-prison-reporting-frontend'
    await buildApp(buildConfig)
    await buildAssets(buildConfig)
    const pathPrefixArg = args.includes('--local') ? '' : `--pathprefix ${pathPrefix}`
    execSync(`eleventy ${pathPrefixArg} --input=${path.join(cwd, "docs")} --output=${path.join(cwd, "dist-docs/dpr")}`, {
        stdio: 'inherit'
    })
    const appCssContents = String(fs.readFileSync('dist-docs/dpr/assets/css/app.css'))
    const updatedContents = appCssContents.replace(/url\(\/assets/g, `url(/${pathPrefix}/assets`)
    fs.writeFileSync('dist-docs/dpr/assets/css/app.css', updatedContents)
}

const main = async () => {
  await buildLibrary()

  const args = process.argv
  /**
   * @type {chokidar.WatchOptions}
   */
  const chokidarOptions = {
    persistent: true,
    ignoreInitial: true,
  }

  if (args.includes('--dev-server')) {
    spawn('npm', ['run', 'docs:serve'], { stdio: 'inherit' })
  }
  if (args.includes('--watch')) {
    process.stderr.write('\u{1b}[1m\u{1F52D} Watching for changes...\u{1b}[0m\n')
    // App
    chokidar
      .watch(['src/**/*'], { ...chokidarOptions, ignored: ['**/*.test.ts', '**/*.cy.ts'] })
      .on('all', () => buildLibrary().catch(e => process.stderr.write(`${e}\n`)))
    chokidar
      .watch(['docs/**/*'], { ...chokidarOptions, ignored: ['**/*.test.ts', '**/*.cy.ts'] })
      .on('all', () => buildLibrary().catch(e => process.stderr.write(`${e}\n`)))
  }
}

main()
import * as pathModule from 'path'
import express from 'express'
import nunjucks from 'nunjucks'
import fs from 'fs'
import setUpNunjucksFilters from '../../dist/dpr/setUpNunjucksFilters'

export default function nunjucksSetup(app: express.Express, path: pathModule.PlatformPath): void {
  app.set('view engine', 'njk')

  let assetManifest: Record<string, string> = {}

  try {
    const assetMetadataPath = path.resolve(__dirname, 'assets/manifest.json')
    assetManifest = JSON.parse(fs.readFileSync(assetMetadataPath, 'utf8'))
  } catch (e) {
    if (process.env['NODE_ENV'] !== 'test') {
      console.error(`Could not read asset manifest file: ${e} -- ${__dirname}`)
    }
  }

  // Set up application
  const appViews = [
    path.join('node_modules/govuk-frontend/dist/'),
    path.join('node_modules/@ministryofjustice/frontend/'),
    path.join(__dirname, '../dist/dpr'),
    path.join(__dirname, '../dist'),
    path.join(__dirname),
  ]

  // Nunjucks configurations
  const nunjucksEnvironment = nunjucks.configure(appViews, {
    autoescape: true,
    express: app,
    noCache: true,
    watch: true,
  })
  nunjucksEnvironment.addFilter('assetMap', (url) => assetManifest[url] || url)

  // Add library filters
  setUpNunjucksFilters(nunjucksEnvironment)
}

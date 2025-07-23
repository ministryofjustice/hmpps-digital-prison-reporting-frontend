/* eslint-disable no-underscore-dangle */
/* eslint-disable new-cap */
// Core dependencies

import path from 'path'
import noCache from 'nocache'

const fs = require('fs')
// NPM dependencies
const express = require('express')
const nunjucks = require('nunjucks')
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser')

// Set up application
const appViews = [
  path.join('node_modules/govuk-frontend/dist/'),
  path.join('node_modules/@ministryofjustice/frontend/'),
  path.join(__dirname, '../dist/dpr'),
  path.join(__dirname, '../dist'),
  path.join(__dirname),
]

// Application
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

let assetManifest = {}

try {
  const assetMetadataPath = path.resolve(__dirname, 'assets/manifest.json')
  assetManifest = JSON.parse(fs.readFileSync(assetMetadataPath, 'utf8'))
} catch (e) {
  if (process.env.NODE_ENV !== 'test') {
    console.error(`Could not read asset manifest file: ${e} -- ${__dirname}`)
  }
}

// Nunjucks configurations
const nunjucksEnvironment = nunjucks.configure(appViews, {
  autoescape: true,
  express: app,
  noCache: true,
  watch: true,
})
nunjucksEnvironment.addFilter('assetMap', (url) => assetManifest[url] || url)

// Add library filters
const setUpNunjucksFilters = require('../dist/dpr/setUpNunjucksFilters').default

setUpNunjucksFilters(nunjucksEnvironment)

// Set view engine
app.set('view engine', 'njk')

function setUpStaticResources() {
  const router = express.Router()

  //  Static Resources Configuration
  const cacheControl = { maxAge: '24h' }

  Array.of(
    '/dist-test-app/assets',
    '/node_modules/govuk-frontend/dist/govuk/assets',
    '/node_modules/govuk-frontend/dist',
    '/node_modules/@ministryofjustice/frontend/moj/assets',
    '/node_modules/@ministryofjustice/frontend',
    '/node_modules/@microsoft/applicationinsights-web/dist/es5',
    '/node_modules/@microsoft/applicationinsights-clickanalytics-js/dist/es5',
  ).forEach((dir) => {
    router.use('/assets', express.static(path.join(process.cwd(), dir), cacheControl))
  })

  // Don't cache dynamic resources
  router.use(noCache())

  return router
}

app.use(setUpStaticResources())

// Local overrides
app.use('/assets/images/favicon.ico', express.static(path.join(__dirname, './favicon.ico')))
app.use(bodyParser.json())

// Mock middleware
const addMockUserData = (req, res, next) => {
  const uuid = 'userId'
  const activeCaseLoadId = 'KMI'

  res.locals.user = {
    displayName: 'Test User',
    email: 'test@user.com',
    uuid,
    activeCaseLoadId,
    token: 'token',
  }
  next()
}

app.use(addMockUserData)

// Routes
const chartsRoutes = require('./routes/charts')
const componentsRoutes = require('./routes/components')
const platformRoutes = require('./routes/platform')
const embeddedRoutes = require('./routes/embedded')
const syncRoutes = require('./routes/sync')
const homepageRoutes = require('./routes')
const searchRoute = require('./routes/search')
const setUpMockSyncApis = require('./mocks/mockSyncData/mockSyncApis')

homepageRoutes(app)
embeddedRoutes(app)
componentsRoutes(app)
syncRoutes(app)
platformRoutes(app)
embeddedRoutes(app)
chartsRoutes(app)
searchRoute(app)
setUpMockSyncApis(app)

module.exports = app

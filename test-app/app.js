/* eslint-disable no-underscore-dangle */
/* eslint-disable new-cap */
// Core dependencies

const fs = require('fs')
const path = require('path')

// NPM dependencies
const express = require('express')
const nunjucks = require('nunjucks')
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser')

// Set up application
console.log(`__dirname: ${__dirname}`)
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

// Nunjucks configurations
const nunjucksEnvironment = nunjucks.configure(appViews, {
  autoescape: true,
  express: app,
  noCache: true,
  watch: true,
})

// Add library filters
const setUpNunjucksFilters = require('../dist/dpr/setUpNunjucksFilters').default

setUpNunjucksFilters(nunjucksEnvironment)

// Set view engine
app.set('view engine', 'njk')

// Middleware to serve static assets
Array.of(
  '/dist/assets',
  '/dist/assets/stylesheets',
  '/dist/assets/js',
  '/banana',
  '/node_modules/govuk-frontend/dist/govuk/assets',
  '/node_modules/govuk-frontend/dist',
  '/node_modules/@ministryofjustice/frontend/moj/assets',
  '/node_modules/@ministryofjustice/frontend',
  // '/node_modules/@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/assets',
  // '/node_modules/@ministryofjustice/hmpps-digital-prison-reporting-frontend',
).forEach((dir) => {
  app.use('/assets', express.static(path.join(process.cwd(), dir)))
})

// Local overrides
app.use('/assets/css', express.static(path.join(__dirname, '../dist/dpr/css')))
app.use('/assets/js', express.static(path.join(__dirname, '../dist/dpr/js')))
app.use('/assets', express.static(path.join(__dirname, '../dist/dpr')))
// app.use('/banana', express.static(path.join(__dirname, 'banana')))
// app.use('/assets/scss', express.static(path.join(__dirname, '../dist/assets/scss')))
app.use('/assets/images/favicon.ico', express.static(path.join(__dirname, './favicon.ico')))
app.use(bodyParser.json())

// Mock middleware
const addMockUserData = (req, res, next) => {
  const uuid = 'userId'
  const activeCaseLoadId = 'random-caseload-id-1'

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

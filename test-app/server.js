// Core dependencies
const fs = require('fs')
const path = require('path')

// NPM dependencies
const express = require('express')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')

// Local dependencies
const { default: reportListUtils } = require('../package/dpr/components/report-list/utils')

// Set up application
const appViews = [
  path.join(__dirname, '../node_modules/govuk-frontend/'),
  path.join(__dirname, '../node_modules/@ministryofjustice/frontend/'),
  path.join(__dirname, '../src/dpr/'),
  path.join(__dirname, '.'),
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

// Add filters from MOJ Frontend
let mojFilters = require('../node_modules/@ministryofjustice/frontend/moj/filters/all')()

mojFilters = Object.assign(mojFilters)
Object.keys(mojFilters).forEach((filterName) => {
  nunjucksEnvironment.addFilter(filterName, mojFilters[filterName])
})

// Set view engine
app.set('view engine', 'njk')

// Middleware to serve static assets
app.use('/assets/ext/jquery.min.js', express.static(path.join(__dirname, '../node_modules/jquery/dist/jquery.min.js')))
app.use('/assets/govuk', express.static(path.join(__dirname, '../node_modules/govuk-frontend/govuk/assets')))
app.use('/assets/moj', express.static(path.join(__dirname, '../node_modules/@ministryofjustice/frontend/moj/assets')))
app.use('/assets/dpr', express.static(path.join(__dirname, '../package/dpr/assets')))
app.use('/govuk/all.js', express.static(path.join(__dirname, '../node_modules/govuk-frontend/govuk/all.js')))
app.use('/moj/all.js', express.static(path.join(__dirname, '../node_modules/@ministryofjustice/frontend/moj/all.js')))

const { fields } = require('./reportDefinition').variant
const data = require('./data')

// Set up routes
app.get('/', (req, res, next) => {
  reportListUtils.renderList({
    title: 'Test app',
    fields,
    request: req,
    response: res,
    next,
    getListDataSources: () => ({
      data: Promise.resolve(data),
      count: Promise.resolve(data.length),
    }),
    otherOptions: {
      cards: [
        { text: 'One', description: 'The first card', href: '#one' },
        { text: 'Two', description: 'The second card', href: '#two' },
        { text: 'Three', description: 'The third card', href: '#three' },
      ],
    },
    layoutTemplate: 'page.njk',
  })
})

const nodeModulesExists = fs.existsSync(path.join(__dirname, '../node_modules'))
if (!nodeModulesExists) {
  // eslint-disable-next-line no-console
  console.error('ERROR: Node module folder missing. Try running `npm install`')
  process.exit(0)
}

module.exports = app

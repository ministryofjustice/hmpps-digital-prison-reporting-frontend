// Core dependencies
const fs = require('fs')
const path = require('path')

// NPM dependencies
const express = require('express')
const nunjucks = require('nunjucks')
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser')

// Local dependencies
const { default: reportListUtils } = require('../package/dpr/components/report-list/utils')

// Set up application
const appViews = [
  path.join(__dirname, '../node_modules/govuk-frontend/'),
  path.join(__dirname, '../node_modules/@ministryofjustice/frontend/'),
  path.join(__dirname, '../src/dpr/'),
  path.join(__dirname, '../src/'),
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

// Add library filters
const setUpNunjucksFilters = require('../package/dpr/setUpNunjucksFilters').default

setUpNunjucksFilters(nunjucksEnvironment)

// Set view engine
app.set('view engine', 'njk')

// Middleware to serve static assets
app.use('/assets/ext/jquery.min.js', express.static(path.join(__dirname, '../node_modules/jquery/dist/jquery.min.js')))
app.use('/assets/govuk', express.static(path.join(__dirname, '../node_modules/govuk-frontend/govuk/assets')))
app.use('/assets/moj', express.static(path.join(__dirname, '../node_modules/@ministryofjustice/frontend/moj/assets')))
app.use('/assets/dpr', express.static(path.join(__dirname, '../package/dpr/assets')))
app.use('/govuk/all.js', express.static(path.join(__dirname, '../node_modules/govuk-frontend/govuk/all.js')))
app.use('/moj/all.js', express.static(path.join(__dirname, '../node_modules/@ministryofjustice/frontend/moj/all.js')))
app.use('/assets/images/favicon.ico', express.static(path.join(__dirname, './favicon.ico')))

const definitions = require('./reportDefinition')
const data = require('./data')
const ReportingClient = require('../package/dpr/data/reportingClient')

// Set up routes

app.get('/', (req, res) => {
  res.render('menu.njk', {
    cards: [
      { text: 'Method', description: 'A test page rendered using the renderListWithData method.', href: '/method' },
      { text: 'Handler', description: 'A test page rendered using the createReportListRequestHandler method to create a request handler.', href: '/handler' },
      { text: 'Fake card', description: 'This is just here to check the alignment/wrapping of three cards.', href: '#fake' },
    ]
  })
})

app.get('/method', (req, res, next) => {
  reportListUtils.renderListWithDefinition({
    title: 'Test app',
    definitionName: 'test-report',
    variantName: 'test-variant',
    request: req,
    response: res,
    next,
    apiUrl: `http://localhost:${Number(process.env.PORT) || 3010}`,
    layoutTemplate: 'page.njk',
    dynamicAutocompleteEndpoint: '/dynamic-values/{fieldName}?prefix={prefix}'
  })
})

app.get('/handler', reportListUtils.createReportListRequestHandler({
    title: 'Test app',
    definitionName: 'test-report',
    variantName: 'test-variant',
    apiUrl: `http://localhost:${Number(process.env.PORT) || 3010}`,
    layoutTemplate: 'page.njk',
    tokenProvider: () => 'token',
    dynamicAutocompleteEndpoint: '/dynamic-values/{fieldName}?prefix={prefix}'
  })
)

// Dynamic autocomplete endpoint
app.get('/dynamic-values/field5', (req, res, next) => {
  // This delay is to simulate a real API request's delay, so we can see the message.
  sleep(1000).then(() => {
    new ReportingClient.default({
      url: 'http://localhost:3010',
      agent: {
        timeout: 8000
      }
    }).getFieldValues({
      token: 'token',
      definitionName: 'test-report',
      variantName: 'test-variant',
      fieldName: 'field5',
      prefix: req.query.prefix.toString(),
    }).then(result => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result))
    }).catch(err => {
      next(err)
    })
  })

})

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Fake API routes for the /handler endpoint to call
app.get('/definitions', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify([ definitions.report ]));
})

app.get('/definitions/test-report/test-variant', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(definitions.singleVariantReport));
})

app.get('/reports/list', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('x-no-data-warning', 'Test message');
  res.end(JSON.stringify(data));
})

app.get('/reports/list/count', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({count: 3}));
})

app.get('/reports/test-report/test-variant/field5', (req, res) => {
  const prefix = req.query.prefix

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify([
    'Fezzick',
    'Inigo Montoya',
    'Prince Humperdink',
    'Princess Buttercup',
    'Westley',
  ].filter(p => p.toLowerCase().startsWith(prefix.toLowerCase()))));
})

const nodeModulesExists = fs.existsSync(path.join(__dirname, '../node_modules'))
if (!nodeModulesExists) {
  // eslint-disable-next-line no-console
  console.error('ERROR: Node module folder missing. Try running `npm install`')
  process.exit(0)
}

module.exports = app

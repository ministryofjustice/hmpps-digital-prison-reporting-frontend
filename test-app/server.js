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

// Local dependencies
const { default: reportListUtils } = require('../package/dpr/components/report-list/utils')
const AsyncFiltersUtils = require('../package/dpr/components/async-filters/utils').default
const AsyncReportListUtils = require('../package/dpr/components/async-report-list/utils').default
const AsyncPollingUtils = require('../package/dpr/components/async-polling/utils').default
const AsyncCardGroupUtils = require('../package/dpr/components/async-card-group/utils').default

// Set up application
const appViews = [
  path.join(__dirname, '../node_modules/govuk-frontend/dist/'),
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

// Add library filters
const setUpNunjucksFilters = require('../package/dpr/setUpNunjucksFilters').default

setUpNunjucksFilters(nunjucksEnvironment)

// Set view engine
app.set('view engine', 'njk')

// Middleware to serve static assets
app.use('/assets/govuk', express.static(path.join(__dirname, '../node_modules/govuk-frontend/dist/govuk/assets')))
app.use('/assets/dpr', express.static(path.join(__dirname, '../package/dpr/assets')))
app.use(
  '/govuk/all.js',
  express.static(path.join(__dirname, '../node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.js')),
)
app.use('/assets/images/favicon.ico', express.static(path.join(__dirname, './favicon.ico')))
app.use('/assets/manifest.json', express.static(path.join(__dirname, './manifest.json')))

const definitions = require('./reportDefinition')
const mockAsyncApis = require('./mockData/mockAsyncApis')
const MockUserStoreService = require('./mockData/mockRedisStore')
const getMockCardData = require('./mockData/mockLegacyReportCards')
const data = require('./data')
const ReportingClient = require('../package/dpr/data/reportingClient')
const AsyncReportStoreService = require('../package/dpr/services/requestedReportsService').default

// Set up routes

app.get('/', (req, res) => {
  res.render('menu.njk', {
    title: 'Home',
    cards: [
      {
        text: 'Test Reports',
        description: 'test reports',
        href: '/test-reports',
      },
    ],
  })
})

// ----- ASYNC REPORTS -----
const mockUserStore = new MockUserStoreService()
const asyncReportsStore = new AsyncReportStoreService(mockUserStore, 'userId')

// Step 1 - display list of async reports
app.get('/async-reports', async (req, res) => {
  res.render('async.njk', {
    title: 'Async Reports Home',
    requestedReports: {
      ...(await AsyncCardGroupUtils.renderAsyncReportsList(asyncReportsStore, mockAsyncApis)),
    },
    legacyReports: {
      cardData: getMockCardData(req),
    },
  })
})

// Step 2 - get filters for the report + make request
app.get('/async-reports/:reportId/:variantId/request', async (req, res) => {
  res.render('async-request.njk', {
    title: 'Request Report',
    postEndpoint: '/requestReport/',
    ...(await AsyncFiltersUtils.renderFilters({ req, res, dataSources: mockAsyncApis })),
  })
})

// Step 3 - handle the post request to request the report data
app.use(bodyParser.json())
app.post('/requestReport/', async (req, res) => {
  const redirectToPollingPage = await AsyncFiltersUtils.requestReport({
    req,
    res,
    dataSources: mockAsyncApis,
    asyncReportsStore,
  })
  res.redirect(redirectToPollingPage)
  res.end()
})

// Step 4 - polling the status of the request
app.get('/async-reports/:reportId/:variantId/request/:executionId', async (req, res) => {
  res.render('async-polling.njk', {
    title: 'Report Requested',
    ...(await AsyncPollingUtils.renderPolling({ req, res, dataSources: mockAsyncApis, asyncReportsStore })),
  })
})

// Step 5 - load the report data
app.get('/async-reports/:reportId/:reportVariantId/request/:tableId/report', async (req, res) => {
  // TODO: FIXE this so its more generic and not coupled to the mock
  const dataSources = {
    ...mockAsyncApis,
    getAsyncReport: mockAsyncApis.getAsyncReport(req.query),
  }

  res.render('async-report.njk', {
    ...(await AsyncReportListUtils.renderReport({
      req,
      res,
      dataSources,
      asyncReportsStore,
      url: req._parsedUrl,
    })),
  })
})

app.get('/test-reports', (req, res) => {
  res.render('menu.njk', {
    title: 'Test Reports',
    cards: [
      {
        text: 'Method',
        description: 'A test page rendered using the renderListWithData method.',
        href: '/test-reports/method?dataProductDefinitionsPath=test-location',
      },
      {
        text: 'Handler',
        description:
          'A test page rendered using the createReportListRequestHandler method to create a request handler.',
        href: '/test-reports/handler',
      },
      {
        text: 'Failing page',
        description: 'This page will fail to retrieve the definition and fail gracefully.',
        href: '/test-reports/fail',
      },
    ],

    breadCrumbList: [{ text: 'Home', href: '/' }],
  })
})

app.get('/test-reports/method', (req, res, next) => {
  reportListUtils.renderListWithDefinition({
    title: 'Method',
    definitionName: 'test-report',
    variantName: 'test-variant',
    apiUrl: `http://localhost:${Number(process.env.PORT) || 3010}`,
    layoutTemplate: 'page.njk',
    dynamicAutocompleteEndpoint: '/dynamic-values/{fieldName}?prefix={prefix}',
    otherOptions: {
      breadCrumbList: [
        { text: 'Home', href: '/' },
        { text: 'Test Reports', href: '/test-reports' },
      ],
    },
    request: req,
    response: res,
    next,
  })
})

app.get(
  '/test-reports/handler',
  reportListUtils.createReportListRequestHandler({
    title: 'Handler',
    definitionName: 'test-report',
    variantName: 'test-variant',
    apiUrl: `http://localhost:${Number(process.env.PORT) || 3010}`,
    layoutTemplate: 'page.njk',
    tokenProvider: () => 'token',
    dynamicAutocompleteEndpoint: '/dynamic-values/{fieldName}?prefix={prefix}',
    otherOptions: {
      breadCrumbList: [
        { text: 'Home', href: '/' },
        { text: 'Test Reports', href: '/test-reports' },
      ],
    },
  }),
)

app.get('/test-reports/fail', (req, res, next) => {
  reportListUtils.renderListWithDefinition({
    title: 'Fail',
    definitionName: 'failing-report',
    variantName: 'failing-variant',
    request: req,
    response: res,
    next,
    apiUrl: `http://localhost:${Number(process.env.PORT) || 3010}`,
    layoutTemplate: 'page.njk',
    otherOptions: {
      breadCrumbList: [
        { text: 'Home', href: '/' },
        { text: 'Reports', href: '/reports' },
        { text: 'Test Reports', href: '/reports/test-reports' },
      ],
    },
  })
})

// Dynamic autocomplete endpoint
app.get('/dynamic-values/field5', (req, res, next) => {
  // This delay is to simulate a real API request's delay, so we can see the message.
  sleep(1000).then(() => {
    new ReportingClient.default({
      url: 'http://localhost:3010',
      agent: {
        timeout: 8000,
      },
    })
      .getFieldValues({
        token: 'token',
        definitionName: 'test-report',
        variantName: 'test-variant',
        fieldName: 'field5',
        prefix: req.query.prefix.toString(),
      })
      .then((result) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(result))
      })
      .catch((err) => {
        next(err)
      })
  })
})

function sleep (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

// Fake API routes for the /handler endpoint to call
app.get('/definitions', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify([definitions.report]))
})

app.get('/definitions/test-report/test-variant', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(definitions.singleVariantReport))
})

app.get('/definitions/failing-report/failing-variant', () => {
  throw new Error('Successfully failed.')
})

app.get('/reports/list', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('x-no-data-warning', 'Test message')
  res.end(JSON.stringify(data))
})

app.get('/reports/list/count', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ count: 3 }))
})

app.get('/reports/test-report/test-variant/field5', (req, res) => {
  const { prefix } = req.query

  res.setHeader('Content-Type', 'application/json')
  res.end(
    JSON.stringify(
      ['Fezzick', 'Inigo Montoya', 'Prince Humperdink', 'Princess Buttercup', 'Westley'].filter((p) =>
        p.toLowerCase().startsWith(prefix.toLowerCase()),
      ),
    ),
  )
})

const nodeModulesExists = fs.existsSync(path.join(__dirname, '../node_modules'))
if (!nodeModulesExists) {
  // eslint-disable-next-line no-console
  console.error('ERROR: Node module folder missing. Try running `npm install`')
  process.exit(0)
}

module.exports = app

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
const ReportListUtils = require('../package/dpr/components/report-list/utils').default
const CatalogueUtils = require('../package/dpr/components/_catalogue/catalogue/utils').default
const UserReportsListUtils = require('../package/dpr/components/user-reports/utils').default
const createDprServices = require('../package/dpr/utils/ReportStoreServiceUtils').default

// Set up application
const appViews = [
  path.join(__dirname, '../node_modules/govuk-frontend/dist/'),
  path.join(__dirname, '../node_modules/@ministryofjustice/frontend/'),
  path.join(__dirname, '../src/dpr/'),
  path.join(__dirname, '../src/'),
  path.join(__dirname, '.'),
]

// Middleware
const setUpDprResources = require('../package/dpr/middleware/setUpDprResources').default

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
Array.of(
  '/assets',
  '/assets/stylesheets',
  '/assets/js',
  '/node_modules/govuk-frontend/dist/govuk/assets',
  '/node_modules/govuk-frontend/dist',
  '/node_modules/@ministryofjustice/frontend/moj/assets',
  '/node_modules/@ministryofjustice/frontend',
  '/node_modules/@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/assets',
  '/node_modules/@ministryofjustice/hmpps-digital-prison-reporting-frontend',
).forEach((dir) => {
  app.use('/assets', express.static(path.join(process.cwd(), dir)))
})

// Local overrides
app.use('/assets/dpr', express.static(path.join(__dirname, '../package/dpr/assets')))
app.use('/assets/dpr', express.static(path.join(__dirname, '../package/dpr')))

app.use('/assets/images/favicon.ico', express.static(path.join(__dirname, './favicon.ico')))
app.use('/assets/manifest.json', express.static(path.join(__dirname, './manifest.json')))
app.use(bodyParser.json())

// Mock Clients & API responses
const MockReportingClient = require('./mocks/mockClients/reports/mockReportingClient')
const MockDashboardClient = require('./mocks/mockClients/dashboards/mock-client')
const MockUserStoreService = require('./mocks/mockClients/store/mockRedisStore')

// Routes
const DprEmbeddedAsyncReports = require('../package/dpr/routes/DprEmbeddedReports').default

// Charts
const mockBarChartData = require('./mocks/mockChartData/mockBarChartData')
const mockPieChartData = require('./mocks/mockChartData/mockPieChartData')
const mockLineChartData = require('./mocks/mockChartData/mockLineChartData')
const mockMulitChartData = require('./mocks/mockChartData/mockMultiChartData')
const mockScoreCards = require('./mocks/mockScoreCards/mockScorecards')

// Set up routes
const homepageMenuCards = [
  {
    text: 'DPR Service',
    description: 'Reports that are requested and displayed separately.',
    href: '/dpr-service',
  },
  {
    text: 'DPR Sync reports',
    description: 'DPR service reports that return immediately.',
    href: '/sync-reports',
  },
  {
    text: 'Embedded reports',
    description: 'Embedded reports solutions',
    href: '/embedded-reports',
  },
  {
    text: 'Components',
    description: 'Component testing',
    href: '/components',
  },
]

const syncReportsMenuCards = [
  {
    text: 'Test report',
    description: 'Test sync report',
    href: '/sync/report/test-report-3/variantId-1/report',
  },
]

const componentsMenuCards = [
  {
    text: 'Search',
    description: 'Search component.',
    href: '/search',
  },
  {
    text: 'Charts',
    description: 'Chart Visualisations',
    href: '/charts',
  },
  {
    text: 'Scorecards',
    description: 'Metric scorecards',
    href: '/scorecards',
  },
]

const embeddedReportsMenuCards = [
  {
    text: 'Route config options',
    description: 'Embedded reports via route config. Sync reports only',
    href: '/embedded-reports/route-config',
  },
  {
    text: 'Route import',
    description: 'Embedded reports via importing a route. Hybrid solution, allows for extra features to be added',
    href: '/embedded-reports/import-route',
  },
]

const embeddedImportRouteMenuCards = [
  {
    text: 'Test Report',
    description:
      'Embedded reports via import routes test report. Uncomment code in server to test. See _embedded/docs to learn about the config options',
    href: '/dpr/embedded/sync/report/test-report-3/variantId-1/report',
  },
]

const embeddededRouteConfigMenuCards = [
  {
    text: 'Method',
    description: 'A test page rendered using the renderListWithData method.',
    href: '/embedded-reports/route-config/method?dataProductDefinitionsPath=test-location',
  },
  {
    text: 'Handler',
    description: 'A test page rendered using the createReportListRequestHandler method to create a request handler.',
    href: '/embedded-reports/route-config/handler',
  },
  {
    text: 'Validation',
    description: 'A test page for field validation.',
    href: '/embedded-reports/route-config/validation',
  },
  {
    text: 'Sections',
    description: 'A sectioned report.',
    href: '/embedded-reports/route-config/sections',
  },
  {
    text: 'Failing page',
    description: 'This page will fail to retrieve the definition and fail gracefully.',
    href: '/embedded-reports/route-config/fail',
  },
]

const addMockUserData = (req, res, next) => {
  res.locals.user = {
    displayName: 'Test User',
    email: 'test@user.com',
    uuid: 'userId',
    activeCaseLoadId: 'random-id',
    token: 'token',
  }
  next()
}

app.use(addMockUserData)

app.get('/', (req, res) => {
  res.render('menu.njk', {
    title: 'DPR test site',
    cards: homepageMenuCards,
  })
})

app.get('/embedded-reports', (req, res) => {
  res.render('menu.njk', {
    title: 'Embedded reports',
    cards: embeddedReportsMenuCards,
    breadCrumbList: [{ text: 'Home', href: '/' }],
  })
})

app.get('/embedded-reports/import-route', (req, res) => {
  res.render('menu.njk', {
    title: 'Route import',
    cards: embeddedImportRouteMenuCards,
    breadCrumbList: [
      { text: 'Home', href: '/' },
      { text: 'Embedded reports', href: '/embedded-reports' },
    ],
  })
})

app.get('/embedded-reports/route-config', (req, res) => {
  res.render('menu.njk', {
    title: 'Route config',
    cards: embeddededRouteConfigMenuCards,
    breadCrumbList: [
      { text: 'Home', href: '/' },
      { text: 'Embedded reports', href: '/embedded-reports' },
    ],
  })
})

app.get('/components', (req, res) => {
  res.render('menu.njk', {
    title: 'Components',
    cards: componentsMenuCards,
    breadCrumbList: [{ text: 'Home', href: '/' }],
  })
})

app.get('/sync-reports', (req, res) => {
  res.render('menu.njk', {
    title: 'DPR Sync reports',
    cards: syncReportsMenuCards,
    breadCrumbList: [{ text: 'Home', href: '/' }],
  })
})

/**
 * ASYNC REPORTS
 * */

// 1. Init Data clients
const reportingClient = new MockReportingClient()
const dashboardClient = new MockDashboardClient()
const reportDataStore = new MockUserStoreService()

// 2. Create services
const services = {
  ...createDprServices({ reportingClient, dashboardClient, reportDataStore }),
}

// 3. Add middleware
app.use(
  setUpDprResources(services, {
    routePrefix: 'dpr',
  }),
)

// 4. Initialise routes
DprEmbeddedAsyncReports({
  router: app,
  services,
  layoutPath: 'page.njk',
  config: {
    routePrefix: 'dpr',
  },
})

/**
 * EMBEDDED REPORTS: Route import config
 * See `_embedded/docs` to learn how to use this configuration
 * */

// const addEmbeddedReportsRoutes = require('../package/dpr/routes/embeddedReports').default

// // Reporting client
// const embeddedReportingClient = new MockReportingClient()
// const embeddedReportingService = new ReportingService(embeddedReportingClient)
// const embeddedReportsServices = {
//   reportingService: embeddedReportingService,
// }

// // UserStore
// const embeddedMockUserStore = new MockUserStoreService()

// addEmbeddedReportsRoutes({
//   router: app,
//   services: embeddedReportsServices,
//   features: {
//     config: {
//       userDataStore: embeddedMockUserStore,
//     },
//     list: ['download'],
//   },
// })

// EMBEDDED REPORTS END

app.get('/dpr-service', async (req, res) => {
  res.locals.csrfToken = 'csrfToken'

  const catalogue = await CatalogueUtils.init({
    res,
    services,
    features: { bookmarkingEnabled: true },
  })

  const userReportsLists = await UserReportsListUtils.init({ services, req, res, maxRows: 3 })

  res.render('async.njk', {
    title: 'Home',
    userReportsLists,
    catalogue,
  })
})

app.get('/embedded-reports/route-config/method', (req, res, next) => {
  ReportListUtils.renderListWithDefinition({
    title: 'Method',
    definitionName: 'test-report',
    variantName: 'test-variant',
    apiUrl: `http://localhost:${Number(process.env.PORT) || 3010}`,
    layoutTemplate: 'page.njk',
    dynamicAutocompleteEndpoint: '/dynamic-values/{fieldName}?prefix={prefix}',
    otherOptions: {
      breadCrumbList: [
        { text: 'Home', href: '/' },
        { text: 'Embedded reports', href: '/embedded-reports' },
        { text: 'Route config', href: '/embedded-reports/route-config' },
      ],
    },
    request: req,
    response: res,
    next,
  })
})

app.get(
  '/embedded-reports/route-config/handler',
  ReportListUtils.createReportListRequestHandler({
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
        { text: 'Embedded reports', href: '/embedded-reports' },
        { text: 'Route config', href: '/embedded-reports/route-config' },
      ],
    },
  }),
)

app.get(
  '/embedded-reports/route-config/validation',
  ReportListUtils.createReportListRequestHandler({
    title: 'Handler',
    definitionName: 'test-report',
    variantName: 'test-validation-variant',
    apiUrl: `http://localhost:${Number(process.env.PORT) || 3010}`,
    layoutTemplate: 'page.njk',
    tokenProvider: () => 'token',
    dynamicAutocompleteEndpoint: '/dynamic-values/{fieldName}?prefix={prefix}',
    otherOptions: {
      breadCrumbList: [
        { text: 'Home', href: '/' },
        { text: 'Embedded reports', href: '/embedded-reports' },
        { text: 'Route config', href: '/embedded-reports/route-config' },
      ],
    },
  }),
)

app.get(
  '/embedded-reports/route-config/sections',
  ReportListUtils.createReportListRequestHandler({
    title: 'Handler',
    definitionName: 'test-report',
    variantName: 'test-section-variant',
    apiUrl: `http://localhost:${Number(process.env.PORT) || 3010}`,
    layoutTemplate: 'page.njk',
    tokenProvider: () => 'token',
    dynamicAutocompleteEndpoint: '/dynamic-values/{fieldName}?prefix={prefix}',
    otherOptions: {
      breadCrumbList: [
        { text: 'Home', href: '/' },
        { text: 'Embedded reports', href: '/embedded-reports' },
        { text: 'Route config', href: '/embedded-reports/route-config' },
      ],
    },
  }),
)

app.get('/embedded-reports/route-config/fail', (req, res, next) => {
  ReportListUtils.renderListWithDefinition({
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
        { text: 'Embedded reports', href: '/embedded-reports' },
        { text: 'Route config', href: '/embedded-reports/route-config' },
      ],
    },
  })
})

app.get('/search', (req, res) => {
  res.render('search.njk', {
    title: 'Search',
    head: [{ text: 'Product' }, { text: 'Name' }],
    rows: [
      [{ text: 'Product one' }, { text: 'Report one' }],
      [{ text: 'Product one' }, { text: 'Report two' }],
      [{ text: 'Product two' }, { text: 'Report three' }],
      [{ text: 'Product two' }, { text: 'Report four' }],
      [{ text: 'Product three' }, { text: 'Report five' }],
      [{ text: 'Product three' }, { text: 'Report six' }],
    ],
  })
})

app.get('/charts', (req, res) => {
  res.render('charts.njk', {
    title: 'Charts',
    barCharts: mockBarChartData,
    pieCharts: mockPieChartData,
    lineCharts: mockLineChartData,
    multiCharts: mockMulitChartData,
  })
})

app.get('/charts/bar', (req, res) => {
  res.render('charts.njk', {
    title: 'Charts',
    barCharts: mockBarChartData,
  })
})

app.get('/charts/donut', (req, res) => {
  res.render('charts.njk', {
    title: 'Charts',
    pieCharts: mockPieChartData,
  })
})

app.get('/charts/line', (req, res) => {
  res.render('charts.njk', {
    title: 'Charts',
    lineCharts: mockLineChartData,
  })
})

app.get('/charts/multi', (req, res) => {
  res.render('charts.njk', {
    title: 'Charts',
    multiCharts: mockMulitChartData,
  })
})

app.get('/scorecards', (req, res) => {
  res.render('scorecards.njk', {
    title: 'Score Cards',
    scorecards: mockScoreCards,
  })
})

const setUpMockSyncApis = require('./mocks/mockSyncData/mockSyncApis')

setUpMockSyncApis(app)

const nodeModulesExists = fs.existsSync(path.join(__dirname, '../node_modules'))
if (!nodeModulesExists) {
  // eslint-disable-next-line no-console
  console.error('ERROR: Node module folder missing. Try running `npm install`')
  process.exit(0)
}

module.exports = app

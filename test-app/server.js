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
const ReportslistUtils = require('../package/dpr/components/reports-list/utils').default
const UserReportsListUtils = require('../package/dpr/components/user-reports/utils').default
const { createUserStoreServices, initUserStoreServices } = require('../package/dpr/utils/StoreServiceUtils')

// Set up application
const appViews = [
  path.join(__dirname, '../node_modules/govuk-frontend/dist/'),
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

// Add library filters
const setUpNunjucksFilters = require('../package/dpr/setUpNunjucksFilters').default

setUpNunjucksFilters(nunjucksEnvironment)

// Set view engine
app.set('view engine', 'njk')

// Middleware to serve static assets
app.use('/assets/ext/chart.js', express.static(path.join(__dirname, '../node_modules/chart.js/dist/chart.umd.js')))
app.use(
  '/assets/ext/chartjs-datalabels.js',
  express.static(
    path.join(__dirname, '../node_modules/chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels.min.js'),
  ),
)
app.use('/assets/ext/jquery.min.js', express.static(path.join(__dirname, '../node_modules/jquery/dist/jquery.min.js')))
app.use('/assets/ext/day.js', express.static(path.join(__dirname, '../node_modules/dayjs/dayjs.min.js')))
app.use(
  '/assets/ext/dayjs/plugin/customParseFormat.js',
  express.static(path.join(__dirname, '../node_modules/dayjs/plugin/customParseFormat.js')),
)
app.use('/assets/govuk', express.static(path.join(__dirname, '../node_modules/govuk-frontend/dist/govuk/assets')))
app.use('/assets/moj', express.static(path.join(__dirname, '../node_modules/@ministryofjustice/frontend/moj/assets')))
app.use('/assets/dpr', express.static(path.join(__dirname, '../package/dpr/assets')))
app.use(
  '/govuk/all.js',
  express.static(path.join(__dirname, '../node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.js')),
)
app.use('/moj/all.js', express.static(path.join(__dirname, '../node_modules/@ministryofjustice/frontend/moj/all.js')))
app.use('/assets/images/favicon.ico', express.static(path.join(__dirname, './favicon.ico')))
app.use('/assets/manifest.json', express.static(path.join(__dirname, './manifest.json')))
app.use(bodyParser.json())

// Mock Clients & API responses
const MockReportingClient = require('./mocks/mockClients/reports/mockReportingClient')
const MockDashboardClient = require('./mocks/mockClients/dashboards/mockDashboardClient')
const MockMetricClient = require('./mocks/mockClients/metrics/mockMetricClient')
const MockUserStoreService = require('./mocks/mockClients/store/mockRedisStore')
const mockDefinitions = require('./mocks/mockClients/reports/mockReportDefinition')
const mockDashboardDefinitions = require('./mocks/mockClients/dashboards/mockDashboardDefinition')

// Services
const ReportingService = require('../package/dpr/services/reportingService').default
const MetricsService = require('../package/dpr/services/metricsService').default
const DashboardService = require('../package/dpr/services/dashboardService').default

// Routes
const addAsyncReportingRoutes = require('../package/dpr/routes/asyncReports').default
const addBookmarkingRoutes = require('../package/dpr/routes/bookmarks').default
const addRecentlyViewedRoutes = require('../package/dpr/routes/recentlyViewed').default
const dashboardRoutes = require('../package/dpr/routes/dashboard').default
const addDownloadRoutes = require('../package/dpr/routes/download').default
const addSyncRoutes = require('../package/dpr/routes/syncReports').default

// Charts
const mockBarChartData = require('./mocks/mockChartData/mockBarChartData')
const mockPieChartData = require('./mocks/mockChartData/mockPieChartData')
const mockLineChartData = require('./mocks/mockChartData/mockLineChartData')
const mockMulitChartData = require('./mocks/mockChartData/mockMultiChartData')
const mockScoreCards = require('./mocks/mockScoreCards/mockScorecards')

// Set up routes

app.get('/', (req, res) => {
  res.render('menu.njk', {
    title: 'Home',
    cards: [
      {
        text: 'Synchronous Reports',
        description: 'Reports that return immediately.',
        href: '/test-reports',
      },
      {
        text: 'Asynchronous Reports',
        description: 'Reports that are requested and displayed separately.',
        href: '/async-reports',
      },
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
    ],
  })
})

const reportingClient = new MockReportingClient()
const reportingService = new ReportingService(reportingClient)

const metricClient = new MockMetricClient()
const metricService = new MetricsService(metricClient)

const dashboardClient = new MockDashboardClient()
const dashboardService = new DashboardService(dashboardClient)

const mockUserStore = new MockUserStoreService()
const userStoreServices = createUserStoreServices(mockUserStore)

const services = {
  ...userStoreServices,
  reportingService,
  metricService,
  dashboardService,
}

initUserStoreServices('userId', services)

const routeImportParams = {
  router: app,
  services,
  layoutPath: 'page.njk',
  templatePath: 'dpr/views/',
}

addBookmarkingRoutes(routeImportParams)
addRecentlyViewedRoutes(routeImportParams)
addAsyncReportingRoutes(routeImportParams)
dashboardRoutes(routeImportParams)
addDownloadRoutes(routeImportParams)

addSyncRoutes({
  ...routeImportParams,
  options: {
    // dpdPath: 'my/definition/path',
  },
  features: {
    download: true,
    bookmark: false, // NOTE: not avalable yet
    recentlyViewed: false, // NOTE: not available yet
  },
})

app.get('/async-reports', async (req, res) => {
  res.locals.definitions = mockDefinitions.reports
  res.locals.dashboardDefinitions = mockDashboardDefinitions
  res.locals.csrfToken = 'csrfToken'
  res.locals.pathSuffix = req.query.dataProductDefinitionsPath
    ? `?dataProductDefinitionsPath=${req.query.dataProductDefinitionsPath}`
    : ''

  res.render('async.njk', {
    title: 'Home',
    ...(await UserReportsListUtils.initLists({ services, req, res })),
    reports: {
      ...(await ReportslistUtils.mapReportsList(res, services)),
    },
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
        text: 'Validation',
        description: 'A test page for field validation.',
        href: '/test-reports/validation',
      },
      {
        text: 'Sections',
        description: 'A sectioned report.',
        href: '/test-reports/sections',
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

app.get(
  '/test-reports/validation',
  reportListUtils.createReportListRequestHandler({
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
        { text: 'Test Reports', href: '/test-reports' },
      ],
    },
  }),
)

app.get(
  '/test-reports/sections',
  reportListUtils.createReportListRequestHandler({
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

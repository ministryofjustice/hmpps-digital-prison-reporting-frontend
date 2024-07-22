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
const BookmarklistUtils = require('../package/dpr/utils/bookmarkListUtils').default
const ReportslistUtils = require('../package/dpr/components/reports-list/utils').default
const AsyncReportListUtils = require('../package/dpr/components/async-request-list/utils').default
const RecentlyViewedCardGroupUtils = require('../package/dpr/utils/recentlyViewedUtils').default

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
app.use(bodyParser.json())

const mockAsyncApis = require('./mockAsyncData/mockAsyncApis')
const MockUserStoreService = require('./mockAsyncData/mockRedisStore')
const AsyncReportStoreService = require('../package/dpr/services/requestedReportsService').default
const RecentlyViewedStoreService = require('../package/dpr/services/recentlyViewedService').default
const BookmarkService = require('../package/dpr/services/bookmarkService').default
const addAsyncReportingRoutes = require('../package/dpr/routes/asyncReports').default
const addBookmarkingRoutes = require('../package/dpr/routes/bookmarks').default
const addRecentlyViewedRoutes = require('../package/dpr/routes/recentlyViewed').default
const definitions = require('./mockAsyncData/mockReportDefinition')

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
    ],
  })
})

const mockUserStore = new MockUserStoreService()

const asyncReportsStore = new AsyncReportStoreService(mockUserStore)
asyncReportsStore.init('userId')

const recentlyViewedStoreService = new RecentlyViewedStoreService(mockUserStore)
recentlyViewedStoreService.init('userId')

const bookmarkService = new BookmarkService(mockUserStore)
bookmarkService.init('userId')

const reportingService = mockAsyncApis
const services = {
  bookmarkService,
  recentlyViewedStoreService,
  asyncReportsStore,
  reportingService,
}

const routeImportParams = {
  router: app,
  services,
  layoutPath: 'page.njk',
  templatePath: 'dpr/views/',
}

addBookmarkingRoutes(routeImportParams)
addRecentlyViewedRoutes(routeImportParams)
addAsyncReportingRoutes(routeImportParams)

app.get('/async-reports', async (req, res) => {
  res.locals.definitions = definitions.reports
  res.locals.csrfToken = 'csrfToken'
  res.locals.pathSuffix = ''

  const requestedReports = await AsyncReportListUtils.renderList({
    services,
    res,
    maxRows: 6,
  })

  res.render('async.njk', {
    title: 'Home',
    requestedReports,
    viewedReports: {
      ...(await RecentlyViewedCardGroupUtils.renderRecentlyViewedList({
        services,
        res,
        maxRows: 6,
      })),
    },
    bookmarks: {
      ...(await BookmarklistUtils.renderBookmarkList({
        res,
        req,
        services,
        maxRows: 6,
      })),
    },
    reports: {
      ...ReportslistUtils.mapReportsList(res, services),
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

const setUpMockSyncApis = require('./mockSyncData/mockSyncApis')

setUpMockSyncApis(app)

const nodeModulesExists = fs.existsSync(path.join(__dirname, '../node_modules'))
if (!nodeModulesExists) {
  // eslint-disable-next-line no-console
  console.error('ERROR: Node module folder missing. Try running `npm install`')
  process.exit(0)
}

module.exports = app

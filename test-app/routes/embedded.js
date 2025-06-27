// Local dependencies
const ReportListUtils = require('../../dist/dpr/components/report-list/utils').default

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

const embeddedRoutes = (app) => {
  app.get('/embedded-reports', (req, res) => {
    res.render('views/pages/menu.njk', {
      title: 'Embedded reports',
      cards: embeddedReportsMenuCards,
      breadCrumbList: [{ text: 'Home', href: '/' }],
    })
  })

  app.get('/embedded-reports/import-route', (req, res) => {
    res.render('views/pages/menu.njk', {
      title: 'Route import',
      cards: embeddedImportRouteMenuCards,
      breadCrumbList: [
        { text: 'Home', href: '/' },
        { text: 'Embedded reports', href: '/embedded-reports' },
      ],
    })
  })

  app.get('/embedded-reports/route-config', (req, res) => {
    res.render('views/pages/menu.njk', {
      title: 'Route config',
      cards: embeddededRouteConfigMenuCards,
      breadCrumbList: [
        { text: 'Home', href: '/' },
        { text: 'Embedded reports', href: '/embedded-reports' },
      ],
    })
  })

  app.get('/embedded-reports/route-config/method', (req, res, next) => {
    ReportListUtils.renderListWithDefinition({
      title: 'Method',
      definitionName: 'test-report',
      variantName: 'test-variant',
      apiUrl: `http://localhost:${Number(process.env.PORT) || 3010}`,
      layoutTemplate: 'views/page.njk',
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
      layoutTemplate: 'views/page.njk',
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
      layoutTemplate: 'views/page.njk',
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
      layoutTemplate: 'views/page.njk',
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
      layoutTemplate: 'views/page.njk',
      otherOptions: {
        breadCrumbList: [
          { text: 'Home', href: '/' },
          { text: 'Embedded reports', href: '/embedded-reports' },
          { text: 'Route config', href: '/embedded-reports/route-config' },
        ],
      },
    })
  })
}

module.exports = embeddedRoutes

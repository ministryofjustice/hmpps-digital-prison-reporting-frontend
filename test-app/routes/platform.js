const CatalogueUtils = require('../../package/dpr/components/_catalogue/catalogue/utils').default
const UserReportsListUtils = require('../../package/dpr/components/user-reports/utils').default
const createDprServices = require('../../package/dpr/utils/ReportStoreServiceUtils').default
const bookmarkUtils = require('../../package/dpr/utils/bookmarkUtils').default

// Mock Clients & API responses
const MockReportingClient = require('../mocks/mockClients/reports/mockReportingClient')
const MockDashboardClient = require('../mocks/mockClients/dashboards/mock-client')
const MockUserStoreService = require('../mocks/mockClients/store/mockRedisStore')
const mockAutomaticBookmarks = require('../mocks/mockClients/store/mockAutomaticBookmarks')

// Middleware
const setUpDprResources = require('../../package/dpr/middleware/setUpDprResources').default

// Routes
const DprEmbeddedAsyncReports = require('../../package/dpr/routes/DprEmbeddedReports').default

const platformRoutes = (app) => {
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

  // Mock middleware
  // const addBookmarksByCaseload = async (req, res, next) => {
  //   const { uuid, activeCaseLoadId } = res.locals.user
  //   await bookmarkUtils.preBookmarkReportsByRoleId(uuid, activeCaseLoadId, services, mockAutomaticBookmarks)
  //   next()
  // }
  // app.use(addBookmarksByCaseload)

  // 4. Initialise routes
  DprEmbeddedAsyncReports({
    router: app,
    services,
    layoutPath: 'page.njk',
    config: {
      routePrefix: 'dpr',
    },
  })

  app.get('/dpr-service', async (req, res) => {
    res.locals.csrfToken = 'csrfToken'

    const catalogue = await CatalogueUtils.init({
      res,
      services,
      features: { bookmarkingEnabled: true },
    })

    const userReportsLists = await UserReportsListUtils.init({ services, req, res, maxRows: 20 })

    res.render('async.njk', {
      title: 'Home',
      userReportsLists,
      catalogue,
    })
  })
}

module.exports = platformRoutes

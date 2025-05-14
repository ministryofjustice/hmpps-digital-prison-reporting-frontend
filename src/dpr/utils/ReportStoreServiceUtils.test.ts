import MockReportingClient from '../../../test-app/mocks/mockClients/reports/mockReportingClient'
import MockDashboardClient from '../../../test-app/mocks/mockClients/dashboards/mock-client'
import MockUserStoreService from '../../../test-app/mocks/mockClients/store/mockRedisStore'
import createDprServices, { InitDPRServicesArgs } from './ReportStoreServiceUtils'

describe('ReportStoreServiceUtils', () => {
  describe('createDprServices', () => {
    let clients: InitDPRServicesArgs

    beforeEach(() => {
      clients = {
        reportingClient: new MockReportingClient(),
        dashboardClient: new MockDashboardClient(),
        reportDataStore: new MockUserStoreService(),
      } as unknown as InitDPRServicesArgs
    })

    it('should create the dpr services', async () => {
      const result = await createDprServices(clients)

      expect(result.bookmarkService).not.toBeUndefined()
      expect(result.dashboardService).not.toBeUndefined()
      expect(result.recentlyViewedService).not.toBeUndefined()
      expect(result.requestedReportService).not.toBeUndefined()
      expect(result.reportingService).not.toBeUndefined()
      expect(result.downloadPermissionService).not.toBeUndefined()
    })

    it('should create the dpr services using a config', async () => {
      const result = await createDprServices(clients, {
        bookmarking: false,
        download: false,
      })

      expect(result.bookmarkService).toBeUndefined()
      expect(result.downloadPermissionService).toBeUndefined()
      expect(result.dashboardService).not.toBeUndefined()
      expect(result.recentlyViewedService).not.toBeUndefined()
      expect(result.requestedReportService).not.toBeUndefined()
      expect(result.reportingService).not.toBeUndefined()
    })
  })
})

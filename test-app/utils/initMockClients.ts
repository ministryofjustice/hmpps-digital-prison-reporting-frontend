import { Router } from 'express'
import MockDashboardClient from '../mocks/mockClients/dashboards/mock-client'
import MockReportingClient from '../mocks/mockClients/reports/mockReportingClient'
import MockUserStoreService from '../mocks/mockClients/store/mockRedisStore'
import ReportingClient from '../../dist/dpr/data/reportingClient'
import DashboardClient from '../../dist/dpr/data/dashboardClient'
import ReportDataStore from '../../dist/dpr/data/reportDataStore'
import createDprServices from '../../dist/dpr/utils/ReportStoreServiceUtils'
import setUpDprResources from '../../dist/dpr/middleware/setUpDprResources'

export default function initMockClients(router: Router, featureConfig?: { bookmarking?: boolean; download?: boolean }) {
  // 1. Init Data clients
  const reportingClient = new MockReportingClient() as unknown as ReportingClient
  const dashboardClient = new MockDashboardClient() as unknown as DashboardClient
  const reportDataStore = new MockUserStoreService() as unknown as ReportDataStore

  // 2. Create services
  const services = {
    ...createDprServices({ reportingClient, dashboardClient, reportDataStore }, featureConfig),
  }

  router.use(setUpDprResources(services))

  return {
    services,
    router,
  }
}

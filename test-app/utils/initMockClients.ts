import { Router } from 'express'
import MockDashboardClient from '../mocks/mockClients/dashboards/mock-client'
import MockReportingClient from '../mocks/mockClients/reports/mockReportingClient'
import MockUserStoreService from '../mocks/mockClients/store/mockRedisStore'
import ReportingClient from '../../src/dpr/data/reportingClient'
import DashboardClient from '../../src/dpr/data/dashboardClient'
import ReportDataStore from '../../src/dpr/data/reportDataStore'
import createDprServices from '../../src/dpr/utils/ReportStoreServiceUtils'
import setUpDprResources from '../../src/dpr/middleware/setUpDprResources'
import MissingReportClient from '../../src/dpr/services/missingReport/missingReportClient'

export default function initMockClients(router: Router, featureConfig?: { bookmarking?: boolean; download?: boolean }) {
  // 1. Init Data clients
  const reportingClient = new MockReportingClient() as unknown as ReportingClient
  const dashboardClient = new MockDashboardClient() as unknown as DashboardClient
  const reportDataStore = new MockUserStoreService() as unknown as ReportDataStore
  const missingReportClient = new MissingReportClient({
    agent: {
      timeout: 1000,
    },
    url: `http://localhost:9091`,
  })

  // 2. Create services
  const services = {
    ...createDprServices({ reportingClient, dashboardClient, reportDataStore, missingReportClient }, featureConfig),
  }

  router.use(setUpDprResources(services))

  return {
    services,
    router,
  }
}

/* eslint-disable no-param-reassign */
import { Router } from 'express'
import platformRoutes from '../../../../dist/dpr/routes'

// Mock Clients & API responses
import MockReportingClient from '../../../mocks/mockClients/reports/mockReportingClient'
import MockDashboardClient from '../../../mocks/mockClients/dashboards/mock-client'
import MockUserStoreService from '../../../mocks/mockClients/store/mockRedisStore'
import ReportingClient from '../../../../dist/dpr/data/reportingClient'

// Integration deps
import createDprServices from '../../../../dist/dpr/utils/ReportStoreServiceUtils'
import DashboardClient from '../../../../dist/dpr/data/dashboardClient'
import ReportDataStore from '../../../../dist/dpr/data/reportDataStore'
import setUpDprResources from '../../../../dist/dpr/middleware/setUpDprResources'
import initMockClients from '../../../utils/initMockClients'

import PlatformController from './controller'

const integratePlatformSteps = () => {
  // 1. Init Data clients
  const reportingClient = new MockReportingClient() as unknown as ReportingClient
  const dashboardClient = new MockDashboardClient() as unknown as DashboardClient
  const reportDataStore = new MockUserStoreService() as unknown as ReportDataStore

  // 2. Create services
  const services = {
    ...createDprServices({ reportingClient, dashboardClient, reportDataStore }),
  }

  return {
    services,
  }
}

// Routes
export default function routes() {
  const router = Router({ mergeParams: true })

  const { services } = initMockClients(router)
  const controller = new PlatformController(services)

  router.get('/', controller.GET)
  router.use('/', platformRoutes({ services, layoutPath: 'views/page.njk' }))

  return router
}

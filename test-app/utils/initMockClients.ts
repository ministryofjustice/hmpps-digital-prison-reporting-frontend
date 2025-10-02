import { Router } from 'express'
import ReportingClient from '../../src/dpr/data/reportingClient'
import DashboardClient from '../../src/dpr/data/dashboardClient'
import ReportDataStore from '../../src/dpr/data/reportDataStore'
import createDprServices from '../../src/dpr/utils/ReportStoreServiceUtils'
import setUpDprResources from '../../src/dpr/middleware/setUpDprResources'
import MissingReportClient from '../../src/dpr/services/missingReport/missingReportClient'
import { createClient } from 'redis'
import MockReportingClient from '../mocks/mockClients/reports/mockReportingClient'
import { MockUserStoreService } from '../mocks/mockClients/store/mockRedisStore'
import MockDashboardClient from '../mocks/mockClients/dashboards/mock-client'

export const initServices = (featureConfig?: { bookmarking?: boolean; download?: boolean }) => {
  let clients: {
    reportingClient: any
    dashboardClient: any
    reportDataStore: any
    missingReportClient: any
  } = {} as typeof clients
  if (process.env.USE_MOCK_CLIENTS) {
    clients.reportingClient = new MockReportingClient() as unknown as ReportingClient
    clients.dashboardClient = new MockDashboardClient() as unknown as DashboardClient
    clients.reportDataStore = new MockUserStoreService() as unknown as ReportDataStore
  } else {
    // 1. Init Data clients
    clients.reportingClient = new ReportingClient({
      agent: {
        timeout: 1000
      },
      url: 'http://localhost:9091'
    })
    clients.dashboardClient = new DashboardClient({
      agent: {
        timeout: 1000
      },
      url: 'http://localhost:9091'
    })
    clients.reportDataStore = new ReportDataStore(
      createClient({
        password: '',
        socket: {
          host: "127.0.0.1",
          port: 6379,
          tls: false,
          reconnectStrategy: (attempts) => {
            // Exponential back off: 20ms, 40ms, 80ms..., capped to retry every 30 seconds
            const nextDelay = Math.min(2 ** attempts * 20, 30000)
            console.log(`Retry Redis connection attempt: ${attempts}, next attempt in: ${nextDelay}ms`)
            return nextDelay
          },
        },
      })
    )
  }
  clients.missingReportClient = new MissingReportClient({
    agent: {
      timeout: 1000,
    },
    url: `http://localhost:9091`,
  })

  // 2. Create services
  return createDprServices(clients, featureConfig)
}

export default function initMockClients(router: Router, featureConfig?: { bookmarking?: boolean; download?: boolean }) {
  const services = initServices(featureConfig)
  
  router.use(setUpDprResources(services))

  return {
    services,
    router,
  }
}

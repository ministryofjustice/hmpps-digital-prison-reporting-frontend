import { Router } from 'express'
import { createClient } from 'redis'
import ProductCollectionClient from '../../src/dpr/data/productCollectionClient'
import ReportingClient from '../../src/dpr/data/reportingClient'
import DashboardClient from '../../src/dpr/data/dashboardClient'
import ReportDataStore from '../../src/dpr/data/reportDataStore'
import { createDprServices } from '../../src/dpr/utils/CreateDprServices'
import setUpDprResources from '../../src/dpr/middleware/setUpDprResources'
import MissingReportClient from '../../src/dpr/data/missingReportClient'
import MockReportingClient from '../mocks/mockClients/reports/mockReportingClient'
import { MockUserStoreService } from '../mocks/mockClients/store/mockRedisStore'
import MockDashboardClient from '../mocks/mockClients/dashboards/mock-client'
import { ServiceFeatureConfig } from '../../src/dpr/types/DprConfig'
import { FeatureFlagService } from 'src/dpr/services/featureFlagService'
import { Environment } from 'nunjucks'

export const initServices = (featureConfig?: ServiceFeatureConfig) => {
  const clients: {
    reportingClient: any
    dashboardClient: any
    reportDataStore: any
    missingReportClient: any
    productCollectionClient: ProductCollectionClient
    featureFlagService: FeatureFlagService
  } = {} as typeof clients
  if (process.env['USE_MOCK_CLIENTS']) {
    clients.reportingClient = new MockReportingClient() as unknown as ReportingClient
    clients.dashboardClient = new MockDashboardClient() as unknown as DashboardClient
    clients.reportDataStore = new MockUserStoreService() as unknown as ReportDataStore
  } else {
    // 1. Init Data clients
    clients.reportingClient = new ReportingClient({
      agent: {
        timeout: 1000,
      },
      url: 'http://localhost:9091',
    })
    clients.dashboardClient = new DashboardClient({
      agent: {
        timeout: 1000,
      },
      url: 'http://localhost:9091',
    })
    clients.reportDataStore = new ReportDataStore(
      createClient({
        password: '',
        socket: {
          host: '127.0.0.1',
          port: 6379,
          tls: false,
          reconnectStrategy: (attempts) => {
            // Exponential back off: 20ms, 40ms, 80ms..., capped to retry every 30 seconds
            const nextDelay = Math.min(2 ** attempts * 20, 30000)
            console.log(`Retry Redis connection attempt: ${attempts}, next attempt in: ${nextDelay}ms`)
            return nextDelay
          },
        },
      }),
    )
  }
  clients.missingReportClient = new MissingReportClient({
    agent: {
      timeout: 1000,
    },
    url: `http://localhost:9091`,
  })
  clients.productCollectionClient = new ProductCollectionClient({
    agent: {
      timeout: 1000,
    },
    url: `http://localhost:9091`,
  })
  clients.featureFlagService = new FeatureFlagService({
    namespace: 'foo',
    token: 'bar',
    url: 'http://localhost:9091',
  })

  // 2. Create services
  return createDprServices(clients, featureConfig)
}

export default function initMockClients(router: Router, env: Environment, featureConfig?: { bookmarking?: boolean; download?: boolean }) {
  const services = initServices(featureConfig)

  router.use(setUpDprResources(services, '', env))

  return {
    services,
    router,
  }
}

import type { Express } from 'express'
import request from 'supertest'
import express from 'express'

import addAsyncReportingRoutes from './asyncReports'
import MockUserStoreService from '../../../test-app/mocks/mockClients/store/mockRedisStore'
import MockReportingClient from '../../../test-app/mocks/mockClients/reports/mockReportingClient'
import BookmarkService from '../services/bookmarkService'
import DashboardService from '../services/dashboardService'
import RecentlyViewedStoreService from '../services/recentlyViewedService'
import ReportingService from '../services/reportingService'
import RequestedReportService from '../services/requestedReportService'
import UserDataStore from '../data/userDataStore'

import MockMetricClient from '../../../test-app/mocks/mockClients/metrics/mockMetricClient'
import MockDashboardClient from '../../../test-app/mocks/mockClients/dashboards/mockDashboardClient'

import MetricsService from '../services/metricsService'
import type ReportingClient from '../data/reportingClient'

let app: Express

const mockUserStore = new MockUserStoreService() as unknown as UserDataStore
const requestedReportService = new RequestedReportService(mockUserStore)
const recentlyViewedService = new RecentlyViewedStoreService(mockUserStore)
const bookmarkService = new BookmarkService(mockUserStore)
requestedReportService.init('userId')
recentlyViewedService.init('userId')
bookmarkService.init('userId')

const reportingClient = new MockReportingClient() as unknown as ReportingClient
const reportingService = new ReportingService(reportingClient)

const metricClient = new MockMetricClient()
const metricService = new MetricsService(metricClient)

const dashboardClient = new MockDashboardClient()
const dashboardService = new DashboardService(dashboardClient)

const services = {
  bookmarkService,
  recentlyViewedService,
  requestedReportService,
  reportingService,
  metricService,
  dashboardService,
}

beforeEach(() => {
  app = express()

  addAsyncReportingRoutes({
    router: app,
    services,
    layoutPath: 'page.njk',
    templatePath: 'dpr/views/',
  })
})

describe('GET /', () => {
  it('should render index page', () => {
    return request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect((res) => {
        expect(res.text).toContain('Digital Prison Reporting')
      })
  })
})

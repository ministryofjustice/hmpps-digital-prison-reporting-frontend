import { Response, Request } from 'express'
import { Url } from 'url'
import * as AsyncReportUtils from './renderAsyncReport'
import ColumnUtils from '../components/columns/utils'
import PaginationUtils from '../components/pagination/utils'
import ReportActionsUtils from '../components/report-actions/utils'

import MockReportingClient from '../../../test-app/mocks/mockClients/reports/mockReportingClient'
import { RequestedReport } from '../types/UserReports'
import RequestedReportService from '../services/requestedReportService'
import ReportingService from '../services/reportingService'
import { mockGetReportListRenderData } from '../../../test-app/mocks/mockAsyncData/mockReportListRenderData'
import RecentlyViewedStoreService from '../services/recentlyViewedService'
import definitions from '../../../test-app/mocks/mockClients/reports/mockReportDefinition'
import BookmarkService from '../services/bookmarkService'
import MetricService from '../services/metricsService'
import DashboardService from '../services/dashboardService'

jest.mock('parseurl', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({ pathname: 'pathname', search: 'search' } as Url)),
}))

const reportState = {
  reportName: 'reportName',
  name: 'variantName',
  executionId: 'executionId',
  query: { summary: 'summary' },
  description: 'description',
  url: {
    request: {
      fullUrl: 'fullUrl',
    },
  },
  timestamp: {
    requested: 'ts',
  },
} as unknown as RequestedReport

const mockReportingClient = new MockReportingClient()

jest.spyOn(AsyncReportUtils, 'initDataSources').mockImplementation(() => [
  mockReportingClient.getDefinition('', '', 'variantId-2'),
  mockReportingClient.getAsyncReport('', '', '', '', { pageSize: 10 }),
  mockReportingClient.getAsyncCount(),
  new Promise((resolve) => {
    resolve(reportState)
  }),
])

describe('AsyncReportUtils', () => {
  jest.spyOn(PaginationUtils, 'getPaginationData')
  const ReportActionsUtilsSpy = jest.spyOn(ReportActionsUtils, 'initAsyncReportActions')
  jest.spyOn(ColumnUtils, 'getColumns')

  describe('getReport', () => {
    it('should return data to render the report list', async () => {
      const mockReq = { query: { columns: ['column'] } } as unknown as Request
      const mockRes = { locals: { user: { token: 'token' } } } as unknown as Response

      const mockAsyncReportsStore = {
        updateLastViewed: jest.fn(),
      } as unknown as RequestedReportService

      const mockBookmarkService = {
        isBookmarked: jest.fn().mockReturnValue(false),
      } as unknown as BookmarkService

      const mockMetricService = {} as unknown as MetricService
      const mockDashboardService = {} as unknown as DashboardService

      const mockRecentlyViewedStoreService = {
        setRecentlyViewed: jest.fn(),
      } as unknown as RecentlyViewedStoreService
      const mockDataSources = { locals: { user: { token: 'token' } } } as unknown as ReportingService

      const services = {
        requestedReportService: mockAsyncReportsStore,
        reportingService: mockDataSources,
        recentlyViewedService: mockRecentlyViewedStoreService,
        bookmarkService: mockBookmarkService,
        metricService: mockMetricService,
        dashboardService: mockDashboardService,
      }

      const result = await AsyncReportUtils.getReport({
        req: mockReq,
        res: mockRes,
        services,
      })

      expect(ReportActionsUtilsSpy).toHaveBeenCalledWith(definitions.report.variants[1], reportState)

      expect(result).toEqual(mockGetReportListRenderData)
    })
  })
})

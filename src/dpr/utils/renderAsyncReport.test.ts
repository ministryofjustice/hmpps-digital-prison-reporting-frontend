import { Response, Request } from 'express'
import { Url } from 'url'
import * as AsyncReportUtils from './renderAsyncReport'
import ColumnUtils from '../components/columns/utils'
import PaginationUtils from '../components/pagination/utils'
import ReportActionsUtils from '../components/report-actions/utils'

import mockAsyncApis from '../../../test-app/mockAsyncData/mockAsyncApis'
import { RequestedReport } from '../types/UserReports'
import AsyncReportStoreService from '../services/requestedReportsService'
import ReportingService from '../services/reportingService'
import { mockGetReportListRenderData } from '../../../test-app/mockAsyncData/mockReportListRenderData'
import RecentlyViewedStoreService from '../services/recentlyViewedService'
import definitions from '../../../test-app/mockAsyncData/mockReportDefinition'
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

jest.spyOn(AsyncReportUtils, 'initDataSources').mockImplementation(() => [
  mockAsyncApis.getDefinition('', '', 'variantId-2'),
  mockAsyncApis.getAsyncReport('', '', '', '', { pageSize: 10 }),
  mockAsyncApis.getAsyncCount(),
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
      } as unknown as AsyncReportStoreService

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
        asyncReportsStore: mockAsyncReportsStore,
        reportingService: mockDataSources,
        recentlyViewedStoreService: mockRecentlyViewedStoreService,
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

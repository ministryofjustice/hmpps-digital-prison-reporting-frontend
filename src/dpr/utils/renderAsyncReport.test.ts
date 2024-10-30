/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { components } from '../types/api'
import { Services } from '../types/Services'

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

describe('AsyncReportUtils', () => {
  describe('initDataSources', () => {
    let req: Request
    let res: Response
    let mockSingleVariantDefinition: components['schemas']['SingleVariantReportDefinition']
    let reportingService: ReportingService
    let services: Services
    let requestedReportService: RequestedReportService

    beforeEach(() => {
      jest.clearAllMocks()
      req = {
        params: {
          reportId: 'reportId',
          tableId: 'tableId',
          variantId: 'variantId',
          id: 'id',
        },
        query: {},
      } as unknown as Request

      res = {} as unknown as Response

      mockSingleVariantDefinition = {
        id: 'id',
        name: 'report-name',
        description: 'report-description',
        variant: {
          id: 'variant-id',
          name: 'variant-name',
          resourceName: 'resourceName',
          description: 'description',
          specification: {
            template: 'list',
            fields: [],
          },
          summaries: [
            {
              id: 'summary-Id',
              template: 'table-header',
              fields: [],
            },
          ],
        },
      } as unknown as components['schemas']['SingleVariantReportDefinition']

      reportingService = {
        getDefinition: jest.fn().mockImplementation(() => {
          return new Promise((resolve) => {
            resolve(mockSingleVariantDefinition)
          })
        }),
        getAsyncReport: jest.fn().mockImplementation(() => {
          return new Promise((resolve) => {
            resolve({})
          })
        }),
        getAsyncCount: jest.fn().mockImplementation(() => {
          return new Promise((resolve) => {
            resolve(100)
          })
        }),
        getAsyncSummaryReport: jest.fn().mockImplementation(() => {
          return new Promise((resolve) => {
            resolve({})
          })
        }),
      } as unknown as ReportingService

      requestedReportService = {
        getReportByTableId: jest.fn().mockImplementation(() => {
          return new Promise((resolve) => {
            resolve({})
          })
        }),
      } as unknown as RequestedReportService

      services = {
        reportingService,
        requestedReportService,
      } as unknown as Services
    })

    it('should init data sources', () => {
      const result = AsyncReportUtils.initDataSources({
        req,
        res,
        services,
        userId: 'userId',
        token: 'ToKeN',
      })

      expect(result.length).toEqual(5)
    })
  })

  describe('getReport', () => {
    let ReportActionsUtilsSpy: any

    beforeEach(() => {
      jest.clearAllMocks()
      jest.spyOn(AsyncReportUtils, 'initDataSources').mockImplementation(() => [
        mockReportingClient.getDefinition('', '', 'variantId-2'),
        mockReportingClient.getAsyncReport('', '', '', '', { pageSize: 10 }),
        mockReportingClient.getAsyncCount(),
        new Promise((resolve) => {
          resolve(reportState)
        }),
      ])
      jest.spyOn(PaginationUtils, 'getPaginationData')
      ReportActionsUtilsSpy = jest.spyOn(ReportActionsUtils, 'initAsyncReportActions')
      jest.spyOn(ColumnUtils, 'getColumns')
    })

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

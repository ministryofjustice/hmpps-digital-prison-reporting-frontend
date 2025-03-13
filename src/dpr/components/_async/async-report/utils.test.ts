import { Request, Response } from 'express'
import { Url } from 'url'
import Dict = NodeJS.Dict

// types
import ReportQuery from '../../../types/ReportQuery'
import type { components } from '../../../types/api'
import type { RequestedReport } from '../../../types/UserReports'
import type { Services } from '../../../types/Services'
import type { Columns } from '../../_reports/report-columns-form/types'

// Utils
import AsyncReportUtils from './utils'
import * as AsyncReportListUtilsHelper from './utils'
import ColumnUtils from '../../_reports/report-columns-form/utils'
import PaginationUtils from '../../_reports/report-pagination/utils'

// Mocked
import createMockData from '../../../../../test-app/mocks/mockClients/reports/mockAsyncData'
import definitions from '../../../../../test-app/mocks/mockClients/reports/mockReportDefinition'
import MockReportingClient from '../../../../../test-app/mocks/mockClients/reports/mockReportingClient'
import {
  mockReportListRenderData,
  mockGetReportListRenderData,
} from '../../../../../test-app/mocks/mockAsyncData/mockReportListRenderData'

// Services
import ReportingService from '../../../services/reportingService'
import RequestedReportService from '../../../services/requestedReportService'
import BookmarkService from '../../../services/bookmarkService'
import DashboardService from '../../../services/dashboardService'
import DownloadPermissionService from '../../../services/downloadPermissionService'
import RecentlyViewedStoreService from '../../../services/recentlyViewedService'

jest.mock('parseurl', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({ pathname: 'pathname', search: 'search' } as Url)),
}))

const mockReportData = createMockData(10)

const reportState = {
  id: 'id',
  variantId: 'id',
  reportId: 'reportId',
  reportName: 'reportName',
  name: 'variantName',
  tableId: 'tableId',
  type: 'report',
  variantName: 'variantName',
  executionId: 'executionId',
  query: { summary: 'summary' },
  description: 'description',
  url: {
    request: {
      fullUrl: 'fullUrl',
    },
    report: {
      default: 'defaultQuery',
    },
  },
  timestamp: {
    requested: 'ts',
  },
} as unknown as RequestedReport

const mockReportingClient = new MockReportingClient()

describe('AsyncReportListUtils', () => {
  const PaginationUtilsSpy = jest.spyOn(PaginationUtils, 'getPaginationData')
  const fieldNames = ['field2', 'column']

  describe('getRenderData', () => {
    it('should return data to render the report list', async () => {
      const mockReq = { query: { columns: fieldNames } } as unknown as Request
      const mockSpecification = definitions.report.variants[1].specification
      const specification: components['schemas']['Specification'] = {
        template: mockSpecification.template as
          | 'list'
          | 'list-section'
          | 'list-tab'
          | 'summary'
          | 'summary-section'
          | 'parent-child',
        fields: mockSpecification.fields as components['schemas']['FieldDefinition'][],
        sections: [],
      }
      const querySummary: Array<Dict<string>> = [
        {
          query: 'summary',
        },
      ]
      const columns: Columns = ColumnUtils.getColumns(specification, fieldNames)

      const result = AsyncReportListUtilsHelper.getRenderData(
        mockReq,
        specification,
        mockReportData,
        100,
        querySummary,
        {},
        columns,
        {} as ReportQuery,
        false,
      )

      expect(PaginationUtilsSpy).toHaveBeenCalledWith({ pathname: 'pathname', search: 'search' }, 100)
      expect(result).toEqual(mockReportListRenderData)
    })
  })

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
      const result = AsyncReportListUtilsHelper.initDataSources({
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
    beforeEach(() => {
      jest.clearAllMocks()
      jest.spyOn(AsyncReportListUtilsHelper, 'initDataSources').mockImplementation(() => [
        mockReportingClient.getDefinition('', 'test-report-3', 'variantId-2'),
        mockReportingClient.getAsyncReport('', '', '', '', { pageSize: 10 }),
        new Promise((resolve) => {
          resolve(reportState)
        }),
      ])
      jest.spyOn(PaginationUtils, 'getPaginationData')
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

      const mockDashboardService = {} as unknown as DashboardService

      const downloadPermissionService = {
        downloadEnabled: jest.fn().mockResolvedValue(true),
      } as unknown as DownloadPermissionService

      const mockRecentlyViewedStoreService = {
        setRecentlyViewed: jest.fn(),
      } as unknown as RecentlyViewedStoreService

      const mockReportingService = {
        getAsyncCount: jest.fn().mockImplementation(() => {
          return new Promise((resolve) => {
            resolve(100)
          })
        }),
        getAsyncInteractiveCount: jest.fn().mockImplementation(() => {
          return new Promise((resolve) => {
            resolve(100)
          })
        }),
      } as unknown as ReportingService

      const services = {
        requestedReportService: mockAsyncReportsStore,
        reportingService: mockReportingService,
        recentlyViewedService: mockRecentlyViewedStoreService,
        bookmarkService: mockBookmarkService,
        dashboardService: mockDashboardService,
        downloadPermissionService,
      }

      const result = await AsyncReportUtils.getReport({
        req: mockReq,
        res: mockRes,
        services,
      })

      expect(result).toEqual(mockGetReportListRenderData)
    })
  })
})

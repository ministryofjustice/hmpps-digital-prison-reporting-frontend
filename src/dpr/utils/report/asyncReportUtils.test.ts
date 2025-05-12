import { Request, Response } from 'express'
import { Url } from 'url'
import Dict = NodeJS.Dict

// types
import ReportQuery from '../../types/ReportQuery'
import type { components } from '../../types/api'
import type { Columns } from '../../components/_reports/report-columns-form/types'

// Utils
import AsyncReportUtils from './asyncReportUtils'
import * as AsyncReportListUtilsHelper from './asyncReportUtils'
import ColumnUtils from '../../components/_reports/report-columns-form/utils'
import PaginationUtils from '../../components/_reports/report-pagination/utils'

// Mocked
import createMockData from '../../../../test-app/mocks/mockClients/reports/mockAsyncData'
import definitions from '../../../../test-app/mocks/mockClients/reports/mockReportDefinition'
import {
  mockReportListRenderData,
  mockGetReportListRenderData,
} from '../../../../test-app/mocks/mockAsyncData/mockReportListRenderData'

// Services
import ReportingService from '../../services/reportingService'
import RequestedReportService from '../../services/requestedReportService'
import BookmarkService from '../../services/bookmarkService'
import DashboardService from '../../services/dashboardService'
import DownloadPermissionService from '../../services/downloadPermissionService'
import RecentlyViewedStoreService from '../../services/recentlyViewedService'
import variant2 = require('../../../../test-app/mocks/mockClients/reports/mockVariants/variant2')
import { Services } from '../../types/Services'
import variant9 = require('../../../../test-app/mocks/mockClients/reports/mockVariants/variant9')
import variant26 = require('../../../../test-app/mocks/mockClients/reports/mockVariants/variant26-parent-child')
import { RequestedReport } from '../../types/UserReports'

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

  describe('renderReport', () => {
    beforeEach(async () => {
      jest.clearAllMocks()
      jest.spyOn(PaginationUtils, 'getPaginationData')
      jest.spyOn(ColumnUtils, 'getColumns')
    })

    it('should return data to render the report list', async () => {
      const mockReq = {
        query: {
          columns: ['column'],
        },
        params: {
          reportId: 'reportId',
          variantId: 'variantId',
          id: 'id',
          tableId: 'tableId',
        },
      } as unknown as Request
      const mockRes = {
        locals: { user: { token: 'token' }, bookmarkingEnabled: true, downloadingEnabled: true },
      } as unknown as Response

      const mockAsyncReportsStore = {
        updateLastViewed: jest.fn(),
        getReportByTableId: jest.fn().mockImplementation(() => {
          return new Promise((resolve) => {
            resolve(reportState)
          })
        }),
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
        getDefinition: jest.fn().mockImplementation(() => {
          return new Promise((resolve) => {
            resolve({
              id: 'test-report-3',
              name: 'C Test Report',
              variant: variant2,
            })
          })
        }),
        getAsyncReport: jest.fn().mockImplementation(() => {
          return new Promise((resolve) => {
            const data = createMockData(10)
            resolve(data)
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

      const result = await AsyncReportUtils.renderReport({
        req: mockReq,
        res: mockRes,
        services,
      })

      expect(result).toEqual(mockGetReportListRenderData)
    })
  })

  describe('getData', () => {
    let req: Request
    let res: Response
    let token: string
    let userId: string
    let services: Services
    let mockReportingService: ReportingService
    let mockAsyncReportsStore: RequestedReportService

    beforeEach(() => {
      req = {
        query: {
          columns: ['column'],
        },
        params: {
          reportId: 'reportId',
          variantId: 'variantId',
          id: 'id',
          tableId: 'tableId',
        },
      } as unknown as Request

      res = {
        locals: {},
      } as unknown as Response

      token = 'token'
      userId = 'userId'

      mockReportingService = {
        getDefinition: jest.fn(),
        getAsyncReport: jest.fn(),
        getAsyncSummaryReport: jest.fn(),
      } as unknown as ReportingService

      mockAsyncReportsStore = {
        updateLastViewed: jest.fn(),
        getReportByTableId: jest.fn().mockImplementation(() => {
          return new Promise((resolve) => {
            resolve({
              ...reportState,
              childExecutionData: [
                {
                  variantId: 'variantId-26-child',
                  tableId: 'childTableID',
                },
              ],
            })
          })
        }),
      } as unknown as RequestedReportService

      services = {
        requestedReportService: mockAsyncReportsStore,
        reportingService: mockReportingService,
      } as unknown as Services
    })

    it('should get the data for a list report', async () => {
      mockReportingService = {
        ...mockReportingService,
        getDefinition: jest.fn().mockImplementation(() => {
          return new Promise((resolve) => {
            resolve({
              id: 'test-report-3',
              name: 'C Test Report',
              variant: variant2,
            })
          })
        }),
      } as unknown as ReportingService

      services = {
        requestedReportService: mockAsyncReportsStore,
        reportingService: mockReportingService,
      } as unknown as Services

      await AsyncReportListUtilsHelper.getData({ res, req, services, token, userId })

      expect(services.requestedReportService.getReportByTableId).toHaveBeenCalled()
      expect(services.reportingService.getAsyncReport).toHaveBeenCalledTimes(1)
      expect(services.reportingService.getAsyncSummaryReport).not.toHaveBeenCalled()
    })

    it('should get the data for a summaries report', async () => {
      mockReportingService = {
        ...mockReportingService,
        getDefinition: jest.fn().mockImplementation(() => {
          return new Promise((resolve) => {
            resolve({
              id: 'test-report-2',
              name: 'B Test Report',
              variant: variant9,
            })
          })
        }),
      } as unknown as ReportingService

      services = {
        requestedReportService: mockAsyncReportsStore,
        reportingService: mockReportingService,
      } as unknown as Services

      await AsyncReportListUtilsHelper.getData({
        res,
        req,
        services,
        token,
        userId,
      })

      expect(services.requestedReportService.getReportByTableId).toHaveBeenCalled()
      expect(services.reportingService.getAsyncReport).toHaveBeenCalledTimes(1)
      expect(services.reportingService.getAsyncSummaryReport).toHaveBeenCalled()
    })

    it('should get the data for a parent child report', async () => {
      mockReportingService = {
        ...mockReportingService,
        getDefinition: jest.fn().mockImplementation(() => {
          return new Promise((resolve) => {
            resolve({
              id: 'test-report-1',
              name: 'A Test Report',
              variant: variant26,
            })
          })
        }),
      } as unknown as ReportingService

      services = {
        requestedReportService: mockAsyncReportsStore,
        reportingService: mockReportingService,
      } as unknown as Services

      await AsyncReportListUtilsHelper.getData({
        res,
        req,
        services,
        token,
        userId,
      })

      expect(services.requestedReportService.getReportByTableId).toHaveBeenCalled()
      expect(services.reportingService.getAsyncReport).toHaveBeenCalledTimes(2)
      expect(services.reportingService.getAsyncSummaryReport).not.toHaveBeenCalled()

      expect(services.reportingService.getAsyncReport).toHaveBeenNthCalledWith(
        1,
        'token',
        'reportId',
        'variantId',
        'tableId',
        {
          columns: ['column'],
          pageSize: '50000',
          selectedPage: '1',
          sortColumn: undefined,
          sortedAsc: 'true',
        },
      )
      expect(services.reportingService.getAsyncReport).toHaveBeenNthCalledWith(
        2,
        'token',
        'reportId',
        'variantId-26-child',
        'childTableID',
        {
          columns: ['column'],
          pageSize: '50000',
          selectedPage: '1',
          sortColumn: undefined,
          sortedAsc: 'true',
        },
      )
    })
  })
})

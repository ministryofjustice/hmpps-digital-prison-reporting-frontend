// Types
import { Request, Response } from 'express'
import { Url } from 'url'
import { RequestedReport } from '../../types/UserReports'
import { Services } from '../../types/Services'

// Utils
import AsyncReportUtils from './asyncReportUtils'
import ColumnUtils from '../../components/_reports/report-columns-form/utils'
import PaginationUtils from '../../components/_reports/report-pagination/utils'
import UserReportsUtils from '../../components/user-reports/utils'
import * as AsyncReportListUtilsHelper from './asyncReportUtils'

// Services
import BookmarkService from '../../services/bookmarkService'
import RecentlyViewedStoreService from '../../services/recentlyViewedService'
import RequestedReportService from '../../services/requestedReportService'
import DashboardService from '../../services/dashboardService'
import DownloadPermissionService from '../../services/downloadPermissionService'
import ReportingService from '../../services/reportingService'

// Mocked
import createMockData from '../../../../test-app/mocks/mockClients/reports/mockAsyncData'
import variant2 = require('../../../../test-app/mocks/mockClients/reports/mockVariants/variant2')
import { mockGetReportListRenderData } from '../../../../test-app/mocks/mockAsyncData/mockReportListRenderData'
import variant9 = require('../../../../test-app/mocks/mockClients/reports/mockVariants/variant9')
import variant26 = require('../../../../test-app/mocks/mockClients/reports/mockVariants/variant26-parent-child')

jest.mock('parseurl', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({ pathname: 'pathname', search: 'search' } as Url)),
}))

describe('AsyncReportUtils', () => {
  let requestedReportState: RequestedReport

  beforeEach(() => {
    requestedReportState = {
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
  })

  describe('renderReport', () => {
    let req: Request
    let res: Response
    let requestedReportService: RequestedReportService
    let recentlyViewedService: RecentlyViewedStoreService
    let bookmarkService: BookmarkService
    let dashboardService: DashboardService
    let downloadPermissionService: DownloadPermissionService
    let reportingService: ReportingService
    let services: Services

    beforeEach(() => {
      jest.clearAllMocks()
      jest.spyOn(PaginationUtils, 'getPaginationData')
      jest.spyOn(ColumnUtils, 'getColumns')
      jest.spyOn(UserReportsUtils, 'updateLastViewed').mockResolvedValue(null)

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
        originalUrl: 'originalUrl',
      } as unknown as Request

      res = {
        locals: {
          user: {
            token: 'token',
          },
          bookmarkingEnabled: true,
          downloadingEnabled: true,
        },
      } as unknown as Response

      requestedReportService = {
        updateLastViewed: jest.fn(),
        getReportByTableId: jest.fn().mockImplementation(() => {
          return new Promise((resolve) => {
            resolve(requestedReportState)
          })
        }),
      } as unknown as RequestedReportService

      recentlyViewedService = {
        setRecentlyViewed: jest.fn(),
      } as unknown as RecentlyViewedStoreService

      bookmarkService = {
        isBookmarked: jest.fn().mockReturnValue(false),
      } as unknown as BookmarkService

      dashboardService = {} as unknown as DashboardService

      downloadPermissionService = {
        downloadEnabled: jest.fn().mockResolvedValue(true),
      } as unknown as DownloadPermissionService

      reportingService = {
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

      services = {
        requestedReportService,
        recentlyViewedService,
        bookmarkService,
        dashboardService,
        downloadPermissionService,
        reportingService,
      }
    })

    it('should return data to render the report list', async () => {
      const result = await AsyncReportUtils.renderReport({ req, res, services })
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
              ...requestedReportState,
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

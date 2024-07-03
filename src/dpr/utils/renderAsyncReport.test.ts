import { Response, Request } from 'express'
import { Url } from 'url'
import * as AsyncReportUtils from './renderAsyncReport'
import DataTableUtils from '../components/data-table/utils'
import ColumnUtils from '../components/async-columns/utils'
import PaginationUtils from '../components/pagination/utils'
import ReportActionsUtils from '../components/icon-button-list/utils'

import mockAsyncApis from '../../../test-app/mockAsyncData/mockAsyncApis'
import { AsyncReportData } from '../types/AsyncReport'
import AsyncReportStoreService from '../services/requestedReportsService'
import ReportingService from '../services/reportingService'
import { mockGetReportListRenderData } from '../../../test-app/mockAsyncData/mockReportListRenderData'
import RecentlyViewedStoreService from '../services/recentlyViewedService'
import definitions from '../../../test-app/mockAsyncData/mockReportDefinition'
import BookmarkService from '../services/bookmarkService'

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
} as unknown as AsyncReportData

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
  const ReportActionsUtilsSpy = jest.spyOn(ReportActionsUtils, 'initReportActions')
  jest.spyOn(DataTableUtils, 'mapData')
  jest.spyOn(DataTableUtils, 'mapAsyncHeader')
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

      const mockRecentlyViewedStoreService = {
        setRecentlyViewed: jest.fn(),
      } as unknown as RecentlyViewedStoreService
      const mockDataSources = { locals: { user: { token: 'token' } } } as unknown as ReportingService

      const services = {
        asyncReportsStore: mockAsyncReportsStore,
        reportingService: mockDataSources,
        recentlyViewedStoreService: mockRecentlyViewedStoreService,
        bookmarkService: mockBookmarkService,
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

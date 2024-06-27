import { Response, Request } from 'express'
import { Url } from 'url'
import * as AsyncReportUtils from './renderAsyncReport'
import DataTableUtils from '../components/data-table/utils'
import ColumnUtils from '../components/async-columns/utils'
import PaginationUtils from '../components/pagination/utils'
import ReportActionsUtils from '../components/icon-button-list/utils'

import mockAsyncApis from '../../../test-app/mockData/mockAsyncApis'
import { AsyncReportData } from '../types/AsyncReport'
import AsyncReportStoreService from '../services/requestedReportsService'
import ReportingService from '../services/reportingService'
import mockReportListRenderData from '../../../test-app/mockData/mockReportListRenderData'
import RecentlyViewedStoreService from '../services/recentlyViewedService'

jest.mock('parseurl', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({ pathname: 'pathname', search: 'search' } as Url)),
}))

const reportState = {
  reportName: 'reportName',
  name: 'variantName',
  query: { summary: 'summary' },
  description: 'description',
  url: {
    request: {
      fullUrl: 'fullUrl',
    },
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
  jest.spyOn(ReportActionsUtils, 'initReportActions')
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
      const mockRecentlyViewedStoreService = {
        setRecentlyViewed: jest.fn(),
      } as unknown as RecentlyViewedStoreService
      const mockDataSources = { locals: { user: { token: 'token' } } } as unknown as ReportingService

      const result = await AsyncReportUtils.getReport({
        req: mockReq,
        res: mockRes,
        asyncReportsStore: mockAsyncReportsStore,
        dataSources: mockDataSources,
        recentlyViewedStoreService: mockRecentlyViewedStoreService,
      })

      expect(result).toEqual({ renderData: mockReportListRenderData })
    })
  })
})

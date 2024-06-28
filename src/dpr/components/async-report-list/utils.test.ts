import { Response, Request } from 'express'
import { Url } from 'url'
import * as AsyncReportListUtils from './utils'
import DataTableUtils from '../data-table/utils'
import ColumnUtils from '../async-columns/utils'
import PaginationUtils from '../pagination/utils'
import ReportActionsUtils from '../icon-button-list/utils'

import mockAsyncApis from '../../../../test-app/mockData/mockAsyncApis'
import createMockData from '../../../../test-app/mockData/mockAsyncData'
import { AsyncReportData } from '../../types/AsyncReport'
import AsyncReportStoreService from '../../services/requestedReportsService'
import ReportingService from '../../services/reportingService'

import definitions from '../../../../test-app/mockData/mockReportDefinition'
import mockReportListRenderData from '../../../../test-app/mockData/mockReportListRenderData'
import RecentlyViewedStoreService from '../../services/recentlyViewedService'

jest.mock('parseurl', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({ pathname: 'pathname', search: 'search' } as Url)),
}))

const reportState = {
  reportName: 'reportName',
  executionId: 'executionId',
  name: 'variantName',
  query: { summary: 'summary' },
  description: 'description',
  url: {
    request: {
      fullUrl: 'fullUrl',
    },
  },
} as unknown as AsyncReportData

const mockReportData = createMockData(10)

jest.spyOn(AsyncReportListUtils, 'initDataSources').mockImplementation(() => [
  mockAsyncApis.getDefinition('', '', 'variantId-2'),
  mockAsyncApis.getAsyncReport('', '', '', '', { pageSize: 10 }),
  mockAsyncApis.getAsyncCount(),
  new Promise((resolve) => {
    resolve(reportState)
  }),
])

describe('AsyncReportListUtils', () => {
  const PaginationUtilsSpy = jest.spyOn(PaginationUtils, 'getPaginationData')
  const ReportActionsUtilsSpy = jest.spyOn(ReportActionsUtils, 'initReportActions')
  const DataTableUtilsMapDataSpy = jest.spyOn(DataTableUtils, 'mapData')
  const DataTableUtilsMapHeaderSpy = jest.spyOn(DataTableUtils, 'mapAsyncHeader')
  const ColumnUtilsSpy = jest.spyOn(ColumnUtils, 'getColumns')

  describe('renderReport', () => {
    it('should return data to render the report', async () => {
      const mockReq = { query: { columns: ['column'] } } as unknown as Request
      const mockRes = { locals: { user: { token: 'token' } } } as unknown as Response
      const mockAsyncReportsStore = {
        updateLastViewed: jest.fn(),
      } as unknown as AsyncReportStoreService
      const mockRecentlyViewedStoreService = {
        setRecentlyViewed: jest.fn(),
      } as unknown as RecentlyViewedStoreService
      const mockDataSources = { locals: { user: { token: 'token' } } } as unknown as ReportingService

      const result = await AsyncReportListUtils.renderReport({
        req: mockReq,
        res: mockRes,
        asyncReportsStore: mockAsyncReportsStore,
        dataSources: mockDataSources,
        recentlyViewedStoreService: mockRecentlyViewedStoreService,
      })

      expect(ColumnUtilsSpy).toHaveBeenCalledWith(definitions.report.variants[1].specification.fields, ['column'])
      expect(PaginationUtilsSpy).toHaveBeenCalledWith({ pathname: 'pathname', search: 'search' }, 100)
      expect(ReportActionsUtilsSpy).toHaveBeenCalledWith(definitions.report.variants[1], reportState)
      expect(DataTableUtilsMapDataSpy).toHaveBeenCalledWith(
        mockReportData,
        definitions.report.variants[1].specification.fields,
        ['field2', 'column'],
      )
      expect(DataTableUtilsMapHeaderSpy).toHaveBeenCalledWith(definitions.report.variants[1].specification.fields, [
        'field2',
        'column',
      ])

      expect(result).toEqual(mockReportListRenderData)
    })
  })
})

import { Request } from 'express'
import { Url } from 'url'
import AsyncReportListUtils from './utils'
import DataTableUtils from '../data-table/utils'
import ColumnUtils from '../async-columns/utils'
import PaginationUtils from '../pagination/utils'

import mockAsyncApis from '../../../../test-app/mockAsyncData/mockAsyncApis'
import createMockData from '../../../../test-app/mockAsyncData/mockAsyncData'
import AsyncReportStoreService from '../../services/requestedReportsService'
import ReportingService from '../../services/reportingService'

import definitions from '../../../../test-app/mockAsyncData/mockReportDefinition'
import mockReportListRenderData from '../../../../test-app/mockAsyncData/mockReportListRenderData'
import RecentlyViewedStoreService from '../../services/recentlyViewedService'
import { AsyncReportData } from '../../types/AsyncReport'

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
  requestedTimestamp: 'ts',
} as unknown as AsyncReportData

const mockReportData = createMockData(10)

describe('AsyncReportListUtils', () => {
  const PaginationUtilsSpy = jest.spyOn(PaginationUtils, 'getPaginationData')
  const DataTableUtilsMapDataSpy = jest.spyOn(DataTableUtils, 'mapData')
  const DataTableUtilsMapHeaderSpy = jest.spyOn(DataTableUtils, 'mapAsyncHeader')
  const ColumnUtilsSpy = jest.spyOn(ColumnUtils, 'getColumns')

  describe('getRenderData', () => {
    it('should return data to render the report list', async () => {
      const mockReq = { query: { columns: ['column'] } } as unknown as Request
      const reportDefinition = JSON.parse(JSON.stringify(definitions.report))
      const variant = definitions.report.variants[1]
      reportDefinition.variant = variant

      const result = await AsyncReportListUtils.getRenderData(
        mockReq,
        reportDefinition,
        mockReportData,
        100,
        reportState,
      )

      expect(ColumnUtilsSpy).toHaveBeenCalledWith(variant.specification.fields, ['column'])
      expect(PaginationUtilsSpy).toHaveBeenCalledWith({ pathname: 'pathname', search: 'search' }, 100)
      expect(DataTableUtilsMapDataSpy).toHaveBeenCalledWith(mockReportData, variant.specification.fields, [
        'field2',
        'column',
      ])
      expect(DataTableUtilsMapHeaderSpy).toHaveBeenCalledWith(variant.specification.fields, ['field2', 'column'])
      expect(result).toEqual(mockReportListRenderData)
    })
  })
})

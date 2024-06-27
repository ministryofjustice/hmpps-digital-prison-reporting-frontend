import { Request } from 'express'
import { Url } from 'url'
import AsyncReportListUtils from './utils'
import DataTableUtils from '../data-table/utils'
import ColumnUtils from '../async-columns/utils'
import PaginationUtils from '../pagination/utils'
import ReportActionsUtils from '../icon-button-list/utils'

import createMockData from '../../../../test-app/mockData/mockAsyncData'
import mockReportListRenderData from '../../../../test-app/mockData/mockReportListRenderData'

import definitions from '../../../../test-app/mockData/mockReportDefinition'
import { AsyncReportData } from '../../types/AsyncReport'

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

const mockReportData = createMockData(10)

describe('AsyncReportListUtils', () => {
  const PaginationUtilsSpy = jest.spyOn(PaginationUtils, 'getPaginationData')
  const ReportActionsUtilsSpy = jest.spyOn(ReportActionsUtils, 'initReportActions')
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
      expect(ReportActionsUtilsSpy).toHaveBeenCalledWith(variant, reportState)
      expect(DataTableUtilsMapDataSpy).toHaveBeenCalledWith(mockReportData, variant.specification.fields, [
        'field2',
        'column',
      ])
      expect(DataTableUtilsMapHeaderSpy).toHaveBeenCalledWith(variant.specification.fields, ['field2', 'column'])
      expect(result).toEqual(mockReportListRenderData)
    })
  })
})

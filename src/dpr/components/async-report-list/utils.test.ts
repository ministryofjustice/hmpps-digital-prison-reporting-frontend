import { Request } from 'express'
import { Url } from 'url'
import AsyncReportListUtils from './utils'
import ColumnUtils from '../columns/utils'
import PaginationUtils from '../pagination/utils'

import createMockData from '../../../../test-app/mockAsyncData/mockAsyncData'

import definitions from '../../../../test-app/mockAsyncData/mockReportDefinition'
import { mockReportListRenderData } from '../../../../test-app/mockAsyncData/mockReportListRenderData'
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
  const ColumnUtilsSpy = jest.spyOn(ColumnUtils, 'getColumns')

  describe('getRenderData', () => {
    it('should return data to render the report list', async () => {
      const mockReq = { query: { columns: ['column'] } } as unknown as Request
      const reportDefinition = JSON.parse(JSON.stringify(definitions.report))
      const variant = definitions.report.variants[1]
      reportDefinition.variant = variant

      const result = AsyncReportListUtils.getRenderData(mockReq, reportDefinition, mockReportData, 100, reportState)

      expect(ColumnUtilsSpy).toHaveBeenCalledWith(variant.specification, ['column'])
      expect(PaginationUtilsSpy).toHaveBeenCalledWith({ pathname: 'pathname', search: 'search' }, 100)
      expect(result).toEqual(mockReportListRenderData)
    })
  })
})

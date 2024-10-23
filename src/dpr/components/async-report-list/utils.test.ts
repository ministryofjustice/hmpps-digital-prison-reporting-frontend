import { Request } from 'express'
import { Url } from 'url'
import AsyncReportListUtils from './utils'
import ColumnUtils from '../columns/utils'
import PaginationUtils from '../pagination/utils'
import Dict = NodeJS.Dict

import createMockData from '../../../../test-app/mockClients/reports/mockAsyncData'
import definitions from '../../../../test-app/mockClients/reports/mockReportDefinition'
import { mockReportListRenderData } from '../../../../test-app/mockAsyncData/mockReportListRenderData'
import { Columns } from '../columns/types'
import { components } from '../../types/api'

jest.mock('parseurl', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({ pathname: 'pathname', search: 'search' } as Url)),
}))

const mockReportData = createMockData(10)

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
          | 'list-aggregate'
          | 'list-tab'
          | 'crosstab'
          | 'summary'
          | 'summary-section',
        fields: mockSpecification.fields as components['schemas']['FieldDefinition'][],
        sections: [],
      }
      const querySummary: Array<Dict<string>> = [
        {
          query: 'summary',
        },
      ]
      const columns: Columns = ColumnUtils.getColumns(specification, fieldNames)

      const result = AsyncReportListUtils.getRenderData(
        mockReq,
        specification,
        mockReportData,
        100,
        querySummary,
        {},
        columns,
      )

      expect(PaginationUtilsSpy).toHaveBeenCalledWith({ pathname: 'pathname', search: 'search' }, 100)
      expect(result).toEqual(mockReportListRenderData)
    })
  })
})

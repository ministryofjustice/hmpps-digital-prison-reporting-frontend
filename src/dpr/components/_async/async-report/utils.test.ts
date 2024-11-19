import { Request } from 'express'
import { Url } from 'url'
import AsyncReportListUtils from './utils'
import ColumnUtils from '../../_reports/report-columns-form/utils'
import PaginationUtils from '../../_reports/report-pagination/utils'
import Dict = NodeJS.Dict

import createMockData from '../../../../../test-app/mocks/mockClients/reports/mockAsyncData'
import definitions from '../../../../../test-app/mocks/mockClients/reports/mockReportDefinition'
import { mockReportListRenderData } from '../../../../../test-app/mocks/mockAsyncData/mockReportListRenderData'
import { Columns } from '../../_reports/report-columns-form/types'
import { components } from '../../../types/api'
import ReportQuery from '../../../types/ReportQuery'

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
        template: mockSpecification.template as 'list' | 'list-section' | 'list-tab' | 'summary' | 'summary-section',
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
        {} as ReportQuery,
        false,
      )

      expect(PaginationUtilsSpy).toHaveBeenCalledWith({ pathname: 'pathname', search: 'search' }, 100)
      expect(result).toEqual(mockReportListRenderData)
    })
  })
})

import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { createMockData } from 'cypress-tests/mockApis/reports/mockAsyncData'
import { components } from 'src/dpr/types/api'
import { requestExampleVariants } from './mockVariants/request-examples'
import { reportTemplates } from './mockVariants/report-templates'
import { mockReportVariants } from './mockVariants/mock-report'
import { filterInputExamplesVariants } from './mockVariants/filter-input-examples'
import { featureTestingVariants } from './mockVariants/feature-testing'

const generateMocksFromDefs = (reportId: string, defs: components['schemas']['VariantDefinition'][]) => {
  return defs.map((def) =>
    setupSimpleMock(`/definitions/${reportId}/${def.id}`, {
      variant: def,
      id: reportId,
      name: 'Missing report 1',
      description: 'Description for missing report 1',
      dashboards: [],
    }),
  )
}

export const requestAsyncReportMock = setupSimpleMock(`/async/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+`, {
  executionId: 'exId_238947923',
  tableId: 'tblId_1729765628165',
})
export const getAsyncReportResultMock = setupSimpleMock(
  `/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/tables/tblId_[a-zA-Z0-9]+/result`,
  createMockData(10),
)
export const getReportStatusMock = setupSimpleMock(
  `/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/statements/[a-zA-Z0-9_]+/status`,
  {
    status: 'FINISHED',
  },
)
export const getReportResultCountMock = setupSimpleMock(`/report/tables/tblId_[a-zA-Z0-9]+/count`, {
  count: 100,
})

export const requestExampleVariantMocks = generateMocksFromDefs('request-examples', requestExampleVariants)
export const reportTempleVariantMocks = generateMocksFromDefs('report-templates', reportTemplates)
export const mockReportVariantMocks = generateMocksFromDefs('mock-report', mockReportVariants)
export const filterInputExampleVariantMocks = generateMocksFromDefs('filter-inputs', filterInputExamplesVariants)
export const featureTestingVariantMocks = generateMocksFromDefs('feature-testing', featureTestingVariants)

export const mocks = [
  requestAsyncReportMock,
  getAsyncReportResultMock,
  getReportStatusMock,
  getReportResultCountMock,
  ...requestExampleVariantMocks,
  ...reportTempleVariantMocks,
  ...mockReportVariantMocks,
  ...filterInputExampleVariantMocks,
  ...featureTestingVariantMocks,
]

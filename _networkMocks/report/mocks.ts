import { defaultMockRequest, generateNetworkMock, setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { createMockData } from '@networkMocks/report/mockVariants/mockAsyncData'
import { components } from 'src/dpr/types/api'
import { requestExampleVariants } from './mockVariants/request-examples'
import { reportTemplates } from './mockVariants/report-templates'
import { mockReportVariants } from './mockVariants/mock-report'
import { filterInputExamplesVariants } from './mockVariants/filter-input-examples'
import { featureTestingVariants } from './mockVariants/feature-testing'
import { RequestStatus } from 'src/dpr/types/UserReports'

const generateMocksFromDefs = (reportId: string, defs: components['schemas']['VariantDefinition'][]) => {
  return defs.map((def) => setupSimpleReportDefinitionResponseMock(reportId, def))
}

export const setupSimpleReportDefinitionResponseMock = (
  reportId: string,
  variant: components['schemas']['VariantDefinition'],
) =>
  setupSimpleMock(`/definitions/${reportId}/${variant.id}`, {
    variant,
    id: reportId,
    name: variant.name,
    description: variant.name,
    dashboards: [],
  })

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
  { status: 'FINISHED' },
)
export const reportsFinishedStatusMock = setupSimpleMock(`/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/statements/[a-zA-Z0-9_]+/status`, {
  status: RequestStatus.FINISHED,
})
export const reportsPickedStatusMock = setupSimpleMock(`/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/statements/[a-zA-Z0-9_]+/status`, {
  status: RequestStatus.PICKED,
})
export const reportsStartedStatusMock = setupSimpleMock(`/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/statements/[a-zA-Z0-9_]+/status`, {
  status: RequestStatus.STARTED,
})
export const reportsSubmittedStatusMock = setupSimpleMock(`/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/statements/[a-zA-Z0-9_]+/status`, {
  status: RequestStatus.SUBMITTED,
})
export const reportsAbortedStatusMock = setupSimpleMock(`/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/statements/[a-zA-Z0-9_]+/status`, {
  status: RequestStatus.ABORTED,
})
export const reportsExpiredStatusMock = setupSimpleMock(`/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/statements/[a-zA-Z0-9_]+/status`, {
  status: RequestStatus.EXPIRED,
})
export const reportsReadyStatusMock = setupSimpleMock(`/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/statements/[a-zA-Z0-9_]+/status`, {
  status: RequestStatus.READY,
})
export const reportsFailedStatusMock = setupSimpleMock(`/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/statements/[a-zA-Z0-9_]+/status`, {
  error: {
    developerMessage: 'a developer message goes here',
  },
  status: RequestStatus.FAILED,
})
export const cancelAsyncRequestMock = generateNetworkMock({
  ...defaultMockRequest,
  request: {
    ...defaultMockRequest.request,
    method: 'DELETE',
    urlPathPattern: `/reports/request-examples/request-example-success/statements/exId_[a-zA-Z0-9]+`,
  },
  response: {
    ...defaultMockRequest.response,
    jsonBody: {
      status: 'FINISHED',
    },
  },
})
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

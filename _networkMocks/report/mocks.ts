import {
  defaultMockRequest,
  generateNetworkMock,
  reportIdRegex,
  setupSimpleMock,
} from '@networkMocks/generateNetworkMock'
import { createMockData } from '@networkMocks/report/mockVariants/mockAsyncData'
import { components } from 'src/dpr/types/api'
import { RequestStatus } from 'src/dpr/types/UserReports'
import { requestExampleVariants } from './mockVariants/request-examples'
import { reportTemplates } from './mockVariants/report-templates'
import { mockReportVariants } from './mockVariants/mock-report'
import { filterInputExamplesVariants } from './mockVariants/filter-input-examples'
import { featureTestingVariants } from './mockVariants/feature-testing'

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
  executionId: `exId_{{randomValue length=9 type='NUMERIC'}}`,
  tableId: `tblId_{{randomValue length=9 type='NUMERIC'}}`,
})

export const requestAsyncReportBadDataMock = setupSimpleMock(
  `/async/reports/request-examples/request-example-execution-data-error`,
  {},
)

export const getAsyncReportResultMock = setupSimpleMock(
  `/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/tables/tblId_[a-zA-Z0-9]+/result`,
  createMockData(10),
)
export const getAsyncListSectionReportResultMock = setupSimpleMock(
  `/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/tables/tblId_[a-zA-Z0-9]+/result`,
  createMockData(10),
)

const downloadPathPattern = '/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/tables/tblId_[a-zA-Z0-9]+/download'
export const getAsyncReportDownloadMock = {
  priority: 1,
  request: {
    method: 'GET',
    urlPathPattern: downloadPathPattern,
  },
  response: {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="report.csv"',
    },
    body: `col1,col2,col3
1,abc,def
2,ghi,jkl
3,mno,pqr
`,
  },
}

export const getInteractiveReportDownloadMock = {
  priority: 1,
  request: {
    method: 'GET',
    urlPathPattern: downloadPathPattern,
    queryParameters: {
      'filters.field3.start': { equalTo: '2003-02-01' },
      'filters.field3.end': { equalTo: '2006-05-04' },
      sortColumn: { equalTo: 'field6' },
      sortedAsc: { equalTo: 'false' },
      'filters.field8': {
        matches: 'value8\\.(2|3)',
      },
      columns: {
        matches: 'field(1|2|3|6)',
      },
    },
  },
  response: {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="report.csv"',
    },
    body: `col1,col2,col3
1,abc,def
2,ghi,jkl
3,mno,pqr
`,
  },
}

export const getSyncReportDownloadMock = {
  priority: 1,
  request: {
    method: 'GET',
    urlPathPattern: '/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/download',
  },
  response: {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="report.csv"',
    },
    body: `col1,col2,col3
1,abc,def
2,ghi,jkl
3,mno,pqr
`,
  },
}

export const reportsFinishedStatusMock = setupSimpleMock(
  `/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/statements/[a-zA-Z0-9_]+/status`,
  {
    status: RequestStatus.FINISHED,
  },
)
export const reportsPickedStatusMock = setupSimpleMock(
  `/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/statements/[a-zA-Z0-9_]+/status`,
  {
    status: RequestStatus.PICKED,
  },
)
export const reportsStartedStatusMock = setupSimpleMock(
  `/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/statements/[a-zA-Z0-9_]+/status`,
  {
    status: RequestStatus.STARTED,
  },
)
export const reportsSubmittedStatusMock = setupSimpleMock(
  `/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/statements/[a-zA-Z0-9_]+/status`,
  {
    status: RequestStatus.SUBMITTED,
  },
)
export const reportsAbortedStatusMock = setupSimpleMock(
  `/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/statements/[a-zA-Z0-9_]+/status`,
  {
    status: RequestStatus.ABORTED,
  },
)
export const reportsExpiredStatusMock = setupSimpleMock(
  `/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/statements/[a-zA-Z0-9_]+/status`,
  {
    status: RequestStatus.EXPIRED,
  },
)
export const reportsReadyStatusMock = setupSimpleMock(
  `/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/statements/[a-zA-Z0-9_]+/status`,
  {
    status: RequestStatus.READY,
  },
)
export const reportsFailedStatusMock = setupSimpleMock(
  `/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/statements/[a-zA-Z0-9_]+/status`,
  {
    error: {
      developerMessage: 'a developer message goes here',
    },
    status: RequestStatus.FAILED,
  },
)

const asyncReportStatusMocks = [reportsFinishedStatusMock, reportsReadyStatusMock, reportsFinishedStatusMock]

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
      cancellationSucceeded: true,
    },
  },
})
export const getReportResultCountMock = setupSimpleMock(`/report/tables/tblId_[a-zA-Z0-9]+/count`, {
  count: 100,
})
export const getAsyncInteractiveCountMock = setupSimpleMock(
  `/reports/${reportIdRegex}/${reportIdRegex}/tables/tblId_[a-zA-Z0-9]+/count`,
  {
    count: 100,
  },
)

export const requestExampleVariantMocks = generateMocksFromDefs('request-examples', requestExampleVariants)
export const reportTempleVariantMocks = generateMocksFromDefs('report-template-examples', reportTemplates)
export const mockReportVariantMocks = generateMocksFromDefs('mock-report', mockReportVariants)
export const filterInputExampleVariantMocks = generateMocksFromDefs('filter-inputs', filterInputExamplesVariants)
export const featureTestingVariantMocks = generateMocksFromDefs('feature-testing', featureTestingVariants)

export const getAsyncSummaryReport = setupSimpleMock(
  `/reports/${reportIdRegex}/${reportIdRegex}/tables/${reportIdRegex}/result/summary/${reportIdRegex}`,
  createMockData(20),
)

export const mocks = [
  requestAsyncReportMock,
  ...asyncReportStatusMocks,
  getAsyncReportResultMock,
  getReportResultCountMock,
  getAsyncInteractiveCountMock,
  requestAsyncReportBadDataMock,
  ...requestExampleVariantMocks,
  ...reportTempleVariantMocks,
  ...mockReportVariantMocks,
  ...filterInputExampleVariantMocks,
  ...featureTestingVariantMocks,
  getAsyncSummaryReport,
]

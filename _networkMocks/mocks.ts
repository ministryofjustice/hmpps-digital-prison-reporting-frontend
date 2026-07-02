import {
  defaultMockRequest,
  generateNetworkMock,
  reportIdRegex,
  setupSimpleFailedMock,
  setupSimpleMock,
} from './generateNetworkMock'
import { summaries } from './definitionSummaries'

export const getDefinitionSummaries = setupSimpleMock('/definitions', summaries)

export const reportingApiFailures = {
  getDefinitionSummariesFailure: setupSimpleFailedMock('/definitions'),
  getDefinitionSummariesUnauthenticatedFailure: setupSimpleFailedMock('/definitions', 401),
  getDefinitionSummariesUnauthorizedFailure: setupSimpleFailedMock('/definitions', 403),
  getSingleDefinitionFailure: setupSimpleFailedMock(`/definitions/${reportIdRegex}`),
  getSingleDefinitionVariantFailure: setupSimpleFailedMock(`/definitions/${reportIdRegex}/${reportIdRegex}`),
  requestAsyncReportFailure: setupSimpleFailedMock(`/async/reports/${reportIdRegex}/${reportIdRegex}`),
  getAsyncReportStatusFailure: setupSimpleFailedMock(
    `/reports/${reportIdRegex}/${reportIdRegex}/statements/exId_[0-9]+/status`,
  ),
  getAsyncReportStatusFailure404: setupSimpleFailedMock(
    `/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/statements/[a-zA-Z0-9_]+/status`,
    404,
  ),
  cancelAsyncRequestFailure: generateNetworkMock({
    ...defaultMockRequest,
    request: {
      ...defaultMockRequest.request,
      method: 'DELETE',
      urlPathPattern: `/reports/${reportIdRegex}/${reportIdRegex}/statements/exId_[0-9]+`,
    },
    response: {
      ...defaultMockRequest.response,
      status: 500,
      jsonBody: {},
    },
  }),
  getAsyncReportFailure404: setupSimpleFailedMock(
    `/reports/${reportIdRegex}/${reportIdRegex}/tables/${reportIdRegex}/result`,
    404,
    {
      userMessage: 'The stored report or dashboard was not found.',
      developerMessage: 'PreparedStatementCallback; uncategorized SQLException for SQL XYZ Entity Not Found',
    },
  ),
  getAsyncDashboardFailure404: setupSimpleFailedMock(
    `/reports/${reportIdRegex}/dashboards/${reportIdRegex}/tables/${reportIdRegex}/result`,
    404,
    {
      userMessage: 'The stored report or dashboard was not found.',
      developerMessage: 'PreparedStatementCallback; uncategorized SQLException for SQL XYZ Entity Not Found',
    },
  ),
  getAsyncReportFailure: setupSimpleFailedMock(
    `/reports/${reportIdRegex}/${reportIdRegex}/tables/${reportIdRegex}/result`,
  ),
  getAsyncSummaryReportFailure: setupSimpleFailedMock(
    `/reports/${reportIdRegex}/${reportIdRegex}/tables/${reportIdRegex}/result/summary/${reportIdRegex}`,
  ),
  getAsyncCountFailure: setupSimpleFailedMock(`/report/tables/tblId_[0-9]+/count`),
} as const

export const pollingEndpoint = generateNetworkMock({
  ...defaultMockRequest,
  request: {
    ...defaultMockRequest.request,
    method: 'POST',
    urlPathPattern: `/view-report/async/(report|dashboard)/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/tblId_[0-9]+/(report|dashboard)`,
  },
  response: {
    ...defaultMockRequest.response,
    jsonBody: {
      isExpired: false,
    },
  },
})

export const expiredEndpoint = generateNetworkMock({
  ...defaultMockRequest,
  request: {
    ...defaultMockRequest.request,
    method: 'POST',
    urlPathPattern: `/reports/tableExpiryState`,
  },
  response: {
    ...defaultMockRequest.response,
    jsonBody: [
      {
        tableId: 'tblId_1729766362362',
        expired: true,
      },
      {
        tableId: 'tblId_1729765628165',
        expired: true,
      },
    ],
  },
})

export const timestampsEndpoint = generateNetworkMock({
  ...defaultMockRequest,
  request: {
    ...defaultMockRequest.request,
    method: 'GET',
    urlPathPattern: `/reports/timestamps`,
  },
  response: {
    ...defaultMockRequest.response,
    jsonBody: [
      {
        tableId: 'tblId_1729766362362',
        createAt: new Date().toISOString(),
      },
      {
        tableId: 'tblId_1729765628165',
        createAt: new Date().toISOString(),
      },
    ],
  },
})

export const generateIndividualDefinitionSummaries = summaries.map(summary =>
  generateNetworkMock({
    ...defaultMockRequest,
    request: {
      ...defaultMockRequest.request,
      method: 'GET',
      urlPathPattern: `/definitions/${summary.id}`,
    },
    response: {
      ...defaultMockRequest.response,
      jsonBody: summary,
    },
  }),
)

export const mocks = [getDefinitionSummaries, ...generateIndividualDefinitionSummaries]

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

export const subscribeEndpoint = generateNetworkMock({
  ...defaultMockRequest,
  request: {
    ...defaultMockRequest.request,
    method: 'POST',
    urlPathPattern: `/user/subscribe`,
  },
  response: {
    ...defaultMockRequest.response,
    jsonBody: {},
  },
})

export const subscribeEndpointError = setupSimpleFailedMock(`/user/subscribe`)

export const unsubscribeEndpoint = generateNetworkMock({
  ...defaultMockRequest,
  request: {
    ...defaultMockRequest.request,
    method: 'POST',
    urlPathPattern: `/user/unsubscribe`,
  },
  response: {
    ...defaultMockRequest.response,
    jsonBody: {},
  },
})

export const unsubscribeEndpointError = setupSimpleFailedMock(`/user/unsubscribe`)

export const getSubscriptionsStatusEndpoint = generateNetworkMock({
  ...defaultMockRequest,
  request: {
    ...defaultMockRequest.request,
    method: 'GET',
    urlPathPattern: `/user/subscriptions`,
  },
  response: {
    ...defaultMockRequest.response,
    jsonBody: [
      {
        reportId: 'feature-testing',
        reportVariantId: 'feature-testing-scheduled',
        tableId: 'tblId_1729766362361',
        reportStatus: 'READY',
        reportUpdatedTime: new Date('2026-08-03').toISOString(),
      },
      {
        tableId: 'tblId_1729766362364',
        reportVariantId: 'scheduled-report-ready',
        reportId: 'feature-testing',
        reportStatus: 'READY',
        reportUpdatedTime: new Date().toISOString(),
      },
      {
        tableId: 'tblId_1729766362365',
        reportVariantId: 'scheduled-report-ready-to-stale',
        reportId: 'feature-testing',
        reportStatus: 'STALE',
      },
      {
        tableId: 'tblId_1729766362366',
        reportVariantId: 'scheduled-report-pending-to-ready',
        reportId: 'feature-testing',
        reportStatus: 'READY',
        reportUpdatedTime: new Date().toISOString(),
      },
      {
        tableId: '',
        reportVariantId: 'scheduled-report-pending-to-failed',
        reportId: 'feature-testing',
        reportStatus: 'FAILED',
      },
      {
        tableId: '',
        reportVariantId: 'scheduled-report-pending-to-pending',
        reportId: 'feature-testing',
        reportStatus: 'PENDING',
      },
    ],
  },
})

export const getSubscriptionsStatusPendingEndpoint = generateNetworkMock({
  ...defaultMockRequest,
  request: {
    ...defaultMockRequest.request,
    method: 'GET',
    urlPathPattern: `/user/subscriptions`,
  },
  response: {
    ...defaultMockRequest.response,
    jsonBody: [
      {
        reportId: 'feature-testing',
        reportVariantId: 'feature-testing-scheduled',
        tableId: '',
        // reportStatus: 'PENDING',
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

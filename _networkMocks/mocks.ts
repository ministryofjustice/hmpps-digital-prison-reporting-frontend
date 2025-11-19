import { defaultMockRequest, generateNetworkMock, reportIdRegex, setupSimpleFailedMock, setupSimpleMock } from './generateNetworkMock'
import { summaries } from './definitionSummaries'

export const getDefinitionSummaries = setupSimpleMock('/definitions', summaries)

export const reportingApiFailures = {
  getDefinitionSummariesFailure: setupSimpleFailedMock('/definitions'),
  getDefinitionSummariesUnauthenticatedFailure: setupSimpleFailedMock('/definitions', 401),
  getDefinitionSummariesUnauthorizedFailure: setupSimpleFailedMock('/definitions', 403),
  getSingleDefinitionFailure: setupSimpleFailedMock(`/definitions/${reportIdRegex}`),
  getSingleDefinitionVariantFailure: setupSimpleFailedMock(`/definitions/${reportIdRegex}/${reportIdRegex}`),
  requestAsyncReportFailure: setupSimpleFailedMock(`/async/reports/${reportIdRegex}/${reportIdRegex}`),
  cancelAsyncRequestFailure: generateNetworkMock({
    ...defaultMockRequest,
    request: {
      ...defaultMockRequest.request,
      method: 'DELETE',
      urlPathPattern: `/reports/${reportIdRegex}/${reportIdRegex}/statements/edIx_[0-9]+`
    },
    response: {
      ...defaultMockRequest.response,
      jsonBody: {}
    }
  }),
  getAsyncReportFailure: setupSimpleFailedMock(`/reports/${reportIdRegex}/${reportIdRegex}/tables/${reportIdRegex}/result`),
  getAsyncSummaryReportFailure: setupSimpleFailedMock(`/reports/${reportIdRegex}/${reportIdRegex}/tables/${reportIdRegex}/result/summary/${reportIdRegex}`),
  getAsyncReportStatusFailure: setupSimpleFailedMock(`/reports/${reportIdRegex}/${reportIdRegex}/statements/edIx_[0-9]+/status`),
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

export const generateIndividualDefinitionSummaries = summaries.map((summary) =>
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

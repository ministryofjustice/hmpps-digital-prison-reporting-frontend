import {
  defaultMockRequest,
  generateNetworkMock,
  reportIdRegex,
  setupSimpleMock,
} from '@networkMocks/generateNetworkMock'

export const getDashboardStatusFinishedMock = setupSimpleMock(
  `/reports/${reportIdRegex}/dashboards/${reportIdRegex}/statements/exId_[0-9]+/status`,
  {
    status: 'FINISHED',
  },
)
export const getDashboardStatusStartedMock = setupSimpleMock(
  `/reports/${reportIdRegex}/dashboards/${reportIdRegex}/statements/exId_[0-9]+/status`,
  {
    status: 'STARTED',
  },
)
export const requestAsyncDashboardMock = setupSimpleMock(`/async/dashboards/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+`, {
  executionId: 'exId_238947923',
  tableId: 'tblId_1729765628165',
})

export const cancelAsyncRequestMock = generateNetworkMock({
  ...defaultMockRequest,
  request: {
    ...defaultMockRequest.request,
    method: 'DELETE',
    urlPathPattern: `/reports/${reportIdRegex}/dashboards/${reportIdRegex}/statements/exId_[a-zA-Z0-9]+`,
  },
  response: {
    ...defaultMockRequest.response,
    jsonBody: {
      cancellationSucceeded: true,
    },
  },
})

export const mocks = [getDashboardStatusFinishedMock, requestAsyncDashboardMock, cancelAsyncRequestMock]

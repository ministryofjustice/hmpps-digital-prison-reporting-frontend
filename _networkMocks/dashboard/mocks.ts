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
  executionId: `exId_{{randomValue length=9 type='NUMERIC'}}`,
  tableId: `tblId_{{randomValue length=9 type='NUMERIC'}}`,
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

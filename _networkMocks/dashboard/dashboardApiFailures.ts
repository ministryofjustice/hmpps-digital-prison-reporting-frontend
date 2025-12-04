import {
  defaultMockRequest,
  generateNetworkMock,
  reportIdRegex,
  setupSimpleFailedMock,
} from '@networkMocks/generateNetworkMock'

export const dashboardApiFailures = {
  getSingleDashboardFailure: setupSimpleFailedMock(`/definitions/${reportIdRegex}/dashboards/${reportIdRegex}`),
  requestAsyncDashboardFailure: setupSimpleFailedMock(`/async/dashboards/${reportIdRegex}/${reportIdRegex}`),
  getAsyncDashboardFailure: setupSimpleFailedMock(
    `/reports/${reportIdRegex}/dashboards/${reportIdRegex}/tables/${reportIdRegex}/result`,
  ),
  getAsyncDashboardStatusFailure: setupSimpleFailedMock(
    `/reports/${reportIdRegex}/dashboards/${reportIdRegex}/statements/exId_[0-9]+/status`,
  ),
  cancelAsyncRequestDashboardFailure: generateNetworkMock({
    ...defaultMockRequest,
    request: {
      ...defaultMockRequest.request,
      method: 'DELETE',
      urlPathPattern: `/reports/${reportIdRegex}/dashboards/${reportIdRegex}/statements/exId_[0-9]+`,
    },
    response: {
      ...defaultMockRequest.response,
      status: 500,
      jsonBody: {},
    },
  }),
} as const

import { reportIdRegex, setupSimpleMock } from "@networkMocks/generateNetworkMock";

export const getDashboardStatusMock = setupSimpleMock(`/reports/${reportIdRegex}/dashboards/${reportIdRegex}/statements/exId_[0-9]+/status`, {
  status: 'FINISHED',
})
export const requestAsyncDashboardMock = setupSimpleMock(`/async/dashboards/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+`, {
  executionId: 'exId_238947923',
  tableId: 'tblId_1729765628165',
})

export const mocks = [
  getDashboardStatusMock,
  requestAsyncDashboardMock,
]
import { reportIdRegex, setupSimpleMock } from "@networkMocks/generateNetworkMock";

export const mocks = [
  setupSimpleMock(`/reports/${reportIdRegex}/dashboards/${reportIdRegex}/statements/exId_[0-9]+/status`, {
    status: 'FINISHED',
  }),
  setupSimpleMock(`/async/dashboards/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+`, {
    executionId: 'exId_238947923',
    tableId: 'tblId_1729765628165',
  }),
]
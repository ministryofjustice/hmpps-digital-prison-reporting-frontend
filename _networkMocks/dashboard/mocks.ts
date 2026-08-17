import {
  defaultMockRequest,
  generateNetworkMock,
  reportIdRegex,
  setupSimpleFailedMock,
  setupSimpleMock,
} from '@networkMocks/generateNetworkMock'
import { RequestStatus } from 'src/dpr/types/UserReports'
import { completeDataSet } from './data/complete-data/data'

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

// PARENT CHILD DASHBOARDS

// status
export const parentChildStatusParentFinishedMock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-parent-dashboard/statements/exId_${reportIdRegex}/status`,
  {
    status: RequestStatus.FINISHED,
  },
)

export const parentChildStatusParentFailedMock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-parent-dashboard/statements/exId_${reportIdRegex}/status`,
  {
    status: RequestStatus.FAILED,
  },
)

export const parentChildStatusChild1FinishedMock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-child-dashboard-1/statements/exId_${reportIdRegex}/status`,
  {
    status: RequestStatus.FINISHED,
  },
)

export const parentChildStatusChild1FailedMock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-child-dashboard-1/statements/exId_${reportIdRegex}/status`,
  {
    status: RequestStatus.FAILED,
  },
)

export const parentChildStatusChild2FinishedMock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-child-dashboard-2/statements/exId_${reportIdRegex}/status`,
  {
    status: RequestStatus.FINISHED,
  },
)

export const parentChildStatusChild2FailedMock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-child-dashboard-2/statements/exId_${reportIdRegex}/status`,
  {
    status: RequestStatus.FAILED,
  },
)

// results
export const getAsyncReportResultMockParentChildParentMock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-parent-dashboard/tables/tblId_${reportIdRegex}/result`,
  completeDataSet,
)

export const getAsyncReportResultMockParentChildParent404Mock = setupSimpleFailedMock(
  `/reports/feature-testing/dashboards/test-parent-dashboard/tables/tblId_${reportIdRegex}/result`,
  404,
  {
    userMessage: 'The stored report or dashboard was not found.',
    developerMessage: 'PreparedStatementCallback; uncategorized SQLException for SQL XYZ Entity Not Found',
  },
)

export const getAsyncReportResultMockParentChildChild1Mock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-child-dashboard-1/tables/tblId_${reportIdRegex}/result`,
  completeDataSet,
)

export const getAsyncReportResultMockParentChildChild1404Mock = setupSimpleFailedMock(
  `/reports/feature-testing/dashboards/test-child-dashboard-1/tables/tblId_${reportIdRegex}/result`,
  404,
  {
    userMessage: 'The stored report or dashboard was not found.',
    developerMessage: 'PreparedStatementCallback; uncategorized SQLException for SQL XYZ Entity Not Found',
  },
)

export const getAsyncReportResultMockParentChildChild2Mock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-child-dashboard-2/tables/tblId_${reportIdRegex}/result`,
  completeDataSet,
)

export const getAsyncReportResultMockParentChildChild2404Mock = setupSimpleFailedMock(
  `/reports/feature-testing/dashboards/test-child-dashboard-2/tables/tblId_${reportIdRegex}/result`,
  404,
  {
    userMessage: 'The stored report or dashboard was not found.',
    developerMessage: 'PreparedStatementCallback; uncategorized SQLException for SQL XYZ Entity Not Found',
  },
)

export const mocks = [
  getDashboardStatusFinishedMock,
  requestAsyncDashboardMock,
  cancelAsyncRequestMock,
  parentChildStatusParentFinishedMock,
  parentChildStatusParentFailedMock,
  parentChildStatusChild1FinishedMock,
  parentChildStatusChild2FailedMock,
  getAsyncReportResultMockParentChildParentMock,
  getAsyncReportResultMockParentChildChild1Mock,
  getAsyncReportResultMockParentChildChild2Mock,
]

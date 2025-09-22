import { testDashboardResultMock } from '@networkMocks/dashboard/dashboardResults/mocks'
import { stubFor } from '@networkMocks/generateNetworkMock'
import { dataQualityFullDatasetMockLists, testingDashboard8Mock } from '@networkMocks/dashboard/dashboardDefinitions/mocks'
import { getDashboardStatusFinishedMock, requestAsyncDashboardMock } from '@networkMocks/dashboard/mocks'

const stubs = {
  stubDashboardSuccessResult20: () => stubFor(testDashboardResultMock),
  stubTestDashboard8: () => stubFor(testingDashboard8Mock),
  stubListExampleDashboard: () => stubFor(dataQualityFullDatasetMockLists),
  stubMockDashboardsStatusFinished: () => stubFor(getDashboardStatusFinishedMock),
  stubViewAsyncResults: () => stubFor(requestAsyncDashboardMock),
}

export default stubs

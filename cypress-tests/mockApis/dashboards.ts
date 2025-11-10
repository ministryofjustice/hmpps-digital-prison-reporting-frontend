import { dataQualityScorecardDashboardsResultMock, dataQualityScorecardGroupDashboardsResultMock, testDashboardResultMock } from '@networkMocks/dashboard/dashboardResults/mocks'
import { stubFor } from '@networkMocks/generateNetworkMock'
import { dataQualityFullDatasetMockLists, testingDashboard8Mock,  dataQualityScorecardDashboard,
  dataQualityScorecardGroupDashboard, } from '@networkMocks/dashboard/dashboardDefinitions/mocks'
import { getDashboardStatusFinishedMock, requestAsyncDashboardMock } from '@networkMocks/dashboard/mocks'
import { generateIndividualDefinitionSummaries } from '@networkMocks/mocks'

const stubs = {
  stubDashboardSuccessResult20: () => stubFor(testDashboardResultMock),
  stubTestDashboard8: () => stubFor(testingDashboard8Mock),
  stubListExampleDashboard: () => stubFor(dataQualityFullDatasetMockLists),
  stubMockDashboardsStatusFinished: () => stubFor(getDashboardStatusFinishedMock),
  stubViewAsyncResults: () => stubFor(requestAsyncDashboardMock),
  stubScorecardResults: () => stubFor(dataQualityScorecardDashboardsResultMock),
  stubScorecardGroupResults: () => stubFor(dataQualityScorecardGroupDashboardsResultMock),
  stubDefinitionScorecardDashboard: () => stubFor(dataQualityScorecardDashboard),
  stubDefinitionScorecardGroupDashboard: () => stubFor(dataQualityScorecardGroupDashboard),
}

export default stubs

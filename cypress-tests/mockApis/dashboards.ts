import { 
  dataQualityScorecardDashboardsResultMock, dataQualityScorecardBucketDashboardsResultMock, dataQualityScorecardGroupDashboardsResultMock, 
  testDashboardResultMock, dataQualityDashboardsResultMock, requestSyncDashboardMock
} from '@networkMocks/dashboard/dashboardResults/mocks'
import { stubFor } from '@networkMocks/generateNetworkMock'
import {
  dataQualityFullDatasetMockLists, testingDashboard8Mock, dataQualityScorecardDashboard, dataQualityScorecardBucketDashboard,
  dataQualityScorecardGroupDashboard, testingSyncDashboardMock
} from '@networkMocks/dashboard/dashboardDefinitions/mocks'
import { getDashboardStatusFinishedMock, getDashboardStatusStartedMock, requestAsyncDashboardMock } from '@networkMocks/dashboard/mocks'
import { dashboardFailureStubs } from './failures'

const stubs = {
  stubDashboardSuccessResult20: () => stubFor(testDashboardResultMock),
  stubTestDashboard8: () => stubFor(testingDashboard8Mock),
  stubListExampleDashboard: () => stubFor(dataQualityFullDatasetMockLists),
  stubMockDashboardsStatusFinished: () => stubFor(getDashboardStatusFinishedMock),
  stubMockDashboardsStatusStarted: () => stubFor(getDashboardStatusStartedMock),
  stubViewAsyncResults: () => stubFor(requestAsyncDashboardMock),
  stubScorecardResults: () => stubFor(dataQualityScorecardDashboardsResultMock),
  stubScorecardBucketResults: () => stubFor(dataQualityScorecardBucketDashboardsResultMock),
  stubScorecardGroupResults: () => stubFor(dataQualityScorecardGroupDashboardsResultMock),
  stubDefinitionScorecardDashboard: () => stubFor(dataQualityScorecardDashboard),
  stubDefinitionScorecardBucketDashboard: () => stubFor(dataQualityScorecardBucketDashboard),
  stubDefinitionScorecardGroupDashboard: () => stubFor(dataQualityScorecardGroupDashboard),
  stubDefinitionSyncDashboard: () => stubFor(testingSyncDashboardMock),
  stubSyncDashboardRequestDataSuccess: () => stubFor(requestSyncDashboardMock),
  stubDataQualityDashboardsResultMock: () => stubFor(dataQualityDashboardsResultMock),
  ...dashboardFailureStubs,
} as const

export type DashboardStubsKeys = keyof typeof stubs

export default stubs

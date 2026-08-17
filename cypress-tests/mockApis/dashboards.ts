import {
  barCompleteDatasetMock,
  barInvalidMock,
  barPartialDatasetMock,
  doughnutCompleteDatasetMock,
  lineCompleteDatasetMock,
  linePartialDatasetMock,
  lineTimeseriesCompleteDatasetMock,
  lineTimeseriesPartialDatasetMock,
  listCompleteDatasetHistoricMock,
  listCompleteDatasetMock,
  listInvalidDefMock,
  listInvalidVisDefMock,
  listPartialDatasetHistoricMock,
  listPartialDatasetMock,
  mixedCompleteDatasetMock,
  mixedPartialDatasetHistoricMock,
  mixedPartialDatasetMock,
  scorecardGroupCompleteDatasetMock,
  scorecardsBucketCompleteDatasetMock,
  scorecardsCompleteDatasetMock,
} from '@networkMocks/dashboard/definitions/visualisations/mocks'

import {
  dashboardWithChildOneMock,
  dashboardWithChildTwoMock,
  dashboardWithLinksMock,
  dashboardWithParentChildMock,
  featureFlagDashboardMock,
  syncDashboardMock,
} from '@networkMocks/dashboard/definitions/feature-testing/mocks'

// DATA
import {
  dashboardResultCompleteDataMock,
  dashboardResultCompleteDataSyncMock,
} from '@networkMocks/dashboard/data/complete-data/mocks'
import {
  dashboardResultPartialDataHistoricMock,
  dashboardResultPartialDataMock,
} from '@networkMocks/dashboard/data/partial-data/mocks'

import {
  dashboardResultEmptyDataSyncMock,
  dashboardResultMissingFirstRowDataSyncMock,
  dashboardResultUndefinedMock,
} from '@networkMocks/dashboard/data/empty-data/mocks'
import {
  getDashboardStatusFinishedMock,
  getDashboardStatusStartedMock,
  requestAsyncDashboardMock,
  parentChildStatusParentFinishedMock,
  parentChildStatusParentFailedMock,
  parentChildStatusChild1FinishedMock,
  parentChildStatusChild2FailedMock,
  parentChildStatusChild2FinishedMock,
  getAsyncReportResultMockParentChildParentMock,
  getAsyncReportResultMockParentChildChild1Mock,
  getAsyncReportResultMockParentChildChild2Mock,
  getAsyncReportResultMockParentChildChild2404Mock,
  getAsyncReportResultMockParentChildParent404Mock,
  getAsyncReportResultMockParentChildChild1404Mock,
  parentChildStatusChild1FailedMock,
} from '@networkMocks/dashboard/mocks'
import { stubFor } from '@networkMocks/generateNetworkMock'
import { dashboardFailureStubs } from './failures'

// DEFINITIONS
const listDefinitionStubs = {
  stubListDashboardCompleteData: () => stubFor(listCompleteDatasetMock),
  stubListDashboardCompleteDataHistoric: () => stubFor(listCompleteDatasetHistoricMock),
  stubListDashboardPartialData: () => stubFor(listPartialDatasetMock),
  stubListDashboardPartialDataHistoric: () => stubFor(listPartialDatasetHistoricMock),
  stubListInvalidDefs: () => stubFor(listInvalidDefMock),
  stubListInvalidVisDefs: () => stubFor(listInvalidVisDefMock),
}

const BarDefinitionStubs = {
  stubBarDashboardCompleteData: () => stubFor(barCompleteDatasetMock),
  stubBarDashboardPartialData: () => stubFor(barPartialDatasetMock),
  stubBarInvalid: () => stubFor(barInvalidMock),
}

const DoughnutDefinitionStubs = {
  stubDoughnutDashboardCompleteData: () => stubFor(doughnutCompleteDatasetMock),
}

const lineTimeseriesDefinitionStubs = {
  stubLineTimeseriesDashboardCompleteData: () => stubFor(lineTimeseriesCompleteDatasetMock),
  stubLineTimeseriesDashboardPartialData: () => stubFor(lineTimeseriesPartialDatasetMock),
}

const lineDefinitionStubs = {
  stubLineCompleteData: () => stubFor(lineCompleteDatasetMock),
  stubLinePartialData: () => stubFor(linePartialDatasetMock),
}

const scorecardDefinitionStubs = {
  stubDefinitionScorecardDashboard: () => stubFor(scorecardsCompleteDatasetMock),
  stubDefinitionScorecardBucketDashboard: () => stubFor(scorecardsBucketCompleteDatasetMock),
  stubDefinitionScorecardGroupDashboard: () => stubFor(scorecardGroupCompleteDatasetMock),
}

const mixedChartsDefinitionStubs = {
  stubMixedDashboardCompleteData: () => stubFor(mixedCompleteDatasetMock),
  stubMixedDashboardPartialData: () => stubFor(mixedPartialDatasetMock),
  stubMixedDashboardPartialDataHistoric: () => stubFor(mixedPartialDatasetHistoricMock),
}

const definitionStubs = {
  stubTestDashboard8: () => stubFor(featureFlagDashboardMock),
  stubTestDashboardWithLink: () => stubFor(dashboardWithLinksMock),
  stubTestDashboardWithParentChild: () => stubFor(dashboardWithParentChildMock),
  stubTestDashboardWithChildOne: () => stubFor(dashboardWithChildOneMock),
  stubTestDashboardWithChildTwo: () => stubFor(dashboardWithChildTwoMock),
  stubDefinitionSyncDashboard: () => stubFor(syncDashboardMock),
  ...scorecardDefinitionStubs,
  ...listDefinitionStubs,
  ...BarDefinitionStubs,
  ...DoughnutDefinitionStubs,
  ...lineTimeseriesDefinitionStubs,
  ...lineDefinitionStubs,
  ...mixedChartsDefinitionStubs,
}

// REQUEST
const requestStubs = {
  stubMockDashboardsStatusFinished: () => stubFor(getDashboardStatusFinishedMock),
  stubMockDashboardsStatusStarted: () => stubFor(getDashboardStatusStartedMock),
  stubMockParentChildStatusParentFinished: () => stubFor(parentChildStatusParentFinishedMock),
  stubMockParentChildStatusParentFailed: () => stubFor(parentChildStatusParentFailedMock),
  stubMockParentChildStatusChild1Finished: () => stubFor(parentChildStatusChild1FinishedMock),
  stubMockParentChildStatusChild1Failed: () => stubFor(parentChildStatusChild1FailedMock),
  stubMockParentChildStatusChild2Finished: () => stubFor(parentChildStatusChild2FinishedMock),
  stubMockParentChildStatusChild2Failed: () => stubFor(parentChildStatusChild2FailedMock),
  stubViewAsyncResults: () => stubFor(requestAsyncDashboardMock),
  ...dashboardFailureStubs,
}

// RESULTS
const resultsStubs = {
  stubDashboardResultCompleteData: () => stubFor(dashboardResultCompleteDataMock),
  stubDashboardResultCompleteDataSync: () => stubFor(dashboardResultCompleteDataSyncMock),
  stubDashboardResultPartialData: () => stubFor(dashboardResultPartialDataMock),
  stubDashboardResultPartialDataHistoric: () => stubFor(dashboardResultPartialDataHistoricMock),
  stubDashboardResultUndefinedData: () => stubFor(dashboardResultUndefinedMock),
  stubDashboardResultEmptyData: () => stubFor(dashboardResultEmptyDataSyncMock),
  stubDashboardResultMissingFirstRowDataSync: () => stubFor(dashboardResultMissingFirstRowDataSyncMock),
  stubDashboardResultParentChildParent: () => stubFor(getAsyncReportResultMockParentChildParentMock),
  stubDashboardResultParentChildParent404: () => stubFor(getAsyncReportResultMockParentChildParent404Mock),
  stubDashboardResultParentChildChild1: () => stubFor(getAsyncReportResultMockParentChildChild1Mock),
  stubDashboardResultParentChildChild1404: () => stubFor(getAsyncReportResultMockParentChildChild1404Mock),
  stubDashboardResultParentChildChild2: () => stubFor(getAsyncReportResultMockParentChildChild2Mock),
  stubDashboardResultParentChildChild2404: () => stubFor(getAsyncReportResultMockParentChildChild2404Mock),
}

const stubs = {
  ...definitionStubs,
  ...requestStubs,
  ...resultsStubs,
} as const

export type DashboardStubsKeys = keyof typeof stubs

export default stubs

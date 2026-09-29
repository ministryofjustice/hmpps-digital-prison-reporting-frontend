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
  matrixCompleteDatasetMock,
  mixedCompleteDatasetMock,
  mixedPartialDatasetHistoricMock,
  mixedPartialDatasetMock,
  scorecardGroupCompleteDatasetInvalidMock,
  scorecardGroupCompleteDatasetMock,
  scorecardGroupCompleteDatasetNoTsMock,
  scorecardsBucketCompleteDatasetMock,
  scorecardsCompletebadDatasetMock,
  scorecardsCompleteDatasetMock,
  scorecardsCompleteDatasetNoTsMock,
  scorecardsInvalidVisDefinitionsMock,
} from '@networkMocks/dashboard/definitions/visualisations/mocks'

import {
  dashboardWithChildOneMock,
  dashboardWithChildTwoMock,
  dashboardWithLinksMock,
  dashboardWithParentChildMock,
  featureFlagDashboardMock,
  syncDashboardMock,
} from '@networkMocks/dashboard/definitions/feature-testing/mocks'

import {
  dashboardResultCompleteBadDataDuplicatesMock,
  dashboardResultCompleteBadDataMock,
} from '@networkMocks/dashboard/data/bad-data/mocks'
import {
  dashboardResultCompleteDataMock,
  dashboardResultCompleteDataMockDaily,
  dashboardResultCompleteDataNoTsMock,
  dashboardResultCompleteDataSyncMock,
} from '@networkMocks/dashboard/data/complete-data/mocks'
import {
  dashboardResultEmptyDataSyncMock,
  dashboardResultMissingFirstRowDataSyncMock,
  dashboardResultUndefinedMock,
} from '@networkMocks/dashboard/data/empty-data/mocks'
import {
  dashboardResultPartialDataHistoricMock,
  dashboardResultPartialDataMock,
} from '@networkMocks/dashboard/data/partial-data/mocks'
import {
  getAsyncReportResultMockParentChildChild1404Mock,
  getAsyncReportResultMockParentChildChild1Mock,
  getAsyncReportResultMockParentChildChild1NoDataMock,
  getAsyncReportResultMockParentChildChild2404Mock,
  getAsyncReportResultMockParentChildChild2Mock,
  getAsyncReportResultMockParentChildChild2NoDataMock,
  getAsyncReportResultMockParentChildParent404Mock,
  getAsyncReportResultMockParentChildParentMock,
  getAsyncReportResultMockParentChildParentNoDataMock,
  getDashboardStatusFinishedMock,
  getDashboardStatusStartedMock,
  parentChildStatusChild1FailedMock,
  parentChildStatusChild1FinishedMock,
  parentChildStatusChild2FailedMock,
  parentChildStatusChild2FinishedMock,
  parentChildStatusParentFailedMock,
  parentChildStatusParentFinishedMock,
  requestAsyncDashboardMock,
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

const matrixDefinitionStubs = {
  stubMatrixCompleteData: () => stubFor(matrixCompleteDatasetMock),
  // stubMatrixPartialData: () => stubFor(matrixPartialDatasetMock),
}

const scorecardDefinitionStubs = {
  stubDefinitionScorecardDashboard: () => stubFor(scorecardsCompleteDatasetMock),
  stubDefinitionScorecardDashboardBadData: () => stubFor(scorecardsCompletebadDatasetMock),
  stubDefinitionScorecardDashboardNoTs: () => stubFor(scorecardsCompleteDatasetNoTsMock),
  stubDefinitionScorecardDashboardInvalidVisDefs: () => stubFor(scorecardsInvalidVisDefinitionsMock),
  stubDefinitionScorecardBucketDashboard: () => stubFor(scorecardsBucketCompleteDatasetMock),
  stubDefinitionScorecardGroupDashboard: () => stubFor(scorecardGroupCompleteDatasetMock),
  stubDefinitionScorecardGroupDashboardInvalid: () => stubFor(scorecardGroupCompleteDatasetInvalidMock),
  stubDefinitionScorecardGroupDashboardNoTs: () => stubFor(scorecardGroupCompleteDatasetNoTsMock),
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
  ...matrixDefinitionStubs,
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
  stubDashboardResultCompleteDataDaily: () => stubFor(dashboardResultCompleteDataMockDaily), // TODO: use daily date format
  stubDashboardResultCompleteDataAnnually: () => stubFor(dashboardResultCompleteDataMock),
  stubDashboardResultCompleteDataSync: () => stubFor(dashboardResultCompleteDataSyncMock),

  stubDashboardResultPartialData: () => stubFor(dashboardResultPartialDataMock),
  stubDashboardResultPartialDataHistoric: () => stubFor(dashboardResultPartialDataHistoricMock),

  stubDashboardResultUndefinedData: () => stubFor(dashboardResultUndefinedMock),
  stubDashboardResultEmptyData: () => stubFor(dashboardResultEmptyDataSyncMock),

  stubDashboardResultCompleteDataNoTs: () => stubFor(dashboardResultCompleteDataNoTsMock),

  stubDashboardResultCompleteBadData: () => stubFor(dashboardResultCompleteBadDataMock),
  stubDashboardResultCompleteBadDataDuplicates: () => stubFor(dashboardResultCompleteBadDataDuplicatesMock),

  stubDashboardResultMissingFirstRowDataSync: () => stubFor(dashboardResultMissingFirstRowDataSyncMock),

  stubDashboardResultParentChildParent: () => stubFor(getAsyncReportResultMockParentChildParentMock),
  stubDashboardResultParentChildParentNoData: () => stubFor(getAsyncReportResultMockParentChildParentNoDataMock),
  stubDashboardResultParentChildParent404: () => stubFor(getAsyncReportResultMockParentChildParent404Mock),
  stubDashboardResultParentChildChild1: () => stubFor(getAsyncReportResultMockParentChildChild1Mock),
  stubDashboardResultParentChildChild1NoData: () => stubFor(getAsyncReportResultMockParentChildChild1NoDataMock),
  stubDashboardResultParentChildChild1404: () => stubFor(getAsyncReportResultMockParentChildChild1404Mock),
  stubDashboardResultParentChildChild2: () => stubFor(getAsyncReportResultMockParentChildChild2Mock),
  stubDashboardResultParentChildChild2NoData: () => stubFor(getAsyncReportResultMockParentChildChild2NoDataMock),
  stubDashboardResultParentChildChild2404: () => stubFor(getAsyncReportResultMockParentChildChild2404Mock),
}

const stubs = {
  ...definitionStubs,
  ...requestStubs,
  ...resultsStubs,
} as const

export type DashboardStubsKeys = keyof typeof stubs

export default stubs

import {
  listCompleteDatasetMock,
  listCompleteDatasetHistoricMock,
  listPartialDatasetMock,
  listPartialDatasetHistoricMock,
  scorecardsCompleteDatasetMock,
  scorecardsBucketCompleteDatasetMock,
  scorecardGroupCompleteDatasetMock,
  barCompleteDatasetMock,
  barPartialDatasetMock,
  doughnutCompleteDatasetMock,
  lineTimeseriesCompleteDatasetMock,
  lineTimeseriesPartialDatasetMock,
  barInvalidMock,
  listInvalidDefMock,
  listInvalidVisDefMock,
  lineCompleteDatasetMock,
  mixedCompleteDatasetMock,
  mixedPartialDatasetMock,
  mixedPartialDatasetHistoricMock
} from '@networkMocks/dashboard/definitions/visualisations/mocks'

import { syncDashboardMock, featureFlagDashboardMock } from '@networkMocks/dashboard/definitions/feature-testing/mocks'

// DATA
import {
  dashboardResultCompleteDataMock,
  dashboardResultCompleteDataSyncMock,
} from '@networkMocks/dashboard/data/complete-data/mocks'
import {
  dashboardResultPartialDataHistoricMock,
  dashboardResultPartialDataMock,
} from '@networkMocks/dashboard/data/partial-data/mocks'

import { stubFor } from '@networkMocks/generateNetworkMock'
import {
  getDashboardStatusFinishedMock,
  getDashboardStatusStartedMock,
  requestAsyncDashboardMock,
} from '@networkMocks/dashboard/mocks'
import { dashboardFailureStubs } from './failures'
import {
  dashboardResultEmptyDataSyncMock,
  dashboardResultMissingFirstRowDataSyncMock, dashboardResultUndefinedMock,
} from '@networkMocks/dashboard/data/empty-data/mocks'

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
  stubDefinitionSyncDashboard: () => stubFor(syncDashboardMock),
  ...scorecardDefinitionStubs,
  ...listDefinitionStubs,
  ...BarDefinitionStubs,
  ...DoughnutDefinitionStubs,
  ...lineTimeseriesDefinitionStubs,
  ...lineDefinitionStubs,
  ...mixedChartsDefinitionStubs
}

// REQUEST
const requestStubs = {
  stubMockDashboardsStatusFinished: () => stubFor(getDashboardStatusFinishedMock),
  stubMockDashboardsStatusStarted: () => stubFor(getDashboardStatusStartedMock),
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
}

const stubs = {
  ...definitionStubs,
  ...requestStubs,
  ...resultsStubs,
} as const

export type DashboardStubsKeys = keyof typeof stubs

export default stubs

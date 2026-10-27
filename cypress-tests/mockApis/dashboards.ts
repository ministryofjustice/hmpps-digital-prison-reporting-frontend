import { mockDefinitions } from '@networkMocks/dashboard/definitions/visualisations/mocks'

import {
  dashboardWithChildOneMock,
  dashboardWithChildTwoMock,
  dashboardWithLinksMock,
  dashboardWithParentChildMock,
  featureFlagDashboardMock,
  syncDashboardMock,
  parentChildStatusChild1FinishedMock,
  parentChildStatusChild2FailedMock,
  parentChildStatusChild2FinishedMock,
  getAsyncReportResultMockParentChildParentMock,
  getAsyncReportResultMockParentChildChild1Mock,
  getAsyncReportResultMockParentChildChild1NoDataMock,
  getAsyncReportResultMockParentChildChild2Mock,
  getAsyncReportResultMockParentChildChild2404Mock,
  getAsyncReportResultMockParentChildParent404Mock,
  getAsyncReportResultMockParentChildChild1404Mock,
  parentChildStatusChild1FailedMock,
  getAsyncReportResultMockParentChildChild2NoDataMock,
  getAsyncReportResultMockParentChildParentNoDataMock,
  parentChildStatusParentFailedMock,
  parentChildStatusParentFinishedMock,
} from '@networkMocks/dashboard/definitions/feature-testing/mocks'

import {
  dashboardResultCompleteDataMock,
  dashboardResultCompleteDataMockAnnually,
  dashboardResultCompleteDataMockDaily,
  dashboardResultCompleteDataMockMonthly,
  dashboardResultCompleteDataNoTsMock,
  dashboardResultCompleteDataSyncMock,
} from '@networkMocks/dashboard/data/complete-data/mocks'

import {
  dashboardResultPartialDataHistoricMock,
  dashboardResultPartialDataMock,
} from '@networkMocks/dashboard/data/partial-data/mocks'

import {
  dashboardResultCompleteBadDataMock,
  dashboardResultCompleteBadDataDuplicatesMock,
} from '@networkMocks/dashboard/data/bad-data/mocks'

import {
  dashboardResultEmptyDataSyncMock,
  dashboardResultMissingFirstRowDataSyncMock,
  dashboardResultUndefinedMock,
} from '@networkMocks/dashboard/data/empty-data/mocks'

import { getAsyncReportResultMockBoxPlotMock } from '@networkMocks/dashboard/data/box-plot-data/mocks'

import {
  getDashboardStatusFinishedMock,
  getDashboardStatusStartedMock,
  requestAsyncDashboardMock,
} from '@networkMocks/dashboard/mocks'
import { stubFor } from '@networkMocks/generateNetworkMock'
import { dashboardFailureStubs } from './failures'

// DEFINITIONS
const { list } = mockDefinitions
const listDefinitionStubs = {
  stubListDashboardCompleteData: () => stubFor(list.listDashboardDefinitionMock),
  stubListDashboardCompleteDataHistoric: () => stubFor(list.listDashboardDefinitonHistoricMock),
  stubListDashboardPartialData: () => stubFor(list.listDashboardDefinitionMergedDatasetMock),
  stubListDashboardPartialDataHistoric: () => stubFor(list.listDashboardDefintionMergedDatasetHistoricMock),
  stubListInvalidDefs: () => stubFor(list.listDashboardDefinitionInvalidMock),
  stubListInvalidVisDefs: () => stubFor(list.listDashboardDefinitionInvalidVisDefMock),
}

const { bar } = mockDefinitions
const BarDefinitionStubs = {
  stubBarDashboardCompleteData: () => stubFor(bar.barDashboardDefinitionMock),
  stubBarDashboardPartialData: () => stubFor(bar.barDashboardDefinitionMergedDatasetMock),
  stubBarInvalid: () => stubFor(bar.barDashboardDefinitionInvalidMock),
}

const { doughnut } = mockDefinitions
const DoughnutDefinitionStubs = {
  stubDoughnutDashboardCompleteData: () => stubFor(doughnut.doughnutDashboardDefinitionMock),
}

const { lineTimeseries } = mockDefinitions
const lineTimeseriesDefinitionStubs = {
  stubLineTimeseriesDashboardCompleteData: () => stubFor(lineTimeseries.lineTimeseriesDashboardDefinitionMock),
  stubLineTimeseriesDashboardPartialData: () =>
    stubFor(lineTimeseries.lineTimeseriesDashboadDefinitionMergedDatasetMock),
  stubLineTimeseriesDashboardDailyDataDef: () =>
    stubFor(lineTimeseries.lineTimeseriesDashboardDefinitionDailyDatasetMock),
  stubLineTimeseriesDashboardMonthlyDataDef: () =>
    stubFor(lineTimeseries.lineTimeseriesDashboardDefinitionMonthlyDatasetMock),
  stubLineTimeseriesDashboardYearlyDataDef: () =>
    stubFor(lineTimeseries.lineTimeseriesDashboardDefinitionYearlyDatasetMock),
  stubLineTimeseriesDashboardInvalidDef: () => stubFor(lineTimeseries.lineTimeseriesDashboardDefinitionInvalidMock),
}

const { line } = mockDefinitions
const lineDefinitionStubs = {
  stubLineCompleteData: () => stubFor(line.lineDashboardDefinitionMock),
  stubLinePartialData: () => stubFor(line.lineDashboardDefinitionMergedDatasetMock),
  stubLineDashboardInvalidDef: () => stubFor(line.lineInvalidDashboardDefinitionMock),
}

const { matrix } = mockDefinitions
const matrixDefinitionStubs = {
  stubMatrixCompleteDailyData: () => stubFor(matrix.matrixDashboardDefinitionDailyDatasetMock),
  stubMatrixCompleteMonthlyData: () => stubFor(matrix.matrixDashboardDefinitionMonthlyDatasetMock),
  stubMatrixCompleteAnnuallyData: () => stubFor(matrix.matrixDashboardDefinitionAnnuallyDatasetMock),
  stubMatrixInvalid: () => stubFor(matrix.matrixDashboardDefinitionInvalidMock),
}

const { scorecard } = mockDefinitions
const scorecardDefinitionStubs = {
  stubDefinitionScorecardDashboard: () => stubFor(scorecard.scorecardsCompleteDatasetMock),
  stubDefinitionScorecardDashboardBadData: () => stubFor(scorecard.scorecardsCompletebadDatasetMock),
  stubDefinitionScorecardDashboardNoTs: () => stubFor(scorecard.scorecardsCompleteDatasetNoTsMock),
  stubDefinitionScorecardDashboardInvalidVisDefs: () => stubFor(scorecard.scorecardsInvalidVisDefinitionsMock),
  stubDefinitionScorecardBucketDashboard: () => stubFor(scorecard.scorecardsBucketCompleteDatasetMock),
}

const { scorecardGroup } = mockDefinitions
const scorecardGroupDefinitionStubs = {
  stubDefinitionScorecardGroupDashboard: () => stubFor(scorecardGroup.scorecardGroupCompleteDatasetMock),
  stubDefinitionScorecardGroupDashboardInvalid: () => stubFor(scorecardGroup.scorecardGroupCompleteDatasetInvalidMock),
  stubDefinitionScorecardGroupDashboardNoTs: () => stubFor(scorecardGroup.scorecardGroupCompleteDatasetNoTsMock),
}

const { mixed } = mockDefinitions
const mixedChartsDefinitionStubs = {
  stubMixedDashboardCompleteData: () => stubFor(mixed.mixedCompleteDatasetMock),
  stubMixedDashboardPartialData: () => stubFor(mixed.mixedPartialDatasetMock),
  stubMixedDashboardPartialDataHistoric: () => stubFor(mixed.mixedPartialDatasetHistoricMock),
}

const { boxPlot } = mockDefinitions
const boxPlotChartsDefinitionStubs = {
  stubDefinitionBoxPlotDashboard: () => stubFor(boxPlot.boxplotDashboardDefinitionMock),
}

const definitionStubs = {
  stubTestDashboard8: () => stubFor(featureFlagDashboardMock),
  stubTestDashboardWithLink: () => stubFor(dashboardWithLinksMock),
  stubTestDashboardWithParentChild: () => stubFor(dashboardWithParentChildMock),
  stubTestDashboardWithChildOne: () => stubFor(dashboardWithChildOneMock),
  stubTestDashboardWithChildTwo: () => stubFor(dashboardWithChildTwoMock),
  stubDefinitionSyncDashboard: () => stubFor(syncDashboardMock),
  ...scorecardDefinitionStubs,
  ...scorecardGroupDefinitionStubs,
  ...listDefinitionStubs,
  ...BarDefinitionStubs,
  ...DoughnutDefinitionStubs,
  ...lineTimeseriesDefinitionStubs,
  ...lineDefinitionStubs,
  ...mixedChartsDefinitionStubs,
  ...boxPlotChartsDefinitionStubs,
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
  // Complete data stubs
  stubDashboardResultCompleteDataDaily: () => stubFor(dashboardResultCompleteDataMockDaily),
  stubDashboardResultCompleteDataMonthly: () => stubFor(dashboardResultCompleteDataMockMonthly),
  stubDashboardResultCompleteDataAnnually: () => stubFor(dashboardResultCompleteDataMockAnnually),
  stubDashboardResultCompleteData: () => stubFor(dashboardResultCompleteDataMock),
  stubDashboardResultCompleteDataSync: () => stubFor(dashboardResultCompleteDataSyncMock),

  // Partial data stubs
  stubDashboardResultPartialData: () => stubFor(dashboardResultPartialDataMock),
  stubDashboardResultPartialDataHistoric: () => stubFor(dashboardResultPartialDataHistoricMock),

  // No TS
  stubDashboardResultCompleteDataNoTs: () => stubFor(dashboardResultCompleteDataNoTsMock),

  // Bad data stubs
  stubDashboardResultEmptyData: () => stubFor(dashboardResultEmptyDataSyncMock),
  stubDashboardResultUndefinedData: () => stubFor(dashboardResultUndefinedMock),
  stubDashboardResultCompleteBadData: () => stubFor(dashboardResultCompleteBadDataMock),
  stubDashboardResultCompleteBadDataDuplicates: () => stubFor(dashboardResultCompleteBadDataDuplicatesMock),
  stubDashboardResultMissingFirstRowDataSync: () => stubFor(dashboardResultMissingFirstRowDataSyncMock),

  // Parent Child data stubs
  stubDashboardResultParentChildParent: () => stubFor(getAsyncReportResultMockParentChildParentMock),
  stubDashboardResultParentChildParentNoData: () => stubFor(getAsyncReportResultMockParentChildParentNoDataMock),
  stubDashboardResultParentChildParent404: () => stubFor(getAsyncReportResultMockParentChildParent404Mock),
  stubDashboardResultParentChildChild1: () => stubFor(getAsyncReportResultMockParentChildChild1Mock),
  stubDashboardResultParentChildChild1NoData: () => stubFor(getAsyncReportResultMockParentChildChild1NoDataMock),
  stubDashboardResultParentChildChild1404: () => stubFor(getAsyncReportResultMockParentChildChild1404Mock),
  stubDashboardResultParentChildChild2: () => stubFor(getAsyncReportResultMockParentChildChild2Mock),
  stubDashboardResultParentChildChild2NoData: () => stubFor(getAsyncReportResultMockParentChildChild2NoDataMock),
  stubDashboardResultParentChildChild2404: () => stubFor(getAsyncReportResultMockParentChildChild2404Mock),

  // Boxplot data stubs
  stubDashboardResultBoxPlotData: () => stubFor(getAsyncReportResultMockBoxPlotMock),
}

const stubs = {
  ...definitionStubs,
  ...requestStubs,
  ...resultsStubs,
} as const

export type DashboardStubsKeys = keyof typeof stubs

export default stubs

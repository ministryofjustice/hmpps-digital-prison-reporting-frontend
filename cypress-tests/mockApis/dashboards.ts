import { mockDefinitions } from '@networkMocks/dashboard/definitions/visualisations/mocks'

import {
  dashboardWithChildOneMock,
  dashboardWithChildTwoMock,
  dashboardWithLinksMock,
  dashboardWithParentChildMock,
  featureFlagDashboardMock,
  syncDashboardMock,
  parentChildDashboardStatusChild1FinishedMock,
  parentChildDashboardStatusChild2FailedMock,
  parentChildDashboardStatusChild2FinishedMock,
  dashboardResultParenChildParentMock,
  dashboardResultParenChildChild1Mock,
  dashboardResultParenChildChild1NoDataMock,
  dashboardResultParenChildChild2Mock,
  dashboardResultParenChildChild2404Mock,
  dashboardResultParenChildParent404Mock,
  dashboardResultParenChildChild1404Mock,
  parentChildDashboardStatusChild1FailedMock,
  dashboardResultParenChildChild2NoDataMock,
  dashboardResultParenChildParentNoDataMock,
  parentChildDashboardStatusParentFailedMock,
  parentChildDashboardStatusParentFinishedMock,
} from '@networkMocks/dashboard/definitions/feature-testing/mocks'

import {
  dashboardResultMock,
  dashboardResultAnnuallyMock,
  dashboardResultDailyMock,
  dashboardResultMonthlyMock,
  dashboardResultNoTsMock,
  dashboardResultSyncMock,
} from '@networkMocks/dashboard/data/default-data/mocks'

import {
  dashboardResultMergedDataHistoricMock,
  dashboardResultMergedDataMock,
} from '@networkMocks/dashboard/data/merged-data/mocks'

import {
  dashboardResultBadDataMock,
  dashboardResultBadDataDuplicatesMock,
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
  stubListDashboardDefinition: () => stubFor(list.listDashboardDefinitionMock),
  stubListDashboardDefinitionHistoric: () => stubFor(list.listDashboardDefinitonHistoricMock),
  stubListDashboardDefinitionMergedDataset: () => stubFor(list.listDashboardDefinitionMergedDatasetMock),
  stubListDashboardDefinitionMergedDatasetHistoric: () => stubFor(list.listDashboardDefintionMergedDatasetHistoricMock),
  stubListDashboardDefinitionInvalid: () => stubFor(list.listDashboardDefinitionInvalidMock),
  stubListDashboardDefinitionInvalidVisDefinitions: () => stubFor(list.listDashboardDefinitionInvalidVisDefMock),
}

const { bar } = mockDefinitions
const BarDefinitionStubs = {
  stubBarChartsDashboardDefinition: () => stubFor(bar.barDashboardDefinitionMock),
  stubBarChartsDashboardDefinitionMergedDataset: () => stubFor(bar.barDashboardDefinitionMergedDatasetMock),
  stubBarChartsDashboardDefinitionInvalid: () => stubFor(bar.barDashboardDefinitionInvalidMock),
}

const { doughnut } = mockDefinitions
const DoughnutDefinitionStubs = {
  stubDoughnutChartsDashboardDefinition: () => stubFor(doughnut.doughnutDashboardDefinitionMock),
}

const { lineTimeseries } = mockDefinitions
const lineTimeseriesDefinitionStubs = {
  stubLineTimeseriesChartsDashboardDefinition: () => stubFor(lineTimeseries.lineTimeseriesDashboardDefinitionMock),
  stubLineTimeseriesChartsDashboardDefinitionMergedDataset: () =>
    stubFor(lineTimeseries.lineTimeseriesDashboadDefinitionMergedDatasetMock),
  stubLineTimeseriesChartsDashboardDefinitionDaily: () =>
    stubFor(lineTimeseries.lineTimeseriesDashboardDefinitionDailyDatasetMock),
  stubLineTimeseriesChartsDashboardDefinitionMonthly: () =>
    stubFor(lineTimeseries.lineTimeseriesDashboardDefinitionMonthlyDatasetMock),
  stubLineTimeseriesChartsDashboardDefinitionYearly: () =>
    stubFor(lineTimeseries.lineTimeseriesDashboardDefinitionYearlyDatasetMock),
  stubLineTimeseriesChartsDashboardDefinitionInvalid: () =>
    stubFor(lineTimeseries.lineTimeseriesDashboardDefinitionInvalidMock),
}

const { line } = mockDefinitions
const lineDefinitionStubs = {
  stubLineChartsDashboardDefinition: () => stubFor(line.lineDashboardDefinitionMock),
  stubLineChartsDashboardDefinitionMergedDataset: () => stubFor(line.lineDashboardDefinitionMergedDatasetMock),
  stubLineChartsDashboardDefinitionInvalid: () => stubFor(line.lineInvalidDashboardDefinitionMock),
}

const { matrix } = mockDefinitions
const matrixDefinitionStubs = {
  stubMatrixChartsDashboardDefinitionDaily: () => stubFor(matrix.matrixDashboardDefinitionDailyDatasetMock),
  stubMatrixChartsDashboardDefinitionMonthly: () => stubFor(matrix.matrixDashboardDefinitionMonthlyDatasetMock),
  stubMatrixChartsDashboardDefinitionAnnually: () => stubFor(matrix.matrixDashboardDefinitionAnnuallyDatasetMock),
  stubMatrixChartsDashboardDefinitionInvalid: () => stubFor(matrix.matrixDashboardDefinitionInvalidMock),
}

const { scorecard } = mockDefinitions
const scorecardDefinitionStubs = {
  stubScorecardsDashboardDefinition: () => stubFor(scorecard.scorecardsDashboardDefinitionMock),
  stubScorecardsDashboardDefinitionBadData: () => stubFor(scorecard.scorecardsDashboardDefinitionBadDatasetMock),
  stubScorecardsDashboardDefinitionNoTs: () => stubFor(scorecard.scorecardsDashboardDefinitionNoTsMock),
  stubScorecardsDashboardDefinitionInvalidVisDefinitions: () =>
    stubFor(scorecard.scorecardsDashboardDefinitionInvalidVisDefinitionsMock),
  stubScorecardsDashboardDefinitionBuckets: () => stubFor(scorecard.scorecardsDashboardDefintionBucketMock),
}

const { scorecardGroup } = mockDefinitions
const scorecardGroupDefinitionStubs = {
  stubScorecardGroupDashboardDefinition: () => stubFor(scorecardGroup.scorecardGroupDashboardDefinitionMock),
  stubScorecardGroupDashboardDefinitionInvalid: () =>
    stubFor(scorecardGroup.scorecardGroupDashboardDefinitionInvalidMock),
  stubScorecardGroupDashboardDefinitionNoTs: () => stubFor(scorecardGroup.scorecardGroupDashboardDefinitionNoTsMock),
}

const { mixed } = mockDefinitions
const mixedChartsDefinitionStubs = {
  stubMixedDashboardDefinition: () => stubFor(mixed.mixedDashboardDefinitionMock),
  stubMixedDashboardDefinitionMergedDataset: () => stubFor(mixed.mixedDashboardDefinitionMergedMock),
  stubMixedDashboardDefinitionMergedDatasetHistoric: () =>
    stubFor(mixed.mixedDashboardDefinitionMergedDatasetHistoricMock),
}

const { boxPlot } = mockDefinitions
const boxPlotChartsDefinitionStubs = {
  stubBoxPlotDashboardDefinition: () => stubFor(boxPlot.boxplotDashboardDefinitionMock),
}

const definitionStubs = {
  stubTestDashboardDefinition: () => stubFor(featureFlagDashboardMock),
  stubTestDashboardDefinitionWithLink: () => stubFor(dashboardWithLinksMock),
  stubTestDashboardDefinitionWithParentChild: () => stubFor(dashboardWithParentChildMock),
  stubTestDashboardDefinitionWithChildOne: () => stubFor(dashboardWithChildOneMock),
  stubTestDashboardDefinitionWithChildTwo: () => stubFor(dashboardWithChildTwoMock),
  stubDashboardDefinitionSync: () => stubFor(syncDashboardMock),
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

// REQUEST/STATUS
const requestStubs = {
  stubMockDashboardStatusFinished: () => stubFor(getDashboardStatusFinishedMock),
  stubMockDashboardStatusStarted: () => stubFor(getDashboardStatusStartedMock),
  stubMockParentChildStatusParentFinished: () => stubFor(parentChildDashboardStatusParentFinishedMock),
  stubMockParentChildStatusParentFailed: () => stubFor(parentChildDashboardStatusParentFailedMock),
  stubMockParentChildStatusChild1Finished: () => stubFor(parentChildDashboardStatusChild1FinishedMock),
  stubMockParentChildStatusChild1Failed: () => stubFor(parentChildDashboardStatusChild1FailedMock),
  stubMockParentChildStatusChild2Finished: () => stubFor(parentChildDashboardStatusChild2FinishedMock),
  stubMockParentChildStatusChild2Failed: () => stubFor(parentChildDashboardStatusChild2FailedMock),
  stubViewAsyncResults: () => stubFor(requestAsyncDashboardMock),
  ...dashboardFailureStubs,
}

// RESULTS
const resultsStubs = {
  // data stubs
  stubDashboardResult: () => stubFor(dashboardResultMock),
  stubDashboardResultDaily: () => stubFor(dashboardResultDailyMock),
  stubDashboardResultMonthly: () => stubFor(dashboardResultMonthlyMock),
  stubDashboardResultAnnually: () => stubFor(dashboardResultAnnuallyMock),
  stubDashboardResultSync: () => stubFor(dashboardResultSyncMock),

  // Merged data stubs
  stubDashboardResultMergedData: () => stubFor(dashboardResultMergedDataMock),
  stubDashboardResultMergedDataHistoric: () => stubFor(dashboardResultMergedDataHistoricMock),

  // No TS
  stubDashboardResultNoTs: () => stubFor(dashboardResultNoTsMock),

  // Bad data stubs
  stubDashboardResultEmptyData: () => stubFor(dashboardResultEmptyDataSyncMock),
  stubDashboardResultUndefinedData: () => stubFor(dashboardResultUndefinedMock),
  stubDashboardResultBadData: () => stubFor(dashboardResultBadDataMock),
  stubDashboardResultBadDataDuplicates: () => stubFor(dashboardResultBadDataDuplicatesMock),
  stubDashboardResultMissingFirstRowDataSync: () => stubFor(dashboardResultMissingFirstRowDataSyncMock),

  // Parent Child data stubs
  stubDashboardResultParentChildParent: () => stubFor(dashboardResultParenChildParentMock),
  stubDashboardResultParentChildParentNoData: () => stubFor(dashboardResultParenChildParentNoDataMock),
  stubDashboardResultParentChildParent404: () => stubFor(dashboardResultParenChildParent404Mock),
  stubDashboardResultParentChildChild1: () => stubFor(dashboardResultParenChildChild1Mock),
  stubDashboardResultParentChildChild1NoData: () => stubFor(dashboardResultParenChildChild1NoDataMock),
  stubDashboardResultParentChildChild1404: () => stubFor(dashboardResultParenChildChild1404Mock),
  stubDashboardResultParentChildChild2: () => stubFor(dashboardResultParenChildChild2Mock),
  stubDashboardResultParentChildChild2NoData: () => stubFor(dashboardResultParenChildChild2NoDataMock),
  stubDashboardResultParentChildChild2404: () => stubFor(dashboardResultParenChildChild2404Mock),

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

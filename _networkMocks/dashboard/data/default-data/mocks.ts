import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { defaultDataSet } from './data'
import { defaultDataSetNoTs } from './data_no-ts'

import { featureTestingIds } from '../../definitions/feature-testing'
import { requestExampleIds } from '../../definitions/request-examples'
import { allVisualisationDefinitions as vds } from '../../definitions/visualisations'

import { defaultDataSetAnnually } from './data_annually'
import { defaultDataSetDaily } from './data_daily'
import { defaultDataSetMonthly } from './date_monthly'

// ----------------------------------------------------------------------
// Definitions that require the default dataset
//

const defaultVisDefinitionsIds = [
  // lists
  vds.listDashboardDefinition,
  vds.listDashboardDefinitionHistoric,

  // scorecards
  vds.scorecardsDashboardDefinition,
  vds.scorecardsDashboardDefinitionBuckets,

  // scorecardGroup
  vds.scorecardGroupDashboardDefinitionInvalid,
  vds.scorecardGroupDashboardDefinition,

  // bar
  vds.barChartsDashboardDefinition,
  vds.barChartsDashboardDefinitionInvalid,

  // dougnhut
  vds.doughnutChartsDashboardDefinition,

  // line
  vds.lineChartsDashboardDefinitionInvalid,
  vds.lineChartsDashboardDefinition,

  // line-timeseries
  vds.lineTimeseriesDashboardDefinition,

  // mixed
  vds.mixedChartsDashboardDefinition,
].map(def => def.id)

// ----------------------------------------------------------------------
// Definitions that require a default dataset with DAILY timestamp format (YYYY-MM-DD)
//

const dailyDatasetVisDefinitionIds = [
  vds.matrixChartsDashboardDefinition,
  vds.lineTimeseriesDashboardDefinitionDaily,
].map(def => def.id)

// ----------------------------------------------------------------------
// Definitions that require a default dataset with MONTHLY timestamp format (YYYY-MM)
//

const monthlyDatasetVisDefinitionIds = [
  vds.matrixChartDashboardDefinitionMonthly,
  vds.matrixChartDashboardDefinitionAutoBucketed,
  vds.matrixChartDashboardDefinitionBucketed,
  vds.lineTimeseriesDashboardDefinitionMonthly,
].map(def => def.id)

// ----------------------------------------------------------------------
// Definitions that require a default dataset with YEARLY timestamp format (YYYY)
//

const yearlyDatasetVisDefinitionIds = [
  vds.matrixChartDashboardDefinitionAnnually,
  vds.lineTimeseriesDashboardDefinitionAnnually,
].map(def => def.id)

// ----------------------------------------------------------------------
// Definitions that require a default dataset with no timestamp
//

const noTsDatasetVisDefinitionIds = [
  vds.scorecardsDashboardDefinitionNoTs,
  vds.scorecardGroupDashboardDefinitionNoTs,
  vds.lineTimeseriesDashboardDefinition,
  vds.matrixChartDashboardDefinitionMonthly,
].map(def => def.id)

// ----------------------------------------------------------------------
// DASHBOARD DATASET RESULT MOCKS
//

const allIds = [...defaultVisDefinitionsIds, ...requestExampleIds, ...featureTestingIds]
const productIds = ['dashboard-visualisations', 'request-examples', 'feature-testing']

export const dashboardResultMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${allIds.join('|')})/tables/tblId_[0-9]+/result`,
  defaultDataSet,
  1,
)

export const dashboardResultSyncMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${allIds.join('|')})`,
  defaultDataSet,
  1,
)

export const dashboardResultDailyMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${dailyDatasetVisDefinitionIds.join('|')})/tables/tblId_[0-9]+/result`,
  defaultDataSetDaily,
  1,
)

export const dashboardResultMonthlyMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${monthlyDatasetVisDefinitionIds.join('|')})/tables/tblId_[0-9]+/result`,
  defaultDataSetMonthly,
  1,
)

export const dashboardResultAnnuallyMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${yearlyDatasetVisDefinitionIds.join('|')})/tables/tblId_[0-9]+/result`,
  defaultDataSetAnnually,
  1,
)

export const dashboardResultNoTsMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${noTsDatasetVisDefinitionIds.join('|')})/tables/tblId_[0-9]+/result`,
  defaultDataSetNoTs,
  2,
)

export const mocks = [
  dashboardResultDailyMock,
  dashboardResultMonthlyMock,
  dashboardResultAnnuallyMock,
  dashboardResultMock,
  dashboardResultSyncMock,
  dashboardResultNoTsMock,
]

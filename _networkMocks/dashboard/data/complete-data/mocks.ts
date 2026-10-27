import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { completeDataSet } from './data'
import { completeDataSetNoTs } from './data_no-ts'

import { featureTestingIds } from '../../definitions/feature-testing'
import { requestExampleIds } from '../../definitions/request-examples'
import { allVisualisationDefinitions as vds } from '../../definitions/visualisations'

import { completeDataSetAnnually } from './data_annually'
import { completeDataSetDaily } from './data_daily'
import { completeDataSetMonthly } from './date_monthly'

// ----------------------------------------------------------------------
// Defintions that require a complete dataset
//

const completeVisDefinitionsIds = [
  // lists
  vds.listCompleteDataset,
  vds.listCompleteDatasetHistoric,

  // scorecards
  vds.scorecardsCompleteDataset,
  vds.scorecardsBucketsCompleteDataset,

  // scorecardGroup
  vds.scorecardGroupCompleteDatasetInvalid,
  vds.scorecardGroupCompleteDataset,

  // bar
  vds.barChartsDefinition,
  vds.barChartsDefinitionInvalid,

  // dougnhut
  vds.doughnutChartsDefinition,

  // line
  vds.lineDefinitionInvalid,
  vds.lineCompleteDefinition,

  // line-timeseries
  vds.linetimeseriesChartsDefinition,

  // mixed
  vds.mixedDefinition,
].map(def => def.id)

// ----------------------------------------------------------------------
// Defintions that require a complete dataset with DAILY timestamp format (YYYY-MM-DD)
//

const dailyDatasetVisDefinitionIds = [vds.matrixChartDefinition, vds.linetimeseriesChartsDailyDefinition].map(
  def => def.id,
)

// ----------------------------------------------------------------------
// Defintions that require a complete dataset with MONTHLY timestamp format (YYYY-MM)
//

const monthlyDatasetVisDefinitionIds = [
  vds.matrixChartMonthlyDefinition,
  vds.matrixChartAutoBucketedDefinition,
  vds.matrixChartBucketedDefinition,
  vds.linetimeseriesChartsMonthlyDefinition,
].map(def => def.id)

// ----------------------------------------------------------------------
// Defintions that require a complete dataset with YEARLY timestamp format (YYYY)
//

const yearlyDatasetVisDefinitionIds = [
  vds.matrixChartAnnuallyDefinition,
  vds.linetimeseriesChartsAnnaullyDefinition,
].map(def => def.id)

// ----------------------------------------------------------------------
// Defintions that require a complete dataset with no timestamp
//

const noTsDatasetVisDefinitionIds = [
  vds.scorecardsCompleteNoTsDataset,
  vds.scorecardGroupCompleteDataseNoTs,
  vds.linetimeseriesChartsDefinition,
  vds.matrixChartMonthlyDefinition,
].map(def => def.id)

// ----------------------------------------------------------------------
// DASHBOARD DATASET RESULT MOCKS
//

const allIds = [...completeVisDefinitionsIds, ...requestExampleIds, ...featureTestingIds]
const productIds = ['dashboard-visualisations', 'request-examples', 'feature-testing']

export const dashboardResultCompleteDataMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${allIds.join('|')})/tables/tblId_[0-9]+/result`,
  completeDataSet,
  1,
)

export const dashboardResultCompleteDataSyncMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${allIds.join('|')})`,
  completeDataSet,
  1,
)

export const dashboardResultCompleteDataMockDaily = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${dailyDatasetVisDefinitionIds.join('|')})/tables/tblId_[0-9]+/result`,
  completeDataSetDaily,
  1,
)

export const dashboardResultCompleteDataMockMonthly = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${monthlyDatasetVisDefinitionIds.join('|')})/tables/tblId_[0-9]+/result`,
  completeDataSetMonthly,
  1,
)

export const dashboardResultCompleteDataMockAnnually = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${yearlyDatasetVisDefinitionIds.join('|')})/tables/tblId_[0-9]+/result`,
  completeDataSetAnnually,
  1,
)

export const dashboardResultCompleteDataNoTsMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${noTsDatasetVisDefinitionIds.join('|')})/tables/tblId_[0-9]+/result`,
  completeDataSetNoTs,
  2,
)

export const mocks = [
  dashboardResultCompleteDataMockDaily,
  dashboardResultCompleteDataMockMonthly,
  dashboardResultCompleteDataMockAnnually,
  dashboardResultCompleteDataMock,
  dashboardResultCompleteDataSyncMock,
  dashboardResultCompleteDataNoTsMock,
]

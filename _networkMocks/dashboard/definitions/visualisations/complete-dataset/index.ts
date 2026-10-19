import { components } from '../../../../../src/dpr/types/api'

// list
import { definition as listCompleteDataset } from './list/definition'
import { definition as listCompleteDatasetHistoric } from './list/definition-historic'
import { definition as listInvalidDefinition } from './list/definition-invalid'
import { definition as listInvalidVisDefinition } from './list/definition-invalid-vis-defs'

// scorecard
import { definition as scorecardsCompleteDataset } from './scorecard/definition'
import { definition as scorecardsCompleteBadDataset } from './scorecard/definition-bad-data'
import { definition as scorecardsBucketsCompleteDataset } from './scorecard/definition-buckets'
import { definition as scorecardsInvalid } from './scorecard/definition-invalid'
import { definition as scorecardsCompleteNoTsDataset } from './scorecard/definition-no-ts'

// scorecard-group
import { definition as scorecardGroupCompleteDataset } from './scorecardGroup/definition'
import { definition as scorecardGroupCompleteDatasetInvalid } from './scorecardGroup/definition-invalid'
import { definition as scorecardGroupCompleteDataseNoTs } from './scorecardGroup/definiton-no-ts'

// Matrix
import {
  annuallyDefinition as matrixChartAnnuallyDefinition,
  autoBucketedDefinition as matrixChartAutoBucketedDefinition,
  bucketedDefinition as matrixChartBucketedDefinition,
  definition as matrixChartDefinition,
  monthlyDefinition as matrixChartMonthlyDefinition,
} from './matrix/definition'

// bar
import { definition as barChartsDefinition } from './bar/definition'

// doughnut
import { definition as doughnutChartsDefinition } from './doughnut/definition'

// line
import { definition as lineCompleteDefinition } from './line/definition'

// line-timeseries
import { definition as linetimeseriesChartsDefinition } from './line-timeseries/definition'
import { definition as linetimeseriesChartsDailyDefinition } from './line-timeseries/definition-granularity-daily'
import { definition as linetimeseriesChartsMonthlyDefinition } from './line-timeseries/defintion-granularity-monthly'
import { definition as linetimeseriesChartsAnnaullyDefinition } from './line-timeseries/definition-granularity-yearly'

// Boxplot
import { definition as boxPlotChartsDefinition } from './boxplot/definition'

// mixed
import { definition as mixedDefinition } from './mixed/definition'

const lists = [listCompleteDataset, listCompleteDatasetHistoric, listInvalidDefinition, listInvalidVisDefinition]
const scorecards = [
  scorecardsCompleteDataset,
  scorecardsCompleteBadDataset,
  scorecardsBucketsCompleteDataset,
  scorecardsInvalid,
]
const scorecardGroups = [scorecardGroupCompleteDataset, scorecardGroupCompleteDatasetInvalid]
const scorecardsNoTs = [scorecardGroupCompleteDataseNoTs, scorecardsCompleteNoTsDataset]

const barChartDefs = [barChartsDefinition]
const doughnutChartDefs = [doughnutChartsDefinition]
const lineDefs = [lineCompleteDefinition]
const lineTimeseriesDefs = [linetimeseriesChartsDefinition]
const boxPlotDefs = [boxPlotChartsDefinition]

// Chart definitions that use the all purpose complete dataset
const completeDatasetVisualisationIds = [
  ...lists,
  ...scorecards,
  ...scorecardGroups,
  ...barChartDefs,
  ...doughnutChartDefs,
  ...lineTimeseriesDefs,
  ...lineDefs,
  mixedDefinition,
]

// Chart definitions that use the DAILY complete dataset
const completeDatasetDailyVisualisationIds = [matrixChartDefinition, linetimeseriesChartsDailyDefinition]

// Chart definitions that use the MONTHLY complete dataset
const completeDatasetMonthlyVisualisationIds = [
  matrixChartMonthlyDefinition,
  matrixChartAutoBucketedDefinition,
  matrixChartBucketedDefinition,
  linetimeseriesChartsMonthlyDefinition,
]

// Chart definitions that use the YEARLY complete dataset
const completeDatasetYearlyVisualisationIds = [matrixChartAnnuallyDefinition, linetimeseriesChartsAnnaullyDefinition]

// Chart definitions that use the NO TS complete dataset
const completeDatasetNoTsVisualisationIds = [...scorecardsNoTs]

export const allVisualisations: components['schemas']['DashboardDefinition'][] = [
  ...completeDatasetVisualisationIds,
  ...completeDatasetDailyVisualisationIds,
  ...completeDatasetMonthlyVisualisationIds,
  ...completeDatasetYearlyVisualisationIds,
  ...completeDatasetNoTsVisualisationIds,
  ...boxPlotDefs,
]

export const visualisationIds: string[] = completeDatasetVisualisationIds.map(vis => {
  return vis.id
})

export const dailyDatasetVisIds: string[] = completeDatasetDailyVisualisationIds.map(vis => {
  return vis.id
})

export const monthlyDatasetVisIds: string[] = completeDatasetMonthlyVisualisationIds.map(vis => {
  return vis.id
})

export const yearlyDatasetVisIds: string[] = completeDatasetYearlyVisualisationIds.map(vis => {
  return vis.id
})

export const visIdsNoTs: string[] = completeDatasetNoTsVisualisationIds.map(vis => {
  return vis.id
})

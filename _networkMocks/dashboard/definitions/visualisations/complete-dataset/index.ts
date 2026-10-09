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
import { definition as linetimeseriesChartsDefinition } from './line-timeseries/definition'
import { definition as lineCompleteDefinition } from './line/definition'

// mixed
import { definition as mixedDefinition } from './mixed/definition'

const lists = [listCompleteDataset, listCompleteDatasetHistoric, listInvalidDefinition, listInvalidVisDefinition]
const scorecards = [
  scorecardsCompleteDataset,
  scorecardsCompleteBadDataset,
  scorecardsBucketsCompleteDataset,
  scorecardsCompleteNoTsDataset,
  scorecardsInvalid,
]
const scorecardGroups = [
  scorecardGroupCompleteDataset,
  scorecardGroupCompleteDatasetInvalid,
  scorecardGroupCompleteDataseNoTs,
]
const matrixParentChildDefs = [matrixChartDefinition, matrixChartMonthlyDefinition, matrixChartAnnuallyDefinition]
const matrixDefs = [matrixChartAutoBucketedDefinition, matrixChartBucketedDefinition]
const barChartDefs = [barChartsDefinition]
const doughnutChartDefs = [doughnutChartsDefinition]
const lineDefs = [lineCompleteDefinition]
const lineTimeseriesDefs = [linetimeseriesChartsDefinition]

const completeDatasetVisualisationIds = [
  ...lists,
  ...scorecards,
  ...scorecardGroups,
  ...matrixDefs,
  ...barChartDefs,
  ...doughnutChartDefs,
  ...lineTimeseriesDefs,
  ...lineDefs,
  mixedDefinition,
]

export const allVisualisations: components['schemas']['DashboardDefinition'][] = [
  ...completeDatasetVisualisationIds,
  ...matrixParentChildDefs,
]

export const visualisationIds: string[] = completeDatasetVisualisationIds.map(vis => {
  return vis.id
})

export const visIdsNoTs: string[] = [scorecardsCompleteNoTsDataset, scorecardGroupCompleteDataseNoTs].map(vis => {
  return vis.id
})

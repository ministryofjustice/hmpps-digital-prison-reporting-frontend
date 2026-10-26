// list
import { definition as listCompleteDataset } from './list/definitions/definition'
import { definition as listCompleteDatasetHistoric } from './list/definitions/definition-historic'
import { definition as listInvalidDefinition } from './list/definitions/definition-invalid'
import { definition as listInvalidVisDefinition } from './list/definitions/definition-invalid-vis-defs'
import { definition as listMergedDefinition } from './list/definitions/definition-merged'
import { definition as listMergedDefinitionHistoric } from './list/definitions/definition-merged-historic'

// scorecard
import { definition as scorecardsCompleteDataset } from './scorecard/definitions/definition'
import { definition as scorecardsCompleteBadDataset } from './scorecard/definitions/definition-bad-data'
import { definition as scorecardsBucketsCompleteDataset } from './scorecard/definitions/definition-buckets'
import { definition as scorecardsInvalid } from './scorecard/definitions/definition-invalid'
import { definition as scorecardsCompleteNoTsDataset } from './scorecard/definitions/definition-no-ts'

// scorecard-group
import { definition as scorecardGroupCompleteDataset } from './scorecardGroup/definitions/definition'
import { definition as scorecardGroupCompleteDatasetInvalid } from './scorecardGroup/definitions/definition-invalid'
import { definition as scorecardGroupCompleteDataseNoTs } from './scorecardGroup/definitions/definiton-no-ts'

// Matrix
import {
  annuallyDefinition as matrixChartAnnuallyDefinition,
  autoBucketedDefinition as matrixChartAutoBucketedDefinition,
  bucketedDefinition as matrixChartBucketedDefinition,
  definition as matrixChartDefinition,
  monthlyDefinition as matrixChartMonthlyDefinition,
} from './matrix/definitions/definition'
import { definition as invalidMatrix } from './matrix/definitions/definition-invalid'

// bar
import { definition as barChartsDefinition } from './bar/definitions/definition'
import { definition as barChartsDefinitionInvalid } from './bar/definitions/definition-invalid'
import { definition as barChartsDefinitionMerged } from './bar/definitions/definition-merged'

// doughnut
import { definition as doughnutChartsDefinition } from './doughnut/definitions/definition'

// line
import { definition as lineCompleteDefinition } from './line/definitions/definition'
import { definition as lineDefinitionInvalid } from './line/definitions/definition-invalid'
import { definition as lineDefinitionMerged } from './line/definitions/definition-merged'

// line-timeseries
import { definition as linetimeseriesChartsDefinition } from './line-timeseries/definitions/definition'
import { definition as linetimeseriesChartsDailyDefinition } from './line-timeseries/definitions/definition-granularity-daily'
import { definition as linetimeseriesChartsMonthlyDefinition } from './line-timeseries/definitions/defintion-granularity-monthly'
import { definition as linetimeseriesChartsAnnaullyDefinition } from './line-timeseries/definitions/definition-granularity-yearly'
import { definition as linetimeseriesInvalidCharts } from './line-timeseries/definitions/definition-invalid'
import { definition as linetimeseriesDefinitionMerged } from './line-timeseries/definitions/definition-merged'

// Boxplot
import { definition as boxPlotChartsDefinition } from './boxplot/definitions/definition'

// mixed
import { definition as mixedDefinition } from './mixed/definitions/definition'
import { definition as mixedDefinitionMerged } from './mixed/definitions/definition-merged'
import { definition as mixedDefinitionMergedHistoric } from './mixed/definitions/definition-merged-historic'

export const allVisualisationDefinitions = {
  // list
  listCompleteDataset,
  listCompleteDatasetHistoric,
  listInvalidDefinition,
  listInvalidVisDefinition,
  listMergedDefinition,
  listMergedDefinitionHistoric,

  // scorecard
  scorecardsCompleteDataset,
  scorecardsCompleteBadDataset,
  scorecardsBucketsCompleteDataset,
  scorecardsInvalid,
  scorecardsCompleteNoTsDataset,

  // scorecard-group
  scorecardGroupCompleteDataset,
  scorecardGroupCompleteDatasetInvalid,
  scorecardGroupCompleteDataseNoTs,

  // matrix
  matrixChartAnnuallyDefinition,
  matrixChartAutoBucketedDefinition,
  matrixChartBucketedDefinition,
  matrixChartDefinition,
  matrixChartMonthlyDefinition,
  invalidMatrix,

  // bar
  barChartsDefinition,
  barChartsDefinitionInvalid,
  barChartsDefinitionMerged,

  // doughnut
  doughnutChartsDefinition,

  // line
  lineCompleteDefinition,
  lineDefinitionInvalid,
  lineDefinitionMerged,

  // line-timeseries
  linetimeseriesChartsDefinition,
  linetimeseriesChartsDailyDefinition,
  linetimeseriesChartsMonthlyDefinition,
  linetimeseriesChartsAnnaullyDefinition,
  linetimeseriesInvalidCharts,
  linetimeseriesDefinitionMerged,

  // boxplot
  boxPlotChartsDefinition,

  // mixed
  mixedDefinition,
  mixedDefinitionMerged,
  mixedDefinitionMergedHistoric,
}

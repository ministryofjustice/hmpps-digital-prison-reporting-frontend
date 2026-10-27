// list
import { definition as listDashboardDefinition } from './list/definitions/definition'
import { definition as listDashboardDefinitionHistoric } from './list/definitions/definition-historic'
import { definition as listDashboardDefinitionInvalid } from './list/definitions/definition-invalid'
import { definition as listDashboardDefinitionInvalidVisDefinition } from './list/definitions/definition-invalid-vis-defs'
import { definition as listDashboardDefinitionInvalidMergedDataset } from './list/definitions/definition-merged'
import { definition as listDashboardDefinitionInvalidMergedDatasetHistoric } from './list/definitions/definition-merged-historic'

// scorecard
import { definition as scorecardsDashboardDefinition } from './scorecard/definitions/definition'
import { definition as scorecardsDashboardDefinitionBadDataset } from './scorecard/definitions/definition-bad-data'
import { definition as scorecardsDashboardDefinitionBuckets } from './scorecard/definitions/definition-buckets'
import { definition as scorecardsDashboardDefinitionInvalid } from './scorecard/definitions/definition-invalid'
import { definition as scorecardsDashboardDefinitionNoTs } from './scorecard/definitions/definition-no-ts'

// scorecard-group
import { definition as scorecardGroupDashboardDefinition } from './scorecardGroup/definitions/definition'
import { definition as scorecardGroupDashboardDefinitionInvalid } from './scorecardGroup/definitions/definition-invalid'
import { definition as scorecardGroupDashboardDefinitionNoTs } from './scorecardGroup/definitions/definiton-no-ts'

// Matrix
import {
  definition as matrixChartsDashboardDefinition,
  monthlyDefinition as matrixChartDashboardDefinitionMonthly,
  annuallyDefinition as matrixChartDashboardDefinitionAnnually,
  bucketedDefinition as matrixChartDashboardDefinitionBucketed,
  autoBucketedDefinition as matrixChartDashboardDefinitionAutoBucketed,
} from './matrix/definitions/definition'
import { definition as matrixChartsDashboardDefinitionInvalid } from './matrix/definitions/definition-invalid'

// bar
import { definition as barChartsDashboardDefinition } from './bar/definitions/definition'
import { definition as barChartsDashboardDefinitionInvalid } from './bar/definitions/definition-invalid'
import { definition as barChartsDashboardDefinitionMergedDataset } from './bar/definitions/definition-merged'

// doughnut
import { definition as doughnutChartsDashboardDefinition } from './doughnut/definitions/definition'

// line
import { definition as lineChartsDashboardDefinition } from './line/definitions/definition'
import { definition as lineChartsDashboardDefinitionInvalid } from './line/definitions/definition-invalid'
import { definition as lineChartsDashboardDefinitionMergedDataset } from './line/definitions/definition-merged'

// line-timeseries
import { definition as lineTimeseriesDashboardDefinition } from './line-timeseries/definitions/definition'
import { definition as lineTimeseriesDashboardDefinitionDaily } from './line-timeseries/definitions/definition-granularity-daily'
import { definition as lineTimeseriesDashboardDefinitionMonthly } from './line-timeseries/definitions/defintion-granularity-monthly'
import { definition as lineTimeseriesDashboardDefinitionAnnually } from './line-timeseries/definitions/definition-granularity-yearly'
import { definition as lineTimeseriesDashboardDefinitionInvalidVisDefinitions } from './line-timeseries/definitions/definition-invalid'
import { definition as lineTimeseriesDashboardDefinitionMergedDataset } from './line-timeseries/definitions/definition-merged'

// Boxplot
import { definition as boxPlotChartsDashboardDefinition } from './boxplot/definitions/definition'

// mixed
import { definition as mixedChartsDashboardDefinition } from './mixed/definitions/definition'
import { definition as mixedChartsDashboardDefinitionMergedDataset } from './mixed/definitions/definition-merged'
import { definition as mixedChartsDashboardDefinitionMergedDatasetHistoric } from './mixed/definitions/definition-merged-historic'

export const allVisualisationDefinitions = {
  // list
  listDashboardDefinition,
  listDashboardDefinitionHistoric,
  listDashboardDefinitionInvalid,
  listDashboardDefinitionInvalidVisDefinition,
  listDashboardDefinitionInvalidMergedDataset,
  listDashboardDefinitionInvalidMergedDatasetHistoric,

  // scorecard
  scorecardsDashboardDefinition,
  scorecardsDashboardDefinitionBadDataset,
  scorecardsDashboardDefinitionBuckets,
  scorecardsDashboardDefinitionInvalid,
  scorecardsDashboardDefinitionNoTs,

  // scorecard-group
  scorecardGroupDashboardDefinition,
  scorecardGroupDashboardDefinitionInvalid,
  scorecardGroupDashboardDefinitionNoTs,

  // matrix
  matrixChartDashboardDefinitionAnnually,
  matrixChartDashboardDefinitionAutoBucketed,
  matrixChartDashboardDefinitionBucketed,
  matrixChartsDashboardDefinition,
  matrixChartDashboardDefinitionMonthly,
  matrixChartsDashboardDefinitionInvalid,

  // bar
  barChartsDashboardDefinition,
  barChartsDashboardDefinitionInvalid,
  barChartsDashboardDefinitionMergedDataset,

  // doughnut
  doughnutChartsDashboardDefinition,

  // line
  lineChartsDashboardDefinition,
  lineChartsDashboardDefinitionInvalid,
  lineChartsDashboardDefinitionMergedDataset,

  // line-timeseries
  lineTimeseriesDashboardDefinition,
  lineTimeseriesDashboardDefinitionDaily,
  lineTimeseriesDashboardDefinitionMonthly,
  lineTimeseriesDashboardDefinitionAnnually,
  lineTimeseriesDashboardDefinitionInvalidVisDefinitions,
  lineTimeseriesDashboardDefinitionMergedDataset,

  // boxplot
  boxPlotChartsDashboardDefinition,

  // mixed
  mixedChartsDashboardDefinition,
  mixedChartsDashboardDefinitionMergedDataset,
  mixedChartsDashboardDefinitionMergedDatasetHistoric,
}

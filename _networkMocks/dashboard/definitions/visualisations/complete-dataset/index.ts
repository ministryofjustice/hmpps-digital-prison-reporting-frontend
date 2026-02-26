import { components } from '../../../../../src/dpr/types/api'

// list
import { definition as listCompleteDataset } from './list/definition'
import { definition as listCompleteDatasetHistoric } from './list/definition-historic'
import { definition as listInvalidDefinition } from './list/definition-invalid'
import { definition as listInvalidVisDefinition } from './list/definition-invalid-vis-defs'

// scorecard
import { definition as scorecardsCompleteDataset } from './scorecard/definition'
import { definition as scorecardsBucketsCompleteDataset } from './scorecard/definition-buckets'
import { definition as scorecardGroupCompleteDataset } from './scorecardGroup/definition'

// Matrix
import { definition as matrixChartDefinition } from './matrix/definition'

// bar
import { definition as barChartsDefinition } from './bar/definition'

// doughnut
import { definition as doughnutChartsDefinition } from './doughnut/definition'

// line
import { definition as lineCompleteDefinition } from './line/definition'
import { definition as linetimeseriesChartsDefinition } from './line-timeseries/definition'

// mixed
import { definition as mixedDefinition } from './mixed/definition'

const lists = [listCompleteDataset, listCompleteDatasetHistoric, listInvalidDefinition, listInvalidVisDefinition]
const scorecards = [scorecardsCompleteDataset, scorecardsBucketsCompleteDataset]
const scorecardGroups = [scorecardGroupCompleteDataset]
const matrixDefs = [matrixChartDefinition]
const barChartDefs = [barChartsDefinition]
const doughnutChartDefs = [doughnutChartsDefinition]
const lineDefs = [lineCompleteDefinition]
const lineTimeseriesDefs = [linetimeseriesChartsDefinition]

export const visualisations: components['schemas']['DashboardDefinition'][] = [
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

export const visualisationIds: string[] = visualisations.map((vis) => {
  return vis.id
})

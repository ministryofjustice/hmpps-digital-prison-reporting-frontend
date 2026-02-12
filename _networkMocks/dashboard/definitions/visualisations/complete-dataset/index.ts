import { components } from '../../../../../src/dpr/types/api'
import { definition as listCompleteDataset } from './list/definition'
import { definition as listCompleteDatasetHistoric } from './list/definition-historic'
import { definition as scorecardsCompleteDataset } from './scorecard/definition'
import { definition as scorecardsBucketsCompleteDataset } from './scorecard/definition-buckets'
import { definition as scorecardGroupCompleteDataset } from './scorecardGroup/definition'
import { definition as matrixChartDefinition } from './matrix/definition'
import { definition as barChartsDefinition } from './bar/definition'
import { definition as lineChartsDefinition } from './line/definition'
import { definition as doughnutChartsDefinition } from './doughnut/definition'
import { definition as linetimeseriesChartsDefinition } from './line-timeseries/definition'

const lists = [listCompleteDataset, listCompleteDatasetHistoric]
const scorecards = [scorecardsCompleteDataset, scorecardsBucketsCompleteDataset]
const scorecardGroups = [scorecardGroupCompleteDataset]
const matrixDefs = [matrixChartDefinition]
const barChartDefs = [barChartsDefinition]
const lineChartDefs = [lineChartsDefinition]
const doughnutChartDefs = [doughnutChartsDefinition]
const lineTimeseriesDefs = [linetimeseriesChartsDefinition]

export const visualisations: components['schemas']['DashboardDefinition'][] = [
  ...lists,
  ...scorecards,
  ...scorecardGroups,
  ...matrixDefs,
  ...barChartDefs,
  ...lineChartDefs,
  ...doughnutChartDefs,
  ...lineTimeseriesDefs,
]

export const visualisationIds: string[] = visualisations.map((vis) => {
  return vis.id
})

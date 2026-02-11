import { components } from 'src/dpr/types/api'
import { definition as listCompleteDataset } from './list/definition'
import { definition as listCompleteDatasetHistoric } from './list/definition-historic'
import { definition as scorecardsCompleteDataset } from './scorecard/definition'
import { definition as scorecardsBucketsCompleteDataset } from './scorecard/definition-buckets'
import { definition as scorecardGroupCompleteDataset } from './scorecardGroup/definition'
import { definition as matrix } from './matrix/definition'

const lists = [listCompleteDataset, listCompleteDatasetHistoric]
const scorecards = [scorecardsCompleteDataset, scorecardsBucketsCompleteDataset]
const scorecardGroups = [scorecardGroupCompleteDataset]
const matrixDefs = [matrix]

export const visualisations: components['schemas']['DashboardDefinition'][] = [
  ...lists,
  ...scorecards,
  ...scorecardGroups,
  ...matrixDefs,
]

export const visualisationIds: string[] = visualisations.map((vis) => {
  return vis.id
})

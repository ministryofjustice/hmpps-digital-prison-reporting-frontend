import { definition as list } from './list/definition'
import { definition as listHistoric } from './list/definition-historic'
import { definition as matrix } from './matrix/definition'

export const visualisationIds: string[] = [list, matrix].map((vis) => {
  return vis.id
})

export const historicVisualisationIds: string[] = [listHistoric].map((vis) => {
  return vis.id
})

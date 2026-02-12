import { definition as list } from './list/definition'
import { definition as listHistoric } from './list/definition-historic'
import { definition as matrix } from './matrix/definition'
import { definition as bar } from './bar/definition'
import { definition as linetimeseries } from './line-timeseries/definition'

export const snapshotVisualisations = [list, matrix, bar]
export const historicVisualisations = [listHistoric, linetimeseries]
export const visualisations = [...snapshotVisualisations, ...historicVisualisations]

export const visualisationIds: string[] = snapshotVisualisations.map((vis) => {
  return vis.id
})

export const historicVisualisationIds: string[] = historicVisualisations.map((vis) => {
  return vis.id
})

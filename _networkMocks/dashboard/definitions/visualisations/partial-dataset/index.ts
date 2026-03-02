import { definition as list } from './list/definition'
import { definition as listHistoric } from './list/definition-historic'
import { definition as matrix } from './matrix/definition'
import { definition as bar } from './bar/definition'
import { definition as line } from './line/definition'
import { definition as invalidBar } from './bar/definition-invalid'
import { definition as linetimeseries } from './line-timeseries/definition'
import { definition as mixed } from './mixed/definition'
import { definition as mixedHistoric } from './mixed-historic/definition'

export const snapshotVisualisations = [list, matrix, bar, invalidBar, mixed, line]
export const historicVisualisations = [listHistoric, linetimeseries, mixedHistoric]
export const visualisations = [...snapshotVisualisations, ...historicVisualisations]

export const visualisationIds: string[] = snapshotVisualisations.map((vis) => {
  return vis.id
})

export const historicVisualisationIds: string[] = historicVisualisations.map((vis) => {
  return vis.id
})

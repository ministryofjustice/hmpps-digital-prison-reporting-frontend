import { definition as list } from './list/definition'
import { definition as listHistoric } from './list/definition-historic'
import { definition as matrix } from './matrix/definition'
import { definition as bar } from './bar/definition'
import { definition as line } from './line/definition'
import { definition as doughnut } from './doughnut/definition'
import { definition as linetimeseries } from './line-timeseries/definition'

export const visualisationIds: string[] = [list, matrix, bar, line, doughnut].map((vis) => {
  return vis.id
})

export const historicVisualisationIds: string[] = [listHistoric, linetimeseries].map((vis) => {
  return vis.id
})

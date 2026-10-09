import z from 'zod'
import BoxPlotChartSchemas from './validate'

export type BoxPlotDefinitionType = z.infer<typeof BoxPlotChartSchemas.BoxPlotSchema>
export type BoxPlotDefinitionMeasure = z.infer<typeof BoxPlotChartSchemas.BoxPlotMeasureSchema>
export type BarDefinitionOptions = z.infer<typeof BoxPlotChartSchemas.BoxPlotOptionsSchema>

export interface BoxPlotStats {
  min: number
  q1: number
  median: number
  mean: number
  q3: number
  max: number
}

export interface BoxPlotStatsRow extends BoxPlotStats {
  label: string
  dataset: string
}

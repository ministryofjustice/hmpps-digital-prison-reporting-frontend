import z from 'zod'
import BarChartSchemas from './validate'

export type BarDefinitionType = z.infer<typeof BarChartSchemas.BarSchema>
export type BarDefinitionMeasure = z.infer<typeof BarChartSchemas.BarMeasureShema>
export type BarDefinitionOptions = z.infer<typeof BarChartSchemas.BarOptionsSchema>

import z from 'zod'
import DoughnutChartSchemas from './validate'

export type DoughnutDefinitionType = z.infer<typeof DoughnutChartSchemas.DoughnutSchema>
export type DoughnutDefinitionMeasure = z.infer<typeof DoughnutChartSchemas.DounutMeasureSchema>

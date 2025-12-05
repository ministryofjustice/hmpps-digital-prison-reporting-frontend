import z from 'zod'
import LineChartSchemas from './validate'

export type LineDefinitionType = z.infer<typeof LineChartSchemas.LineSchema>
export type LineDefinitionMeasure = z.infer<typeof LineChartSchemas.LineMeasureSchema>

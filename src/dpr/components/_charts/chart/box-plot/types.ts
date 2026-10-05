import z from 'zod'
import BoxPlotChartSchemas from './validate'

export type BoxPlotDefinitionType = z.infer<typeof BoxPlotChartSchemas.BoxPlotSchema>
export type BoxPlotDefinitionMeasure = z.infer<typeof BoxPlotChartSchemas.BoxPlotMeasureSchema>

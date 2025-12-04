import z from 'zod'
import LineTimeseriesChartSchemas from './validate'

export type LineTimeseriesDefinitionType = z.infer<typeof LineTimeseriesChartSchemas.LineTimeseriesSchema>
export type LineTimeseriesDefinitionMeasure = z.infer<typeof LineTimeseriesChartSchemas.LineTimeseriesMeasureSchema>

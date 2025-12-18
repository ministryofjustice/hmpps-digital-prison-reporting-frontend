import z from 'zod'
import BarTimeseriesChartSchemas from './validate'

export type BarTimeseriesDefinitionType = z.infer<typeof BarTimeseriesChartSchemas.BarTimeseriesSchema>
export type BarTimeseriesDefinitionMeasure = z.infer<typeof BarTimeseriesChartSchemas.BarTimeseriesMeasureSchema>

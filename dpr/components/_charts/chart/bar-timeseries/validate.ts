import { z } from 'zod'
import { DashboardVisualisationSchema, DashboardColumns } from '../../../_dashboards/dashboard-visualisation/Validate'

const BarTimeseriesMeasureSchema = z.object({
  id: z.string(),
  display: z.string().optional(),
  unit: z.enum(['NUMBER', 'PERCENTAGE']).optional(),
})

const BarTimeseriesOptions = z.object({
  showLatest: z.literal(false),
})

const BarTimeseriesSchema = z.object({
  ...DashboardVisualisationSchema.shape,
  display: z.string(),
  type: z.literal('bar-timeseries'),
  options: z.object(BarTimeseriesOptions.shape).optional(),
  columns: z.object({
    ...DashboardColumns.shape,
    measures: z.array(BarTimeseriesMeasureSchema).min(1, 'Measure must contain at least one item'),
  }),
})

const BarTimeseriesChartSchemas = {
  BarTimeseriesMeasureSchema,
  BarTimeseriesSchema,
}

export default BarTimeseriesChartSchemas

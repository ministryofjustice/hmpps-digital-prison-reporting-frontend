import { z } from 'zod'
import { DashboardVisualisationSchema, DashboardColumns } from '../../../_dashboards/dashboard-visualisation/Validate'

const LineTimeseriesMeasureSchema = z.object({
  id: z.string(),
  display: z.string().optional(),
  unit: z.enum(['NUMBER', 'PERCENTAGE']).optional(),
})

const LineTimeseriesOptions = z.object({
  showLatest: z.literal(false),
})

const LineTimeseriesSchema = z.object({
  ...DashboardVisualisationSchema.shape,
  display: z.string(),
  type: z.literal('line-timeseries'),
  options: z.object(LineTimeseriesOptions.shape).optional(),
  columns: z.object({
    ...DashboardColumns.shape,
    measures: z.array(LineTimeseriesMeasureSchema).min(1, 'Measure must contain at least one item'),
  }),
})

const LineTimeseriesChartSchemas = {
  LineTimeseriesMeasureSchema,
  LineTimeseriesSchema,
}

export default LineTimeseriesChartSchemas

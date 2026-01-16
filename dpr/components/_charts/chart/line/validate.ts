import { z } from 'zod'
import { DashboardVisualisationSchema, DashboardColumns } from '../../../_dashboards/dashboard-visualisation/Validate'

const LineMeasureSchema = z.object({
  id: z.string(),
  display: z.string().optional(),
  unit: z.enum(['NUMBER', 'PERCENTAGE']).optional(),
})

const lineOptions = z.object({
  showLatest: z.boolean().default(true),
})

const LineSchema = z.object({
  ...DashboardVisualisationSchema.shape,
  display: z.string(),
  type: z.literal('line'),
  options: z.object(lineOptions.shape).optional(),
  columns: z.object({
    ...DashboardColumns.shape,
    measures: z.array(LineMeasureSchema).min(1, 'Measure must contain at least one item'),
  }),
})

const LineChartSchemas = {
  LineMeasureSchema,
  LineSchema,
}

export default LineChartSchemas

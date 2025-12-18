import { z } from 'zod'
import { DashboardVisualisationSchema, DashboardColumns } from '../../../_dashboards/dashboard-visualisation/Validate'

const DounutMeasureSchema = z.object({
  id: z.string(),
  display: z.string().optional(),
  unit: z.enum(['NUMBER', 'PERCENTAGE']).optional(),
})

const DonutOptions = z.object({
  showLatest: z.boolean().default(true),
})

const DoughnutSchema = z.object({
  ...DashboardVisualisationSchema.shape,
  type: z.literal('doughnut'),
  display: z.string(),
  options: z.object(DonutOptions.shape).optional(),
  columns: z.object({
    ...DashboardColumns.shape,
    measures: z.array(DounutMeasureSchema).min(2, 'Measure must contain 2 items'),
  }),
})

const DoughnutChartSchemas = {
  DoughnutSchema,
  DounutMeasureSchema,
}

export default DoughnutChartSchemas

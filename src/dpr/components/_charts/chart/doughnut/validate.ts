import { z } from 'zod'
import {
  DashboardVisualisationSchema,
  DashboardColumns,
  UnitType,
} from '../../../_dashboards/dashboard-visualisation/Validate'

const DoughnutMeasureSchema = z.object({
  id: z.string(),
  display: z.string().optional(),
  unit: z.enum(UnitType).optional(),
  type: z.string().optional(),
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
    measures: z.array(DoughnutMeasureSchema).min(2, 'Measure must contain 2 items'),
  }),
})

const DoughnutChartSchemas = {
  DoughnutSchema,
  DoughnutMeasureSchema,
}

export default DoughnutChartSchemas

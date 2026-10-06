import { z } from 'zod'
import {
  DashboardVisualisationSchema,
  DashboardColumns,
  UnitType,
} from '../../../_dashboards/dashboard-visualisation/Validate'

const BoxPlotMeasureSchema = z.object({
  id: z.string(),
  display: z.string().optional(),
  unit: z.enum(UnitType).optional(),
  type: z.string().optional(),
})

const BoxPlotOptions = z.object({
  showLatest: z.boolean().default(true),
})

const BoxPlotSchema = z.object({
  ...DashboardVisualisationSchema.shape,
  type: z.literal('boxplot'),
  display: z.string(),
  options: z.object(BoxPlotOptions.shape).optional(),
  columns: z.object({
    ...DashboardColumns.shape,
  }),
})

const BoxPlotChartSchemas = {
  BoxPlotSchema,
  BoxPlotMeasureSchema,
}

export default BoxPlotChartSchemas

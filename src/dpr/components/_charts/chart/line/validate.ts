import { z } from 'zod'
import { DashboardVisualisationSchema, DashboardColumns } from '../../../_dashboards/dashboard-visualisation/Validate'
import BarChartSchemas from '../bar/validate'

const LineMeasureSchema = BarChartSchemas.BarMeasureShema

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
    measures: BarChartSchemas.BarMeasuresSchema,
  }),
})

const LineChartSchemas = {
  LineMeasureSchema,
  LineSchema,
}

export default LineChartSchemas

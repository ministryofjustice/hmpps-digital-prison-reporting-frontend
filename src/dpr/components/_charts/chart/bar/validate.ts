import { z } from 'zod'
import { DashboardVisualisationSchema, DashboardColumns } from '../../../_dashboards/dashboard-visualisation/Validate'

const BarMeasureShema = z.object({
  id: z.string(),
  display: z.string().optional(),
  unit: z.enum(['NUMBER', 'PERCENTAGE']).optional(),
  axis: z.enum(['x', 'y']).optional(),
})

const BarOptionsSchema = z.object({
  showLatest: z.boolean().default(true),
  horizontal: z.boolean().default(false),
  xStacked: z.boolean().default(false),
  yStacked: z.boolean().default(false),
})

const BarSchema = z.object({
  ...DashboardVisualisationSchema.shape,
  type: z.literal('bar'),
  display: z.string(),
  options: z.object(BarOptionsSchema.shape).optional(),
  columns: z.object({
    ...DashboardColumns.shape,
    measures: z
      .array(BarMeasureShema)
      .refine(
        (measures) => {
          const xAxis = measures.find((m) => m.axis === 'x')
          const yAxis = measures.find((m) => m.axis === 'y')

          let valid = true
          if ((xAxis !== undefined && !yAxis) || (yAxis !== undefined && !xAxis)) {
            valid = false
          }
          return valid
        },
        { error: 'X and Y axis must be defined in measure' },
      )
      .refine(
        (measures) => {
          const xAxis = measures.find((m) => m.axis === 'x')
          const yAxis = measures.find((m) => m.axis === 'y')
          let valid = true
          if (xAxis !== undefined && yAxis !== undefined && measures.length > 2) valid = false
          return valid
        },
        { error: 'Measure must contain only 2 items when axis is specified' },
      ),
  }),
})

const BarChartSchemas = {
  BarSchema,
  BarMeasureShema,
  BarOptionsSchema,
}

export default BarChartSchemas

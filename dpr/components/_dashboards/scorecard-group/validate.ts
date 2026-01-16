import { z } from 'zod'
import {
  DashboardVisualisationSchema,
  DashboardColumns,
  BucketOptionsSchema,
} from '../dashboard-visualisation/Validate'

const ScorecardGroupColumn = z.object({
  id: z.string(),
  display: z.string().optional(),
  displayValue: z.boolean().optional(),
  unit: z.enum(['NUMBER', 'PERCENTAGE']).optional(),
})

const ScorecardGroupSchema = z.object({
  ...DashboardVisualisationSchema.shape,
  type: z.literal('scorecard-group'),
  options: z.object(BucketOptionsSchema.shape).optional(),
  columns: z.object({
    ...DashboardColumns.shape,
    measures: z
      .array(ScorecardGroupColumn)
      .min(2, 'Measure must contain two or more items')
      .refine(
        (measures) => {
          const displayValue = measures.find((m) => m.displayValue !== undefined)
          return displayValue ? measures.length === 2 : true
        },
        { error: 'Measure must have length 2 when displayValue is defined' },
      ),
  }),
})

export default {
  ScorecardGroupSchema,
  ScorecardGroupColumn,
}

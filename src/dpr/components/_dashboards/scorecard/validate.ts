import { z } from 'zod'
import {
  DashboardVisualisationSchema,
  DashboardColumns,
  BucketOptionsSchema,
} from '../dashboard-visualisation/Validate'

const scorecardKey = z.object({
  id: z.string(),
  optional: z.boolean().default(false),
})

const scorecardMeasure = z.object({
  id: z.string(),
  unit: z.enum(['NUMBER', 'PERCENTAGE']).optional(),
})

const ScorecardMeasuresSchema = z.array(scorecardMeasure).length(1, 'Measure must contain a single item')

const ScorecardSchema = z.object({
  ...DashboardVisualisationSchema.shape,
  type: z.literal('scorecard'),
  display: z.string(),
  description: z.undefined(),
  options: z.object(BucketOptionsSchema.shape).optional(),
  columns: z.object({
    ...DashboardColumns.shape,
    keys: z.array(scorecardKey).min(1),
    measures: ScorecardMeasuresSchema,
  }),
})

export default {
  ScorecardSchema,
  ScorecardMeasuresSchema,
}

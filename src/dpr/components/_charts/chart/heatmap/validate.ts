import { z } from 'zod'
import {
  DashboardVisualisationSchema,
  DashboardColumns,
  DashboardVisualisationMeasureSchema,
  BucketOptionsSchema,
} from '../../../_dashboards/dashboard-visualisation/Validate'

const matrixKeys = z.object({
  id: z.string(),
  optional: z.boolean().default(false),
})

const MatrixTimeseriesSchema = z.object({
  ...DashboardVisualisationSchema.shape,
  type: z.literal('matrix-timeseries'),
  options: z.object(BucketOptionsSchema.shape).optional(),
  columns: z.object({
    ...DashboardColumns.shape,
    keys: z.array(matrixKeys).min(1, 'Key array cannot be empty').optional(),
    measures: z.array(DashboardVisualisationMeasureSchema).length(2, 'Measure must contain a single item'),
  }),
})

export default MatrixTimeseriesSchema

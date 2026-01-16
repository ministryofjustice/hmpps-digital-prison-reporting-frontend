import { z } from 'zod'

const dashboardBucket = z.object({
  min: z.number().optional(),
  max: z.number().optional(),
  hexColour: z.string().regex(/^#/).optional(),
})

export const BucketOptionsSchema = z.object({
  useRagColour: z.boolean().default(false),
  buckets: z.array(dashboardBucket).default([]),
  baseColour: z.string().regex(/^#/).optional(),
})

export default BucketOptionsSchema

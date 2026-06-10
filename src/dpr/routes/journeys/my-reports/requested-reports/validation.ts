import { z } from 'zod'
import { normalizeStoredReportData, ParamsConfigSchema, StoredReportDataObjectSchema } from '../validation'

export const RequestedReportSchema = StoredReportDataObjectSchema.extend({
  errorMessage: z.string().optional(),
  filters: ParamsConfigSchema.optional(),
  sortBy: ParamsConfigSchema.optional(),
})
  .transform(normalizeStoredReportData)
  .refine(data => data.name.length > 0, 'name or variantName must exist')

export const RequestedDashboardSchema = StoredReportDataObjectSchema.extend({
  metrics: z.array(
    z.object({
      name: z.string(),
    }),
  ),
})
  .transform(normalizeStoredReportData)
  .refine(data => data.name.length > 0, 'name or variantName must exist')

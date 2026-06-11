import { z } from 'zod'
import { normalizeStoredReportData, ParamsConfigSchema, StoredReportDataObjectSchema } from '../validation'

// REPORT
export const RequestedReportSchema = StoredReportDataObjectSchema.extend({
  errorMessage: z.string().optional(),
  filters: ParamsConfigSchema.optional(),
  sortBy: ParamsConfigSchema.optional(),
}).transform(data => {
  const normalized = normalizeStoredReportData(data)

  if (!normalized.name || normalized.name.length === 0) {
    throw new Error('name or variantName must exist')
  }

  return normalized as typeof normalized & { name: string }
})

// DASHBOARD
export const RequestedDashboardSchema = StoredReportDataObjectSchema.extend({
  metrics: z.array(
    z.object({
      name: z.string(),
    }),
  ),
}).transform(data => {
  const normalized = normalizeStoredReportData(data)

  if (!normalized.name || normalized.name.length === 0) {
    throw new Error('name or variantName must exist')
  }

  return normalized
})

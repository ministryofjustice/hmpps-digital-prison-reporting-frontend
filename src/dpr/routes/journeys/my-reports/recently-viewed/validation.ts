import { normalizeStoredReportData, StoredReportDataObjectSchema } from '../validation'

export const ViewedReportSchema = StoredReportDataObjectSchema.transform(data => {
  const normalized = normalizeStoredReportData(data)

  if (!normalized.name || normalized.name.length === 0) {
    throw new Error('name or variantName must exist')
  }

  return normalized as typeof normalized & { name: string }
})

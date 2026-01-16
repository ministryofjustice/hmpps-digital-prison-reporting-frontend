import z from 'zod'

export const schema = z.object({
  reportId: z.string().trim().min(1, 'Report ID should exist'),
  variantId: z.string().trim().min(1, 'Report variant ID should exist'),
  'more-detail': z.string().trim().min(1, 'Please fill out the reason for needing the report'),
})

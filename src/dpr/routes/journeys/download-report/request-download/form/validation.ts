import z from 'zod'

export const schema = z.object({
  reportId: z.string().trim().min(1, 'Report ID should exist'),
  variantId: z.string().trim().min(1, 'Report variant ID should exist'),
  role: z.preprocess((v) => v ?? '', z.string().trim().min(1, 'Please enter your job title')),
  'more-detail': z.preprocess(
    (v) => v ?? '',
    z.string().trim().min(1, 'Please provide information on how you will use this data'),
  ),
})

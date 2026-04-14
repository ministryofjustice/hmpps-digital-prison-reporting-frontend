import z from 'zod'

const requiredText = (message: string) => {
  return z
    .string()
    .optional()
    .transform((v) => v ?? '')
    .refine((v) => v.trim().length > 0, { message })
}

export const schema = z.object({
  reportId: z.string().trim().min(1, 'Report ID should exist'),
  variantId: z.string().trim().min(1, 'Report variant ID should exist'),
  role: requiredText('Please enter your job title'),
  'more-detail': requiredText('Please provide information on how you will use this data'),
})

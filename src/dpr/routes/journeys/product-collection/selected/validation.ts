import z from 'zod'

export const schema = z.object({
  productCollection: z.string().trim().min(1, 'Product Collection ID should exist'),
})

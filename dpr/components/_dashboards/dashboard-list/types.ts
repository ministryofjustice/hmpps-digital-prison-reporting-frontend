import z from 'zod'
import ListSchema from './validate'

export type ListDefinitionType = z.infer<typeof ListSchema.ListSchema>

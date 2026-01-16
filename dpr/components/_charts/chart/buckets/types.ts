import z from 'zod'
import BucketOptionsSchema from './validate'

export type BucketOptionsDefinition = z.infer<typeof BucketOptionsSchema>

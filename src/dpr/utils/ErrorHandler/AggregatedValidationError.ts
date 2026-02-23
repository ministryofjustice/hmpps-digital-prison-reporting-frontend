import { ZodError } from 'zod'

export class AggregatedValidationError extends Error {
  readonly zod: ZodError

  readonly details: Array<{
    index: number
    type: string
    id: unknown
    issues: ZodError['issues']
  }>

  constructor(message: string, zod: ZodError, details: AggregatedValidationError['details']) {
    super(message)
    this.name = 'AggregatedValidationError'
    this.zod = zod
    this.details = details
  }
}

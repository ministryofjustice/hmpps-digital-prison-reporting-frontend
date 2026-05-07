import { ZodError } from 'zod'
import type { ResponseError } from 'superagent'
import logger from '../logger'
import { AggregatedValidationError } from './AggregatedValidationError'

export interface DprErrorMessage {
  userMessage?: string | string[]
  developerMessage?: string | string[]
  stack?: string
  moreInfo?: string
  status?: number | string
}

interface ErrorPayload {
  userMessage?: string
  developerMessage?: string
  moreInfo?: string
}

class ErrorHandler {
  constructor(private readonly error: unknown) {
    logger.error(`Error: ${JSON.stringify(error)}`)
  }

  formatError(): DprErrorMessage {
    return this.handleError()
  }

  private handleError(): DprErrorMessage {
    const err = this.error

    console.log(`
      ########## DprErrorMessage`)
    console.log(JSON.stringify({ err }, null, 2))

    // 1. Zod
    if (err instanceof ZodError) {
      const issues = err.issues.map((i) => i.message).join('. ')
      return {
        status: 500,
        userMessage: `Schema validation error: ${issues}`,
      }
    }

    // 2. AggregatedValidationError
    if (err instanceof AggregatedValidationError) {
      return {
        status: 500,
        userMessage: [
          err.message,
          ...err.details.map((detail) => {
            const issues = detail.issues.map((i) => i.message).join('. ')
            let prefix = ''
            if (detail.type) prefix += `Type: '${detail.type}'. `
            if (detail.id) prefix += `ID: '${detail.id}'. `
            return `${prefix}Issues: ${issues}`
          }),
        ],
      }
    }

    // 3. SuperAgent / WireMock
    if (this.isSuperAgentError(err)) {
      const status = typeof err.status === 'number' ? err.status : 500

      // 1. Prefer response.body if present
      let payload: unknown = err.response?.body

      // 2. Otherwise try to parse text as JSON
      if (payload === undefined) {
        payload = this.tryParseJson(err.text)
      }

      // 3. If we now have a structured error payload
      if (this.isErrorPayload(payload)) {
        const { userMessage, developerMessage, moreInfo } = payload
        return {
          status,
          ...(userMessage !== undefined && { userMessage }),
          ...(developerMessage !== undefined && { developerMessage }),
          ...(moreInfo !== undefined && { moreInfo }),
        }
      }

      // 4. Transport-level fallback
      return {
        status,
        userMessage: err.message,
      }
    }
    // 4. Plain JS Error
    if (typeof err === 'object' && err !== null && 'message' in err) {
      return {
        status: 500,
        userMessage: String((err as any).message),
      }
    }

    // 5. Unknown
    return {
      status: 500,
      developerMessage: 'Unknown error',
    }
  }

  private isSuperAgentError(error: unknown): error is ResponseError {
    return (
      typeof error === 'object' &&
      error !== null &&
      typeof (error as any).message === 'string' &&
      (typeof (error as any).status === 'number' ||
        typeof (error as any).text !== 'undefined' ||
        typeof (error as any).response === 'object')
    )
  }

  private isErrorPayload(value: unknown): value is ErrorPayload {
    return (
      typeof value === 'object' &&
      value !== null &&
      ('userMessage' in value || 'developerMessage' in value || 'moreInfo' in value)
    )
  }

  private tryParseJson(value: unknown): unknown | undefined {
    if (typeof value !== 'string') return undefined

    try {
      return JSON.parse(value)
    } catch {
      return undefined
    }
  }
}

export { ErrorHandler }
export default ErrorHandler

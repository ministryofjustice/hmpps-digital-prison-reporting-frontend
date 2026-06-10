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
  status?: number
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

    // 1. Zod
    if (err instanceof ZodError) {
      const issues = err.issues.map(i => i.message).join('. ')
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
          ...err.details.map(detail => {
            const issues = detail.issues.map(i => i.message).join('. ')
            let prefix = ''
            if (detail.type) prefix += `Type: '${detail.type}'. `
            if (detail.id) prefix += `ID: '${detail.id}'. `
            return `${prefix}Issues: ${issues}`
          }),
        ],
      }
    }

    // 3. SuperAgent / HTTP errors
    if (this.isSuperAgentError(err)) {
      const transportStatus = typeof err.status === 'number' ? err.status : (err.response?.status ?? 500)

      // 1. Prefer response.body if present
      let payload: unknown = err.response?.body

      // 2. Otherwise try to parse text as JSON
      if (payload === undefined && 'text' in err) {
        payload = this.tryParseJson((err as { text: string }).text)
      }

      // 3. Extract actual payload (handles nested `data`)
      const extracted = this.extractPayload(payload)

      if (extracted) {
        const { userMessage, developerMessage, moreInfo, status } = extracted

        return {
          status: status ?? transportStatus,
          ...(userMessage !== undefined && { userMessage }),
          ...(developerMessage !== undefined && { developerMessage }),
          ...(moreInfo !== undefined && { moreInfo }),
        }
      }

      // 4. Transport-level fallback
      return {
        status: transportStatus,
        userMessage: err.message,
      }
    }

    // 4. Generic JS error
    if (
      typeof err === 'object' &&
      err !== null &&
      'message' in err &&
      typeof (err as { message: unknown }).message === 'string'
    ) {
      return {
        status: 500,
        userMessage: (err as { message: string }).message,
      }
    }

    // 5. Unknown
    return {
      status: 500,
      developerMessage: 'Unknown error',
    }
  }

  /**
   * Extracts error payload from:
   * - direct payload
   * - nested payload.data
   */
  private extractPayload(payload: unknown): ErrorPayload | undefined {
    if (this.isErrorPayload(payload)) return payload

    if (typeof payload === 'object' && payload !== null && 'data' in payload) {
      const maybeData = (payload as { data?: unknown }).data

      if (this.isErrorPayload(maybeData)) {
        return maybeData
      }
    }

    return undefined
  }

  private isSuperAgentError(error: unknown): error is ResponseError {
    if (typeof error !== 'object' || error === null) return false

    const e = error as Record<string, unknown>

    return (
      typeof e['message'] === 'string' &&
      (typeof e['status'] === 'number' || typeof e['text'] !== 'undefined' || typeof e['response'] === 'object')
    )
  }

  private isErrorPayload(value: unknown): value is ErrorPayload {
    return (
      typeof value === 'object' &&
      value !== null &&
      ('userMessage' in value || 'developerMessage' in value || 'moreInfo' in value || 'status' in value)
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

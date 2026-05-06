import { ZodError } from 'zod'
import { components } from '../../types/api'
import logger from '../logger'
import { AggregatedValidationError } from './AggregatedValidationError'

export interface DprErrorMessage {
  userMessage?: string | string[] | undefined
  developerMessage?: string | string[] | undefined
  stack?: string
  moreInfo?: string | undefined
  status?: string | number
}

interface DprErrorData {
  data: components['schemas']['ErrorResponse']
}

class ErrorHandler {
  error: Error | components['schemas']['ErrorResponse'] | string | undefined | unknown | DprErrorData

  developerMessage?: string | undefined

  userMessage?: string | string[] | undefined

  moreInfo?: string | undefined

  stack?: string | undefined

  status?: number | string | undefined

  constructor(error: Error | components['schemas']['ErrorResponse'] | string | undefined | unknown) {
    this.error = error
    logger.error(`Error: ${JSON.stringify(error)}`)
  }

  formatError = (): DprErrorMessage => {
    return this.handleError()
  }

  private handleError = (): DprErrorMessage => {
    // Zod error
    if (this.error instanceof ZodError) {
      const issues = this.error.issues
        .map((issue) => {
          return issue.message
        })
        .join('. ')
      this.userMessage = `Schema validation error: ${issues}`
      this.status = 500
    }

    // AggregatedValidationError
    else if (this.error instanceof AggregatedValidationError) {
      this.userMessage = [
        this.error.message,
        ...this.error.details.map((detail) => {
          const issues = detail.issues
            .map((issue) => {
              return issue.message
            })
            .join('. ')
          let message = ''
          if (detail.type) message = `Type: '${detail.type}'. `
          if (detail.id) message += `ID: '${detail.id}'. `
          return `${message}Issues: ${issues}`
        }),
      ]

      this.status = 500
    }

    // status: FAILED
    else if (typeof this.error === 'string') {
      this.developerMessage = this.error
    }

    // Error response
    else if ((<DprErrorData>this.error).data) {
      const error = (<DprErrorData>this.error).data
      this.developerMessage = error.developerMessage
      this.userMessage = error.userMessage
      this.moreInfo = error.moreInfo
      this.status = error.status
    }

    // client side error
    else if (Object.prototype.hasOwnProperty.call(this.error, 'message')) {
      const error = <Error>this.error
      this.userMessage = error.message
      this.stack = error.stack
      this.status = 500
    }

    // Server response error
    else if (Object.prototype.hasOwnProperty.call(this.error, 'developerMessage')) {
      const error = <components['schemas']['ErrorResponse']>this.error
      this.developerMessage = error.developerMessage
      this.userMessage = error.userMessage
      this.moreInfo = error.moreInfo
      this.status = error.status
    }

    const formattedError = {
      ...(this.developerMessage && { developerMessage: this.developerMessage }),
      ...(this.userMessage && { userMessage: this.userMessage }),
      ...(this.moreInfo && { moreInfo: this.moreInfo }),
      ...(this.stack && { stack: this.stack }),
      ...(this.status && { status: this.status }),
    }

    logger.error(JSON.stringify(formattedError, null, 2))

    return formattedError
  }
}

export { ErrorHandler }
export default ErrorHandler

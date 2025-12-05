import { components } from '../types/api'
import logger from './logger'

interface DprErrorMessage {
  userMessage?: string
  developerMessage?: string
  stack?: string
  moreInfo?: string
  status?: string | number
}

interface DprErrorData {
  data: components['schemas']['ErrorResponse']
}

interface ZodValidationError {
  userMessage: string
  stack: string
}

class ErrorHandler {
  error: Error | components['schemas']['ErrorResponse'] | string | undefined | unknown | DprErrorData

  developerMessage?: string | undefined

  userMessage?: string | undefined

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
    // status: FAILED
    if (typeof this.error === 'string') {
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

    // Zod error
    else if (Object.prototype.hasOwnProperty.call(this.error, 'userMessage')) {
      const error = <ZodValidationError>this.error
      if (error.stack && error.stack.includes('ZodError')) {
        const errorArr: { message: string }[] = JSON.parse(error.userMessage)
        this.userMessage = errorArr.map((m) => m.message).join(', ')
        this.status = 500
        this.stack = error.stack
      }
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

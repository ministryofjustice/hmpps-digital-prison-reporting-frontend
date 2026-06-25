import { captureException } from '@sentry/node'
import logger from './logger'

export enum LoggerErrorType {
  INFO = 'info',
  DEBUG = 'debug',
  ERROR = 'error',
  WARN = 'warn',
}

export const captureDprError = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  message?: string | undefined,
  type: LoggerErrorType = LoggerErrorType.ERROR,
) => {
  // Log the error to our logs
  logger[type](message, error)

  if (type === LoggerErrorType.ERROR) {
    // Capture in sentry
    captureException(error)
  }
}

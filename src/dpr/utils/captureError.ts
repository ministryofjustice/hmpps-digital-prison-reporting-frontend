import * as Sentry from '@sentry/node'
import logger from './logger'

export enum LoggerErrorType {
  INFO = 'info',
  DEBUG = 'debug',
  ERROR = 'error',
  WARN = 'warn',
}

export const captureDprError = (
  error: unknown,
  message?: string | undefined,
  meta: Record<string, string | string[]> = {},
  type: LoggerErrorType = LoggerErrorType.ERROR,
) => {
  const stringMeta = Object.keys(meta).length > 0 ? JSON.stringify(meta) : ''

  // Log the error to our logs
  logger[type]([message, stringMeta].filter(Boolean).join(' '), error)

  if (type === LoggerErrorType.ERROR) {
    const extras = message ? { message, ...meta } : meta

    // Capture in sentry
    Sentry.withScope(scope => {
      scope.setExtras(extras)
      Sentry.captureException(error)
    })
  }
}

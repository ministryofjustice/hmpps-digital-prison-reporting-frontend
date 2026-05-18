import { captureException } from '@sentry/node'
import logger from './logger'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const captureDprError = (error: any, message?: string | undefined) => {
  // Log the error to our logs
  logger.error(message, error)

  // Capture in sentry
  captureException(error)
}

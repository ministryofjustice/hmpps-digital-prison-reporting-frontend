import { RequestHandler } from 'express'
import { initReportStoreServices } from '../utils/ReportStoreServiceUtils'
import { Services } from '../types/Services'
import logger from '../utils/logger'

export default function setUpReportStore(services: Services): RequestHandler {
  return async (req, res, next) => {
    try {
      await initReportStoreServices(res.locals.user.uuid, services)
      return next()
    } catch (error) {
      logger.error(
        error,
        `Failed to initialise report store services for : ${res.locals.user && res.locals.user.username}`,
      )
      return next(error)
    }
  }
}

import { ErrorRequestHandler, RequestHandler } from 'express'
import ErrorHandler from '../../../utils/ErrorHandler'
import { Services } from '../../../types/Services'
import logger from '../../../utils/logger'
import { captureException } from '@sentry/node'

class ViewReportController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  errorHandler: ErrorRequestHandler = async (error, req, res, _next) => {
    logger.error(`Error: ${JSON.stringify(req.body)}`)
    const formattedErr = new ErrorHandler(error || {}).formatError()

    captureException(error)

    res.render(`dpr/routes/journeys/view-report/error`, {
      layoutPath: this.layoutPath,
      ...(req.body && { ...req.body }),
      ...req.params,
      error: formattedErr,
      params: req.params,
    })
  }
}

export { ViewReportController }
export default ViewReportController

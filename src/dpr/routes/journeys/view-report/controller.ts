import { RequestHandler } from 'express'
import { Services } from '../../../types/Services'
import logger from '../../../utils/logger'

export default class ViewReportController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  errorHandler: RequestHandler = async (req, res, next) => {
    logger.error(`Error: ${JSON.stringify(req.body)}`)

    res.render(`dpr/routes/journeys/view-report/error`, {
      layoutPath: this.layoutPath,
      ...req.body,
      ...req.params,
      error: req.body.error,
      params: req.params,
    })
  }
}

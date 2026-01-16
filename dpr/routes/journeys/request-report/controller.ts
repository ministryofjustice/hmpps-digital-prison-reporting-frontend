import { ErrorRequestHandler, RequestHandler } from 'express'
import { Services } from '../../../types/Services'
import AsyncRequestUtils from './filters/utils'
import ErrorHandler from '../../../utils/ErrorHandler'

class RequestReportController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  errorHandler: ErrorRequestHandler = async (_error, req, res, _next) => {
    res.render(`dpr/routes/journeys/view-report/error`, {
      layoutPath: this.layoutPath,
      ...(req.body && { ...req.body }),
      ...req.params,
      error: req.body?.error,
      params: req?.params,
    })
  }

  CANCEL: RequestHandler = async (req, res, _next) => {
    try {
      await AsyncRequestUtils.cancelRequest({
        req,
        res,
        services: this.services,
      })
    } catch (error) {
      req.body ??= {}
      req.body.title = 'Failed to abort request'
      req.body.errorDescription = 'We were unable to abort the report request for the following reason:'
      req.body.error = new ErrorHandler(error).formatError()

      req.flash('ERROR_BODY', JSON.stringify(req.body))
      req.flash('ERROR_PARAMS', JSON.stringify(req.params))
      req.flash('ERROR', JSON.stringify(req.body?.error || {}))

      return res.redirect(`${req.originalUrl}/failed`)
    }
    return res.redirect(req.originalUrl.replace('/cancel', '/status'))
  }
}

export { RequestReportController }
export default RequestReportController

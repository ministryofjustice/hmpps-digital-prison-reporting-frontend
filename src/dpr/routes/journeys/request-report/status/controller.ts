import { RequestHandler } from 'express'
import { Services } from '../../../../types/Services'
import AsyncPollingUtils from './utils'
import AsyncRequestUtils from '../filters/utils'
import AsyncRequestListUtils from '../../../../components/user-reports/requested/utils'
import ErrorSummaryUtils from '../../../../components/error-summary/utils'

export default class RequestStatusController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  // Render status page
  GET: RequestHandler = async (req, res, next) => {
    try {
      const pollingRenderData = await AsyncPollingUtils.renderPolling({
        req,
        res,
        services: this.services,
        next,
      })
      res.render(`dpr/views/async-polling`, {
        layoutPath: this.layoutPath,
        ...pollingRenderData,
      })
    } catch (error) {
      req.body.title = 'Failed to retrieve report status'
      req.body.errorDescription = 'We were unable to retrieve the report status:'
      req.body.error = ErrorSummaryUtils.handleError(error)
      next()
    }
  }

  // Poll request status
  POST: RequestHandler = async (req, res, next) => {
    try {
      const response = await AsyncRequestListUtils.getRequestStatus({ req, res, services: this.services })
      res.send({ status: response.status })
    } catch (error) {
      res.send({ status: 'FAILED' })
    }
  }

  // TODO: convert this, and the fetch method from a post to a delete
  // Cant do this until we switch over old async routes to new routes
  cancelRequest: RequestHandler = async (req, res, next) => {
    try {
      await AsyncRequestUtils.cancelRequest({
        req,
        res,
        services: this.services,
      })
      res.end()
    } catch (error) {
      req.body.title = 'Failed to abort request'
      req.body.errorDescription = 'We were unable to abort the report request for the following reason:'
      req.body.error = ErrorSummaryUtils.handleError(error)
      next()
    }
  }
}

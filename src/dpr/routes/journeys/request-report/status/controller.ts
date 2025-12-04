import { RequestHandler } from 'express'
import { Services } from '../../../../types/Services'
import AsyncPollingUtils from './utils'
import AsyncRequestListUtils from '../../../../components/user-reports/requested/utils'
import ErrorHandler from '../../../../utils/ErrorHandler'

class RequestStatusController {
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
      res.render(`dpr/routes/journeys/request-report/status/view`, {
        layoutPath: this.layoutPath,
        ...pollingRenderData,
      })
    } catch (error) {
      req.body.title = 'Failed to retrieve report status'
      req.body.errorDescription = 'We were unable to retrieve the report status:'
      req.body.error = new ErrorHandler(error).formatError()
      next()
    }
  }

  // Poll request status
  POST: RequestHandler = async (req, res, _next) => {
    try {
      const response = await AsyncRequestListUtils.getRequestStatus({ req, res, services: this.services })
      res.send({ status: response.status })
    } catch (error) {
      res.send({ status: 'FAILED' })
    }
  }
}

export { RequestStatusController }
export default RequestStatusController

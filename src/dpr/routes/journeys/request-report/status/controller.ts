import { RequestHandler } from 'express'
import { captureException } from '@sentry/node'
import { Services } from '../../../../types/Services'
import AsyncPollingUtils from './utils'
import AsyncRequestListUtils from '../../../../components/user-reports/requested/utils'
import ErrorHandler from '../../../../utils/ErrorHandler/ErrorHandler'
import { evaluateAndUpdateReportStatus } from 'src/dpr/utils/ReportStatus/getReportStatus'
import { getValues } from 'src/dpr/utils/localsHelper'

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
      req.body ??= {}
      req.body.title = 'Failed to retrieve report status'
      req.body.errorDescription = 'We were unable to retrieve the report status:'
      req.body.error = new ErrorHandler(error).formatError()
      next(error)
    }
  }

  // Poll request status
  POST: RequestHandler = async (req, res, _next) => {
    try {
      const { token, dprUser } = getValues(res)
      const { executionId, currentStatus } = req.body

      const requestedReport = await this.services.requestedReportService.getReportByExecutionId(executionId, dprUser.id)
      if (!requestedReport) {
        return res.sendStatus(404)
      }

      const { resolution } = await evaluateAndUpdateReportStatus({
        stored: requestedReport,
        services: this.services,
        res,
        token,
      })

      let status = resolution.type === 'UPDATE' ? resolution.newStatus : currentStatus
      res.send({ status })
    } catch (error) {
      captureException(error)
      res.send({ status: 'FAILED' })
    }
  }
}

export { RequestStatusController }
export default RequestStatusController

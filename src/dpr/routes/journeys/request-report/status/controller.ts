import { RequestHandler } from 'express'
import { captureException } from '@sentry/node'
import { Services } from '../../../../types/Services'
import { initPollingView } from './utils'
import ErrorHandler from '../../../../utils/ErrorHandler/ErrorHandler'
import { createReportPollingHandler } from 'src/dpr/controllers/reportPolling/createReportPollingHandler'
import { RequestedReport } from 'src/dpr/types/UserReports'
import { UpdatedResolution } from 'src/dpr/utils/ReportStatus/types'
import { buildCurrentStatusView } from 'src/dpr/components/_async/async-polling/current-status/utils'

class RequestStatusController {
  layoutPath: string

  services: Services

  public getCurrentStatus!: RequestHandler

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services

    // Polling current status - render partial
    this.getCurrentStatus = createReportPollingHandler<RequestedReport, UpdatedResolution>(
      this.services,
      (updated, resolution, _req, res) => {
        const viewModel = buildCurrentStatusView(updated, resolution.newStatus, res)

        return {
          template: 'dpr/components/_async/async-polling/current-status/view.njk',
          data: { data: viewModel },
        }
      },
    )
  }

  // Render status page
  GET: RequestHandler = async (req, res, next) => {
    try {
      const pollingRenderData = await initPollingView({
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
      captureException(error)

      req.body ??= {}
      req.body.title = 'Failed to retrieve report status'
      req.body.errorDescription = 'We were unable to retrieve the report status:'
      req.body.error = new ErrorHandler(error).formatError()

      next(error)
    }
  }
}

export { RequestStatusController }
export default RequestStatusController

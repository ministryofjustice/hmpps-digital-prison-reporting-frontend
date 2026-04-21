import { RequestHandler } from 'express'
import ErrorHandler from '../../../../../utils/ErrorHandler/ErrorHandler'
import { Services } from '../../../../../types/Services'
import { LoadType } from '../../../../../types/UserReports'
import SyncDashboardUtils from './utils'
import ViewReportUtils from '../../utils'

class ViewSyncDashboardController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  GET: RequestHandler = async (req, res, next) => {
    try {
      // Redirect the same path to attach query string
      if (ViewReportUtils.redirectWithDefaults(res, req)) {
        return
      }

      // Get the validation errors
      const validationErrors = res.locals['validationErrors'] || []

      // Render the dashaboad
      const renderData = await SyncDashboardUtils.renderSyncDashboard({ req, res, services: this.services })

      res.render(`dpr/routes/journeys/view-report/dashboard`, {
        layoutPath: this.layoutPath,
        ...renderData,
        validationErrors,
      })
    } catch (error) {
      req.body ??= {}
      req.body.title = `Dashboard Failed`
      req.body.errorDescription = 'We were unable to show this dashboard for the following reason:'
      req.body.error = new ErrorHandler(error).formatError()
      next(error)
    }
  }

  applyFilters: RequestHandler = async (req, res, _next) => {
    await ViewReportUtils.applyDashboardInteractiveQuery(req, res, 'filters', LoadType.SYNC)
  }

  resetFilters: RequestHandler = async (req, res, next) => {
    try {
      const { id, reportId } = req.params as { id: string; reportId: string }
      const sessionKey = { id, reportId }
      await ViewReportUtils.resetFilters(req, res, sessionKey)
    } catch (error) {
      req.body = {
        title: 'Failed to reset filters',
        error: new ErrorHandler(error).formatError(),
        ...(req.body && { ...req.body }),
      }
      next(error)
    }
  }
}

export { ViewSyncDashboardController }
export default ViewSyncDashboardController

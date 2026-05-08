import { RequestHandler } from 'express'
import ErrorHandler from '../../../../../utils/ErrorHandler/ErrorHandler'
import { Services } from '../../../../../types/Services'
import DashboardUtils from './utils'
import ViewReportUtils, { updateStateToExpiredAndRedirect } from '../../utils'
import { LoadType } from '../../../../../types/UserReports'

class ViewAsyncDashboardController {
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

      // Get dashboard render data
      const dashboardData = await DashboardUtils.renderAsyncDashboard({ req, res, services: this.services, next })

      // If report is expired redirect the the polling page to show expired status
      if (dashboardData.expired) {
        await updateStateToExpiredAndRedirect(req, res, this.services)
        return
      }

      res.render(`dpr/routes/journeys/view-report/dashboard`, {
        layoutPath: this.layoutPath,
        ...dashboardData,
        validationErrors,
      })
    } catch (error) {
      const dprError = new ErrorHandler(error).formatError()

      req.body ??= {}
      req.body.title = `Failed to retrieve dashboard`
      req.body.error = dprError

      next(error)
    }
  }

  applyFilters: RequestHandler = async (req, res, _next) => {
    await ViewReportUtils.applyDashboardInteractiveQuery(req, res, 'filters', LoadType.ASYNC)
  }

  resetFilters: RequestHandler = async (req, res, next) => {
    try {
      const { id, reportId, tableId } = req.params as { id: string; reportId: string; tableId: string }
      const sessionKey = { id, reportId, tableId }
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

export { ViewAsyncDashboardController }
export default ViewAsyncDashboardController

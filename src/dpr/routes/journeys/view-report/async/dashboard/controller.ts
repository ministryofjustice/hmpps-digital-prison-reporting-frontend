import { RequestHandler } from 'express'
import ErrorHandler from '../../../../../utils/ErrorHandler/ErrorHandler'
import { Services } from '../../../../../types/Services'
import LocalsHelper from '../../../../../utils/localsHelper'
import DashboardUtils from './utils'
import ViewReportUtils from '../../utils'
import { LoadType } from '../../../../../types/UserReports'

class ViewAsyncDashboardController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  GET: RequestHandler = async (req, res, next) => {
    const { type, tableId } = <{ tableId: string; type: string }>req.params
    try {
      // Redirect the same path to attach query string
      if (ViewReportUtils.redirectWithDefaults(res, req)) {
        return
      }

      // Get the validation errors
      const validationErrors = res.locals['validationErrors'] || []

      // Get dashboard render data
      const renderData = await DashboardUtils.renderAsyncDashboard({ req, res, services: this.services, next })

      res.render(`dpr/routes/journeys/view-report/dashboard`, {
        layoutPath: this.layoutPath,
        ...renderData,
        validationErrors,
      })
    } catch (error) {
      const dprError = new ErrorHandler(error).formatError()
      let refreshLink
      if (dprError.status === 'EXPIRED') {
        const { dprUser } = LocalsHelper.getValues(res)
        refreshLink = await this.services.recentlyViewedService.asyncSetToExpiredByTableId(tableId, dprUser.id)
      }
      req.body ??= {}
      req.body.title = `Failed to retrieve ${type}`
      req.body.error = dprError
      if (refreshLink) {
        req.body.refreshLink = refreshLink
      }
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

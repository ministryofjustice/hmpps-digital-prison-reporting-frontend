import { RequestHandler } from 'express'
import { Services } from '../../../../../types/Services'
import ErrorSummaryUtils from '../../../../../components/error-summary/utils'
import LocalsHelper from '../../../../../utils/localsHelper'
import DashboardUtils from './utils'
import ViewReportUtils from '../../utils'

class ViewAsyncDashboardController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  GET: RequestHandler = async (req, res, next) => {
    const { type } = req.params
    try {
      const params = { req, res, services: this.services, next }

      const renderData = await DashboardUtils.renderAsyncDashboard(params)

      res.render(`dpr/routes/journeys/view-report/dashboard`, {
        layoutPath: this.layoutPath,
        ...renderData,
      })
    } catch (error) {
      const dprError = ErrorSummaryUtils.handleError(error, req.params.type)
      let refreshLink
      if (dprError.status === 'EXPIRED') {
        const { dprUser } = LocalsHelper.getValues(res)
        refreshLink = await this.services.recentlyViewedService.asyncSetToExpiredByTableId(
          req.params.tableId,
          dprUser.id,
        )
      }
      req.body.title = `Failed to retrieve ${type}`
      req.body.error = dprError
      if (refreshLink) {
        req.body.refreshLink = refreshLink
      }
      next()
    }
  }

  applyFilters: RequestHandler = async (req, res, next) => {
    await ViewReportUtils.applyDashboardInteractiveQuery(req, res, this.services, 'filters')
  }
}

export { ViewAsyncDashboardController }
export default ViewAsyncDashboardController

import { RequestHandler } from 'express'
import ErrorHandler from '../../../../../utils/ErrorHandler'
import { Services } from '../../../../../types/Services'
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
      const renderData = await SyncDashboardUtils.renderSyncDashboard({ req, res, services: this.services })

      res.render(`dpr/routes/journeys/view-report/dashboard`, {
        layoutPath: this.layoutPath,
        ...renderData,
      })
    } catch (error) {
      req.body.title = `Dashboard Failed`
      req.body.errorDescription = 'We were unable to show this dashboard for the following reason:'
      req.body.error = new ErrorHandler(error).formatError()
      next()
    }
  }

  applyFilters: RequestHandler = async (req, res, _next) => {
    await ViewReportUtils.applyDashboardInteractiveQuery(req, res, this.services, 'filters')
  }
}

export { ViewSyncDashboardController }
export default ViewSyncDashboardController

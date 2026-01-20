import { RequestHandler } from 'express'
import { Services } from '../../../../../types/Services'
import LocalsHelper from '../../../../../utils/localsHelper'
import AsyncReportUtils from './utils'
import ViewReportUtils from '../../utils'
import ErrorHandler from '../../../../../utils/ErrorHandler'

class ViewAyncReportController {
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

      const renderData = await AsyncReportUtils.renderReport(params)

      console.log(JSON.stringify(renderData, null, 2))

      res.render(`dpr/routes/journeys/view-report/report`, {
        layoutPath: this.layoutPath,
        ...renderData,
      })
    } catch (error) {
      const dprError = new ErrorHandler(error).formatError()
      let refreshLink
      const { recentlyViewedService } = this.services
      if (dprError.status === 'EXPIRED' && recentlyViewedService) {
        const { dprUser } = LocalsHelper.getValues(res)
        refreshLink = await recentlyViewedService.asyncSetToExpiredByTableId(req.params['tableId'], dprUser.id)
      }
      req.body ??= {}
      req.body.title = `Failed to retrieve ${type}`
      req.body.error = dprError
      if (refreshLink) {
        req.body.refreshLink = refreshLink
      }
      next()
    }
  }

  applyFilters: RequestHandler = async (req, res, _next) => {
    await ViewReportUtils.applyReportInteractiveQuery(req, res, this.services, 'filters')
  }

  applyColumns: RequestHandler = async (req, res, _next) => {
    await ViewReportUtils.applyReportInteractiveQuery(req, res, this.services, 'columns')
  }
}

export { ViewAyncReportController }
export default ViewAyncReportController

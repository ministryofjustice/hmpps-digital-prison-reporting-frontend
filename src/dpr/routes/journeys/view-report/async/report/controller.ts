import { RequestHandler } from 'express'
import { Services } from '../../../../../types/Services'
import ErrorSummaryUtils from '../../../../../components/error-summary/utils'
import LocalsHelper from '../../../../../utils/localsHelper'
import AsyncReportUtils from '../../../../../utils/report/asyncReportUtils'

export default class ViewAyncReportController {
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

      res.render(`dpr/routes/journeys/view-report/report`, {
        layoutPath: this.layoutPath,
        ...renderData,
      })
    } catch (error) {
      const dprError = ErrorSummaryUtils.handleError(error, req.params.type)
      let refreshLink
      if (dprError.status === 'EXPIRED') {
        const { userId } = LocalsHelper.getValues(res)
        refreshLink = await this.services.recentlyViewedService.asyncSetToExpiredByTableId(req.params.tableId, userId)
      }
      req.body.title = `Failed to retrieve ${type}`
      req.body.error = dprError
      req.body.refreshLink = refreshLink
      next()
    }
  }
}

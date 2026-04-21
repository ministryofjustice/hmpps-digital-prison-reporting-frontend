import { RequestHandler } from 'express'
import { Services } from '../../../../../types/Services'
import LocalsHelper from '../../../../../utils/localsHelper'
import { renderReport } from './utils'
import ViewReportUtils from '../../utils'
import ErrorHandler from '../../../../../utils/ErrorHandler/ErrorHandler'
import { LoadType } from '../../../../../types/UserReports'

class ViewAyncReportController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  /**
   * Renders the report
   *
   * - ensures first render includes correct query string
   * - which ensures first load always get the correct data
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @return {*}
   */
  GET: RequestHandler = async (req, res, next) => {
    const { type, tableId } = req.params as {
      id: string
      reportId: string
      type: string
      tableId: string
    }
    try {
      // Redirect the same path to attach query string
      if (ViewReportUtils.redirectWithDefaults(res, req)) {
        return
      }

      // Get the validation errors
      const validationErrors = res.locals['validationErrors'] || []

      // get the report config
      const renderData = await renderReport({
        req,
        res,
        services: this.services,
        next,
      })

      // Render the report
      res.render(`dpr/routes/journeys/view-report/report`, {
        layoutPath: this.layoutPath,
        ...renderData,
        validationErrors,
      })
    } catch (error) {
      const dprError = new ErrorHandler(error).formatError()

      let refreshLink
      const { recentlyViewedService } = this.services

      if (dprError.status === 'EXPIRED' && recentlyViewedService) {
        const { dprUser } = LocalsHelper.getValues(res)
        refreshLink = await recentlyViewedService.asyncSetToExpiredByTableId(tableId, dprUser.id)
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

  // -----------------------------
  //  Filters
  // -----------------------------

  applyFilters: RequestHandler = async (req, res, _next) => {
    await ViewReportUtils.applyReportInteractiveQuery(req, res, this.services, 'filters', LoadType.ASYNC)
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

  // -----------------------------
  //  Columns
  // -----------------------------

  applyColumns: RequestHandler = async (req, res, _next) => {
    await ViewReportUtils.applyReportInteractiveQuery(req, res, this.services, 'columns', LoadType.ASYNC)
  }

  resetColumns: RequestHandler = async (req, res, next) => {
    try {
      const { id, reportId, tableId } = req.params as { id: string; reportId: string; tableId: string }

      // Create the final querystring
      const finalQuery = ViewReportUtils.resetColumnsQueryString(req, { id, reportId, tableId })

      // Redirect with new query string - query string will handle all rendered elements
      if (finalQuery) {
        res.redirect(`${req.baseUrl}?${finalQuery}`)
      }
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

export { ViewAyncReportController }
export default ViewAyncReportController

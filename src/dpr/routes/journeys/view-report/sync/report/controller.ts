import { RequestHandler } from 'express'
import ErrorHandler from '../../../../../utils/ErrorHandler/ErrorHandler'
import { Services } from '../../../../../types/Services'
import { FiltersType } from '../../../../../components/_filters/filtersTypeEnum'
import PersonalisationUtils from '../../../../../utils/Personalisation/personalisationUtils'
import ViewReportUtils from '../../utils'
import { LoadType } from '../../../../../types/UserReports'
import { renderReport } from './utils'

class ViewSyncReportController {
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

      // Render the report
      const renderData = await renderReport({ req, res, services: this.services })

      res.render(`dpr/routes/journeys/view-report/report`, {
        layoutPath: this.layoutPath,
        ...renderData,
        validationErrors,
      })
    } catch (error) {
      req.body ??= {}
      req.body.title = `Report Failed`
      req.body.errorDescription = 'We were unable to show this report for the following reason:'
      req.body.error = new ErrorHandler(error).formatError()
      next(error)
    }
  }

  // -----------------------------
  //  Save Defaults
  // -----------------------------

  saveDefaultFilterValues: RequestHandler = async (req, res, next) => {
    try {
      PersonalisationUtils.saveDefaults(FiltersType.INTERACTIVE, res, req, this.services)
      res.redirect(`${req.baseUrl}?defaultsSaved=true`)
    } catch (error) {
      req.body = {
        title: 'Failed to save defaults',
        error: new ErrorHandler(error).formatError(),
        ...(req.body && { ...req.body }),
      }
      next(error)
    }
  }

  removeDefaultFilterValues: RequestHandler = async (req, res, next) => {
    try {
      PersonalisationUtils.removeDefaults(FiltersType.INTERACTIVE, res, req, this.services)
      res.redirect(req.baseUrl)
    } catch (error) {
      req.body = {
        title: 'Failed to remove defaults',
        error: new ErrorHandler(error).formatError(),
        ...(req.body && { ...req.body }),
      }
      next(error)
    }
  }

  // -----------------------------
  //  Filters
  // -----------------------------

  applyFilters: RequestHandler = async (req, res, _next) => {
    await ViewReportUtils.applyReportInteractiveQuery(req, res, this.services, 'filters', LoadType.SYNC)
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

  // -----------------------------
  //  Columns
  // -----------------------------

  applyColumns: RequestHandler = async (req, res, _next) => {
    await ViewReportUtils.applyReportInteractiveQuery(req, res, this.services, 'columns', LoadType.SYNC)
  }

  resetColumns: RequestHandler = async (req, res, next) => {
    try {
      const { id, reportId } = req.params as { id: string; reportId: string; tableId: string }

      // Create the final querystring
      const finalQuery = ViewReportUtils.resetColumnsQueryString(req, { id, reportId })

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

export { ViewSyncReportController }
export default ViewSyncReportController

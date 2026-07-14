import { RequestHandler } from 'express'
import { Services } from '../../../../../types/Services'
import ViewReportUtils from '../../utils'
import ErrorHandler from '../../../../../utils/ErrorHandler/ErrorHandler'
import { LoadType } from '../../../../../types/UserReports'

export class ViewAsyncReportController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  // -----------------------------
  //  Filters
  // -----------------------------

  applyFilters: RequestHandler = async (req, res, _next) => {
    await ViewReportUtils.applyReportInteractiveQuery(req, res, this.services, 'filters', LoadType.ASYNC)
  }

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

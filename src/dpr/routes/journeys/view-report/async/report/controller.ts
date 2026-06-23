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
  //   try {
  //     // Redirect the same path to attach query string
  //     if (ViewReportUtils.redirectWithDefaults(res, req)) {
  //       return
  //     }

  //     // Get the validation errors
  //     const validationErrors = res.locals['validationErrors'] || []

  //     // get the report config
  //     const reportData = await renderReport({
  //       req,
  //       res,
  //       services: this.services,
  //       next,
  //     })

  //     // If report is expired redirect the the polling page to show expired status
  //     if (reportData.expired) {
  //       await updateStateToExpiredAndRedirect(req, res, this.services)
  //       return
  //     }

  //     // Render the report
  //     res.render(`dpr/routes/journeys/view-report/report`, {
  //       layoutPath: this.layoutPath,
  //       ...reportData,
  //       validationErrors,
  //     })
  //   } catch (error) {
  //     const dprError = new ErrorHandler(error).formatError()

  //     req.body ??= {}
  //     req.body.title = `Failed to retrieve report`
  //     req.body.error = dprError

  //     next(error)
  //   }
  // }

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

import { RequestHandler, NextFunction, Request, Response } from 'express'
import { ReportType } from 'src/dpr/types/UserReports'
import ErrorHandler from '../../../../utils/ErrorHandler/ErrorHandler'
import { Services } from '../../../../types/Services'
import { FiltersType } from '../../../../components/_filters/filtersTypeEnum'
import PersonalisationUtils from '../../../../utils/Personalisation/personalisationUtils'
import ViewReportUtils, { redirectWithDefaults, updateStateToExpiredAndRedirect } from '../utils'
import { renderReport } from './report/utils'
import { renderDashboard } from './dashboard/utils'

type RenderFunction<T = Record<string, unknown>> = (args: {
  req: Request
  res: Response
  services: Services
  next?: NextFunction
}) => Promise<T & { expired?: boolean }>

export class ViewAsyncController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  GET = (type: ReportType): RequestHandler => {
    let renderFunction: RenderFunction
    let displayType

    if (type === ReportType.REPORT) {
      renderFunction = renderReport
      displayType = 'report'
    } else {
      renderFunction = renderDashboard
      displayType = 'dashboard'
    }

    return async (req, res, next) => {
      try {
        // Redirect the same path to attach query string
        if (redirectWithDefaults(res, req)) {
          return
        }

        // Get the validation errors
        const validationErrors = res.locals['validationErrors'] || []

        // get the render config
        const data = await renderFunction({
          req,
          res,
          services: this.services,
          next,
        })

        // If report/dashboard is expired redirect the the polling page to show expired status
        if (data.expired) {
          await updateStateToExpiredAndRedirect(req, res, this.services)
          return
        }

        // Render the report/dashboard
        res.render(`dpr/routes/journeys/view-report/${displayType}`, {
          layoutPath: this.layoutPath,
          ...data,
          validationErrors,
        })
      } catch (error) {
        const dprError = new ErrorHandler(error).formatError()

        req.body ??= {}
        req.body.title = `Failed to retrieve ${displayType}`
        req.body.error = dprError

        next(error)
      }
    }
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

  saveDefaultFilterValues: RequestHandler = async (req, res, next) => {
    try {
      await PersonalisationUtils.saveDefaults(FiltersType.INTERACTIVE, res, req, this.services)
      res.redirect(req.baseUrl)
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
      await PersonalisationUtils.removeDefaults(FiltersType.INTERACTIVE, res, req, this.services)
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
}

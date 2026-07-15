import { RequestHandler } from 'express'
import { FiltersType } from 'src/dpr/components/_filters/filtersTypeEnum'
import { Services } from '../../../../types/Services'
import ViewReportUtils from '../utils'
import ErrorHandler from '../../../../utils/ErrorHandler/ErrorHandler'
import PersonalisationUtils from '../../../../utils/Personalisation/personalisationUtils'

export class ViewSyncController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
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
}

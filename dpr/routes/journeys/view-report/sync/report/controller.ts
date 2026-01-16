import { RequestHandler } from 'express'
import ErrorHandler from '../../../../../utils/ErrorHandler'
import { Services } from '../../../../../types/Services'
import SyncReportUtils from './utils'
import { FiltersType } from '../../../../../components/_filters/filtersTypeEnum'
import PersonalisationUtils from '../../../../../utils/Personalisation/personalisationUtils'
import ViewReportUtils from '../../utils'

class ViewSyncReportController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  GET: RequestHandler = async (req, res, next) => {
    try {
      const renderData = await SyncReportUtils.getReport({ req, res, services: this.services })
      res.render(`dpr/routes/journeys/view-report/report`, {
        layoutPath: this.layoutPath,
        ...renderData,
      })
    } catch (error) {
      req.body ??= {}
      req.body.title = `Report Failed`
      req.body.errorDescription = 'We were unable to show this report for the following reason:'
      req.body.error = new ErrorHandler(error).formatError()
      next()
    }
  }

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
      next()
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

export { ViewSyncReportController }
export default ViewSyncReportController

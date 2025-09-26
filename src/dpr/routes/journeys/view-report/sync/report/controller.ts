import { RequestHandler } from 'express'
import { Services } from '../../../../../types/Services'
import SyncReportUtils from './utils'
import { FiltersType } from '../../../../../components/_filters/filtersTypeEnum'
import ErrorSummaryUtils from '../../../../../components/error-summary/utils'
import PersonalisationUtils from '../../../../../utils/Personalisation/personalisationUtils'
import ViewReportUtils from '../../utils'

export default class ViewSyncReportController {
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
      req.body.title = `Report Failed`
      req.body.errorDescription = 'We were unable to show this report for the following reason:'
      req.body.error = ErrorSummaryUtils.handleError(error)
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
        error: ErrorSummaryUtils.handleError(error, req.params.type),
        ...req.body,
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
        error: ErrorSummaryUtils.handleError(error, req.params.type),
        ...req.body,
      }
      next()
    }
  }

  applyFilters: RequestHandler = async (req, res, next) => {
    await ViewReportUtils.applyReportInteractiveQuery(req, res, this.services, 'filters')
  }

  applyColumns: RequestHandler = async (req, res, next) => {
    await ViewReportUtils.applyReportInteractiveQuery(req, res, this.services, 'columns')
  }
}

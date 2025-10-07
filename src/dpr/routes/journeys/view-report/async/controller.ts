import { RequestHandler } from 'express'
import { Services } from '../../../../types/Services'
import UserReportsListUtils from '../../../../components/user-reports/utils'
import { FiltersType } from '../../../../components/_filters/filtersTypeEnum'
import ErrorSummaryUtils from '../../../../components/error-summary/utils'
import PersonalisationUtils from '../../../../utils/Personalisation/personalisationUtils'

export default class AsyncController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  POST: RequestHandler = async (req, res, next) => {
    try {
      const response = await UserReportsListUtils.updateExpiredStatus({
        req,
        res,
        services: this.services,
      })
      res.send({ isExpired: response })
    } catch (error) {
      res.send({ status: 'FAILED' })
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
}

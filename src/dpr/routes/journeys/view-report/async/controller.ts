import { RequestHandler } from 'express'
import { captureException } from '@sentry/node'
import ErrorHandler from '../../../../utils/ErrorHandler'
import { Services } from '../../../../types/Services'
import UserReportsListUtils from '../../../../components/user-reports/utils'
import { FiltersType } from '../../../../components/_filters/filtersTypeEnum'
import PersonalisationUtils from '../../../../utils/Personalisation/personalisationUtils'

class AsyncController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  POST: RequestHandler = async (req, res, _next) => {
    try {
      const response = await UserReportsListUtils.updateExpiredStatus({
        req,
        res,
        services: this.services,
      })
      res.send({ isExpired: response })
    } catch (error) {
      captureException(error)
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

export { AsyncController }
export default AsyncController

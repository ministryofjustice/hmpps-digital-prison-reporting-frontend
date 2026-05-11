import { RequestHandler } from 'express'
import ErrorHandler from '../../../../utils/ErrorHandler/ErrorHandler'
import { Services } from '../../../../types/Services'
import { FiltersType } from '../../../../components/_filters/filtersTypeEnum'
import PersonalisationUtils from '../../../../utils/Personalisation/personalisationUtils'

class AsyncController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
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

export { AsyncController }
export default AsyncController

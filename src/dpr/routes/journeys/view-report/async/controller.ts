import { RequestHandler } from 'express'
import { Services } from '../../../../types/Services'
import UserReportsListUtils from '../../../../components/user-reports/utils'

export default class AsyncController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  POST: RequestHandler = async (req, res, next) => {
    res.redirect(req.originalUrl)
  }

  checkExpiredStatus: RequestHandler = async (req, res, next) => {
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
}

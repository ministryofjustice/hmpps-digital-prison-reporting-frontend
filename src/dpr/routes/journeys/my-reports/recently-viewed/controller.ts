import { RequestHandler } from 'express'
import { Services } from '../../../../types/Services'
import UserReportsListUtils from '../../../../components/user-reports/utils'
import LocalsHelper from '../../../../utils/localsHelper'

export default class RecentlyViewedReportsController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  getExpiredStatus: RequestHandler = async (req, res) => {
    try {
      const response = await UserReportsListUtils.getExpiredStatus({
        req,
        res,
        services: this.services,
        storeService: this.services.recentlyViewedService,
      })
      res.send({ isExpired: response })
    } catch (error) {
      res.send({ status: 'FAILED' })
    }
  }

  removeViewedItem: RequestHandler = async (req, res) => {
    const { userId } = LocalsHelper.getValues(res)
    await this.services.recentlyViewedService.removeReport(req.body.executionId, userId)
    res.end()
  }
}

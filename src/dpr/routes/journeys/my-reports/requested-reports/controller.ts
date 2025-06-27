import { RequestHandler } from 'express'
import { Services } from '../../../../types/Services'
import UserReportsListUtils from '../../../../components/user-reports/utils'
import LocalsHelper from '../../../../utils/localsHelper'

export default class RequestedReportsController {
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
        storeService: this.services.requestedReportService,
      })
      res.send({ isExpired: response })
    } catch (error) {
      res.send({ status: 'FAILED' })
    }
  }

  removeRequestedItem: RequestHandler = async (req, res) => {
    const { userId } = LocalsHelper.getValues(res)
    await this.services.requestedReportService.removeReport(req.body.executionId, userId)
    res.end()
  }
}

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

  updateExpiredStatus: RequestHandler = async (req, res) => {
    try {
      const response = await UserReportsListUtils.updateExpiredStatus({
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

  DELETE: RequestHandler = async (req, res) => {
    const { userId } = LocalsHelper.getValues(res)
    const { id } = req.params
    await this.services.requestedReportService.removeReport(id, userId)
    res.end()
  }
}

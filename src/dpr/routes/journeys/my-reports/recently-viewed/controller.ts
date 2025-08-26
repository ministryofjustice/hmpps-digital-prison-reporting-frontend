import { RequestHandler } from 'express'
import { Services } from '../../../../types/Services'
import LocalsHelper from '../../../../utils/localsHelper'

export default class RecentlyViewedReportsController {
  services: Services

  constructor(services: Services) {
    this.services = services
  }

  DELETE: RequestHandler = async (req, res) => {
    const { dprUser } = LocalsHelper.getValues(res)
    const { id } = req.params
    await this.services.recentlyViewedService.removeReport(id, dprUser.id)
    res.end()
  }
}

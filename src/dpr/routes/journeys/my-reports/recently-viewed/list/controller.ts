import { RequestHandler } from 'express'
import { Services } from '../../../../../types/Services'
import { initMyReports } from '../../../../../components/my-reports/utils'

class RecentlyViewedReportsListController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  GET: RequestHandler = async (req, res) => {
    const myReportsData = await initMyReports(req, res, this.services)
    const list = myReportsData ? myReportsData.viewed : {}

    res.render(`dpr/routes/journeys/my-reports/view`, {
      title: 'Recently viewed reports',
      id: 'recently-viewed-reports-list',
      layoutPath: this.layoutPath,
      list,
    })
  }
}

export { RecentlyViewedReportsListController }
export default RecentlyViewedReportsListController

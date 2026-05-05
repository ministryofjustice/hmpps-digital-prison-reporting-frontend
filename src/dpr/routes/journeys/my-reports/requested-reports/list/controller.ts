import { RequestHandler } from 'express'
import { Services } from '../../../../../types/Services'
import { initMyReports } from '../../../../../components/my-reports/utils'

class RequestedReportsListController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  GET: RequestHandler = async (req, res) => {
    const myReportsData = await initMyReports(req, res, this.services)
    const list = myReportsData ? myReportsData.requested : {}

    res.render(`dpr/routes/journeys/my-reports/view`, {
      title: 'Requested reports',
      id: 'requested-reports-list',
      layoutPath: this.layoutPath,
      list,
    })
  }
}

export { RequestedReportsListController }
export default RequestedReportsListController

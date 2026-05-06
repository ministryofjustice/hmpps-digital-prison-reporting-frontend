import { RequestHandler } from 'express'
import { Services } from '../../../types/Services'
import { initMyReports } from '../../../components/my-reports/utils'

class UserReportsController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  GET: RequestHandler = async (req, res) => {
    const myReportsData = await initMyReports(req, res, this.services, { maxRows: 20 })

    res.render(`dpr/routes/journeys/my-reports/user-reports-view`, {
      layoutPath: this.layoutPath,
      myReportsData,
    })
  }
}

export default UserReportsController

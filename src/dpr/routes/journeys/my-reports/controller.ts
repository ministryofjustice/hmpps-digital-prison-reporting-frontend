import { RequestHandler } from 'express'
import { Services } from '../../../types/Services'
import { initUserReports } from '../../../components/user-reports/utils'

class UserReportsController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  GET: RequestHandler = async (_req, res) => {
    const userReportsLists = await initUserReports({ services: this.services, res, maxRows: 20 })

    res.render(`dpr/routes/journeys/my-reports/user-reports-view`, {
      layoutPath: this.layoutPath,
      userReportsLists,
    })
  }
}

export default UserReportsController

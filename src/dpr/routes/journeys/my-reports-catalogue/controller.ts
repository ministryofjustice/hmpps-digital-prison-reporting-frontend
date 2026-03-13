import { RequestHandler } from 'express'
import { Services } from '../../../types/Services'
import { initCatalogue } from '../../../components/_catalogue/catalogue/utils'
import { initUserReports } from '../../../components/user-reports/utils'

class MyReportsCatalogueController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  GET: RequestHandler = async (req, res) => {
    const args = { res, req, services: this.services }
    const catalogue = await initCatalogue(args)
    const userReportsLists = await initUserReports({ ...args, maxRows: 20 })

    res.render(`dpr/routes/journeys/my-reports-catalogue/view`, {
      layoutPath: this.layoutPath,
      catalogue,
      userReportsLists,
    })
  }
}

export default MyReportsCatalogueController

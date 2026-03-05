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

  GET: RequestHandler = async (_req, res) => {
    const features = {
      bookmarkingEnabled: res.locals['bookmarkingEnabled'],
      unauthorisedToggleEnabled: res.app.locals['unauthorisedToggleEnabled'] || false,
    }
    const catalogue = await initCatalogue({ res, services: this.services, features })
    const userReportsLists = await initUserReports({ services: this.services, res, maxRows: 20 })

    res.render(`dpr/routes/journeys/my-reports-catalogue/view`, {
      layoutPath: this.layoutPath,
      catalogue,
      userReportsLists,
    })
  }
}

export default MyReportsCatalogueController

import { RequestHandler } from 'express'
import { Services } from '../../../types/Services'
import { initCatalogue } from '../../../components/_catalogue/catalogue/utils'

class ReportCatalogueController {
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

    res.render(`dpr/routes/journeys/report-catalogue/view`, {
      layoutPath: this.layoutPath,
      catalogue,
    })
  }
}

export default ReportCatalogueController

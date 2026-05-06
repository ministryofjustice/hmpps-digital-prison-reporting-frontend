import { RequestHandler } from 'express'
import { Services } from '../../../types/Services'
import { initCatalogue } from '../../../components/_catalogue/catalogue/utils'
import { initMyReports } from '../../../components/my-reports/utils'

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
    const myReportsData = await initMyReports(req, res, this.services, { maxRows: 10 })

    res.render(`dpr/routes/journeys/my-reports-catalogue/view`, {
      layoutPath: this.layoutPath,
      catalogue,
      myReportsData,
    })
  }
}

export default MyReportsCatalogueController

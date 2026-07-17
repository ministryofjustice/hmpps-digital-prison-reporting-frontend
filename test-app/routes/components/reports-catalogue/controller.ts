import { RequestHandler } from 'express'
import { Services } from '../../../../src/dpr/types/Services'
import { initCatalogue } from '../../../../src/dpr/components/catalogue/utils'

export default class ReportsCatalogueController {
  layoutPath = ''

  services: Services

  constructor(services: Services) {
    this.services = services
  }

  GET: RequestHandler = async (req, res) => {
    const catalogue = await initCatalogue(res, req, this.services)

    res.render('views/pages/components/reports-catalogue/view.njk', {
      title: 'Report catalogue v2',
      catalogue,
    })
  }
}

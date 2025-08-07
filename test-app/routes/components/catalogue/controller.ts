import { RequestHandler } from 'express'
import CatalogueUtils from '../../../../dist/dpr/components/_catalogue/catalogue/utils'
import { Services } from '../../../../dist/dpr/types/Services'

export default class CatalogueController {
  layoutPath: string

  services: Services

  constructor(services: Services) {
    this.services = services
  }

  GET: RequestHandler = async (req, res, next) => {
    const catalogue = await CatalogueUtils.init({
      res,
      services: this.services,
      features: { bookmarkingEnabled: true },
    })

    res.render('views/pages/components/catalogue/view.njk', {
      title: 'Report catalogue',
      catalogue,
    })
  }
}

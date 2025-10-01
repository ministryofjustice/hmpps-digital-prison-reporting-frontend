import { RequestHandler } from 'express'
import CatalogueUtils from '../../../../../src/dpr/components/_catalogue/catalogue/utils'
import { Services } from 'src/dpr/types/Services'

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
    })

    res.render('views/pages/components/catalogue/view.njk', {
      title: 'Report catalogue',
      catalogue,
    })
  }
}

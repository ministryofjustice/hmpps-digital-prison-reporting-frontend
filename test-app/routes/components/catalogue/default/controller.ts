import { RequestHandler } from 'express'
import { Services } from 'src/dpr/types/Services'
import CatalogueUtils from '../../../../../src/dpr/components/_catalogue/catalogue/utils'

export default class CatalogueController {
  layoutPath = ''

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

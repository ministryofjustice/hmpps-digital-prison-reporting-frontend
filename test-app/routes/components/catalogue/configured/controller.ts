import { RequestHandler } from 'express'
import CatalogueUtils from '../../../../../dpr/components/_catalogue/catalogue/utils'
import { Services } from '../../../../../dpr/types/Services'

export default class CatalogueController {
  layoutPath = ''

  services: Services

  constructor(services: Services) {
    this.services = services
  }

  GET: RequestHandler = async (_, res) => {
    const catalogue = await CatalogueUtils.init({
      res,
      services: this.services,
      features: {
        filteringEnabled: false,
        unauthorisedToggleEnabled: false,
        howToUseEnabled: false,
      },
    })

    res.render('views/pages/components/catalogue/view.njk', {
      title: 'Report catalogue',
      catalogue,
    })
  }
}

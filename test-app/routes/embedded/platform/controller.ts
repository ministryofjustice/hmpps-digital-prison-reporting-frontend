import { RequestHandler } from 'express'
import { Services } from '../../../../src/dpr/types/Services'
import CatalogueUtils from '../../../../src/dpr/components/_catalogue/catalogue/utils'
import UserReportsListUtils from '../../../../src/dpr/components/user-reports/utils'

export default class PlatformController {
  services: Services

  constructor(services: Services) {
    this.services = services
  }

  GET: RequestHandler = async (_req, res) => {
    res.locals['csrfToken'] = 'csrfToken'

    const catalogue = await CatalogueUtils.init({
      res,
      services: this.services,
      features: { bookmarkingEnabled: true },
    })

    const userReportsLists = await UserReportsListUtils.init({ services: this.services, res, maxRows: 20 })

    res.render('views/pages/platform/view.njk', {
      title: 'Home',
      userReportsLists,
      catalogue,
    })
  }
}

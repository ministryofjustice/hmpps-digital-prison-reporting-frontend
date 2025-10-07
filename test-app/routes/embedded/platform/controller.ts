import { RequestHandler } from 'express'
import { Services } from '../../../../dist/dpr/types/Services'
import CatalogueUtils from '../../../../dist/dpr/components/_catalogue/catalogue/utils'
import UserReportsListUtils from '../../../../dist/dpr/components/user-reports/utils'

export default class PlatformController {
  services: Services

  constructor(services: Services) {
    this.services = services
  }

  GET: RequestHandler = async (req, res, next) => {
    res.locals.csrfToken = 'csrfToken'

    const catalogue = await CatalogueUtils.init({
      res,
      services: this.services,
      features: { bookmarkingEnabled: true },
    })

    const userReportsLists = await UserReportsListUtils.init({ services: this.services, req, res, maxRows: 20 })

    res.render('views/pages/platform/view.njk', {
      title: 'Home',
      userReportsLists,
      catalogue,
    })
  }
}

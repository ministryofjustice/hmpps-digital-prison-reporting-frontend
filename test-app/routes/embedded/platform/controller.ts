import { RequestHandler } from 'express'
import { Services } from '../../../../dpr/types/Services'
import CatalogueUtils from '../../../../dpr/components/_catalogue/catalogue/utils'
import UserReportsListUtils from '../../../../dpr/components/user-reports/utils'

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
      features: { bookmarkingEnabled: res.locals['bookmarkingEnabled'] },
    })

    const userReportsLists = await UserReportsListUtils.init({ services: this.services, res, maxRows: 20 })

    res.render('views/pages/platform/view.njk', {
      title: 'Home',
      userReportsLists,
      catalogue,
    })
  }
}

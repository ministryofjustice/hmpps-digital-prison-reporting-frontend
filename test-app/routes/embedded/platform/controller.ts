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

    const catalogue = await CatalogueUtils.initCatalogue({
      res,
      services: this.services,
      features: {
        bookmarkingEnabled: res.locals['bookmarkingEnabled'],
        unauthorisedToggleEnabled: res.app.locals['unauthorisedToggleEnabled'] || false,
      },
    })

    const userReportsLists = await UserReportsListUtils.initUserReports({ services: this.services, res, maxRows: 20 })

    res.render('views/pages/platform/view.njk', {
      title: 'Home',
      userReportsLists,
      catalogue,
    })
  }
}

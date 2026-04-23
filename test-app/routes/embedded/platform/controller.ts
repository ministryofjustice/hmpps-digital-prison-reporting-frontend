import { RequestHandler } from 'express'
import { Services } from '../../../../src/dpr/types/Services'
import CatalogueUtils from '../../../../src/dpr/components/_catalogue/catalogue/utils'
import UserReportsListUtils from '../../../../src/dpr/components/user-reports/utils'
import { initMyReports } from 'src/dpr/components/my-reports/utils'

export default class PlatformController {
  services: Services

  constructor(services: Services) {
    this.services = services
  }

  GET: RequestHandler = async (req, res) => {
    res.locals['csrfToken'] = 'csrfToken'

    const args = { res, req, services: this.services }
    const catalogue = await CatalogueUtils.initCatalogue(args)
    const userReportsLists = await UserReportsListUtils.initUserReports({ ...args, maxRows: 3 })

    const myReportsData = await initMyReports(req, res, this.services)

    console.log(JSON.stringify(myReportsData, null, 2))

    res.render('views/pages/platform/view.njk', {
      title: 'Home',
      userReportsLists,
      catalogue,
      myReportsData,
    })
  }
}

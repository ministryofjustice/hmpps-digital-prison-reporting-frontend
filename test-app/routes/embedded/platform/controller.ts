import { RequestHandler } from 'express'
import { Services } from '../../../../src/dpr/types/Services'
import { initCatalogue } from '../../../../src/dpr/components/catalogue/utils'
import { initMyReports } from '../../../../src/dpr/components/my-reports/utils'

export default class PlatformController {
  services: Services

  constructor(services: Services) {
    this.services = services
  }

  GET: RequestHandler = async (req, res) => {
    res.locals['csrfToken'] = 'csrfToken'

    const catalogue = await initCatalogue(res, req, this.services)

    const myReportsData = await initMyReports(req, res, this.services, { maxRows: 10 })

    res.render('views/pages/platform/view.njk', {
      title: 'Home',
      catalogue,
      myReportsData,
    })
  }
}

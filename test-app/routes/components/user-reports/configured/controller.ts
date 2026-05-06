import { RequestHandler } from 'express'
import { initMyReports } from '../../../../../src/dpr/components/my-reports/utils'
import { Services } from '../../../../../src/dpr/types/Services'

export default class UserReportsController {
  services: Services

  constructor(services: Services) {
    this.services = services
  }

  GET: RequestHandler = async (req, res) => {
    res.locals['bookmarkingEnabled'] = false
    const myReportsData = await initMyReports(req, res, this.services, { maxRows: 20 })

    res.render('views/pages/components/user-reports/view.njk', {
      title: 'User reports list',
      myReportsData,
    })
  }
}

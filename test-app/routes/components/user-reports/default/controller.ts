import { RequestHandler } from 'express'
import { Services } from '../../../../../src/dpr/types/Services'
import { initMyReports } from '../../../../../src/dpr/components/my-reports/utils'

export default class UserReportsController {
  services: Services

  constructor(services: Services) {
    this.services = services
  }

  GET: RequestHandler = async (req, res) => {
    const myReportsData = await initMyReports(req, res, this.services, { maxRows: 4 })

    res.render('views/pages/components/user-reports/view.njk', {
      title: 'User reports list',
      myReportsData,
    })
  }
}

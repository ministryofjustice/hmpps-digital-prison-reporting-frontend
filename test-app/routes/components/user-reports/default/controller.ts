import { RequestHandler } from 'express'
import { Services } from '../../../../../dpr/types/Services'
import UserReportsListUtils from '../../../../../dpr/components/user-reports/utils'

export default class UserReportsController {
  services: Services

  constructor(services: Services) {
    this.services = services
  }

  GET: RequestHandler = async (_req, res) => {
    const userReports = await UserReportsListUtils.init({ services: this.services, res, maxRows: 4 })

    res.render('views/pages/components/user-reports/view.njk', {
      title: 'User reports list',
      userReports,
    })
  }
}

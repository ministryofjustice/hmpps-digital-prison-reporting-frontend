import { RequestHandler } from 'express'
import UserReportsListUtils from '../../../../../src/dpr/components/user-reports/utils'
import { Services } from 'src/dpr/types/Services'

export default class UserReportsController {
  services: Services

  constructor(services: Services) {
    this.services = services
  }

  GET: RequestHandler = async (req, res, next) => {
    res.locals.bookmarkingEnabled = false
    const userReports = await UserReportsListUtils.init({ services: this.services, req, res, maxRows: 20 })

    res.render('views/pages/components/user-reports/view.njk', {
      title: 'User reports list',
      userReports,
    })
  }
}

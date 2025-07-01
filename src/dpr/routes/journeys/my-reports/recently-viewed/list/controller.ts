import { RequestHandler } from 'express'
import { Services } from '../../../../../types/Services'

import RecentReportslistUtils from '../../../../../components/user-reports/viewed/utils'
import UserReportsListUtils from '../../../../../components/user-reports/utils'
import LocalsHelper from '../../../../../utils/localsHelper'

export default class RecentlyViewedReportsListController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  GET: RequestHandler = async (req, res) => {
    const { recentlyViewedReports } = LocalsHelper.getValues(res)

    const listParams = await UserReportsListUtils.renderList({
      reportsData: recentlyViewedReports,
      filterFunction: RecentReportslistUtils.filterReports,
      res,
      type: 'viewed',
    })

    res.render(`dpr/routes/journeys/my-reports/view`, {
      title: 'Recently viewed reports',
      id: 'recently-viewed-reports-list',
      layoutPath: this.layoutPath,
      ...listParams,
    })
  }
}

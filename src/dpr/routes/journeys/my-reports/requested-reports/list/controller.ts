import { RequestHandler } from 'express'
import { Services } from '../../../../../types/Services'

import AsyncRequestListUtils from '../../../../../components/user-reports/requested/utils'
import UserReportsListUtils from '../../../../../components/user-reports/utils'
import LocalsHelper from '../../../../../utils/localsHelper'

export default class RequestedReportsListController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  GET: RequestHandler = async (req, res) => {
    const { requestedReports } = LocalsHelper.getValues(res)

    const listParams = await UserReportsListUtils.renderList({
      reportsData: requestedReports,
      filterFunction: AsyncRequestListUtils.filterReports,
      res,
      type: 'requested',
    })

    res.render(`dpr/routes/journeys/my-reports/view`, {
      title: 'Requested reports',
      id: 'requested-reports-list',
      layoutPath: this.layoutPath,
      ...listParams,
    })
  }
}

import { RequestHandler } from 'express'

import { Services } from '../../../../../types/Services'
import ViewReportUtils from '../../utils'
import { LoadType } from '../../../../../types/UserReports'

export class ViewAsyncDashboardController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  applyFilters: RequestHandler = async (req, res, _next) => {
    await ViewReportUtils.applyDashboardInteractiveQuery(req, res, 'filters', LoadType.ASYNC)
  }
}

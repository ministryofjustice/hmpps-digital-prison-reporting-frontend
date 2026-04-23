import { RequestHandler } from 'express'
import { Services } from '../../../../types/Services'
import LocalsHelper from '../../../../utils/localsHelper'

class RecentlyViewedReportsController {
  services: Services

  constructor(services: Services) {
    this.services = services
  }

  POST: RequestHandler = async (req, res) => {
    const { dprUser } = LocalsHelper.getValues(res)
    const { id, reportId, tableId, executionId } = req.params as {
      id: string
      reportId: string
      tableId: string | undefined
      executionId: string | undefined
    }
    const { returnTo } = req.body

    // Remove the report from recenly viewed list
    await this.services.recentlyViewedService.removeReport(dprUser.id, reportId, id, tableId)

    // And clean up the request data, if there is any
    if (executionId) {
      await this.services.requestedReportService.removeReport(executionId, dprUser.id)
    }

    if (returnTo && returnTo.startsWith('/')) {
      return res.redirect(returnTo)
    }

    res.redirect('/')
  }
}

export { RecentlyViewedReportsController }
export default RecentlyViewedReportsController

import { RequestHandler } from 'express'
import { Services } from '../../../../types/Services'
import LocalsHelper from '../../../../utils/localsHelper'
import { initViewed } from '../../../../components/my-reports/utils'
import logger from '../../../../utils/logger'
import { captureException } from '@sentry/node'
import { captureDprError } from 'src/dpr/utils/captureError'

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

    // Remove the report from recenly viewed list
    await this.services.recentlyViewedService.removeReport(dprUser.id, reportId, id, tableId)

    // And clean up the request data, if there is any
    if (executionId) {
      await this.services.requestedReportService.removeReport(executionId, dprUser.id)
    }

    // Update the locals
    res.locals['recentlyViewedReports'] = await this.services.recentlyViewedService.getAllReports(dprUser.id)
    res.locals['requestedReports'] = await this.services.requestedReportService.getAllReports(dprUser.id)

    try {
      // get the data for the requested list
      const maxRows = req.body?.maxRows !== undefined ? Number(req.body.maxRows) : undefined
      const viewModel = await initViewed(req, res, {
        ...(maxRows && { maxRows }),
      })

      return res.render('dpr/components/my-reports/my-reports-list/view.njk', { viewModel }, (err, html) => {
        if (err) return res.sendStatus(500)
        return res.type('text/html').send(html)
      })
    } catch (error) {
      captureDprError(error, 'Failed to refresh list after removal')

      return res.sendStatus(500)
    }
  }
}

export { RecentlyViewedReportsController }
export default RecentlyViewedReportsController

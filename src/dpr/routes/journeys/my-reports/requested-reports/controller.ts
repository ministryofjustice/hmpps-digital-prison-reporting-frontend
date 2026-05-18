import { RequestHandler } from 'express'
import { Services } from '../../../../types/Services'
import LocalsHelper from '../../../../utils/localsHelper'
import { buildMyReportListRow } from '../../../../components/my-reports/my-reports-list-item/utils'
import { ListType } from '../../../../components/my-reports/types'
import { createReportPollingHandler } from '../../../../controllers/reportPolling/createReportPollingHandler'
import { StoredReportData } from '../../../../types/UserReports'
import { UpdatedResolution } from '../../../../utils/ReportStatus/types'
import { initRequested } from '../../../../components/my-reports/utils'

class RequestedReportsController {
  services: Services

  public GET: RequestHandler

  constructor(services: Services) {
    this.services = services

    /**
     * Gets an individual My Reports row and renders it as a string
     */
    this.GET = createReportPollingHandler<StoredReportData, UpdatedResolution>(
      this.services,
      (updated, resolution, req, res) => {
        const viewModel = buildMyReportListRow(updated, resolution.newStatus, req, res, ListType.REQUESTED)
        return {
          template: 'dpr/components/my-reports/my-reports-list-item/row.njk',
          data: { item: viewModel },
        }
      },
    )
  }

  /**
   * Remove requested report action
   *
   * @param {*} req
   * @param {*} res
   * @return {*}
   */
  POST: RequestHandler = async (req, res) => {
    const { dprUser } = LocalsHelper.getValues(res)
    const { executionId } = req.params

    // Remove the report
    await this.services.requestedReportService.removeReport(executionId as string, dprUser.id)

    // Update the locals
    res.locals['requestedReports'] = await this.services.requestedReportService.getAllReports(dprUser.id)

    try {
      // get the data for the requested list
      const viewModel = await initRequested(req, res)
      return res.render('dpr/components/my-reports/my-reports-list/view.njk', { viewModel }, (err, html) => {
        if (err) return res.sendStatus(500)
        return res.type('text/html').send(html)
      })
    } catch (error) {
      console.error('Failed to refresh list after removal', error)
      return res.sendStatus(500)
    }
  }
}

export { RequestedReportsController }
export default RequestedReportsController

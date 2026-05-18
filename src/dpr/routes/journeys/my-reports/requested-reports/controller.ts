import { RequestHandler } from 'express'
import { Services } from '../../../../types/Services'
import LocalsHelper from '../../../../utils/localsHelper'
import { buildMyReportListRow } from '../../../../components/my-reports/my-reports-list-item/utils'
import { ListType } from '../../../../components/my-reports/types'
import { safeRedirect } from '../../../../utils/http/safeRedirect'
import { createReportPollingHandler } from '../../../../controllers/reportPolling/createReportPollingHandler'
import { StoredReportData } from '../../../../types/UserReports'
import { UpdatedResolution } from '../../../../utils/ReportStatus/types'

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
    const { returnTo } = req.body

    await this.services.requestedReportService.removeReport(executionId as string, dprUser.id)

    const isAjax = req.get('X-Requested-With') === 'XMLHttpRequest'

    if (isAjax) {
      return res.status(200).json({
        success: true,
        executionId,
      })
    }

    // fallback for non-JS
    const returnToWithTab = `${returnTo}#requested-reports-tab`
    return safeRedirect(req, res, returnToWithTab)
  }
}

export { RequestedReportsController }
export default RequestedReportsController

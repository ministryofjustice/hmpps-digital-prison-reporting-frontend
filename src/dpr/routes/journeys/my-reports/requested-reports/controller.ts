import { RequestHandler } from 'express'
import { Services } from '../../../../types/Services'
import LocalsHelper from '../../../../utils/localsHelper'
import { buildMyReportListRow } from 'src/dpr/components/my-reports/my-reports-list-item/utils'
import { ListType } from 'src/dpr/components/my-reports/types'
import { evaluateAndUpdateReportStatus } from 'src/dpr/utils/ReportStatus/getReportStatus'

class RequestedReportsController {
  services: Services

  constructor(services: Services) {
    this.services = services
  }

  /**
   * Gets an individual My Reports row and renders it as a string
   *
   * @param {*} req
   * @param {*} res
   * @return {*}
   */
  GET: RequestHandler = async (req, res) => {
    try {
      const { executionId } = req.params as {
        executionId: string
      }

      const { token, dprUser } = LocalsHelper.getValues(res)

      // 1. Fetch the stored report
      const requestedReport = await this.services.requestedReportService.getReportByExecutionId(executionId, dprUser.id)

      if (!requestedReport) {
        return res.sendStatus(404)
      }

      // 2. Evaluate + update status using the shared utility
      const { resolution, updated } = await evaluateAndUpdateReportStatus({
        stored: requestedReport,
        services: this.services,
        token,
        res,
      })

      // 3. No change – keep polling
      if (resolution.type === 'NO_CHANGE') {
        return res.sendStatus(204)
      }

      if (!updated) {
        return res.sendStatus(204)
      }

      // 4. Status changed – re-render the row
      const viewModel = buildMyReportListRow(updated, resolution.newStatus, req, res, ListType.REQUESTED)
      return res.render('dpr/components/my-reports/my-reports-list-item/row.njk', { item: viewModel }, (err, html) => {
        if (err) {
          console.error(err)
          return res.sendStatus(500)
        }

        res.type('text/html').send(html)
      })
    } catch (error) {
      console.error(error)
      return res.sendStatus(500)
    }
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

    if (returnTo && returnTo.startsWith('/')) {
      return res.redirect(returnTo)
    }

    res.redirect('/')
  }
}

export { RequestedReportsController }
export default RequestedReportsController

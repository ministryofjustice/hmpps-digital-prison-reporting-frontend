import { RequestHandler } from 'express'
import { Services } from '../../../../types/Services'
import LocalsHelper from '../../../../utils/localsHelper'
import { buildMyReportListRow } from 'src/dpr/components/my-reports/my-reports-list-item/utils'
import { ListType } from 'src/dpr/components/my-reports/types'
import { RequestStatus, StoredReportData } from 'src/dpr/types/UserReports'
import { decideReportStatus } from './utils'
import { toDate } from 'src/dpr/utils/dateHelper'
import { getRequestStatus } from '../utils'

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
      const { reportId, id, tableId, executionId } = req.params as {
        id: string
        reportId: string
        tableId: string
        executionId: string
      }
      const { token, definitionsPath, dprUser } = LocalsHelper.getValues(res)

      // 1. Get the state data
      const requestedReport = await this.services.requestedReportService.getReportByExecutionId(executionId, dprUser.id)
      if (!requestedReport) {
        return res.sendStatus(404)
      }
      const oldStatus = requestedReport.status as RequestStatus

      // 2. Fetch external status
      const statusResponse = await getRequestStatus(
        this.services,
        requestedReport.type,
        reportId,
        id,
        executionId,
        definitionsPath,
        tableId,
        token,
      )

      const rawStatus = statusResponse.status
      const latestExternalStatus = typeof rawStatus === 'string' ? (rawStatus as RequestStatus) : undefined

      const requestedAt = toDate(requestedReport.timestamp.requested)
      const decision = decideReportStatus({
        oldStatus,
        now: Date.now(),
        ...(requestedAt && { requestedAt }),
        ...(latestExternalStatus && { latestExternalStatus }),
        ...(typeof rawStatus !== 'string' && { latestStatusInvalid: true }),
      })

      if (decision.action === 'NO_CHANGE') {
        return res.sendStatus(204)
      }

      // 3. Status has changed - update the state and UI
      await this.services.requestedReportService.updateStatus(executionId, dprUser.id, decision.newStatus)

      const updatedRecord = (await this.services.requestedReportService.getReportByExecutionId(
        executionId,
        dprUser.id,
      )) as StoredReportData

      const viewModel = buildMyReportListRow(updatedRecord, decision.newStatus, req, res, ListType.REQUESTED)

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

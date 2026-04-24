import { RequestHandler } from 'express'
import { Services } from '../../../../types/Services'
import LocalsHelper from '../../../../utils/localsHelper'
import { buildMyReportListRow } from 'src/dpr/components/my-reports/my-reports-list-item/utils'
import { ListType } from 'src/dpr/components/my-reports/types'
import { RequestStatus } from 'src/dpr/types/UserReports'

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
      console.log(`########################################################
        RequestedReportsController
        `)
      const { reportId, id, tableId, executionId } = req.params as {
        id: string
        reportId: string
        tableId: string
        executionId: string
      }

      const { token, definitionsPath, dprUser } = LocalsHelper.getValues(res)

      // 1. Fetch status
      const statusResponse = await this.services.reportingService.getAsyncReportStatus(
        token,
        reportId,
        id,
        executionId,
        definitionsPath,
        tableId,
      )

      const { status } = statusResponse
      console.log({ status })

      if (typeof status !== 'string') {
        return res.sendStatus(204)
      }

      console.log(executionId, dprUser.id)

      // 2. Fetch report
      const requestedReport = await this.services.requestedReportService.getReportByExecutionId(executionId, dprUser.id)

      console.log({ requestedReport })

      if (!requestedReport) {
        return res.sendStatus(404)
      }

      // 3. Build view model
      const viewModel = buildMyReportListRow(requestedReport, status as RequestStatus, req, res, ListType.REQUESTED)

      console.log({ viewModel })

      // 4. Render partial
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

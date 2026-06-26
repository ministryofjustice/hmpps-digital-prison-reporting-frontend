import { RequestHandler, Request, Response } from 'express'
import { getMyReport } from 'src/dpr/routes/journeys/my-reports/utils'
import { Services } from 'src/dpr/types/Services'
import { RecentlyViewedReport, RequestedReport } from 'src/dpr/types/UserReports'
import { captureDprError } from 'src/dpr/utils/captureError'
import { getValues } from 'src/dpr/utils/localsHelper'
import { evaluateAndUpdateReportStatus } from 'src/dpr/utils/ReportStatus/getReportStatus'

type RenderFn<T, R> = (
  updated: T,
  resolution: R,
  req: Request,
  res: Response,
) => {
  template: string
  data: Record<string, unknown>
}

export const createReportPollingHandler =
  <T, R>(services: Services, renderFn: RenderFn<T, R>): RequestHandler =>
  async (req, res, _next) => {
    let requestedReport: RequestedReport | RecentlyViewedReport | undefined

    try {
      const { executionId } = req.params as { executionId: string }

      const { token, dprUser } = getValues(res)

      requestedReport = await getMyReport({ executionId }, 'requestedReports', services, dprUser.id)

      if (!requestedReport) {
        return res.sendStatus(404)
      }

      const { resolution, updated } = await evaluateAndUpdateReportStatus({
        stored: requestedReport,
        services,
        token,
        res,
      })

      if (resolution.type === 'NO_CHANGE' || !updated) {
        return res.sendStatus(204)
      }

      const { template, data } = renderFn(updated as T, resolution as R, req, res)

      return res.render(template, data, (err, html) => {
        if (err) return res.sendStatus(500)
        return res.type('text/html').send(html)
      })
    } catch (error) {
      const message = 'Polling error'

      const { executionId, reportId, id } = req.params as { executionId: string; reportId: string; id: string }
      const meta = {
        reportId,
        id,
        executionId,
        ...(requestedReport
          ? {
              type: requestedReport.type,
              reportName: requestedReport.reportName,
              loadType: requestedReport.loadType as string,
            }
          : {}),
      }

      captureDprError(error, message, meta)

      return res.sendStatus(500)
    }
  }

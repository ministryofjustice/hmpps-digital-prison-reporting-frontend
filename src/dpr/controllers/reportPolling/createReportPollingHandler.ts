import { RequestHandler, Request, Response } from 'express'
import { Services } from 'src/dpr/types/Services'
import { getValues } from 'src/dpr/utils/localsHelper'
import logger from 'src/dpr/utils/logger'
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
    try {
      const { executionId } = req.params as { executionId: string }

      const { token, dprUser } = getValues(res)

      const requestedReport = await services.requestedReportService.getReportByExecutionId(executionId, dprUser.id)

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
      logger.error(error)
      return res.sendStatus(500)
    }
  }

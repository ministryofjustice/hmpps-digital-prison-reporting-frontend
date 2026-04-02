import { RequestHandler } from 'express'
import LocalsHelper from '../../../../../utils/localsHelper'
import { components } from '../../../../../types/api'
import { Services } from '../../../../../types/Services'
import { LoadType } from '../../../../../types/UserReports'
import logger from '../../../../../utils/logger'
import { getActiveJourneyValue } from '../../../../../utils/sessionHelper'

class RequestDownloadController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  GET: RequestHandler = async (req, res, next) => {
    const { token, csrfToken, definitionsPath, dprUser } = LocalsHelper.getValues(res)
    const { reportId, variantId, tableId } = req.params as Record<string, string>
    const loadType = tableId ? LoadType.ASYNC : LoadType.SYNC
    const currentReportUrl = getActiveJourneyValue(req, { id: variantId, reportId, tableId }, 'currentReportUrl')

    const variantData: components['schemas']['SingleVariantReportDefinition'] =
      await this.services.reportingService.getDefinition(
        token,
        reportId as string,
        variantId as string,
        definitionsPath,
      )

    try {
      res.render(`dpr/routes/journeys/download-report/request-download/form/view`, {
        title: 'Download request form',
        user: {
          id: dprUser.id,
          activeCaseLoadId: dprUser.activeCaseLoadId,
          staffId: dprUser.staffId,
        },
        report: {
          reportId,
          reportName: variantData.name,
          variantId,
          variantName: variantData.variant.name,
          loadType,
          time: new Date().toDateString(),
          reportUrl: currentReportUrl,
        },
        csrfToken,
        layoutPath: this.layoutPath,
      })
    } catch (error) {
      next(error)
    }
  }

  POST: RequestHandler = async (req, res, _next) => {
    const { body, baseUrl } = req
    logger.info('Download Feedback Submission:', `${JSON.stringify(body)}`)
    const redirect = `${baseUrl}/submitted`
    res.redirect(redirect)
  }
}

export { RequestDownloadController }
export default RequestDownloadController

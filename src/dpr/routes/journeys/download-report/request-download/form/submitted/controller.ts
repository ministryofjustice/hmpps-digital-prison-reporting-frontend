import { RequestHandler } from 'express'
import { getActiveJourneyValue } from '../../../../../../utils/sessionHelper'
import { Services } from '../../../../../../types/Services'
import localsHelper from '../../../../../../utils/localsHelper'

class RequestDownloadSubmittedController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  GET: RequestHandler = async (req, res, _next) => {
    const { dprUser } = localsHelper.getValues(res)
    const { reportId, variantId, tableId } = req.params as Record<string, string>
    const { reportName, variantName } = req.query
    const currentReportUrl = getActiveJourneyValue(req, { id: variantId, reportId, tableId }, 'currentReportUrl')

    let reportHref = currentReportUrl
    if (reportHref) {
      reportHref = reportHref.replaceAll('/download-disabled', '')
    }

    await this.services.downloadPermissionService.saveDownloadPermissionData(
      dprUser.id,
      reportId as string,
      variantId as string,
    )

    res.render(`dpr/routes/journeys/download-report/request-download/form/submitted/view`, {
      title: 'success',
      layoutPath: this.layoutPath,
      report: {
        reportName,
        variantName,
        reportHref,
      },
    })
  }
}

export { RequestDownloadSubmittedController }
export default RequestDownloadSubmittedController

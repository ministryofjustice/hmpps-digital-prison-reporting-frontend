import { RequestHandler } from 'express'
import { getActiveJourneyValue } from '../../../utils/sessionHelper'
import LocalsHelper from '../../../utils/localsHelper'
import DownloadUtils from './utils'
import { Services } from '../../../types/Services'

class DownloadReportController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  POST: RequestHandler = async (req, res) => {
    const { dprUser } = LocalsHelper.getValues(res)
    const { reportId, id, tableId } = req.params as { reportId: string; id: string; tableId?: string }

    const sessionKey = tableId ? { reportId, id, tableId } : { reportId, id }
    const currentReportSearch = getActiveJourneyValue(req, sessionKey, 'currentReportSearch')
    const currentReportPathname = getActiveJourneyValue(req, sessionKey, 'currentReportPathname')

    // Initialises the redirect back to the report
    let redirect =
      currentReportPathname && currentReportPathname.includes('/download-disabled')
        ? currentReportPathname
        : `${currentReportPathname}/download-disabled`
    redirect = currentReportSearch ? `${redirect}${currentReportSearch}` : redirect

    // Check if user has enabled the report for download
    const canDownloadReport = await this.services.downloadPermissionService.downloadEnabledForReport(
      dprUser.id,
      reportId,
      id,
    )

    if (canDownloadReport) {
      await DownloadUtils.downloadReport({ req, res, services: this.services })
    } else {
      res.redirect(redirect)
    }
  }
}

export { DownloadReportController }
export default DownloadReportController

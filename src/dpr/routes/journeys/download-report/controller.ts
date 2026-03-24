import { RequestHandler } from 'express'
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
    const { reportId, id, loadType } = req.body
    const currentUrl = req.session?.currentReportJourney?.currentReportPathname
    const currentQueryParams = req.session?.currentReportJourney?.currentReportSearch

    let redirect = currentUrl && currentUrl.includes('/download-disabled') ? currentUrl : `${currentUrl}/download-disabled`
    redirect = currentQueryParams ? `${redirect}${currentQueryParams}` : redirect

    const canDownloadReport = await this.services.downloadPermissionService.downloadEnabledForReport(
      dprUser.id,
      reportId,
      id,
    )

    if (canDownloadReport) {
      await DownloadUtils.downloadReport({ req, res, services: this.services, redirect, loadType })
    } else {
      res.redirect(redirect)
    }
  }
}

export { DownloadReportController }
export default DownloadReportController

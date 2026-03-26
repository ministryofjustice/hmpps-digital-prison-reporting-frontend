import { RequestHandler } from 'express'
import LocalsHelper from '../../../utils/localsHelper'
import DownloadUtils from './utils'
import { Services } from '../../../types/Services'
import { getSessionValue } from 'src/dpr/utils/sessionHelper'

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
    const currentUrl = <string>getSessionValue(req, 'currentReportJourney', 'currentReportPathname')
    const currentQueryParams = <string>getSessionValue(req, 'currentReportJourney', 'currentReportSearch')

    let redirect =
      currentUrl && currentUrl.includes('/download-disabled') ? currentUrl : `${currentUrl}/download-disabled`
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

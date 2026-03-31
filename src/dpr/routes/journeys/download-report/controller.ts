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
    const { reportId, id, loadType, tableId } = req.body
    const currentReportSearch = getActiveJourneyValue(req, { id, reportId, tableId }, 'currentReportSearch')
    const currentReportPathname = getActiveJourneyValue(req, { id, reportId, tableId }, 'currentReportPathname')

    let redirect =
      currentReportPathname && currentReportPathname.includes('/download-disabled')
        ? currentReportPathname
        : `${currentReportPathname}/download-disabled`
    redirect = currentReportSearch ? `${redirect}${currentReportSearch}` : redirect

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

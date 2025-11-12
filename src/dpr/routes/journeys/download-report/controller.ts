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

  POST: RequestHandler = async (req, res, next) => {
    const { dprUser } = LocalsHelper.getValues(res)
    const { reportId, id, loadType, currentUrl, currentQueryParams } = req.body

    let redirect = `${currentUrl}/download-disabled`
    redirect = currentQueryParams ? `${redirect}${currentQueryParams}` : redirect

    const { downloadPermissionService } = this.services
    const canDownload = downloadPermissionService
      ? await downloadPermissionService.downloadEnabled(dprUser.id, reportId, id)
      : false

    if (canDownload) {
      await DownloadUtils.downloadReport({ req, res, services: this.services, redirect, loadType })
    } else {
      res.redirect(redirect)
    }
  }
}

export { DownloadReportController }
export default DownloadReportController

import { RequestHandler } from 'express'
import LocalsHelper from '../../../utils/localsHelper'
import DownloadUtils from '../../../utils/downloadUtils'
import { Services } from '../../../types/Services'

export default class DownloadReportController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  POST: RequestHandler = async (req, res, next) => {
    const { userId } = LocalsHelper.getValues(res)
    const { reportId, id, loadType, currentUrl, currentQueryParams } = req.body

    let redirect = `${currentUrl}/download-disabled`
    redirect = currentQueryParams ? `${redirect}${currentQueryParams}` : redirect

    const canDownload = await this.services.downloadPermissionService.downloadEnabled(userId, reportId, id)

    if (canDownload) {
      await DownloadUtils.downloadReport({ req, res, services: this.services, redirect, loadType })
    } else {
      res.redirect(redirect)
    }
  }
}

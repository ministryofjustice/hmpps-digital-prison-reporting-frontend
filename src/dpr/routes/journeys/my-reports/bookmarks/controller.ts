import { RequestHandler } from 'express'
import { Services } from '../../../../types/Services'
import LocalsHelper from '../../../../utils/localsHelper'

export default class BookmarkController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  POST: RequestHandler = async (req, res) => {
    const { userId } = LocalsHelper.getValues(res)
    const { reportId, id, reportType } = req.body
    await this.services.bookmarkService.addBookmark(userId, reportId, id, reportType)
    res.end()
  }

  DELETE: RequestHandler = async (req, res) => {
    const { userId } = LocalsHelper.getValues(res)
    const { id, reportId } = req.body
    await this.services.bookmarkService.removeBookmark(userId, id, reportId)
    res.end()
  }
}

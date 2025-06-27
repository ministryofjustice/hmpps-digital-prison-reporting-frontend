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

  addBookmark: RequestHandler = async (req, res) => {
    const { userId } = LocalsHelper.getValues(res)
    const { reportId, id, reportType } = req.body
    await this.services.bookmarkService.addBookmark(userId, reportId, id, reportType)
    res.end()
  }

  removeBookmark: RequestHandler = async (req, res) => {
    const { userId } = LocalsHelper.getValues(res)
    const { id, reportId } = req.body
    await this.services.bookmarkService.removeBookmark(userId, id, reportId)
    res.end()
  }
}

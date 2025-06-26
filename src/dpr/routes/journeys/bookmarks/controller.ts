import { RequestHandler } from 'express'
import { Services } from '../../../types/Services'

export default class BookmarkController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  addBookmark: RequestHandler = async (req, res) => {
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
    const { reportId, id, reportType } = req.body
    await this.services.bookmarkService.addBookmark(userId, reportId, id, reportType)
    res.end()
  }

  removeBookmark: RequestHandler = async (req, res) => {
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
    const { id, reportId } = req.body
    await this.services.bookmarkService.removeBookmark(userId, id, reportId)
    res.end()
  }
}

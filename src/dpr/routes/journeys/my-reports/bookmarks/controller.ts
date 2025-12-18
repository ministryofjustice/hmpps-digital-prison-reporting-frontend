import { RequestHandler } from 'express'
import { Services } from '../../../../types/Services'
import LocalsHelper from '../../../../utils/localsHelper'

class BookmarkController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  POST: RequestHandler = async (req, res) => {
    const { dprUser } = LocalsHelper.getValues(res)
    const { reportId, id, reportType, type } = req.body
    if (type === 'add') {
      await this.services.bookmarkService.addBookmark(dprUser.id, reportId, id, reportType)
    } else {
      await this.services.bookmarkService.removeBookmark(dprUser.id, id, reportId)
    }
    res.end()
  }
}

export { BookmarkController }
export default BookmarkController

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

    const { reportId, id, reportType, type, returnTo } = req.body

    let nextType: 'add' | 'remove'

    if (type === 'add') {
      await this.services.bookmarkService.addBookmark(dprUser.id, reportId, id, reportType)

      nextType = 'remove'
    } else {
      await this.services.bookmarkService.removeBookmark(dprUser.id, id, reportId)

      nextType = 'add'
    }

    const isAjax = req.xhr || req.headers.accept?.includes('application/json')

    if (isAjax) {
      return res.json({
        success: true,
        type: nextType,
        bookmarked: nextType === 'remove',
      })
    }

    if (returnTo) {
      return res.redirect(returnTo)
    }

    return res.end()
  }
}

export { BookmarkController }
export default BookmarkController

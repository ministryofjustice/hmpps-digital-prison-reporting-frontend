import { RequestHandler } from 'express'
import BookmarklistUtils from '../../../../../components/user-reports/bookmarks/utils'
import { Services } from '../../../../../types/Services'

class BookmarkListingController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  GET: RequestHandler = async (_req, res, _next) => {
    res.render(`dpr/routes/journeys/my-reports/view`, {
      title: 'Bookmarks',
      layoutPath: this.layoutPath,
      id: 'dpr-bookmarks-list',
      ...(await BookmarklistUtils.renderBookmarkList({ services: this.services, res })),
    })
  }
}

export { BookmarkListingController }
export default BookmarkListingController

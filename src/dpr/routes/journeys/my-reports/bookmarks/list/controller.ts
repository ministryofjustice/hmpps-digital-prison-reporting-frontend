import { RequestHandler } from 'express'
import { Services } from '../../../../../types/Services'
import { initMyReports } from '../../../../../components/my-reports/utils'

class BookmarkListingController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  GET: RequestHandler = async (req, res, _next) => {
    const myReportsData = await initMyReports(req, res, this.services)
    const list = myReportsData && myReportsData.bookmarks ? myReportsData.bookmarks : {}

    res.render(`dpr/routes/journeys/my-reports/view`, {
      title: 'Bookmarks',
      layoutPath: this.layoutPath,
      list,
    })
  }
}

export { BookmarkListingController }
export default BookmarkListingController

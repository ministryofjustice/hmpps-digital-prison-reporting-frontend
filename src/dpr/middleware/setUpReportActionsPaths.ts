import { RequestHandler, Response, Request } from 'express'
import { setNestedPath } from '../utils/urlHelper'
import { Services } from '../types/Services'
import BookmarkService from '../routes/journeys/my-reports/bookmarks/service'

export const setUpViewReportActionsPaths = (services: Services): RequestHandler => {
  return async (req, res, next) => {
    const { nestedBaseUrl } = res.locals

    // Bookmark from report action path
    await setupBookmarkActionPath(res, req, nestedBaseUrl, services.bookmarkService)

    // Download report action path

    // feedback sumbit action path

    // redirect to report path

    console.log({
      bookmarkActionEndoint: res.locals['bookmarkActionEndoint'],
      currentReportIsBookmarked: res.locals['currentReportIsBookmarked'],
    })

    next()
  }
}

/**
 * Creates local variables for bookmarking
 * - "bookmarkActionEndoint"
 * - "currentReportIsBookmarked"
 *
 * @param {Response} res
 * @param {Request} req
 * @param {(string | undefined)} nestedBaseUrl
 * @param {BookmarkService} service
 */
const setupBookmarkActionPath = async (
  res: Response,
  req: Request,
  nestedBaseUrl: string | undefined,
  service: BookmarkService,
) => {
  // Bookmark endpoint
  const bookmarkPath = `/dpr/my-reports/bookmarks`
  res.locals['bookmarkActionEndoint'] = setNestedPath(bookmarkPath, nestedBaseUrl)

  // Is bookmarked
  const { reportId, id } = <{ id: string; reportId: string }>req.params
  const userId = res.locals['dprUser'].id
  res.locals['currentReportIsBookmarked'] = (await service.isBookmarked(id, reportId, userId)) || false
}

export default setUpViewReportActionsPaths

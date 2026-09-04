import { Request, Response } from 'express'
import { BookmarkService } from '../../services'
import { getActiveJourneyValue } from '../../utils/sessionHelper'
import { getRouteLocals } from '../../utils/localsHelper'

const setUpBookmark = (
  res: Response,
  req: Request,
  bookmarkService: BookmarkService,
  bookmarked?: boolean | undefined,
) => {
  const showBookmark = bookmarkService.enabled
  let linkText = 'Add bookmark'
  let linkType = 'add'

  const { id, reportId } = req.params as Record<string, string>
  const { bookmarkActionEndpoint } = getRouteLocals(res)

  let reportIsBookmarked = false
  if (id && reportId) {
    reportIsBookmarked = <boolean>getActiveJourneyValue(req, { id, reportId }, 'reportIsBookmarked')
  }

  if (reportIsBookmarked || bookmarked) {
    linkText = 'Remove bookmark'
    linkType = 'remove'
  }

  return {
    bookmarkActionEndpoint,
    showBookmark,
    linkText,
    linkType,
  }
}

export { setUpBookmark }

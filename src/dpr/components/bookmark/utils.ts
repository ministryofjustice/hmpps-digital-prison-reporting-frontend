import { Request, Response } from 'express'
import { BookmarkService } from '../../services'
import { getSessionValue } from '../../utils/sessionHelper'
import { getRouteLocals } from '../../utils/localsHelper'

const setUpBookmark = (res: Response, req: Request, bookmarkService: BookmarkService) => {
  let bookmarked
  let showBookmark = false
  let linkText = 'Add bookmark'
  let linkType = 'add'
  const { bookmarkActionEndpoint } = getRouteLocals(res)

  if (bookmarkService.enabled) {
    bookmarked = Boolean(getSessionValue(req, 'currentReportJourney', 'reportIsBookmarked')) || false
    showBookmark = true
  }

  if (bookmarked) {
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

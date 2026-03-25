import { Request, Response } from 'express'
import { BookmarkService } from '../../services'
import { getSessionValue } from '../../utils/sessionHelper'

const setUpBookmark = (res: Response, req: Request, bookmarkService: BookmarkService) => {
  let bookmarked
  let bookmarkActionEndoint
  let showBookmark = false
  let linkText = 'Add bookmark'
  let linkType = 'add'

  if (bookmarkService.enabled) {
    bookmarked = Boolean(getSessionValue(req, 'currentReportJourney', 'reportIsBookmarked')) || false
    bookmarkActionEndoint = res.app.locals['bookmarkActionEndoint']
    showBookmark = true
  }

  if (bookmarked) {
    linkText = 'Remove bookmark'
    linkType = 'remove'
  }

  return {
    bookmarkActionEndoint,
    showBookmark,
    linkText,
    linkType,
  }
}

export { setUpBookmark }

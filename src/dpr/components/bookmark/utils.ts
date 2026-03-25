import { Request, Response } from 'express'
import { BookmarkService } from '../../services'

const setUpBookmark = (res: Response, req: Request, bookmarkService: BookmarkService) => {
  let bookmarked
  let bookmarkActionEndoint
  let showBookmark = false
  let linkText = 'Add bookmark'
  let linkType = 'add'

  if (bookmarkService.enabled) {
    bookmarked = Boolean(req.session?.currentReportJourney?.reportIsBookmarked) || false
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

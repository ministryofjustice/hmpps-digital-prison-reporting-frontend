import { Response } from 'express'
import { BookmarkService } from '../../services'

const setUpBookmark = (res: Response, bookmarkService: BookmarkService) => {
  let bookmarked
  let bookmarkActionEndoint
  let showBookmark = false
  let linkText = 'Add bookmark'
  let linkType = 'add'

  if (bookmarkService.enabled) {
    bookmarked = Boolean(res.locals['currentReportIsBookmarked']) || false
    bookmarkActionEndoint = res.locals['bookmarkActionEndoint']
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

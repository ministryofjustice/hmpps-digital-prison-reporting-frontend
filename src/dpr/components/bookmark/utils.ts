import { Request, Response } from 'express'
import { BookmarkService } from '../../services'
import { getActiveJourneyValue } from '../../utils/sessionHelper'
import { getRouteLocals } from '../../utils/localsHelper'

const setUpBookmark = (res: Response, req: Request, bookmarkService: BookmarkService) => {
  const showBookmark = bookmarkService.enabled
  let linkText = 'Add bookmark'
  let linkType = 'add'

  const { id, reportId } = req.params as Record<string, string>
  const { bookmarkActionEndpoint } = getRouteLocals(res)
  const reportIsBookmarked = getActiveJourneyValue(req, { id, reportId }, 'reportIsBookmarked')

  if (reportIsBookmarked) {
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

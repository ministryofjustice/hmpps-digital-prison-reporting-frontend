import { RequestHandler } from 'express'
import { Services } from '../types/Services'
import { BookmarkStoreData } from '../types/Bookmark'

const getBookmarks = (activeCaseLoadId: string) => {
  let bookmarks: BookmarkStoreData[] = []
  switch (activeCaseLoadId) {
    case 'random-id':
      bookmarks = [
        { reportId: 'test-report-1', variantId: 'variantId-16' },
        { reportId: 'test-report-1', variantId: 'variantId-15' },
      ]
      break
    default:
      bookmarks = []
      break
  }

  return bookmarks
}

export default (services: Services): RequestHandler => {
  return async (req, res, next) => {
    if (res.locals.user) {
      const { activeCaseLoadId, uuid } = res.locals.user
      const newBookmarks = getBookmarks(activeCaseLoadId)

      for (let index = 0; index < newBookmarks.length; index += 1) {
        const { reportId, variantId: id } = newBookmarks[index]
        // eslint-disable-next-line no-await-in-loop
        await services.bookmarkService.addBookmark(uuid, reportId, id, 'report')
      }
    }
    return next()
  }
}

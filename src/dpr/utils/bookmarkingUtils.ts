import { BookmarkStoreData } from '../types/Bookmark'
import { Services } from '../types/Services'

const preBookmarkReportsByRoleId = async (userId: string, activeCaseLoadId: string, services: Services) => {
  let bookmarks: BookmarkStoreData[] = []
  switch (activeCaseLoadId) {
    case 'random-id':
      bookmarks = [
        { reportId: 'test-report-1', variantId: 'variantId-16', automatic: true },
        { reportId: 'test-report-1', variantId: 'variantId-15', automatic: true },
      ]
      break
    default:
      bookmarks = []
      break
  }

  // auto remove all automatic bookmarks
  await services.bookmarkService.autoRemoveAllAutomaticBookmarks(userId)

  // Add new automatic bookmarks
  for (let index = 0; index < bookmarks.length; index += 1) {
    const { reportId, variantId: id } = bookmarks[index]
    // eslint-disable-next-line no-await-in-loop
    await services.bookmarkService.addBookmark(userId, reportId, id, 'report', true)
  }

  return bookmarks
}

export default {
  preBookmarkReportsByRoleId,
}

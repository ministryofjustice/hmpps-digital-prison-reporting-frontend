import { BookmarkStoreData } from '../types/Bookmark'
import { Services } from '../types/Services'

export interface BookmarksByCaseload {
  [caseLoadId: string]: BookmarkStoreData[]
}

const preBookmarkReportsByRoleId = async (
  userId: string,
  activeCaseLoadId: string,
  services: Services,
  bookmarksByCaseload: BookmarksByCaseload = {},
) => {
  const bookmarks: BookmarkStoreData[] = bookmarksByCaseload[activeCaseLoadId] || []

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

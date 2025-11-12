import { ReportType } from '../../../../types/UserReports'
import { BookmarkStoreData } from '../../../../types/Bookmark'
import { Services } from '../../../../types/Services'

export interface BookmarksByCaseload {
  [caseLoadId: string]: BookmarkStoreData[]
}

export const preBookmarkReportsByRoleId = async (
  userId: string,
  activeCaseLoadId: string,
  services: Services,
  bookmarksByCaseload: BookmarksByCaseload = {},
) => {
  const bookmarks: BookmarkStoreData[] = bookmarksByCaseload[activeCaseLoadId] || []
  const { bookmarkService } = services
  // Add new automatic bookmarks
  if (bookmarkService) {
    for (let index = 0; index < bookmarks.length; index += 1) {
      const foundBookmark = bookmarks[index]
      if (foundBookmark && foundBookmark.id) {
        const { reportId, variantId: id } = foundBookmark
        // eslint-disable-next-line no-await-in-loop
        await bookmarkService.addBookmark(userId, reportId, <string>id, ReportType.REPORT, true)
      }
    }
  }

  return bookmarks
}

export default {
  preBookmarkReportsByRoleId,
}

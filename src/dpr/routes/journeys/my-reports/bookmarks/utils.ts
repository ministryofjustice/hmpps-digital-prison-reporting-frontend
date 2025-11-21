import { ReportType } from '../../../../types/UserReports'
import { AutomaticBookmarkStoreData } from '../../../../types/Bookmark'
import { Services } from '../../../../types/Services'

export interface BookmarksByCaseload {
  [caseLoadId: string]: AutomaticBookmarkStoreData[]
}

export const preBookmarkReportsByRoleId = async (
  userId: string,
  activeCaseLoadId: string,
  services: Services,
  bookmarksByCaseload: BookmarksByCaseload = {},
) => {
  const bookmarks: AutomaticBookmarkStoreData[] = bookmarksByCaseload[activeCaseLoadId] || []
  const { bookmarkService } = services
  // Add new automatic bookmarks
  if (bookmarkService.enabled) {
    for (let index = 0; index < bookmarks.length; index += 1) {
      const foundBookmark = bookmarks[index]
      if (foundBookmark && foundBookmark.variantId) {
        const { reportId, variantId } = foundBookmark
        // eslint-disable-next-line no-await-in-loop
        await bookmarkService.addBookmark(userId, reportId, <string>variantId, ReportType.REPORT, true)
      }
    }
  }

  return bookmarks
}

export default {
  preBookmarkReportsByRoleId,
}

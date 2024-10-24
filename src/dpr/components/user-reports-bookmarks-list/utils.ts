import { Response, Request } from 'express'
import BookmarkService from '../../services/bookmarkService'
import { BookmarkedReportData, BookmarkStoreData } from '../../types/Bookmark'
import { FormattedUserReportData, ReportType } from '../../types/UserReports'
import { Services } from '../../types/Services'
import TagUtils from '../tag/utils'
import ShowMoreUtils from '../show-more/utils'
import logger from '../../utils/logger'

export const formatBookmarks = async (
  bookmarksData: BookmarkedReportData[],
  maxRows?: number,
): Promise<FormattedUserReportData[]> => {
  const cards = bookmarksData
    .map((report: BookmarkedReportData) => {
      return formatBookmark(report)
    })
    .sort((a, b) => a.text.localeCompare(b.text))

  return maxRows ? cards.slice(0, maxRows) : cards
}

export const formatBookmark = (bookmarkData: BookmarkedReportData): FormattedUserReportData => {
  const reportData: BookmarkedReportData = JSON.parse(JSON.stringify(bookmarkData))
  const { id, name, description, href, reportName, type } = reportData

  return {
    id,
    reportName,
    text: name,
    description,
    href,
    type: type as ReportType,
  }
}

const formatTable = async (
  bookmarksData: BookmarkedReportData[],
  bookmarkService: BookmarkService,
  csrfToken: string,
  userId: string,
  maxRows?: number,
) => {
  const rows = await Promise.all(
    bookmarksData
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(async (bookmark: BookmarkedReportData) => {
        return formatTableData(bookmark, bookmarkService, csrfToken, userId)
      }),
  )

  return {
    rows: maxRows ? rows.slice(0, maxRows) : rows,
    head: [
      { text: 'Product', classes: 'dpr-req-product-head' },
      { text: 'Name', classes: 'dpr-req-name-head' },
      { text: 'Description', classes: 'dpr-bm-description-head' },
      { text: 'Type', classes: 'dpr-req-type-head' },
      { text: 'Bookmark', classes: 'dpr-bookmark-head' },
    ],
  }
}

const formatTableData = async (
  bookmarksData: BookmarkedReportData,
  bookmarkService: BookmarkService,
  csrfToken: string,
  userId: string,
) => {
  const { description, reportName, reportId, id, href, name, type } = bookmarksData
  return [
    { text: reportName, classes: 'dpr-req-cell' },
    { html: `<a href='${href}'>${name}</a>`, classes: 'dpr-req-cell' },
    { html: ShowMoreUtils.createShowMoreHtml(description), classes: 'dpr-req-cell' },
    {
      html: TagUtils.createTagHtml(type),
      classes: 'dpr-req-cell dpr-req-cell__type',
    },
    {
      html: await bookmarkService.createBookMarkToggleHtml(userId, reportId, id, csrfToken, 'bookmark-list'),
      classes: 'dpr-req-cell dpr-vertical-align',
    },
  ]
}

const mapBookmarkIdsToDefinition = async (
  bookmarks: BookmarkStoreData[],
  req: Request,
  res: Response,
  token: string,
  services: Services,
): Promise<BookmarkedReportData[]> => {
  const bookmarkData: BookmarkedReportData[] = []
  const { dataProductDefinitionsPath: definitionPath } = req.query

  await Promise.all(
    bookmarks.map(async (bookmark) => {
      let definition

      const reportType: ReportType = bookmark.reportType ? (bookmark.reportType as ReportType) : ReportType.REPORT
      try {
        // TODO: fix reportType to enable dashboard type
        if (reportType === ReportType.REPORT) {
          definition = await services.reportingService.getDefinition(
            token,
            bookmark.reportId,
            bookmark.variantId,
            <string>definitionPath,
          )
        }

        if (reportType === ReportType.DASHBOARD) {
          definition = await services.dashboardService.getDefinition(
            token,
            bookmark.variantId,
            bookmark.reportId,
            <string>definitionPath,
          )
        }

        if (definition) {
          bookmarkData.push({
            reportId: bookmark.reportId,
            id: bookmark.variantId,
            reportName: definition.name,
            name: definition.variant.name,
            description: definition.variant.description || definition.description,
            type: reportType,
            href: `/async/${reportType}/${bookmark.reportId}/${bookmark.variantId}/request`,
          })
        }
      } catch (error) {
        // DPD has been deleted so API throws error
        logger.warn(`Failed to map bookmark for: Report ${bookmark.reportId}, variant ${bookmark.variantId}`)
        const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
        await services.bookmarkService.removeBookmark(userId, bookmark.variantId)
      }
    }),
  )
  return bookmarkData
}

export default {
  renderBookmarkList: async ({
    services,
    maxRows,
    res,
    req,
  }: {
    services: Services
    maxRows?: number
    res: Response
    req: Request
  }) => {
    const token = res.locals.user?.token ? res.locals.user.token : 'token'
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
    const csrfToken = (res.locals.csrfToken as unknown as string) || 'csrfToken'

    // TODO: update bookmark type to use id instead of variantID
    const bookmarks: { reportId: string; variantId: string }[] = await services.bookmarkService.getAllBookmarks(userId)
    const bookmarksData: BookmarkedReportData[] = await mapBookmarkIdsToDefinition(bookmarks, req, res, token, services)

    const formatted = await formatBookmarks(bookmarksData, maxRows)
    const tableData = await formatTable(bookmarksData, services.bookmarkService, csrfToken, userId, maxRows)

    const head = {
      ...(formatted.length && { href: './async-reports/bookmarks' }),
      ...(!formatted.length && { emptyMessage: 'You have 0 bookmarked reports' }),
    }

    const total = {
      amount: formatted.length,
      shown: formatted.length > maxRows ? maxRows : formatted.length,
      max: maxRows,
    }

    const result = {
      head,
      tableData,
      total,
      csrfToken,
    }

    return result
  },
}

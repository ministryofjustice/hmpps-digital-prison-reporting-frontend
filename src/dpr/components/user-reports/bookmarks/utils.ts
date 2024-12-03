import { Response, Request } from 'express'
import BookmarkService from '../../../services/bookmarkService'
import { BookmarkedReportData, BookmarkStoreData } from '../../../types/Bookmark'
import { FormattedUserReportData, LoadType, ReportType } from '../../../types/UserReports'
import { Services } from '../../../types/Services'
import ShowMoreUtils from '../../show-more/utils'
import logger from '../../../utils/logger'
import DefinitionUtils from '../../../utils/definitionUtils'
import { createListItemProduct, createListActions, setInitialHref } from '../../../utils/reportListsHelper'
import LocalsHelper from '../../../utils/localsHelper'

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
      { text: 'Description', classes: 'dpr-bm-description-head' },
      { text: 'Actions', classes: 'dpr-bm-actions-head' },
    ],
  }
}

const formatTableData = async (
  bookmarksData: BookmarkedReportData,
  bookmarkService: BookmarkService,
  csrfToken: string,
  userId: string,
) => {
  const { description, reportName, reportId, id, href, name, type, loadType } = bookmarksData
  const bookmarkHtml = await bookmarkService.createBookMarkToggleHtml({
    userId,
    reportId,
    id,
    csrfToken,
    ctxId: 'bookmark-list',
    reportType: type,
  })
  return [
    {
      html: createListItemProduct(reportName, name, type),
    },
    { html: ShowMoreUtils.createShowMoreHtml(description), classes: 'dpr-req-cell' },
    {
      html: createListActions(href, type, loadType, bookmarkHtml),
      classes: 'dpr-req-cell dpr-req-cell__status',
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
  const { pathSuffix } = LocalsHelper.getValues(res)

  await Promise.all(
    bookmarks.map(async (bookmark) => {
      let definition
      const reportType: ReportType = bookmark.type ? (bookmark.type as ReportType) : ReportType.REPORT
      const bookmarkId = bookmark.variantId || bookmark.id

      try {
        let name
        let description
        let reportName
        let loadType = LoadType.ASYNC
        let href = `/async/${reportType}/${bookmark.reportId}/${bookmarkId}/request`

        if (reportType === ReportType.REPORT) {
          definition = await services.reportingService.getDefinition(
            token,
            bookmark.reportId,
            bookmarkId,
            <string>definitionPath,
          )
          reportName = definition.name
          name = definition.variant.name
          description = definition.variant.description || definition.description
          loadType = definition.variant.loadType || loadType
          href = setInitialHref(loadType, reportType, bookmark.reportId, bookmarkId, pathSuffix)
        }

        if (reportType === ReportType.DASHBOARD) {
          const reportDefinition = await DefinitionUtils.getReportSummary(
            bookmark.reportId,
            services.reportingService,
            token,
            <string>definitionPath,
          )
          definition = await services.dashboardService.getDefinition(
            token,
            bookmarkId,
            bookmark.reportId,
            <string>definitionPath,
          )
          name = definition.name
          reportName = reportDefinition.name
          description = definition.description
        }

        if (definition) {
          bookmarkData.push({
            reportId: bookmark.reportId,
            id: bookmarkId,
            reportName,
            name,
            description,
            type: reportType,
            href,
            loadType,
          })
        }
      } catch (error) {
        // DPD has been deleted so API throws error
        logger.warn(`Failed to map bookmark for: Report ${bookmark.reportId}, variant ${bookmarkId}`)
        const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
        await services.bookmarkService.removeBookmark(userId, bookmarkId)
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
    const { token, csrfToken, userId } = LocalsHelper.getValues(res)

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

import { Response, Request } from 'express'
import { BookmarkService } from '../../../services'
import { BookmarkedReportData, BookmarkStoreData } from '../../../types/Bookmark'
import { FormattedBookmarkData, LoadType, ReportType } from '../../../types/UserReports'
import { Services } from '../../../types/Services'
import ShowMoreUtils from '../../show-more/utils'
import logger from '../../../utils/logger'
import DefinitionUtils from '../../../utils/definitionUtils'
import { createListItemProduct, createListActions, setInitialHref } from '../../../utils/reportListsHelper'
import LocalsHelper from '../../../utils/localsHelper'
import { ReportStoreConfig } from '../../../types/ReportStore'

export const formatBookmarks = async (bookmarksData: BookmarkedReportData[]): Promise<FormattedBookmarkData[]> => {
  return bookmarksData
    .map((report: BookmarkedReportData) => {
      return formatBookmark(report)
    })
    .sort((a, b) => a.text.localeCompare(b.text))
}

export const formatBookmark = (bookmarkData: BookmarkedReportData): FormattedBookmarkData => {
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
  const userConfig = await bookmarkService.getState(userId)
  const rows = await Promise.all(
    bookmarksData
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(async (bookmark: BookmarkedReportData) => {
        return formatTableData(bookmark, bookmarkService, csrfToken, userConfig)
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
  userConfig: ReportStoreConfig,
) => {
  const { description, reportName, reportId, id, href, name, type, loadType } = bookmarksData
  const bookmarkHtml = await bookmarkService.createBookMarkToggleHtml({
    userConfig,
    reportId,
    id,
    csrfToken,
    ctxId: 'bookmark-list',
    reportType: type,
    // We don't have the data here, and missing reports should never get into bookmarked, viewed or requested
    isMissing: false,
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
  const { definitionsPath } = LocalsHelper.getValues(res)

  await Promise.all(
    bookmarks.map(async (bookmark) => {
      let definition
      const { reportId, id, automatic, type } = bookmark
      const reportType: ReportType = type ? (type as ReportType) : ReportType.REPORT

      try {
        let name = ''
        let description = ''
        let loadType = LoadType.ASYNC
        const href = setInitialHref(loadType, reportType, reportId, id, res)

        const procuctSummary = await DefinitionUtils.getReportSummary(
          reportId,
          services.reportingService,
          token,
          definitionsPath,
        )
        const reportName = procuctSummary.name

        if (reportType === ReportType.REPORT) {
          const variantSummary = procuctSummary.variants.find((v) => v.id === id)
          definition = await services.reportingService.getDefinition(token, reportId, id, definitionsPath)
          name = definition.variant.name
          description = definition.variant.description || definition.description || ''
          loadType = (variantSummary?.loadType as LoadType) || loadType
        }

        if (reportType === ReportType.DASHBOARD) {
          definition = await services.dashboardService.getDefinition(token, reportId, id, definitionsPath)
          name = definition.name
          description = definition.description || ''
        }

        if (definition) {
          bookmarkData.push({
            reportId,
            id,
            reportName,
            name,
            description,
            type: reportType,
            href,
            loadType,
            automatic,
          })
        }
      } catch (error) {
        console.log(error)
        // DPD has been deleted so API throws error
        logger.warn(`Failed to map bookmark for: Report ${reportId}, variant ${id}`)
        const { dprUser } = LocalsHelper.getValues(res)
        await services.bookmarkService.removeBookmark(dprUser.id, id, reportId)
      }
    }),
  )
  return bookmarkData
}

export const renderBookmarkList = async ({
  services,
  maxRows = 20,
  res,
  req,
}: {
  services: Services
  maxRows?: number
  res: Response
  req: Request
}) => {
  const { token, csrfToken, dprUser, bookmarks } = LocalsHelper.getValues(res)
  const bookmarksData: BookmarkedReportData[] = await mapBookmarkIdsToDefinition(bookmarks, req, res, token, services)

  let formatted = await formatBookmarks(bookmarksData)
  const formattedCount = formatted.length

  if (maxRows) formatted = formatted.slice(0, maxRows)
  const tableData = await formatTable(bookmarksData, services.bookmarkService, csrfToken, dprUser.id, maxRows)

  const head = {
    ...(formatted.length && { href: '/dpr/my-reports/bookmarks/list' }),
    ...(!formatted.length && { emptyMessage: 'You have 0 bookmarked reports' }),
  }

  const total = {
    amount: formattedCount,
    shown: formattedCount > maxRows ? maxRows : formattedCount,
    max: maxRows,
  }

  const result = {
    head,
    tableData,
    total,
    csrfToken,
    type: 'bookmark',
  }

  return result
}

export default {
  renderBookmarkList,
}

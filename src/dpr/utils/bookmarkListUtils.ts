import { Response } from 'express'
import BookmarkService from '../services/bookmarkService'
import { BookmarkedReportData } from '../types/Bookmark'
import { components } from '../types/api'
import { CardData } from '../components/table-card-group/types'
import { Services } from '../types/Services'

export const formatCards = async (bookmarksData: BookmarkedReportData[], maxRows?: number): Promise<CardData[]> => {
  const cards = bookmarksData
    .map((report: BookmarkedReportData) => {
      return formatCardData(report)
    })
    .sort((a, b) => a.text.localeCompare(b.text))

  return maxRows ? cards.slice(0, maxRows) : cards
}

export const formatCardData = (bookmarkData: BookmarkedReportData): CardData => {
  const reportData: BookmarkedReportData = JSON.parse(JSON.stringify(bookmarkData))
  const { variantId, name, description, href } = reportData

  return {
    id: variantId,
    text: name,
    description,
    href,
  }
}

const formatTable = (
  bookmarksData: BookmarkedReportData[],
  bookmarkService: BookmarkService,
  csrfToken: string,
  maxRows?: number,
) => {
  const rows = bookmarksData
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((bookmark: BookmarkedReportData) => {
      return formatTableData(bookmark, bookmarkService, csrfToken)
    })

  return {
    rows: maxRows ? rows.slice(0, maxRows) : rows,
    head: [
      { text: 'Product' },
      { text: 'Name' },
      { text: 'Description' },
      { text: 'Bookmark', classes: 'dpr-bookmark-head' },
    ],
  }
}

const formatTableData = (bookmarksData: BookmarkedReportData, bookmarkService: BookmarkService, csrfToken: string) => {
  const { description, reportName, reportId, variantId, href, name } = bookmarksData
  return [
    { text: reportName },
    { html: `<a href='${href}'>${name}</a>` },
    { text: description },
    {
      html: bookmarkService.createBookMarkToggleHtml(reportId, variantId, csrfToken, 'bookmark-list'),
      classes: 'dpr-vertical-align',
    },
  ]
}

const mapBookmarkIdsToDefinition = (
  bookmarks: { reportId: string; variantId: string }[],
  definitions: components['schemas']['ReportDefinitionSummary'][],
): BookmarkedReportData[] => {
  const bookmarkData: BookmarkedReportData[] = []
  bookmarks.forEach((bookmark) => {
    const reportDef = definitions.find((report) => report.id === bookmark.reportId)
    if (reportDef) {
      const variantDef = reportDef.variants.find((variant) => variant.id === bookmark.variantId)

      if (variantDef)
        bookmarkData.push({
          reportId: bookmark.reportId,
          variantId: bookmark.variantId,
          reportName: reportDef.name,
          name: variantDef.name,
          description: variantDef.description,
          href: `/async-reports/${bookmark.reportId}/${bookmark.variantId}/request`,
        })
    }
  })

  return bookmarkData
}

export default {
  renderBookmarkList: async ({ services, maxRows, res }: { services: Services; maxRows?: number; res: Response }) => {
    const csrfToken = (res.locals.csrfToken as unknown as string) || 'csrfToken'
    const definitions = (res.locals.definitions as unknown as components['schemas']['ReportDefinitionSummary'][]) || []

    const bookmarks: { reportId: string; variantId: string }[] = await services.bookmarkService.getAllBookmarks()
    const bookmarksData: BookmarkedReportData[] = mapBookmarkIdsToDefinition(bookmarks, definitions)

    const cardData = await formatCards(bookmarksData, maxRows)
    const tableData = await formatTable(bookmarksData, services.bookmarkService, csrfToken, maxRows)

    const head = {
      title: 'My Bookmarks',
      icon: 'bookmark',
      id: 'my-bookmarks',
      ...(cardData.length && { href: './async-reports/bookmarks' }),
      ...(!cardData.length && { emptyMessage: 'You have 0 bookmarked reports' }),
    }

    const total = {
      amount: cardData.length,
      shown: cardData.length > maxRows ? maxRows : cardData.length,
      max: maxRows,
    }

    return {
      head,
      cardData,
      tableData,
      total,
      csrfToken,
    }
  },
}

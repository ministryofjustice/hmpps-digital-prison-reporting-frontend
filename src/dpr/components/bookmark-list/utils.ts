import { Response } from 'express'
import BookmarkService from '../../services/bookmarkService'
import { BookmarkedReportData } from '../../types/Bookmark'
import { components } from '../../types/api'
import { CardData } from '../table-card-group/types'

export const formatCards = async (bookmarksData: BookmarkedReportData[], maxRows: number): Promise<CardData[]> => {
  const cards = bookmarksData.map((report: BookmarkedReportData) => {
    return formatCardData(report)
  })

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
  maxRows: number,
  bookmarkStore: BookmarkService,
  csrfToken: string,
) => {
  const rows = bookmarksData.map((bookmark: BookmarkedReportData) => {
    return formatTableData(bookmark, bookmarkStore, csrfToken)
  })

  return {
    rows: maxRows ? rows.slice(0, maxRows) : rows,
    head: [{ text: 'Name' }, { text: 'Description' }, { text: 'Product' }],
  }
}

const formatTableData = (bookmarksData: BookmarkedReportData, bookmarkStore: BookmarkService, csrfToken: string) => {
  const { description, reportName, reportId, variantId, href, name } = bookmarksData
  return [
    { html: `<a href='${href}'>${name}</a>` },
    { text: description },
    { text: reportName },
    { html: bookmarkStore.createBookMarkToggleHtml(reportId, variantId, csrfToken) },
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
  renderBookmarkList: async (
    bookmarkStore: BookmarkService,
    maxRows: number,
    definitions: components['schemas']['ReportDefinitionSummary'][],
    res: Response,
  ) => {
    const csrfToken = (res.locals.csrfToken as unknown as string) || 'csrfToken'

    const bookmarks: { reportId: string; variantId: string }[] = await bookmarkStore.getAllBookmarks()
    console.log({ bookmarks })
    const bookmarksData: BookmarkedReportData[] = mapBookmarkIdsToDefinition(bookmarks, definitions)
    console.log({ bookmarksData })

    const cardData = await formatCards(bookmarksData, maxRows)
    const tableData = await formatTable(bookmarksData, maxRows, bookmarkStore, csrfToken)

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

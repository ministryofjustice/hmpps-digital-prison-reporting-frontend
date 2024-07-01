import BookmarkService from '../../services/bookmarkService'
import { BookmarkedReportData } from '../../types/Bookmark'
import { CardData } from '../table-card-group/types'

export const formatCards = async (bookmarksData: BookmarkedReportData[], maxRows: number): Promise<CardData[]> => {
  const cards = bookmarksData.map((report: BookmarkedReportData) => {
    return formatCardData(report)
  })

  return maxRows ? cards.slice(0, maxRows) : cards
}

export const formatCardData = (bookmarkData: BookmarkedReportData): CardData => {
  const reportData: BookmarkedReportData = JSON.parse(JSON.stringify(bookmarkData))
  const { variantId, name, description } = reportData

  return {
    id: variantId,
    text: name,
    description,
    href: '',
  }
}

const formatTable = (bookmarksData: BookmarkedReportData[], maxRows: number) => {
  const rows = bookmarksData.map((bookmark: BookmarkedReportData) => {
    return formatTableData(bookmark)
  })

  return {
    rows: maxRows ? rows.slice(0, maxRows) : rows,
    head: [{ text: 'Name' }, { text: 'Description' }, { text: 'Product' }],
  }
}

const formatTableData = (bookmarksData: BookmarkedReportData) => {
  return [
    { html: `<a href='${bookmarksData.href}'>${bookmarksData.name}</a>` },
    { text: bookmarksData.description },
    { text: bookmarksData.reportName },
  ]
}

export default {
  renderBookmarkList: async (bookmarkStore: BookmarkService, maxRows: number) => {
    const bookmarksData: BookmarkedReportData[] = await bookmarkStore.getAllBookmarks()

    const cardData = await formatCards(bookmarksData, maxRows)
    const tableData = await formatTable(bookmarksData, maxRows)

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
    }
  },
}

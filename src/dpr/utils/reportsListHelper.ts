import { CardData } from '../components/table-card-group/types'
import { createDetailsHtml, createSummaryHtml } from './reportSummaryHelper'
import { AsyncReportData } from '../types/AsyncReport'
import { RecentlyViewedReportData } from '../types/RecentlyViewed'

export const getTotals = (cardData: CardData[], maxRows: number) => {
  return {
    amount: cardData.length,
    shown: cardData.length > maxRows ? maxRows : cardData.length,
    max: maxRows,
  }
}

export const getMeta = (cardData: CardData[]) => {
  return cardData.map((d) => {
    return {
      reportId: d.meta.reportId,
      variantId: d.meta.variantId,
      executionId: d.meta.executionId,
      status: d.meta.status,
      requestedAt: d.meta.requestedAt,
    }
  })
}

export const formatTable = (cardData: CardData[]) => {
  const rows = cardData.map((card: CardData) => {
    return formatTableData(card)
  })

  return {
    rows,
    head: [
      { text: 'Name' },
      { text: 'Description' },
      { text: 'Applied Filters', classes: `dpr-req-filters-summary` },
      { text: 'Timestamp' },
      { text: 'Status' },
    ],
  }
}

export const formatTableData = (card: CardData) => {
  let statusClass
  switch (card.status) {
    case 'FAILED':
      statusClass = 'govuk-tag--red'
      break
    case 'EXPIRED':
      statusClass = 'govuk-tag--yellow'
      break
    case 'ABORTED':
      statusClass = 'govuk-tag--orange'
      break
    case 'READY':
    case 'FINISHED':
      statusClass = 'govuk-tag--green'
      break
    default:
      break
  }

  return [
    { html: `<a href='${card.href}'>${card.text}</a>` },
    { html: createDetailsHtml('Description', card.description) },
    { html: createDetailsHtml('Applied Filters', createSummaryHtml(card)) },
    { text: card.timestamp },
    {
      html: `<strong class="govuk-tag dpr-request-status-tag ${statusClass}">${card.status}</strong>`,
    },
  ]
}

export const formatCards = async (
  reports: AsyncReportData[] | RecentlyViewedReportData[],
  filterFunction: (report: AsyncReportData | RecentlyViewedReportData) => boolean,
  formatFuntion: (reportData: RecentlyViewedReportData | AsyncReportData) => CardData,
): Promise<CardData[]> => {
  return reports.filter(filterFunction).map((report: AsyncReportData | RecentlyViewedReportData) => {
    return formatFuntion(report)
  })
}

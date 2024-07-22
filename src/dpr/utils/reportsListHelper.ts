import { CardData, RenderTableListResponse } from '../components/table-card-group/types'
import { AsyncReportUtilsParams } from '../types/AsyncReportUtils'
import { createDetailsHtml, createSummaryHtml } from './reportSummaryHelper'
import { AsyncReportData, RequestStatus } from '../types/AsyncReport'
import { Services } from '../types/Services'
import { RecentlyViewedReportData } from '../types/RecentlyViewed'

const formatTable = (cardData: CardData[]) => {
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

const formatTableData = (card: CardData) => {
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

const formatCards = async (
  reports: AsyncReportData[] | RecentlyViewedReportData[],
  filterFunction: () => boolean,
  formatFuntion: (reportData: RecentlyViewedReportData | AsyncReportData) => CardData,
): Promise<CardData[]> => {
  return reports.filter(filterFunction).map((report: AsyncReportData) => {
    return formatFuntion(report)
  })
}

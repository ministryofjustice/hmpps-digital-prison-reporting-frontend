import { CardData, RenderTableListResponse } from '../components/table-card-group/types'
import { AsyncReportUtilsParams } from '../types/AsyncReportUtils'
import { RecentlyViewedReportData } from '../types/RecentlyViewed'
import { RequestStatus } from '../types/AsyncReport'
import { Services } from '../types/Services'
import ReportStatusUtils from './reportStatusUtils'
import { createDetailsHtml, createSummaryHtml } from './reportSummaryHelper'

export const formatCards = async (services: Services, token: string): Promise<CardData[]> => {
  const requestedReportsData: RecentlyViewedReportData[] = await services.recentlyViewedStoreService.getAllReports()
  return Promise.all(
    requestedReportsData
      .filter((report: RecentlyViewedReportData) => {
        return !report.timestamp.retried && !report.timestamp.refresh
      })
      .map((report: RecentlyViewedReportData) => {
        return formatCardData(report, services, token)
      }),
  )
}

export const formatCardData = async (
  reportData: RecentlyViewedReportData,
  services: Services,
  token: string,
): Promise<CardData> => {
  const {
    executionId: id,
    variantName: text,
    description,
    query,
    url,
    timestamp,
    executionId,
    reportId,
    variantId,
    dataProductDefinitionsPath,
  } = reportData
  let { status } = reportData

  const statusResponse = await ReportStatusUtils.getStatus(
    token,
    reportId,
    variantId,
    executionId,
    status,
    services,
    dataProductDefinitionsPath,
  )

  let href
  if (statusResponse.status === RequestStatus.EXPIRED) {
    status = statusResponse.status
    href = `${url.request.fullUrl}&retryId=${executionId}`
  } else {
    status = RequestStatus.READY
    href = url.report.fullUrl
  }

  return {
    id,
    text,
    description,
    tag: 'MIS',
    summary: query.summary as { name: string; value: string }[],
    href,
    timestamp: `Last viewed: ${new Date(timestamp.lastViewed).toLocaleString()}`,
    status,
  }
}

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
  const statusClass = card.status === RequestStatus.EXPIRED ? 'yellow' : 'green'
  const statusHtml = `<strong class="govuk-tag dpr-request-status-tag govuk-tag--${statusClass}">${card.status}</strong>`

  return [
    { html: `<a href='${card.href}'>${card.text}</a>` },
    { html: createDetailsHtml('Description', card.description) },
    { html: createDetailsHtml('Applied Filters', createSummaryHtml(card)) },
    { text: card.timestamp },
    {
      html: statusHtml,
    },
  ]
}

export default {
  renderRecentlyViewedList: async ({
    services,
    res,
    maxRows,
  }: { maxRows?: number } & AsyncReportUtilsParams): Promise<RenderTableListResponse> => {
    const token = res.locals.user?.token ? res.locals.user.token : 'token'
    let cardData = await formatCards(services, token)

    const total = {
      amount: cardData.length,
      shown: cardData.length > maxRows ? maxRows : cardData.length,
      max: maxRows,
    }

    if (maxRows) cardData = cardData.slice(0, maxRows)

    return {
      head: {
        title: 'Recently Viewed',
        icon: 'viewed',
        id: 'recently-viewed',
        ...(cardData.length && { href: '/async-reports/recently-viewed' }),
        ...(!cardData.length && { emptyMessage: 'You have 0 recently viewed reports' }),
      },
      cardData,
      tableData: formatTable(cardData),
      total,
    }
  },
}

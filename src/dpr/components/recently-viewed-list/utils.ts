import { CardData, RenderTableListResponse } from '../table-card-group/types'
import { AsyncReportUtilsParams } from '../../types/AsyncReportUtils'
import { RecentlyViewedReportData } from '../../types/RecentlyViewed'
import { RequestStatus } from '../../types/AsyncReport'
import { Services } from '../../types/Services'
import { createDetailsHtml, createSummaryHtml } from '../../utils/reportSummaryHelper'
import { getExpiredStatus } from '../../utils/reportStatusHelper'

export const formatCards = async (services: Services): Promise<CardData[]> => {
  const requestedReportsData: RecentlyViewedReportData[] = await services.recentlyViewedStoreService.getAllReports()
  return requestedReportsData
    .filter((report: RecentlyViewedReportData) => {
      return !report.timestamp.retried && !report.timestamp.refresh
    })
    .map((report: RecentlyViewedReportData) => {
      return formatCardData(report)
    })
}

export const formatCardData = (reportData: RecentlyViewedReportData): CardData => {
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

  let href
  if (status === RequestStatus.EXPIRED) {
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
    meta: {
      reportId,
      variantId,
      executionId,
      status,
      dataProductDefinitionsPath,
    },
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
  getExpiredStatus: async ({ req, res, services }: AsyncReportUtilsParams) => {
    const report = await getExpiredStatus({ req, res, services })
    if (report.isExpired) {
      await services.recentlyViewedStoreService.setToExpired(report.executionId)
    }
    return report.isExpired
  },

  renderRecentlyViewedList: async ({
    services,
    res,
    maxRows,
  }: { maxRows?: number } & AsyncReportUtilsParams): Promise<RenderTableListResponse> => {
    const csrfToken = (res.locals.csrfToken as unknown as string) || 'csrfToken'
    let cardData = await formatCards(services)

    const total = {
      amount: cardData.length,
      shown: cardData.length > maxRows ? maxRows : cardData.length,
      max: maxRows,
    }

    const meta = cardData.map((d) => {
      return {
        reportId: d.meta.reportId,
        variantId: d.meta.variantId,
        executionId: d.meta.executionId,
        status: d.meta.status,
        requestedAt: d.meta.requestedAt,
      }
    })

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
      meta,
      csrfToken,
    }
  },
}

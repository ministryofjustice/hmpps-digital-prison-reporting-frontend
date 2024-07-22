import { AsyncReportData, RequestStatus } from '../../types/AsyncReport'
import { AsyncReportUtilsParams } from '../../types/AsyncReportUtils'
import { CardData, RenderTableListResponse } from '../table-card-group/types'
import { Services } from '../../types/Services'
import { createDetailsHtml, createSummaryHtml } from '../../utils/reportSummaryHelper'

export const formatCardData = (requestedReportsData: AsyncReportData): CardData => {
  const reportData: AsyncReportData = JSON.parse(JSON.stringify(requestedReportsData))
  const { executionId, reportId, variantId, name: text, description, query, status, timestamp } = reportData
  const summary = query.summary as { name: string; value: string }[]

  return {
    id: executionId,
    text,
    description,
    ...setDataFromStatus(status, reportData),
    tag: 'MIS',
    summary,
    status,
    meta: {
      reportId,
      variantId,
      executionId,
      status,
      requestedAt: timestamp.requested,
    },
  }
}

export const setDataFromStatus = (status: RequestStatus, requestedReportsData: AsyncReportData) => {
  let timestamp
  let href
  const { url, timestamp: time } = requestedReportsData
  const retryParam = `&retryId=${requestedReportsData.executionId}`
  switch (status) {
    case RequestStatus.FAILED: {
      const failedTime = time.failed ? new Date(time.failed).toLocaleString() : new Date().toLocaleString()
      href = `${url.polling.fullUrl}`
      timestamp = `Failed at: ${failedTime}`
      break
    }
    case RequestStatus.ABORTED: {
      href = `${url.request.fullUrl}${retryParam}`
      timestamp = `Aborted at: ${new Date(time.aborted).toLocaleString()}`
      break
    }
    case RequestStatus.FINISHED:
      href = url.report.fullUrl
      timestamp = `Ready at: ${new Date(time.completed).toLocaleString()}`
      break
    case RequestStatus.EXPIRED: {
      href = `${url.request.fullUrl}${retryParam}`
      timestamp = `Expired at: ${new Date(time.expired).toLocaleString()}`
      break
    }
    case RequestStatus.SUBMITTED:
    case RequestStatus.STARTED:
    case RequestStatus.PICKED:
      href = url.polling.fullUrl
      timestamp = `Requested at: ${new Date(time.requested).toLocaleString()}`
      break
    default:
      timestamp = `Last viewed: ${new Date(time.lastViewed).toLocaleString()}`
      break
  }

  return {
    timestamp,
    href,
  }
}

export const formatCards = async (services: Services): Promise<CardData[]> => {
  const requestedReportsData: AsyncReportData[] = await services.asyncReportsStore.getAllReports()
  return requestedReportsData
    .filter((report: AsyncReportData) => {
      return !report.timestamp.lastViewed && !report.timestamp.retried
    })
    .map((report: AsyncReportData) => {
      return formatCardData(report)
    })
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

export default {
  renderList: async ({
    services,
    res,
    maxRows,
  }: { maxRows?: number } & AsyncReportUtilsParams): Promise<RenderTableListResponse> => {
    const csrfToken = (res.locals.csrfToken as unknown as string) || 'csrfToken'

    let cardData = await formatCards(services)

    const head = {
      title: 'Requested Reports',
      icon: 'hourglass',
      id: 'requested-reports',
      ...(cardData.length && { href: './async-reports/requested' }),
      ...(!cardData.length && { emptyMessage: 'You have 0 requested reports' }),
    }

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
      head,
      cardData,
      tableData: formatTable(cardData),
      total,
      meta,
      csrfToken,
    }
  },
}

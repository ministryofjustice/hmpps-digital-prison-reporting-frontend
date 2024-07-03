import AsyncReportStoreService from '../services/requestedReportsService'
import { AsyncReportData, RequestStatus } from '../types/AsyncReport'
import { AsyncReportUtilsParams } from '../types/AsyncReportUtils'
import AsyncPollingUtils, { timeoutRequest } from '../components/async-polling/utils'
import ReportingService from '../services/reportingService'
import { CardData, RenderTableListResponse } from '../components/table-card-group/types'

export const formatCardData = async (
  requestedReportsData: AsyncReportData,
  dataSources: ReportingService,
  token: string,
  asyncReportsStore: AsyncReportStoreService,
): Promise<CardData> => {
  let reportData: AsyncReportData = JSON.parse(JSON.stringify(requestedReportsData))
  const { executionId, reportId, variantId, dataProductDefinitionsPath } = reportData

  let { status } = reportData
  if (status !== RequestStatus.FAILED && status !== RequestStatus.ABORTED) {
    let statusResponse
    if (timeoutRequest(reportData.timestamp.requested)) {
      statusResponse = {
        status: RequestStatus.FAILED,
      }
    } else {
      statusResponse = await AsyncPollingUtils.getStatus(
        token,
        reportId,
        variantId,
        executionId,
        status,
        dataSources,
        asyncReportsStore,
        dataProductDefinitionsPath,
      )
    }

    status = statusResponse.status
    if (statusResponse.reportData) reportData = statusResponse.reportData
  }

  const { executionId: id, name: text, description, query } = reportData
  const summary = query.summary as { name: string; value: string }[]

  return {
    id,
    text,
    description,
    ...setDataFromStatus(status, reportData),
    tag: 'MIS',
    summary,
    status,
  }
}

export const setDataFromStatus = (status: RequestStatus, requestedReportsData: AsyncReportData) => {
  let timestamp
  let href
  const { url, timestamp: time } = requestedReportsData
  const retryParam = `&retryId=${requestedReportsData.executionId}`
  switch (status) {
    case RequestStatus.FAILED: {
      href = `${url.polling.fullUrl}`
      timestamp = `Failed at: ${new Date(time.failed).toLocaleString()}`
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

export const formatCards = async (
  asyncReportsStore: AsyncReportStoreService,
  dataSources: ReportingService,
  token: string,
): Promise<CardData[]> => {
  const requestedReportsData: AsyncReportData[] = await asyncReportsStore.getAllReports()
  return Promise.all(
    requestedReportsData
      .filter((report: AsyncReportData) => {
        return !report.timestamp.lastViewed && !report.timestamp.retried
      })
      .map((report: AsyncReportData) => {
        return formatCardData(report, dataSources, token, asyncReportsStore)
      }),
  )
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
    { text: card.description },
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
    head: [{ text: 'Name' }, { text: 'Description' }, { text: 'Timestamp' }, { text: 'Status' }],
  }
}

export default {
  renderAsyncReportsList: async ({
    asyncReportsStore,
    dataSources,
    res,
    maxRows,
  }: { maxRows?: number } & AsyncReportUtilsParams): Promise<RenderTableListResponse> => {
    const token = res.locals.user?.token ? res.locals.user.token : 'token'

    let cardData = await formatCards(asyncReportsStore, dataSources, token)

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

    if (maxRows) cardData = cardData.slice(0, maxRows)

    return {
      head,
      cardData,
      tableData: formatTable(cardData),
      total,
    }
  },
}

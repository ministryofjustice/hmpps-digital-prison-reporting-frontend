import AsyncReportStoreService from '../../../services/requestedReportsService'
import { AsyncReportData, RequestStatus } from '../../../types/AsyncReport'
import { AsyncReportUtilsParams } from '../../../types/AsyncReportUtils'
import AsyncPollingUtils, { timeoutRequest } from '../../async-polling/utils'
import ReportingService from '../../../services/reportingService'
import { CardData, RenderTableListResponse } from '../../table-card-group/types'

const formatCardData = async (
  requestedReportsData: AsyncReportData,
  dataSources: ReportingService,
  token: string,
  asyncReportsStore: AsyncReportStoreService,
): Promise<CardData> => {
  let reportData: AsyncReportData = JSON.parse(JSON.stringify(requestedReportsData))
  const { executionId, reportId, variantId, dataProductDefinitionsPath } = reportData

  let { status } = reportData
  if (status !== RequestStatus.FAILED) {
    let statusResponse
    if (timeoutRequest(reportData.timestamp.requested)) {
      statusResponse = {
        status: RequestStatus.FAILED,
        errorMessage: 'Request taking too long. Request Halted',
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

const setDataFromStatus = (status: RequestStatus, requestedReportsData: AsyncReportData) => {
  let timestamp
  let href
  switch (status) {
    case RequestStatus.FAILED: {
      href = `${requestedReportsData.url.polling.fullUrl}`
      timestamp = `Failed at: ${new Date(requestedReportsData.timestamp.failed).toLocaleString()}`
      break
    }
    case RequestStatus.FINISHED:
      href = requestedReportsData.url.report.fullUrl
      timestamp = `Ready at: ${new Date(requestedReportsData.timestamp.completed).toLocaleString()}`
      break
    case RequestStatus.EXPIRED: {
      const retryParam = `&retryId=${requestedReportsData.executionId}`
      href = `${requestedReportsData.url.request.fullUrl}${retryParam}`
      timestamp = `Expired at: ${new Date(requestedReportsData.timestamp.expired).toLocaleString()}`
      break
    }
    case RequestStatus.SUBMITTED:
    case RequestStatus.STARTED:
    case RequestStatus.PICKED:
      href = requestedReportsData.url.polling.fullUrl
      timestamp = `Requested at: ${new Date(requestedReportsData.timestamp.requested).toLocaleString()}`
      break
    default:
      timestamp = `Last viewed: ${new Date(requestedReportsData.timestamp.lastViewed).toLocaleString()}`
      break
  }

  return {
    timestamp,
    href,
  }
}

const formatCards = async (
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
    case 'FINISHED':
      statusClass = 'govuk-tag--green'
      break
    default:
      break
  }

  return [
    { html: `<a href='${card.href}'>${card.text}</a>` },
    { text: card.description },
    {
      html: `<strong class="govuk-tag dpr-request-status-tag ${statusClass}">${card.status}</strong>`,
    },
    { text: card.timestamp },
  ]
}

const formatTable = (cardData: CardData[]) => {
  const rows = cardData.map((card: CardData) => {
    return formatTableData(card)
  })

  return {
    rows,
    head: [{ text: 'Name' }, { text: 'Description' }, { text: 'Status' }, { text: 'Timestamp' }],
  }
}

export default {
  renderAsyncReportsList: async ({
    asyncReportsStore,
    dataSources,
    res,
    maxRows,
  }: { maxRows?: number } & AsyncReportUtilsParams): Promise<RenderTableListResponse> => {
    const { token } = res.locals.user

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

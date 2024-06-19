import AsyncReportStoreService from '../../../services/requestedReportsService'
import { AsyncReportData, RequestStatus } from '../../../types/AsyncReport'
import { AsyncReportUtilsParams } from '../../../types/AsyncReportUtils'
import AsyncPollingUtils from '../../async-polling/utils'
import ReportingService from '../../../services/reportingService'
import { CardData, RenderTableListResponse } from '../types'

const formatCardData = async (
  requestedReportsData: AsyncReportData,
  dataSources: ReportingService,
  token: string,
  asyncReportsStore: AsyncReportStoreService,
): Promise<CardData> => {
  let reportData: AsyncReportData = JSON.parse(JSON.stringify(requestedReportsData))
  const { executionId, reportId, variantId, dataProductDefinitionsPath } = reportData

  const statusResponse = await AsyncPollingUtils.getStatus(
    token,
    reportId,
    variantId,
    executionId,
    reportData.status,
    dataSources,
    asyncReportsStore,
    dataProductDefinitionsPath,
  )

  const { status } = statusResponse
  if (statusResponse.reportData) reportData = statusResponse.reportData

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
      const retryParam = `&retryId=${requestedReportsData.executionId}`
      href = `${requestedReportsData.url.request.fullUrl}${retryParam}`
      timestamp = requestedReportsData.timestamp.failed
      break
    }
    case RequestStatus.FINISHED:
      href = requestedReportsData.url.report.fullUrl
      timestamp = requestedReportsData.timestamp.completed
      break
    case RequestStatus.SUBMITTED:
      href = requestedReportsData.url.polling.fullUrl
      timestamp = requestedReportsData.timestamp.requested
      break
    case RequestStatus.STARTED:
      href = requestedReportsData.url.polling.fullUrl
      timestamp = requestedReportsData.timestamp.requested
      break
    case RequestStatus.PICKED:
      href = requestedReportsData.url.polling.fullUrl
      timestamp = requestedReportsData.timestamp.requested
      break
    default:
      timestamp = requestedReportsData.timestamp.lastViewed
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
  return [
    { html: `<a href='${card.href}'>${card.text}</a>` },
    { text: card.description },
    {
      html: `<strong class="govuk-tag dpr-request-status-tag">${card.status}</strong>`,
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
  }: AsyncReportUtilsParams): Promise<RenderTableListResponse> => {
    const { token } = res.locals.user || 'token'
    const cardData = await formatCards(asyncReportsStore, dataSources, token)
    return {
      cardData,
      tableData: formatTable(cardData),
    }
  },
}

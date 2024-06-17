import AsyncReportStoreService from '../../services/requestedReportsService'
import { AsyncReportData, RequestStatus } from '../../types/AsyncReport'
import { AsyncReportUtilsParams } from '../../types/AsyncReportUtils'
import AsyncPollingUtils from '../async-polling/utils'
import Dict = NodeJS.Dict
import ReportingService from '../../services/reportingService'

const formatCardData = async (
  requestedReportsData: AsyncReportData,
  dataSources: ReportingService,
  token: string,
  asyncReportsStore: AsyncReportStoreService,
): Promise<CardData> => {
  let reportData = JSON.parse(JSON.stringify(requestedReportsData))
  const { executionId, reportId, variantId } = reportData

  const statusResponse = await AsyncPollingUtils.getStatus(
    token,
    reportId,
    variantId,
    executionId,
    reportData.status,
    dataSources,
    asyncReportsStore,
  )

  const { status } = statusResponse
  if (statusResponse.reportData) reportData = statusResponse.reportData

  const { executionId: id, name: text, description, query } = reportData
  const { summary } = query

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
    case RequestStatus.FAILED:
      href = requestedReportsData.url.request.fullUrl
      timestamp = requestedReportsData.timestamp.failed
      break
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
    requestedReportsData.map((report: AsyncReportData) => {
      return formatCardData(report, dataSources, token, asyncReportsStore)
    }),
  )
}

const formatTableData = (card: CardData) => {
  return [
    { text: card.text },
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
  }: AsyncReportUtilsParams): Promise<RenderAsyncReportsListResponse> => {
    const { token } = res.locals.user || 'token'
    const cardData = await formatCards(asyncReportsStore, dataSources, token)
    return {
      cardData: await formatCards(asyncReportsStore, dataSources, token),
      tableData: formatTable(cardData),
    }
  },
}

interface RenderAsyncReportsListResponse {
  cardData: CardData[]
  tableData: {
    rows: Dict<string>[][]
    head: Dict<string>[]
  }
}

interface CardData {
  id: string
  href: string
  text: string
  description: string
  timestamp: string
  tag: string
  status: string
  summary: { name: string; value: string }[]
}

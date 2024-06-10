import AsyncReportStoreService from '../../services/requestedReportsService'
import { AsyncReportData, RequestStatus } from '../../types/AsyncReport'
import ReportingClient from '../../../../package/dpr/data/reportingClient'

const formatCardData = async (
  requestedReportsData: AsyncReportData,
  dataSources: ReportingClient,
  token: string,
  asyncReportsStore: AsyncReportStoreService,
): Promise<CardData> => {
  let reportData = JSON.parse(JSON.stringify(requestedReportsData))
  const { executionId, reportId, variantId } = reportData
  const response = await dataSources.getAsyncReportStatus(token, reportId, variantId, executionId)

  const { status: newStatus } = response
  if (newStatus !== reportData.status) {
    await asyncReportsStore.updateStatus(executionId, newStatus as RequestStatus)
    reportData = await asyncReportsStore.getReportByExecutionId(executionId)
  }

  const { executionId: id, status, name: text, description, query } = reportData
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
  dataSources: any,
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

const formatTable = (cardData: CardData[]): any => {
  const rows = cardData.map((card: CardData) => {
    return formatTableData(card)
  })

  return {
    rows,
    head: [{ text: 'Name' }, { text: 'Description' }, { text: 'Status' }, { text: 'Timestamp' }],
  }
}

export default {
  renderAsyncReportsList: async (
    asyncReportsStore: AsyncReportStoreService,
    dataSources: any,
    token: string,
  ): Promise<RenderAsyncReportsListResponse> => {
    const cardData = await formatCards(asyncReportsStore, dataSources, token)
    return {
      cardData: await formatCards(asyncReportsStore, dataSources, token),
      tableData: formatTable(cardData),
    }
  },
}

// TODO: put in types file and correct "any"
interface RenderAsyncReportsListResponse {
  cardData: CardData[]
  tableData: any
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

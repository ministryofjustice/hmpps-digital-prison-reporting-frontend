import RecentlyViewedStoreService from '../../../services/recentlyViewedService'
import ReportingService from '../../../services/reportingService'
import { AsyncReportUtilsParams } from '../../../types/AsyncReportUtils'
import { RecentlyViewedReportData } from '../../../types/RecentlyViewed'
import { CardData, RenderTableListResponse } from '../types'
import AsyncPollingUtils from '../../async-polling/utils'
import AsyncReportStoreService from '../../../services/requestedReportsService'
import { RequestStatus } from '../../../types/AsyncReport'

const formatCards = async (
  recentlyViewedStoreService: RecentlyViewedStoreService,
  asyncReportsStore: AsyncReportStoreService,
  dataSources: ReportingService,
  token: string,
): Promise<CardData[]> => {
  const requestedReportsData: RecentlyViewedReportData[] = await recentlyViewedStoreService.getAllReports()
  return Promise.all(
    requestedReportsData
      .filter((report: RecentlyViewedReportData) => {
        return !report.timestamp.retried
      })
      .map((report: RecentlyViewedReportData) => {
        return formatCardData(report, dataSources, token, recentlyViewedStoreService, asyncReportsStore)
      }),
  )
}

const formatCardData = async (
  reportData: RecentlyViewedReportData,
  dataSources: ReportingService,
  token: string,
  recentlyViewedStoreService: RecentlyViewedStoreService,
  asyncReportsStore: AsyncReportStoreService,
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

  if (statusResponse.status === RequestStatus.EXPIRED) {
    status = statusResponse.status
  }
  const summary = query.summary as { name: string; value: string }[]
  const href = status ? `${url.request.fullUrl}&retryId=${executionId}` : url.report.fullUrl

  return { id, text, description, tag: 'MIS', summary, href, timestamp: timestamp.lastViewed, status }
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

const formatTableData = (card: CardData) => {
  const status = card.status ? card.status : 'READY'
  return [
    { html: `<a href='${card.href}'>${card.text}</a>` },
    { text: card.description },
    {
      html: `<strong class="govuk-tag dpr-request-status-tag">${status}</strong>`,
    },
    { text: card.timestamp },
  ]
}

export default {
  renderRecentlyViewedList: async ({
    recentlyViewedStoreService,
    asyncReportsStore,
    dataSources,
    res,
  }: AsyncReportUtilsParams): Promise<RenderTableListResponse> => {
    const { token } = res.locals.user || 'token'
    const cardData = await formatCards(recentlyViewedStoreService, asyncReportsStore, dataSources, token)
    return {
      cardData,
      tableData: formatTable(cardData),
    }
  },
}

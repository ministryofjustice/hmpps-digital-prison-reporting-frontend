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
    requestedReportsData.map((report: RecentlyViewedReportData) => {
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
  )

  if (statusResponse.status === RequestStatus.EXPIRED) {
    status = statusResponse.status
  }
  const summary = query.summary as { name: string; value: string }[]
  const href = status ? url.request.fullUrl : url.report.fullUrl

  return { id, text, description, tag: 'MIS', summary, href, timestamp: timestamp.lastViewed, status }
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
      tableData: { rows: [], head: [] },
    }
  },
}

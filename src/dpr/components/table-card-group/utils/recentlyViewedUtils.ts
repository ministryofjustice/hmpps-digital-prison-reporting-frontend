import RecentlyViewedStoreService from '../../../services/recentlyViewedService'
import { RecentlyViewedReportData } from '../../../types/RecentlyViewed'
import { CardData, RenderTableListResponse } from '../types'

const formatCards = async (recentlyViewedStoreService: RecentlyViewedStoreService): Promise<CardData[]> => {
  const requestedReportsData: RecentlyViewedReportData[] = await recentlyViewedStoreService.getAllReports()
  return requestedReportsData.map((report: RecentlyViewedReportData) => {
    return formatCardData(report)
  })
}

const formatCardData = (reportData: RecentlyViewedReportData): CardData => {
  const { executionId: id, variantName: text, description, query, status, url, timestamp } = reportData
  const summary = query.summary as { name: string; value: string }[]
  const href = status ? url.request.fullUrl : url.report.fullUrl
  return { id, text, description, tag: 'MIS', summary, href, timestamp: timestamp.lastViewed }
}

export default {
  renderRecentlyViewedList: async (
    recentlyViewedStoreService: RecentlyViewedStoreService,
  ): Promise<RenderTableListResponse> => {
    const cardData = await formatCards(recentlyViewedStoreService)
    return {
      cardData,
      tableData: { rows: [], head: [] },
    }
  },
}

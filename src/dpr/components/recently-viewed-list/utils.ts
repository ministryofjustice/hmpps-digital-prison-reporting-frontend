import { CardData, RenderTableListResponse } from '../table-card-group/types'
import { AsyncReportUtilsParams } from '../../types/AsyncReportUtils'
import { RecentlyViewedReportData } from '../../types/RecentlyViewed'
import { RequestStatus } from '../../types/AsyncReport'
import { getExpiredStatus } from '../../utils/reportStatusHelper'
import * as ReportListHelper from '../../utils/reportsListHelper'

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

export const filterReports = (report: RecentlyViewedReportData) => {
  return !report.timestamp.retried && !report.timestamp.refresh
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
    const requestedReportsData: RecentlyViewedReportData[] = await services.recentlyViewedStoreService.getAllReports()

    let cardData = await ReportListHelper.formatCards(requestedReportsData, filterReports, formatCardData)
    if (maxRows) cardData = cardData.slice(0, maxRows)

    const head = {
      title: 'Recently Viewed',
      icon: 'viewed',
      id: 'recently-viewed',
      ...(cardData.length && { href: './async-reports/requested' }),
      ...(!cardData.length && { emptyMessage: 'You have 0 requested reports' }),
    }

    return {
      head,
      cardData,
      tableData: ReportListHelper.formatTable(cardData),
      total: ReportListHelper.getTotals(cardData, maxRows),
      meta: ReportListHelper.getMeta(cardData),
      csrfToken,
    }
  },
}

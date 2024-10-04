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
    reportName,
    dataProductDefinitionsPath,
  } = reportData
  let { status } = reportData

  let href
  let ts
  if (status === RequestStatus.EXPIRED) {
    href = `${url.request.fullUrl}`
    ts = `Expired at: ${new Date(timestamp.expired).toLocaleString()}`
  } else {
    status = RequestStatus.READY
    ts = `Last viewed: ${new Date(timestamp.lastViewed).toLocaleString()}`
    href = url.report.fullUrl
  }

  return {
    id,
    text,
    reportName,
    description,
    tag: 'MIS',
    summary: query.summary as { name: string; value: string }[],
    href,
    timestamp: ts,
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
  return report.executionId.length !== 0
}

export default {
  getExpiredStatus: async ({ req, res, services }: AsyncReportUtilsParams) => {
    const report = await getExpiredStatus({ req, res, services })
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'

    if (report.isExpired) {
      await services.recentlyViewedStoreService.setToExpired(report.executionId, userId)
    }
    return report.isExpired
  },

  renderRecentlyViewedList: async ({
    services,
    res,
    maxRows,
  }: { maxRows?: number } & AsyncReportUtilsParams): Promise<RenderTableListResponse> => {
    const csrfToken = (res.locals.csrfToken as unknown as string) || 'csrfToken'
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
    const requestedReportsData: RecentlyViewedReportData[] = await services.recentlyViewedStoreService.getAllReports(
      userId,
    )

    let cardData = await ReportListHelper.formatCards(requestedReportsData, filterReports, formatCardData)
    if (maxRows) cardData = cardData.slice(0, maxRows)

    const head = {
      title: 'Recently Viewed',
      icon: 'viewed',
      id: 'recently-viewed',
      ...(cardData.length && { href: './async-reports/recently-viewed' }),
      ...(!cardData.length && { emptyMessage: 'You have 0 Recently viewed reports' }),
    }

    return {
      head,
      cardData,
      tableData: ReportListHelper.formatTable(cardData, 'viewed'),
      total: ReportListHelper.getTotals(cardData, maxRows),
      meta: ReportListHelper.getMeta(cardData),
      csrfToken,
    }
  },
}

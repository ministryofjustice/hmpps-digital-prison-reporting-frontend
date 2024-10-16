import { Response } from 'express'
import RecentlyViewedStoreService from '../../services/recentlyViewedService'
import AsyncReportStoreService from '../../services/requestedReportsService'
import { AsyncReportData, RequestStatus } from '../../types/AsyncReport'
import { RecentlyViewedReportData } from '../../types/RecentlyViewed'
import * as ReportListHelper from '../../utils/reportsListHelper'
import { CardData, RenderTableListResponse } from '../table-card-group/types'
import { AsyncReportUtilsParams } from '../../types/AsyncReportUtils'
import { getExpiredStatus } from '../../utils/reportStatusHelper'

const formatData = (reportData: RecentlyViewedReportData | AsyncReportData): CardData => {
  const reportDataCopy: AsyncReportData | RecentlyViewedReportData = JSON.parse(JSON.stringify(reportData))

  const {
    executionId,
    variantName,
    name,
    reportId,
    variantId,
    description,
    query,
    status,
    timestamp,
    reportName,
    dataProductDefinitionsPath,
  } = reportDataCopy

  const summary = query.summary as { name: string; value: string }[]

  return {
    id: executionId,
    text: name || variantName,
    reportName,
    description,
    tag: 'MIS',
    summary,
    timestamp,
    status,
    ...setDataFromStatus(status, reportDataCopy),
    meta: {
      reportId,
      variantId,
      executionId,
      status,
      dataProductDefinitionsPath,
    },
  }
}

export const setDataFromStatus = (status: RequestStatus, reportsData: AsyncReportData | RecentlyViewedReportData) => {
  let timestamp
  let href
  const { url, timestamp: time } = reportsData
  switch (status) {
    case RequestStatus.FAILED: {
      const failedTime = time.failed ? new Date(time.failed).toLocaleString() : new Date().toLocaleString()
      href = `${url.polling.fullUrl}`
      timestamp = `Failed at: ${failedTime}`
      break
    }
    case RequestStatus.ABORTED: {
      href = `${url.request.fullUrl}`
      timestamp = `Aborted at: ${new Date(time.aborted).toLocaleString()}`
      break
    }
    case RequestStatus.FINISHED:
      href = url.report.fullUrl
      timestamp = `Ready at: ${new Date(time.completed).toLocaleString()}`
      break
    case RequestStatus.EXPIRED: {
      href = `${url.request.fullUrl}`
      timestamp = `Expired at: ${new Date(time.expired).toLocaleString()}`
      break
    }
    case RequestStatus.READY: {
      href = `${url.request.fullUrl}`
      timestamp = `Last viewed: ${new Date(time.lastViewed).toLocaleString()}`
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

export default {
  renderList: async ({
    res,
    storeService,
    maxRows,
    filterFunction,
  }: {
    res: Response
    maxRows?: number
    storeService: AsyncReportStoreService | RecentlyViewedStoreService
    filterFunction: (report: AsyncReportData | RecentlyViewedReportData) => boolean
  }): Promise<RenderTableListResponse> => {
    const csrfToken = (res.locals.csrfToken as unknown as string) || 'csrfToken'
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'

    const requestedReportsData: AsyncReportData[] | RecentlyViewedReportData[] = await storeService.getAllReports(
      userId,
    )

    let formatted = requestedReportsData.filter(filterFunction).map(formatData)
    const tableData = ReportListHelper.formatTable(formatted, 'requested')

    if (maxRows) formatted = formatted.slice(0, maxRows)

    const head = {
      ...(formatted.length && { href: './async-reports/requested' }),
      ...(!formatted.length && { emptyMessage: 'You have 0 requested reports' }),
    }

    return {
      head,
      tableData,
      total: ReportListHelper.getTotals(formatted, maxRows),
      meta: ReportListHelper.getMeta(formatted),
      csrfToken,
      maxRows,
    }
  },

  getExpiredStatus: async ({
    req,
    res,
    services,
    storeService,
  }: AsyncReportUtilsParams & { storeService: AsyncReportStoreService | RecentlyViewedStoreService }) => {
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
    const report = await getExpiredStatus({ req, res, services })

    if (report && report.isExpired) {
      await storeService.setToExpired(report.executionId, userId)
    }
    return report ? report.isExpired : false
  },
}

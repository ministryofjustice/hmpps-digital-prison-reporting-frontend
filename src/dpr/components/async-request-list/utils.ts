import { CardData, RenderTableListResponse } from '../table-card-group/types'
import { AsyncReportUtilsParams } from '../../types/AsyncReportUtils'
import { AsyncReportData, RequestStatus } from '../../types/AsyncReport'
import { getStatus, getExpiredStatus } from '../../utils/reportStatusHelper'
import * as ReportListHelper from '../../utils/reportsListHelper'

export const formatCardData = (requestedReportsData: AsyncReportData): CardData => {
  const reportData: AsyncReportData = JSON.parse(JSON.stringify(requestedReportsData))
  const {
    executionId,
    reportId,
    variantId,
    name: text,
    description,
    query,
    status,
    timestamp,
    reportName,
    dataProductDefinitionsPath,
  } = reportData
  const summary = query.summary as { name: string; value: string }[]

  return {
    id: executionId,
    text,
    reportName,
    description,
    ...setDataFromStatus(status, reportData),
    tag: 'MIS',
    summary,
    status,
    meta: {
      reportId,
      variantId,
      executionId,
      status,
      requestedAt: timestamp.requested,
      dataProductDefinitionsPath,
    },
  }
}

export const setDataFromStatus = (status: RequestStatus, requestedReportsData: AsyncReportData) => {
  let timestamp
  let href
  const { url, timestamp: time } = requestedReportsData
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

export const filterReports = (report: AsyncReportData) => {
  return !report.timestamp.lastViewed
}

export default {
  getRequestStatus: async ({ req, res, services }: AsyncReportUtilsParams) => {
    const { executionId, status: currentStatus } = req.body
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
    const response = await getStatus({ req, res, services })

    if (currentStatus !== response.status) {
      await services.asyncReportsStore.updateStatus(
        executionId,
        userId,
        response.status as RequestStatus,
        response.errorMessage,
      )
      response.reportData = await services.asyncReportsStore.getReportByExecutionId(executionId, userId)
    }

    return response
  },

  getExpiredStatus: async ({ req, res, services }: AsyncReportUtilsParams) => {
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
    const report = await getExpiredStatus({ req, res, services })
    if (report.isExpired) {
      await services.asyncReportsStore.setToExpired(report.executionId, userId)
    }
    return report.isExpired
  },

  renderList: async ({
    services,
    res,
    maxRows,
  }: { maxRows?: number } & AsyncReportUtilsParams): Promise<RenderTableListResponse> => {
    const csrfToken = (res.locals.csrfToken as unknown as string) || 'csrfToken'
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
    const requestedReportsData: AsyncReportData[] = await services.asyncReportsStore.getAllReports(userId)

    let cardData = await ReportListHelper.formatCards(requestedReportsData, filterReports, formatCardData)
    if (maxRows) cardData = cardData.slice(0, maxRows)

    const head = {
      title: 'Requested Reports',
      icon: 'hourglass',
      id: 'requested-reports',
      ...(cardData.length && { href: './async-reports/requested' }),
      ...(!cardData.length && { emptyMessage: 'You have 0 requested reports' }),
    }

    return {
      head,
      cardData,
      tableData: ReportListHelper.formatTable(cardData, 'requested'),
      total: ReportListHelper.getTotals(cardData, maxRows),
      meta: ReportListHelper.getMeta(cardData),
      csrfToken,
    }
  },
}

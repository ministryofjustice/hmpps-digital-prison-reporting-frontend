import { Response, Request } from 'express'
import RecentlyViewedStoreService from '../../services/recentlyViewedService'
import RequestedReportService from '../../services/requestedReportService'
import { RenderTableListResponse } from './types'
import { FormattedUserReportData, UserReportData, RequestStatus, ReportType } from '../../types/UserReports'
import { AsyncReportUtilsParams } from '../../types/AsyncReportUtils'
import { getExpiredStatus } from '../../utils/requestStatusHelper'
import { itemActionsHtml, createListItemProduct } from '../../utils/reportListsHelper'
import ShowMoreUtils from '../show-more/utils'
import { Services } from '../../types/Services'
import RequestedReportUtils from '../user-reports-request-list/utils'
import RecentlyViewedCardGroupUtils from '../user-reports-viewed-list/utils'
import BookmarklistUtils from '../user-reports-bookmarks-list/utils'

const formatData = (reportData: UserReportData): FormattedUserReportData => {
  const reportDataCopy: UserReportData = JSON.parse(JSON.stringify(reportData))

  const {
    executionId,
    variantName,
    name,
    reportId,
    variantId,
    id,
    description,
    query,
    status,
    timestamp,
    reportName,
    dataProductDefinitionsPath,
    type: reportType,
  } = reportDataCopy

  let summary
  if (query) {
    summary = query.summary as { name: string; value: string }[]
  }

  const type = reportType || ReportType.REPORT

  return {
    id: executionId,
    text: name || variantName,
    reportName,
    description,
    tag: 'MIS',
    summary,
    timestamp,
    status,
    type,
    ...setDataFromStatus(status, reportDataCopy),
    meta: {
      reportId,
      id: variantId || id,
      executionId,
      status,
      type,
      dataProductDefinitionsPath,
    },
  }
}

const formatTable = (data: FormattedUserReportData[], type: 'requested' | 'viewed') => {
  const rows = data.map((card: FormattedUserReportData) => {
    return formatTableRow(card, type)
  })

  return {
    rows,
    head: [
      { text: 'Product', classes: 'dpr-req-product-head' },
      { text: 'Description', classes: 'dpr-req-description-head' },
      { text: 'Filters', classes: 'dpr-req-filters-head' },
      { text: 'Status', classes: 'dpr-req-status-head' },
      { text: 'Actions', classes: 'dpr-req-actions-head' },
    ],
  }
}

const formatTableRow = (data: FormattedUserReportData, type: 'requested' | 'viewed') => {
  let statusClass
  let itemActions = ''

  const { href, id, reportName, text, timestamp, type: reportType, status } = data
  switch (status) {
    case RequestStatus.FAILED:
      statusClass = 'govuk-tag--red'
      itemActions = itemActionsHtml(href, id, type, status)
      break
    case RequestStatus.EXPIRED:
      statusClass = 'govuk-tag--grey'
      itemActions = itemActionsHtml(href, id, type, status)
      break
    case RequestStatus.ABORTED:
      statusClass = 'govuk-tag--orange'
      itemActions = itemActionsHtml(href, id, type, status)
      break
    case RequestStatus.READY:
    case RequestStatus.FINISHED:
      itemActions = `<a class='govuk-link govuk-link--no-visited-state' href="${href}">Go to ${reportType}</a>`
      statusClass = 'govuk-tag--green'
      break
    case RequestStatus.PICKED:
    case RequestStatus.SUBMITTED:
    case RequestStatus.STARTED:
      itemActions = `<a class='govuk-link govuk-link--no-visited-state' href="${href}">Go to status</a>`
      break
    default:
      break
  }

  let filtersSummary = ''
  if (data.summary) {
    filtersSummary = createSummaryHtml(data)
  }

  return [
    {
      html: createListItemProduct(reportName, text, reportType, timestamp),
    },
    { html: ShowMoreUtils.createShowMoreHtml(data.description, 175) },
    { html: filtersSummary },
    {
      html: `<strong class="govuk-tag dpr-request-status-tag ${statusClass}">${status}</strong>`,
      classes: 'dpr-req-cell dpr-req-cell__status',
    },
    {
      html: `${itemActions}`,
      classes: 'dpr-req-cell dpr-req-cell__status',
    },
  ]
}

const getTotals = (formattedData: FormattedUserReportData[], maxRows: number) => {
  return {
    amount: formattedData.length,
    shown: formattedData.length > maxRows ? maxRows : formattedData.length,
    max: maxRows,
  }
}

const createSummaryHtml = (data: FormattedUserReportData) => {
  const summaryHtml = data.summary.map((item) => `<li class="govuk-body-s">${item.name}: ${item.value}</li>`).join('')
  return `<ul class="dpr-card-group__item__filters-list govuk-!-margin-top-0 govuk-!-margin-bottom-0">${summaryHtml}</ul>`
}

const getMeta = (formattedData: FormattedUserReportData[]) => {
  return formattedData.map((d) => {
    return {
      reportId: d.meta.reportId,
      id: d.meta.id,
      executionId: d.meta.executionId,
      status: d.meta.status,
      requestedAt: d.meta.requestedAt,
      type: d.meta.type,
      dataProductDefinitionsPath: d.meta.dataProductDefinitionsPath,
    }
  })
}

export const setDataFromStatus = (status: RequestStatus, reportsData: UserReportData) => {
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
      href = `${url.report.fullUrl}`
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

const renderList = async ({
  res,
  storeService,
  maxRows,
  filterFunction,
  type,
}: {
  res: Response
  maxRows?: number
  storeService: RequestedReportService | RecentlyViewedStoreService
  filterFunction: (report: UserReportData) => boolean
  type: 'requested' | 'viewed'
}): Promise<RenderTableListResponse> => {
  const csrfToken = (res.locals.csrfToken as unknown as string) || 'csrfToken'
  const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'

  const requestedReportsData: UserReportData[] = await storeService.getAllReports(userId)

  let formatted = requestedReportsData.filter(filterFunction).map(formatData)
  const tableData = formatTable(formatted, type)

  if (maxRows) formatted = formatted.slice(0, maxRows)

  const head = {
    ...(formatted.length && { href: `./async-reports/${type}` }),
    ...(!formatted.length && { emptyMessage: 'You have 0 requested reports' }),
  }
  const result = {
    head,
    tableData,
    total: getTotals(formatted, maxRows),
    meta: getMeta(formatted),
    csrfToken,
    maxRows,
  }

  return result
}

export default {
  renderList,

  getExpiredStatus: async ({
    req,
    res,
    services,
    storeService,
  }: AsyncReportUtilsParams & { storeService: RequestedReportService | RecentlyViewedStoreService }) => {
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
    const report = await getExpiredStatus({ req, res, services })

    if (report && report.isExpired) {
      await storeService.setToExpired(report.executionId, userId)
    }
    return report ? report.isExpired : false
  },

  initLists: async ({ services, res, req }: { services: Services; res: Response; req: Request }) => {
    const requestedReports = await renderList({
      res,
      storeService: services.requestedReportService,
      filterFunction: RequestedReportUtils.filterReports,
      maxRows: 20,
      type: 'requested',
    })

    const viewedReports = await renderList({
      res,
      storeService: services.recentlyViewedService,
      filterFunction: RecentlyViewedCardGroupUtils.filterReports,
      maxRows: 10,
      type: 'viewed',
    })

    const bookmarks = await BookmarklistUtils.renderBookmarkList({
      res,
      req,
      services,
      maxRows: 10,
    })

    return {
      requestedReports,
      viewedReports,
      bookmarks,
    }
  },
}

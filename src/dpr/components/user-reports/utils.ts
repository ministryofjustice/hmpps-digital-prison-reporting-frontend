import { Response, Request } from 'express'
import dayjs from 'dayjs'
import RecentlyViewedStoreService from '../../services/recentlyViewedService'
import RequestedReportService from '../../services/requestedReportService'
import { RenderTableListResponse } from './types'
import Dict = NodeJS.Dict
import {
  FormattedUserReportData,
  UserReportData,
  RequestStatus,
  ReportType,
  RequestedReport,
  StoredReportData,
} from '../../types/UserReports'
import { AsyncReportUtilsParams } from '../../types/AsyncReportUtils'
import { getExpiredStatus } from '../../utils/requestStatusHelper'
import SelectedFiltersUtils from '../_filters/filters-selected/utils'
import { itemActionsHtml, createListItemProduct } from '../../utils/reportListsHelper'
import { Services } from '../../types/Services'
import RequestedReportUtils from './requested/utils'
import RecentlyViewedCardGroupUtils from './viewed/utils'
import BookmarklistUtils from './bookmarks/utils'
import LocalsHelper from '../../utils/localsHelper'
import DateMapper from '../../utils/DateMapper/DateMapper'
import UserStoreItemBuilder from '../../utils/UserStoreItemBuilder'
import { FilterValue } from '../_filters/types'

const formatData = (reportData: UserReportData): FormattedUserReportData => {
  const reportDataCopy: UserReportData = JSON.parse(JSON.stringify(reportData))

  console.log({ reportDataCopy })

  const {
    executionId,
    tableId,
    variantName,
    name,
    reportId,
    variantId,
    id,
    description,
    query,
    interactiveQuery,
    status,
    timestamp,
    reportName,
    dataProductDefinitionsPath,
    type: reportType,
  } = reportDataCopy

  console.log({ interactiveQuery })

  let summary: { name: string; value: string }[] = []
  if (query) {
    summary = query.summary as { name: string; value: string }[]
  }
  let interactiveSummary: { name: string; value: string }[] = []
  if (interactiveQuery) {
    interactiveSummary = interactiveQuery.summary as { name: string; value: string }[]
  }

  const type = reportType || ReportType.REPORT

  return {
    id: executionId,
    text: name || variantName,
    reportName,
    description,
    tag: 'MIS',
    summary,
    interactiveSummary,
    timestamp,
    status,
    type,
    ...setDataFromStatus(status, reportDataCopy),
    meta: {
      reportId,
      id: variantId || id,
      executionId,
      tableId,
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
  if (data.summary || data.interactiveSummary) {
    filtersSummary = createSummaryHtml(data)
  }

  return [
    {
      html: createListItemProduct(reportName, text, reportType, timestamp),
    },
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

const getTotals = (formattedCount: number, maxRows: number) => {
  return {
    amount: formattedCount,
    shown: formattedCount > maxRows ? maxRows : formattedCount,
    max: maxRows,
  }
}

const createSummaryHtml = (data: FormattedUserReportData) => {
  const summaryHtml = data.summary
    .map((item) => `<li class="govuk-body-s dpr-query-summary"><strong>${item.name}</strong>: ${item.value}</li>`)
    .join('')

  const interactiveSummaryHtml = data.interactiveSummary
    .map(
      (item) =>
        `<li class="govuk-body-s dpr-interactive-query-summary"><strong>${item.name}</strong>: ${item.value}</li>`,
    )
    .join('')

  return `<ul class="dpr-card-group__item__filters-list govuk-!-margin-top-0 govuk-!-margin-bottom-0">${summaryHtml}${interactiveSummaryHtml}</ul>`
}

const getMeta = (formattedData: FormattedUserReportData[]) => {
  return formattedData.map((d) => {
    return {
      reportId: d.meta.reportId,
      id: d.meta.id,
      executionId: d.meta.executionId,
      tableId: d.meta.tableId,
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
  let formattedDate
  const { url, timestamp: time } = reportsData
  const dateMapper = new DateMapper()
  switch (status) {
    case RequestStatus.FAILED: {
      formattedDate = time.failed
        ? dateMapper.toDateString(<string>(<unknown>time.failed), 'local-date')
        : dayjs().format('DD/MM/YYYY')
      href = `${url.polling.fullUrl}`
      timestamp = `Failed at: ${formattedDate}`
      break
    }
    case RequestStatus.ABORTED: {
      href = `${url.request.fullUrl}`
      formattedDate = dateMapper.toDateString(<string>(<unknown>time.aborted), 'local-date')
      timestamp = `Aborted at: ${formattedDate}`
      break
    }
    case RequestStatus.FINISHED:
      href = url.report.fullUrl
      formattedDate = dateMapper.toDateString(<string>(<unknown>time.completed), 'local-date')
      timestamp = `Ready at: ${formattedDate}`
      break
    case RequestStatus.EXPIRED: {
      href = `${url.request.fullUrl}`
      formattedDate = dateMapper.toDateString(<string>(<unknown>time.expired), 'local-date')
      timestamp = `Expired at: ${formattedDate}`
      break
    }
    case RequestStatus.READY: {
      href = `${url.report.fullUrl}`
      formattedDate = dateMapper.toDateString(<string>(<unknown>time.lastViewed), 'local-date')
      timestamp = `Last viewed: ${formattedDate}`
      break
    }
    case RequestStatus.SUBMITTED:
    case RequestStatus.STARTED:
    case RequestStatus.PICKED:
      href = url.polling.fullUrl
      formattedDate = dateMapper.toDateString(<string>(<unknown>time.requested), 'local-date')
      timestamp = `Requested at: ${formattedDate}`
      break
    default:
      formattedDate = dateMapper.toDateString(<string>(<unknown>time.lastViewed), 'local-date')
      timestamp = `Last viewed: ${formattedDate}`
      break
  }

  return {
    timestamp,
    href,
  }
}

const renderList = async ({
  res,
  reportsData,
  maxRows,
  filterFunction,
  type,
}: {
  res: Response
  reportsData: StoredReportData[]
  maxRows?: number
  filterFunction: (report: UserReportData) => boolean
  type: 'requested' | 'viewed'
}): Promise<RenderTableListResponse> => {
  const { csrfToken } = LocalsHelper.getValues(res)

  let formatted = reportsData.filter(filterFunction).map(formatData)
  const formattedCount = formatted.length

  if (maxRows) formatted = formatted.slice(0, maxRows)
  const tableData = formatTable(formatted, type)

  const head = {
    ...(formatted.length && { href: `./async-reports/${type}` }),
    ...(!formatted.length && { emptyMessage: `You have 0 ${type} reports` }),
  }

  const result = {
    head,
    tableData,
    total: getTotals(formattedCount, maxRows),
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
    const { userId } = LocalsHelper.getValues(res)
    const report = await getExpiredStatus({ req, res, services })

    if (report && report.isExpired) {
      await storeService.setToExpired(report.executionId, userId)
    }
    return report ? report.isExpired : false
  },

  init: async ({
    services,
    res,
    req,
    maxRows = 6,
  }: {
    services: Services
    res: Response
    req: Request
    maxRows?: number
  }) => {
    const { requestedReports, recentlyViewedReports, bookmarkingEnabled } = LocalsHelper.getValues(res)
    const requestedReportsList = await renderList({
      res,
      reportsData: requestedReports,
      filterFunction: RequestedReportUtils.filterReports,
      maxRows,
      type: 'requested',
    })

    const viewedReportsList = await renderList({
      res,
      reportsData: recentlyViewedReports,
      filterFunction: RecentlyViewedCardGroupUtils.filterReports,
      maxRows,
      type: 'viewed',
    })

    let bookmarks
    if (bookmarkingEnabled) {
      bookmarks = await BookmarklistUtils.renderBookmarkList({
        res,
        req,
        services,
        maxRows,
      })
    }

    return {
      requestedReports: requestedReportsList,
      viewedReports: viewedReportsList,
      bookmarks,
    }
  },

  updateLastViewed: async ({
    req,
    services,
    reportStateData,
    userId,
    filters,
  }: {
    req: Request
    services: Services
    reportStateData: RequestedReport
    userId: string
    search: string
    href: string
    filters: FilterValue[]
  }) => {
    const { type, reportId, reportName, description, id, name, executionId, tableId, query, url } = reportStateData
    const reportData = { type, reportId, reportName, description, id, name }
    const executionData = { executionId, tableId }
    const queryData = query ? { query: query.data, querySummary: query.summary } : { query: {}, querySummary: [] }

    const interactiveQueryData: { query: Dict<string>; querySummary: Array<Dict<string>> } = {
      query: <Dict<string>>req.query,
      querySummary: SelectedFiltersUtils.getQuerySummary(req, filters),
    }

    const recentlyViewedData = new UserStoreItemBuilder()
      .addReportData(reportData)
      .addExecutionData(executionData)
      .addQuery(queryData)
      .addInteractiveQuery(interactiveQueryData)
      .addStatus(RequestStatus.READY)
      .addTimestamp()
      .addAsyncUrls(url)
      .addReportUrls(req)
      .build()

    await services.requestedReportService.updateLastViewed(reportStateData.executionId, userId)
    await services.recentlyViewedService.setRecentlyViewed(recentlyViewedData, userId)
  },
}

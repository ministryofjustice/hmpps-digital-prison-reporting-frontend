import { Request, Response } from 'express'

import { RequestStatus, StoredReportData } from 'src/dpr/types/UserReports'
import {
  DprMyReportActions,
  DprMyReportFilters,
  DprMyReportTitle,
  LinkAction,
  ListType,
  NameValuePair,
  RemoveAction,
  ViewAction,
} from '../types'
import { apiTimestampToUiDateTime, todayAsUiDateTime } from '../../../utils/dateHelper'
import { getRouteLocals } from '../../../utils/localsHelper'

export const buildMyReportListRow = (
  data: StoredReportData,
  status: RequestStatus,
  req: Request,
  res: Response,
  listType: ListType,
) => {
  return {
    title: buildTitleCell(data),
    filters: buildFiltersCell(data),
    status,
    actions: buildActionsCell(data, res, req, listType),
    meta: buildMeta(data, res, listType),
  }
}

/**
 * Builds the titls cell data
 *
 * @param {StoredReportData} data
 * @return {*}  {DprMyReportTitle}
 */
const buildTitleCell = (data: StoredReportData): DprMyReportTitle => {
  return {
    productName: data.reportName,
    reportName: data.name,
    reportType: data.type,
    timestamp: buildTimestamp(data),
  }
}

/**
 * Builds the timestamp to display
 *
 * @param {StoredReportData} data
 * @return {*}
 */
const buildTimestamp = (data: StoredReportData) => {
  const { status, timestamp } = data

  const now = todayAsUiDateTime()
  switch (status) {
    case RequestStatus.FAILED: {
      const { failed } = timestamp
      const ts = failed ? apiTimestampToUiDateTime(failed) : now
      return `Failed at ${ts}`
    }
    case RequestStatus.ABORTED: {
      const { aborted } = timestamp
      const ts = aborted ? apiTimestampToUiDateTime(aborted) : now
      return `Aborted at ${ts}`
    }
    case RequestStatus.FINISHED: {
      const { completed } = timestamp
      const ts = completed ? apiTimestampToUiDateTime(completed) : now
      return `Ready at ${ts}`
    }
    case RequestStatus.EXPIRED: {
      const { expired } = timestamp
      const ts = expired ? apiTimestampToUiDateTime(expired) : now
      return `Expired at ${ts}`
    }
    case RequestStatus.READY: {
      const { lastViewed } = timestamp
      const ts = lastViewed ? apiTimestampToUiDateTime(lastViewed) : now
      return `Last viewed at ${ts}`
    }
    case RequestStatus.SUBMITTED:
    case RequestStatus.STARTED:
    case RequestStatus.PICKED: {
      const { requested } = timestamp
      const ts = requested ? apiTimestampToUiDateTime(requested) : now
      return `Requested at ${ts}`
    }
    default: {
      const { lastViewed } = timestamp
      const ts = lastViewed ? apiTimestampToUiDateTime(lastViewed) : now
      return `Last viewed at ${ts}`
    }
  }
}

/**
 * Builds the filters cell data
 *
 * @param {StoredReportData} data
 * @return {*}  {DprMyReportFilters}
 */
const buildFiltersCell = (data: StoredReportData): DprMyReportFilters => {
  // TODO: investigate the types here
  const prerequest = (data.query?.summary as NameValuePair[] | undefined) || []
  const interactive = (data.interactiveQuery as NameValuePair[] | undefined) || []

  return {
    ...(prerequest && { prerequest }),
    ...(interactive && { interactive }),
  }
}

/**
 * Builds the action cell data
 *
 * @param {StoredReportData} data
 * @param {Response} res
 * @return {*}  {DprMyReportActions}
 */
const buildActionsCell = (
  data: StoredReportData,
  res: Response,
  req: Request,
  listType: ListType,
): DprMyReportActions => {
  const { status, type, url } = data

  let retry: LinkAction | undefined
  let refresh: LinkAction | undefined
  let polling: LinkAction | undefined
  let view: ViewAction | undefined
  let remove: RemoveAction | undefined

  // TODO: Asses whether these can be constructed without store?
  const pollingPageUrl = url?.polling?.fullUrl || ''
  const requestPageUrl = url?.request?.fullUrl || ''
  const reportPageUrl = url?.report?.fullUrl || ''

  switch (status) {
    case RequestStatus.FAILED:
      retry = { href: pollingPageUrl }
      remove = buildRemoveAction(data, res, req, listType)
      break
    case RequestStatus.EXPIRED:
      refresh = { href: requestPageUrl }
      remove = buildRemoveAction(data, res, req, listType)
      break
    case RequestStatus.ABORTED:
      retry = { href: requestPageUrl }
      remove = buildRemoveAction(data, res, req, listType)
      break
    case RequestStatus.READY:
    case RequestStatus.FINISHED:
      view = {
        href: reportPageUrl,
        reportType: type,
      }
      remove = buildRemoveAction(data, res, req, listType)
      break
    case RequestStatus.PICKED:
    case RequestStatus.SUBMITTED:
    case RequestStatus.STARTED:
      polling = { href: pollingPageUrl }
      break
    default:
      break
  }

  return {
    ...(retry && { retry }),
    ...(refresh && { refresh }),
    ...(remove && { remove }),
    ...(view && { view }),
    ...(polling && { polling }),
  }
}

/**
 * Builds the remove action
 *
 * @param {StoredReportData} data
 * @param {Response} res
 * @return {*}
 */
const buildRemoveAction = (data: StoredReportData, res: Response, req: Request, listType: ListType): RemoveAction => {
  const { reportId, id, executionId, tableId } = data
  const { requestedListPath, recentlyViewedListPath } = getRouteLocals(res)

  let action = ''

  if (listType === ListType.REQUESTED) {
    // ASYNC report - only executionId is needed
    action = `${requestedListPath}/remove-item/${executionId}`
  } else if (tableId && executionId) {
    // ASYNC report - tableId and executionId needed
    action = `${recentlyViewedListPath}/remove-item/${executionId}/table-id/${tableId}`
  } else {
    // SYNC report - reportId and Id needed
    action = `${recentlyViewedListPath}/remove-item/report-id/${reportId}/id/${id}`
  }

  return {
    action,
    csrfToken: res.locals.csrfToken,
    returnTo: req.originalUrl,
  }
}

/**
 * Builds the meta data needed by the polling class
 *
 * @param {StoredReportData} data
 * @param {Response} res
 * @return {*}
 */
const buildMeta = (data: StoredReportData, res: Response, listType: ListType) => {
  const { userReportsList } = getRouteLocals(res)
  return {
    id: data.id,
    reportId: data.reportId,
    tableId: data.tableId,
    executionId: data.executionId,
    path: userReportsList,
    listType,
  }
}

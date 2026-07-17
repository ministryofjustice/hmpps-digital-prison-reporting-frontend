import { Request, Response } from 'express'

import { StoredReportData, RequestStatus, LoadType } from '../../../../types/UserReports'
import { getRouteLocals } from '../../../../utils/localsHelper'
import { ListType, DprMyReportActions, LinkAction, ViewAction, MappedBookmarks, MyReportsFormAction } from '../../types'

/**
 * Builds the action cell data
 *
 * @param {StoredReportData} data
 * @param {Response} res
 * @return {*}  {DprMyReportActions}
 */
export const buildActionsCell = (
  data: StoredReportData,
  res: Response,
  req: Request,
  listType: ListType,
): DprMyReportActions => {
  const { status } = data

  let retry: LinkAction | undefined
  let refresh: LinkAction | undefined
  let polling: LinkAction | undefined
  let view: ViewAction | undefined
  let remove: MyReportsFormAction | undefined
  let subscribe: MyReportsFormAction | undefined

  const { request } = buildLoadRequestAction(res, req, data)

  switch (status) {
    case RequestStatus.FAILED:
      retry = buildPollingAction(res, req, data)
      remove = buildRemoveAction(data, res, req, listType)
      break

    case RequestStatus.EXPIRED:
      refresh = request
      remove = buildRemoveAction(data, res, req, listType)
      break

    case RequestStatus.ABORTED:
      retry = request
      remove = buildRemoveAction(data, res, req, listType)
      break

    case RequestStatus.READY:
    case RequestStatus.FINISHED:
      view = buildReportPageAction(res, req, data)
      remove = buildRemoveAction(data, res, req, listType)
      subscribe = buildSubscriptionAction(data, res, req, listType)
      break

    case RequestStatus.PICKED:
    case RequestStatus.SUBMITTED:
    case RequestStatus.STARTED:
      polling = buildPollingAction(res, req, data)
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
    ...(subscribe && { subscribe }),
  }
}

/**
 * Builds the remove action
 *
 * @param {StoredReportData} data
 * @param {Response} res
 * @return {*}
 */
const buildRemoveAction = (
  data: StoredReportData,
  res: Response,
  req: Request,
  listType: ListType,
): MyReportsFormAction => {
  const { reportId, id, executionId, tableId } = data
  const { requestedListPath, recentlyViewedListPath } = getRouteLocals(res)

  let action = ''

  if (listType === ListType.REQUESTED) {
    // ASYNC report - only executionId is needed
    action = `${requestedListPath}/remove-item/${executionId}`
  }

  if (listType === ListType.VIEWED) {
    if (tableId && executionId) {
      // ASYNC report - tableId and executionId needed
      action = `${recentlyViewedListPath}/remove-item/${executionId}/table-id/${tableId}`
    } else {
      // SYNC report - reportId and Id needed
      action = `${recentlyViewedListPath}/remove-item/report-id/${reportId}/id/${id}`
    }
  }

  return {
    action,
    csrfToken: res.locals.csrfToken,
    returnTo: req.originalUrl,
    text: 'Remove',
  }
}

/**
 * Builds the unsubscribe action
 *
 * @param {StoredReportData} data
 * @param {Response} res
 * @param {Request} req
 * @param {ListType} listType
 * @return {*}  {MyReportsFormAction}
 */
const buildSubscriptionAction = (
  data: StoredReportData,
  res: Response,
  req: Request,
  listType: ListType,
): MyReportsFormAction => {
  const { reportId, id } = data
  const { subscribePath } = getRouteLocals(res)

  let action = ''

  if (listType === ListType.SUBSCRIPTIONS) {
    action = `${subscribePath}/${reportId}/${id}/unsubscribe`
  }

  return {
    action,
    csrfToken: res.locals.csrfToken,
    returnTo: req.originalUrl,
    text: 'Unsubscribe',
  }
}

/**
 * Build the load/request links config
 *
 * @param {Response} res
 * @param {MappedBookmarks} data
 * @return {*}
 */
export const buildLoadRequestAction = (res: Response, req: Request, data: MappedBookmarks | StoredReportData) => {
  const { loadType } = data

  let load: ViewAction | undefined
  let request: ViewAction | undefined

  if (loadType === LoadType.SYNC) {
    load = buildLoadAction(res, req, data)
  } else {
    request = buildRequestAction(res, req, data)
  }

  return {
    load,
    request,
  }
}

/**
 * Build the load/request links config
 *
 * @param {Response} res
 * @param {MappedBookmarks} data
 * @return {*}
 */
export const buildRequestAction = (
  res: Response,
  req: Request,
  data: MappedBookmarks | StoredReportData | undefined,
) => {
  if (!data) {
    return undefined
  }

  const { type: reportType, reportId, id } = data
  const { requestReportPath } = getRouteLocals(res)

  const origin = req.get('host') || ''
  const baseUrl = `${req.protocol}://${origin}${requestReportPath}`

  const search = 'url' in data ? (data.url?.request?.search ?? '') : ''

  const href = `${baseUrl}/${reportType}/${reportId}/${id}/filters${search}`

  return {
    href,
    reportType,
  }
}

/**
 * Build the load/request links config
 *
 * @param {Response} res
 * @param {MappedBookmarks} data
 * @return {*}
 */
export const buildLoadAction = (res: Response, req: Request, data: MappedBookmarks | StoredReportData) => {
  const { type: reportType, reportId, id } = data
  const { viewReportPath } = getRouteLocals(res)

  const origin = req.get('host') || ''
  const baseUrl = `${req.protocol}://${origin}${viewReportPath}`

  const href = `${baseUrl}/sync/${reportId}/${id}`

  return {
    href,
    reportType,
  }
}

/**
 * Build the polling URL for a report in state
 *
 * @param {Response} res
 * @param {Request} req
 * @param {StoredReportData} data
 * @return {*}
 */
export const buildPollingAction = (res: Response, req: Request, data: StoredReportData) => {
  const { type: reportType, reportId, id, executionId } = data
  const { requestReportPath } = getRouteLocals(res)

  const origin = req.get('host') || ''
  const baseUrl = `${req.protocol}://${origin}${requestReportPath}`

  const href = `${baseUrl}/${reportType}/${reportId}/${id}/${executionId}/status`

  return {
    href,
    reportType,
  }
}

/**
 * Build the View report page url
 *
 * @param {Response} res
 * @param {Request} req
 * @param {StoredReportData} data
 * @return {*}
 */
export const buildReportPageAction = (res: Response, req: Request, data: StoredReportData) => {
  const { reportId, id, loadType = LoadType.ASYNC, type, tableId, url } = data
  const { viewReportPath } = getRouteLocals(res)

  const origin = req.get('host') || ''
  const baseUrl = `${req.protocol}://${origin}${viewReportPath}`

  let href = `${baseUrl}/${loadType}/${type}/${reportId}/${id}`

  if (loadType === LoadType.ASYNC) {
    href = `${href}/${tableId}`
  }

  const search = url?.report?.search ?? ''
  href = `${href}/${type}${search}`

  return {
    href,
    reportType: type,
  }
}

import { Request, Response } from 'express'
import { Services } from '../../types/Services'
import {
  DprMyReport,
  DprMyReportActions,
  DprMyReportFilters,
  DprMyReportHeading,
  DprMyReportItem,
  DprMyReportListConfig,
  DprMyReportTitle,
  HeadingConfig,
  LinkAction,
  ListType,
  MappedBookmarks,
  NameValuePair,
  RemoveAction,
  ViewAction,
} from './types'
import LocalsHelper, { getRouteLocals } from '../../utils/localsHelper'
import { BookmarkStoreData } from '../../types/Bookmark'
import { LoadType, ReportType, RequestStatus, StoredReportData } from '../../types/UserReports'
import { apiTimestampToUiDateTime, todayAsUiDateTime } from '../../utils/dateHelper'

/**
 * Initialises the "My Reports" component data
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Services} services
 * @return {*}  {DprMyReport}
 */
export const initMyReports = async (req: Request, res: Response, services: Services): Promise<DprMyReport> => {
  const { bookmarkingEnabled } = LocalsHelper.getValues(res)

  return {
    ...(bookmarkingEnabled && { bookmarks: await initBookmarks(res, services) }),
    requested: initRequested(req, res),
    viewed: initViewed(req, res),
  }
}

/**
 * Init bookmarks list
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Services} services
 * @return {*}  {DprMyReportListConfig}
 */
const initBookmarks = async (res: Response, services: Services): Promise<DprMyReportListConfig> => {
  return {
    title: 'Bookmarks',
    listType: ListType.BOOKMARKS,
    headings: buildHeadings(ListType.BOOKMARKS),
    items: await buildBookmarkListItems(res, services),
  }
}

/**
 * Init Requested Reports list
 *
 * @param {Request} req
 * @param {Response} res
 * @return {*}
 */
const initRequested = (req: Request, res: Response) => {
  return {
    title: 'Requested reports',
    listType: ListType.REQUESTED,
    headings: buildHeadings(ListType.REQUESTED),
    items: buildListItems(req, res, ListType.REQUESTED),
  }
}

/**
 * Init Viewed reports list
 *
 * @param {Request} req
 * @param {Response} res
 * @return {*}
 */
const initViewed = (req: Request, res: Response) => {
  return {
    title: 'Requested reports',
    listType: ListType.VIEWED,
    headings: buildHeadings(ListType.VIEWED),
    items: buildListItems(req, res, ListType.VIEWED),
  }
}

// ----------------------------------------------
// LIST ITEMS
// -----------------------------------------------

/**
 * Builds the requested & views list items
 *
 * @param {Request} req
 * @param {Response} res
 * @param {ListType} listType
 * @return {*}  {DprMyReportItem[]}
 */
const buildListItems = (req: Request, res: Response, listType: ListType): DprMyReportItem[] => {
  // get the relevant data from the store
  const listData = getDataForList(res, listType)
  // loop it
  if (!listData) {
    return []
  }

  return listData.map((data: StoredReportData) => {
    return {
      title: buildTitleCell(data),
      filters: buildFiltersCell(data),
      status: data.status as RequestStatus, // TODO: fixed in StoredReportData
      actions: buildActionsCell(data, res, req, listType),
    }
  })
}

/**
 * Builds the bookmark list items
 *
 * @param {Response} res
 * @param {Services} services
 * @return {*}  {Promise<DprMyReportItem[]>}
 */
const buildBookmarkListItems = async (res: Response, services: Services): Promise<DprMyReportItem[]> => {
  const { bookmarks } = LocalsHelper.getValues(res)

  // loop it
  if (!bookmarks) {
    return []
  }

  // gather data for loop.  sdf
  const mappedBookmarks: MappedBookmarks[] = await mapBookmarks(bookmarks, services, res)

  return mappedBookmarks.map((bookmark) => {
    const { name, reportName, reportType, description } = bookmark
    return {
      title: {
        productName: name,
        reportName,
        reportType,
      },
      description: description,
      actions: buildBookmarkActionsCell(bookmark, res),
    }
  })
}

/**
 * Map bookmarks to display data
 *
 * @param {BookmarkStoreData[]} bookmarks
 * @param {Services} services
 * @param {Response} res
 * @return {*}
 */
const mapBookmarks = async (
  bookmarks: BookmarkStoreData[],
  services: Services,
  res: Response,
): Promise<MappedBookmarks[]> => {
  const { token, definitionsPath } = LocalsHelper.getValues(res)

  return await Promise.all(
    bookmarks.map(async (bm) => {
      const { id, reportId, type, variantId } = bm
      const sourceId = variantId || id

      let reportName = ''
      let name = ''
      let description = ''
      let loadType: LoadType = LoadType.ASYNC

      if (!type || (type && type === ReportType.REPORT)) {
        const definition = await services.reportingService.getDefinition(token, reportId, sourceId, definitionsPath)
        const summary = await services.reportingService.getDefinitionSummary(token, reportId, definitionsPath)
        const defSummary = summary.variants.find((v) => v.id === sourceId)

        reportName = definition.variant.name
        name = definition.name
        description = definition.variant.description || definition.description || ''
        loadType = defSummary && defSummary.loadType ? (defSummary.loadType as LoadType) : LoadType.ASYNC
      } else {
        const definition = await services.dashboardService.getDefinition(token, reportId, sourceId, definitionsPath)
        const summary = await services.reportingService.getDefinitionSummary(token, reportId, definitionsPath)
        const defSummary = summary.dashboards?.find((d) => d.id === sourceId)

        reportName = definition?.name || ''
        name = summary?.name || ''
        description = definition?.description || summary?.description || ''
        loadType = defSummary && defSummary.loadType ? (defSummary.loadType as LoadType) : LoadType.ASYNC
      }

      return {
        id: sourceId,
        reportId,
        name,
        reportName,
        reportType: type || ReportType.REPORT,
        description,
        loadType,
      }
    }),
  )
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
  const { requestedListPath, recentlyViewedListPath } = LocalsHelper.getRouteLocals(res)

  // build to action endpoint
  let action = ''
  if (listType === ListType.REQUESTED) {
    // ASYNC report - only executionId is needed
    action = `${requestedListPath}/remove-item/${executionId}`
  } else {
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
    csrfToken: res.locals['csrfToken'],
    returnTo: req.originalUrl,
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
    default:
      const { lastViewed } = timestamp
      const ts = lastViewed ? apiTimestampToUiDateTime(lastViewed) : now
      return `Last viewed at ${ts}`
  }

  return ''
}

/**
 * Builds the bookmark actions cell
 *
 * @param {*} data
 * @param {Response} res
 * @return {*}  {DprMyReportActions}
 */
const buildBookmarkActionsCell = (data: MappedBookmarks, res: Response): DprMyReportActions => {
  const { loadType, reportType, reportId, id } = data
  const { requestReportPath, viewReportPath } = getRouteLocals(res)

  let load: ViewAction | undefined
  let request: ViewAction | undefined

  if (loadType === LoadType.SYNC) {
    const href = `${viewReportPath}/sync/${reportId}/${id}`
    load = {
      href,
      reportType,
    }
  } else {
    const href = `${requestReportPath}/${reportType}/${reportId}/${id}/filters`
    request = {
      href,
      reportType,
    }
  }

  return {
    ...(load && { load }),
    ...(request && { request }),
    bookmark: {},
  }
}

/**
 * Gets the relevant data to build the list
 *
 * @param {Response} res
 * @param {ListType} listType
 * @return {*}  {(StoredReportData[] | undefined)}
 */
const getDataForList = (res: Response, listType: ListType): StoredReportData[] | undefined => {
  const { requestedReports, recentlyViewedReports } = LocalsHelper.getValues(res)
  switch (listType) {
    case ListType.REQUESTED:
      // Only show reports in the list that have not been viewed
      return requestedReports.filter((report) => {
        return report.timestamp ? !report.timestamp.lastViewed : false
      })
    case ListType.VIEWED:
      // Only show READY or EXPIRED reports
      return recentlyViewedReports.filter((report) => {
        return Boolean(
          report.status === RequestStatus.READY ||
          Boolean(report.executionId?.length && report.status === RequestStatus.EXPIRED),
        )
      })
    default:
      break
  }
}

// ----------------------------------------------
// HEADINGS
// -----------------------------------------------

/**
 * Builds the headings
 *
 * @param {ListType} listType
 * @return {*}  {DprMyReportHeading[]}
 */
const buildHeadings = (listType: ListType): DprMyReportHeading[] => {
  return ALL_HEADINGS.filter((heading) => heading.showIn.includes(listType))
}

const ALL_HEADINGS: HeadingConfig[] = [
  {
    key: 'title',
    name: 'Product',
    classes: 'dpr-my-reports__cell--title',
    showIn: [ListType.BOOKMARKS, ListType.REQUESTED],
  },
  {
    key: 'description',
    name: 'Description',
    classes: 'dpr-my-reports__cell--description',
    showIn: [ListType.BOOKMARKS],
  },
  {
    key: 'filters',
    name: 'Filters',
    classes: 'dpr-my-reports__cell--filters',
    showIn: [ListType.REQUESTED],
  },
  {
    key: 'status',
    name: 'Status',
    classes: 'dpr-my-reports__cell--status',
    showIn: [ListType.REQUESTED],
  },
  {
    key: 'actions',
    name: 'Actions',
    classes: 'dpr-my-reports__cell--actions',
    showIn: [ListType.BOOKMARKS, ListType.REQUESTED],
  },
]

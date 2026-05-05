import { Request, Response } from 'express'
import { Services } from '../../types/Services'
import { captureException } from '@sentry/node'
import {
  DprMyReport,
  DprMyReportActionBookmark,
  DprMyReportActions,
  DprMyReportHeading,
  DprMyReportItem,
  DprMyReportListConfig,
  HeadingConfig,
  ListType,
  MappedBookmarks,
  MyReportsListTotals,
  MyReportsOptions,
  ViewAction,
} from './types'
import LocalsHelper, { getRouteLocals } from '../../utils/localsHelper'
import { BookmarkStoreData } from '../../types/Bookmark'
import { LoadType, ReportType, RequestStatus, StoredReportData } from '../../types/UserReports'
import { buildMyReportListRow } from './my-reports-list-item/utils'
import logger from '../../utils/logger'
import {
  expireFinishedReports,
  recordExpiryCheck,
  shouldRunExpiryCheck,
} from 'src/dpr/utils/ReportStatus/getReportStatus'

/**
 * Initialises the "My Reports" component data
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Services} services
 * @return {*}  {DprMyReport}
 */
export const initMyReports = async (
  req: Request,
  res: Response,
  services: Services,
  options?: MyReportsOptions | undefined,
): Promise<DprMyReport | undefined> => {
  const { bookmarkingEnabled } = LocalsHelper.getValues(res)

  return {
    ...(bookmarkingEnabled && { bookmarks: await initBookmarks(res, services) }),
    requested: await initRequested(req, res, services, options),
    viewed: await initViewed(req, res, services, options),
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
const initBookmarks = async (
  res: Response,
  services: Services,
  options?: MyReportsOptions | undefined,
): Promise<DprMyReportListConfig> => {
  const totalItems = await buildBookmarkListItems(res, services)
  const totals = buildTotals(res, totalItems, ListType.BOOKMARKS, options)
  const items = cutItemsToSize(totalItems, options)

  return {
    title: 'Bookmarks',
    listType: ListType.BOOKMARKS,
    headings: buildHeadings(ListType.BOOKMARKS),
    items,
    totals,
  }
}

/**
 * Init Requested Reports list
 *
 * @param {Request} req
 * @param {Response} res
 * @return {*}
 */
const initRequested = async (
  req: Request,
  res: Response,
  services: Services,
  options?: MyReportsOptions | undefined,
) => {
  const { csrfToken } = LocalsHelper.getValues(res)
  const totalItems = await buildListItems(req, res, services, ListType.REQUESTED)
  const totals = buildTotals(res, totalItems, ListType.REQUESTED, options)
  const items = cutItemsToSize(totalItems, options)

  return {
    title: 'Requested reports',
    listType: ListType.REQUESTED,
    csrfToken,
    headings: buildHeadings(ListType.REQUESTED),
    items,
    totals,
  }
}

/**
 * Init Viewed reports list
 *
 * @param {Request} req
 * @param {Response} res
 * @return {*}
 */
const initViewed = async (req: Request, res: Response, services: Services, options?: MyReportsOptions | undefined) => {
  const { csrfToken } = LocalsHelper.getValues(res)
  const totalItems = await buildListItems(req, res, services, ListType.VIEWED)
  const totals = buildTotals(res, totalItems, ListType.VIEWED, options)
  const items = cutItemsToSize(totalItems, options)

  return {
    title: 'Recently viewed',
    listType: ListType.VIEWED,
    csrfToken,
    headings: buildHeadings(ListType.VIEWED),
    items,
    totals,
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
const buildListItems = async (
  req: Request,
  res: Response,
  services: Services,
  listType: ListType,
): Promise<DprMyReportItem[]> => {
  // get the relevant data from the store
  const listData = await getDataForList(res, listType, services)
  // loop it
  if (!listData) {
    return []
  }

  return listData.map((data: StoredReportData) => {
    const status = data.status as RequestStatus
    return buildMyReportListRow(data, status, req, res, listType)
  })
}

const cutItemsToSize = (items: DprMyReportItem[], options?: MyReportsOptions | undefined) => {
  return options?.maxRows ? items.slice(0, options.maxRows) : items
}

/**
 * Builds the list totals
 *
 * @param {Response} res
 * @param {DprMyReportItem[]} items
 * @param {ListType} listType
 * @param {(MyReportsOptions | undefined)} [options]
 * @return {*}  {MyReportsListTotals}
 */
const buildTotals = (
  res: Response,
  items: DprMyReportItem[],
  listType: ListType,
  options?: MyReportsOptions | undefined,
): MyReportsListTotals => {
  let maxRows = 2
  if (options?.maxRows) {
    maxRows = options.maxRows
  }

  const total = items.length
  const shown = items.length > maxRows ? maxRows : items.length

  let href
  if (maxRows < total) {
    const { requestedListPath, recentlyViewedListPath, bookmarkListPath } = getRouteLocals(res)
    switch (listType) {
      case ListType.BOOKMARKS:
        href = `${bookmarkListPath}/list`
        break
      case ListType.REQUESTED:
        href = `${requestedListPath}/list`
        break
      case ListType.VIEWED:
        href = `${recentlyViewedListPath}/list`
        break
      default:
        href = `${requestedListPath}/list`
        break
    }
  }
  return {
    total: items.length,
    shown,
    href,
  }
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
      description,
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

  const mapped = await Promise.all(
    bookmarks.map(async (bm) => {
      try {
        const resolved = await resolveBookmarkDefinition(bm, services, token, definitionsPath)

        return {
          id: resolved.sourceId,
          reportId: bm.reportId,
          name: resolved.name,
          reportName: resolved.reportName,
          reportType: resolved.reportType,
          description: resolved.description,
          loadType: resolved.loadType,
        }
      } catch (error) {
        captureException(error)
        logger.info(`Unable to get info for bookmark: ${bm.reportId} - ${bm.variantId || bm.id}`)
        return null
      }
    }),
  )

  return mapped.filter((bm): bm is MappedBookmarks => bm !== null)
}

/**
 * Resolves the bookmark definition for the bookmark
 *
 * @param {BookmarkStoreData} bm
 * @param {Services} services
 * @param {string} token
 * @param {string} definitionsPath
 * @return {*}
 */
const resolveBookmarkDefinition = async (
  bm: BookmarkStoreData,
  services: Services,
  token: string,
  definitionsPath: string,
) => {
  const { id, reportId, type, variantId } = bm
  const sourceId = variantId || id

  const summary = await services.reportingService.getDefinitionSummary(token, reportId, definitionsPath)

  if (!type || type === ReportType.REPORT) {
    const definition = await services.reportingService.getDefinition(token, reportId, sourceId, definitionsPath)
    const defSummary = summary.variants.find((v) => v.id === sourceId)

    return {
      sourceId,
      reportType: ReportType.REPORT,
      reportName: definition.variant.name,
      name: definition.name,
      description: definition.variant.description || definition.description || '',
      loadType: defSummary?.loadType ? (defSummary.loadType as LoadType) : LoadType.ASYNC,
    }
  }

  const definition = await services.dashboardService.getDefinition(token, reportId, sourceId, definitionsPath)
  const defSummary = summary.dashboards?.find((d) => d.id === sourceId)

  return {
    sourceId,
    reportType: type,
    reportName: definition?.name || '',
    name: summary?.name || '',
    description: definition?.description || summary?.description || '',
    loadType: defSummary?.loadType ? (defSummary.loadType as LoadType) : LoadType.ASYNC,
  }
}

/**
 * Builds the bookmark actions cell
 *
 * @param {*} data
 * @param {Response} res
 * @return {*}  {DprMyReportActions}
 */
const buildBookmarkActionsCell = (data: MappedBookmarks, res: Response): DprMyReportActions => {
  const { load, request } = buildLoadRequestAction(res, data)
  const bookmark = buildBookmarkRemoveAction(res, data)

  return {
    ...(load && { load }),
    ...(request && { request }),
    bookmark,
  }
}

/**
 * Build the load/request links config
 *
 * @param {Response} res
 * @param {MappedBookmarks} data
 * @return {*}
 */
const buildLoadRequestAction = (res: Response, data: MappedBookmarks) => {
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
    load,
    request,
  }
}

/**
 * Build the bookmark link config
 *
 * @param {Response} res
 * @param {MappedBookmarks} data
 * @return {*}
 */
const buildBookmarkRemoveAction = (res: Response, data: MappedBookmarks): DprMyReportActionBookmark => {
  const { reportId, id, reportType } = data
  const { csrfToken } = LocalsHelper.getValues(res)
  const { bookmarkActionEndpoint } = LocalsHelper.getRouteLocals(res)

  return {
    reportId,
    id,
    reportType,
    csrfToken,
    bookmarkActionEndpoint,
    linkType: 'remove',
    linkText: 'Remove bookmark',
  }
}

/**
 * Gets the relevant data to build the list
 *
 * @param {Response} res
 * @param {ListType} listType
 * @return {*}  {(StoredReportData[] | undefined)}
 */
const getDataForList = async (
  res: Response,
  listType: ListType,
  services: Services,
): Promise<StoredReportData[] | undefined> => {
  let { requestedReports, recentlyViewedReports } = LocalsHelper.getValues(res)

  if (shouldRunExpiryCheck(res.req.session)) {
    try {
      const refreshedReports = await expireFinishedReports({
        requestedReports,
        recentlyViewedReports,
        services,
        res,
      })

      requestedReports = refreshedReports.requestedReports
      recentlyViewedReports = refreshedReports.recentlyViewedReports

      recordExpiryCheck(res.req.session)
    } catch (error) {
      logger.error(error)
    }
  }

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
      return undefined
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
    showIn: [ListType.BOOKMARKS, ListType.REQUESTED, ListType.VIEWED],
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
    showIn: [ListType.REQUESTED, ListType.VIEWED],
  },
  {
    key: 'status',
    name: 'Status',
    classes: 'dpr-my-reports__cell--status',
    showIn: [ListType.REQUESTED, ListType.VIEWED],
  },
  {
    key: 'actions',
    name: 'Actions',
    classes: 'dpr-my-reports__cell--actions',
    showIn: [ListType.BOOKMARKS, ListType.REQUESTED, ListType.VIEWED],
  },
]

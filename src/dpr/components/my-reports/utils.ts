import { Request, Response } from 'express'
import { Services } from '../../types/Services'
import {
  DprMyReport,
  DprMyReportActions,
  DprMyReportHeading,
  DprMyReportItem,
  DprMyReportListConfig,
  HeadingConfig,
  ListType,
  MappedBookmarks,
  ViewAction,
} from './types'
import LocalsHelper, { getRouteLocals } from '../../utils/localsHelper'
import { BookmarkStoreData } from '../../types/Bookmark'
import { LoadType, ReportType, RequestStatus, StoredReportData } from '../../types/UserReports'
import { buildMyReportListRow } from './my-reports-list-item/utils'

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
  const { csrfToken } = LocalsHelper.getValues(res)

  return {
    title: 'Requested reports',
    listType: ListType.REQUESTED,
    csrfToken,
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
    title: 'Recently viewed',
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
    const status = data.status as RequestStatus
    return buildMyReportListRow(data, status, req, res, listType)
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

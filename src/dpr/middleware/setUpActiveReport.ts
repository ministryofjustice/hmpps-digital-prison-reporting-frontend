import type { Request, Response, RequestHandler } from 'express'
import { Services } from '../types/Services'
import { buildJourneyKey } from '../utils/sessionHelper'
import { BookmarkService, DefaultFilterValuesService, DownloadPermissionService } from '../services'
import { qsToQueryObject, queryObjectToQs, setNestedPath } from '../utils/urlHelper'
import { LoadType, ReportType } from '../types/UserReports'
import { AcitveReportSessionData } from '../types/ActiveReportSession'
import LocalsHelper from '../utils/localsHelper'
import {
  getDefaultColumnsQueryString,
  getDefaultFiltersQueryString,
  getDefaultSortQueryString,
  getDefinitionByType,
} from '../utils/definitionUtils'
import { FiltersType } from '../components/_filters/filtersTypeEnum'
import { createQsFromSavedDefaults } from '../utils/Personalisation/personalisationUtils'
import { components } from '../types/api'

interface ActiveSessionArgs {
  services: Services
  loadType?: LoadType
  reportType?: ReportType
}

export const storeActiveReportSessionData =
  ({ services, loadType = LoadType.ASYNC }: ActiveSessionArgs): RequestHandler =>
  async (req, res, next) => {
    if (!req.session) {
      return next(new Error('Session not initialized'))
    }

    if (req.method !== 'GET') {
      return next()
    }

    // --- Initialise Session Namespace -------------------------------------
    if (!req.session.activeReport) {
      req.session.activeReport = {}
    }
    const store = req.session.activeReport

    // --- Build Key Variants & Data configurataions -------------------------
    const { baseKey, execKey, tableKey } = buildKeyVariants(req)
    const { baseData, execData, tableData } = await buildDataConfiguration(req, res, services, loadType)

    // --- Write Base Key (always updated) ----------------------------------
    store[baseKey] = {
      ...(store[baseKey] ?? {}),
      ...baseData,
    }

    // --- Write Exec Key (async loading) -----------------------------------
    if (execKey && execData) {
      store[execKey] = {
        ...(store[execKey] ?? {}),
        ...execData,
      }
    }

    // --- Write Table Key (final async state) ------------------------------
    if (tableKey && tableData) {
      store[tableKey] = {
        ...(store[tableKey] ?? {}),
        ...tableData,
      }
    }

    return next()
  }

/**
 * Creates the active report data configuration
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Services} services
 * @return {*}
 */
const buildDataConfiguration = async (req: Request, res: Response, services: Services, loadType: LoadType) => {
  // Normalise Express params (string | string[])
  const asString = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)

  const p = req.params as Record<string, string | string[] | undefined>

  // -------------- Get static values -------------------
  // - values that dont change during the active report journey
  const id = asString(p['id'])!
  const reportId = asString(p['reportId'])!
  const executionId = asString(p['executionId'])
  const tableId = asString(p['tableId'])
  const reportType = <ReportType>asString(p['type'])
  const { definitionsPath, dprUser } = LocalsHelper.getValues(res)
  const { token } = dprUser
  const { fields } = await getDefinitionByType(reportType, services, token, reportId, id, definitionsPath)
  const definitionDefaults = await setUpDefaultsFromDefinition(fields)

  // -------------- Fetch Dynamic Values -------------------
  // values that are subject to change during the journey
  const reportIsBookmarked = await setUpBookmark(req, res, services.bookmarkService)
  const downloadEnabled = await setUpDownloadConfig(req, res, services.downloadPermissionService)
  const feedbackSubmissionFormPath = setupDownloadFeedbackPaths(req, res)
  const reportUrls = setUpReportUrls(req)
  const savedDefaults = await setupSavedDefaults(req, res, services.defaultFilterValuesService, fields)

  // -------------- Prepare Data Payloads -------------------

  const baseData: Partial<AcitveReportSessionData> = {
    id,
    reportId,
    reportIsBookmarked,
    downloadEnabled,
    loadType,
    ...definitionDefaults,
    ...savedDefaults,
  }

  // Sync: these values never change → store them under baseKey
  if (loadType === LoadType.SYNC) {
    Object.assign(baseData, {
      feedbackSubmissionFormPath,
      ...reportUrls,
    })
  }

  const execData: Partial<AcitveReportSessionData> | undefined = executionId ? { executionId } : undefined
  const tableData: Partial<AcitveReportSessionData> | undefined = tableId
    ? {
        tableId,
        ...(executionId && { executionId }),
        ...(feedbackSubmissionFormPath && { feedbackSubmissionFormPath }),
        ...reportUrls,
      }
    : undefined

  return {
    baseData,
    execData,
    tableData,
  }
}

/**
 * initialises the active report keys
 *
 * @param {Request} req
 * @return {*}
 */
export const buildKeyVariants = (req: Request) => {
  const { id, reportId } = req.params as Record<string, string>
  const { executionId, tableId } = req.params as Record<string, string | undefined>

  const baseKey = buildJourneyKey({ reportId, id })
  const execKey = executionId ? buildJourneyKey({ reportId, id, executionId }) : undefined
  const tableKey = tableId ? buildJourneyKey({ reportId, id, tableId }) : undefined

  return {
    baseKey,
    execKey,
    tableKey,
  }
}

/**
 * Sets up the active report journey URLS
 *
 * @param {Request} req
 * @return {*}
 */
const setUpReportUrls = (req: Request) => {
  let currentReportPathname
  let currentReportSearch: string | undefined
  let currentReportUrl
  let currentReportFiltersSearch
  let currentReportColumnsSearch
  let currentPageSizeSearch
  let currentSortSearch

  if (req.originalUrl.includes('view-report')) {
    const url = new URL(req.originalUrl, `${req.protocol}://${req.get('host')}`)
    currentReportPathname = url.pathname
    currentReportSearch = url.search
    currentReportUrl = req.originalUrl
  }

  if (currentReportSearch !== undefined) {
    // Create the current filters string
    const filterQueryObject = qsToQueryObject(currentReportSearch, 'filters.')
    currentReportFiltersSearch = queryObjectToQs(filterQueryObject)

    // Create the current columns string
    const columnsQueryObject = qsToQueryObject(currentReportSearch, 'columns')
    currentReportColumnsSearch = queryObjectToQs(columnsQueryObject)

    // Create the current paging string
    const pageSizeQueryObject = qsToQueryObject(currentReportSearch, 'pageSize')
    currentPageSizeSearch = queryObjectToQs(pageSizeQueryObject)

    // Create the current sort string
    const pageSortQueryObject = qsToQueryObject(currentReportSearch, 'sort')
    currentSortSearch = queryObjectToQs(pageSortQueryObject)
  }

  return {
    ...(currentReportPathname && { currentReportPathname }),
    ...(currentReportSearch !== undefined && { currentReportSearch }),
    ...(currentReportUrl && { currentReportUrl }),
    ...(currentReportFiltersSearch !== undefined && { currentReportFiltersSearch }),
    ...(currentReportColumnsSearch !== undefined && { currentReportColumnsSearch }),
    ...(currentPageSizeSearch !== undefined && { currentPageSizeSearch }),
    ...(currentSortSearch !== undefined && { currentSortSearch }),
  }
}

/**
 * Sets up the default query strings from the definition
 *
 * @param {Request} req
 * @param {Response} res
 * @param {ReportingService} service
 * @return {*}
 */
const setUpDefaultsFromDefinition = async (fields: components['schemas']['FieldDefinition'][]) => {
  const filtersQueryStrings = getDefaultFiltersQueryString(fields)
  const defaultColumnsSearch = getDefaultColumnsQueryString(fields)
  const defautltSortQueryString = getDefaultSortQueryString(fields)

  return {
    ...filtersQueryStrings,
    defaultColumnsSearch,
    defautltSortQueryString,
  }
}

/**
 * Sets up the bookmark configuration for the active report
 *
 * @param {Request} req
 * @param {Response} res
 * @param {BookmarkService} service
 * @return {*}
 */
const setUpBookmark = async (req: Request, res: Response, service: BookmarkService) => {
  const { reportId, id } = <{ id: string; reportId: string }>req.params
  const userId = res.locals['dprUser'].id

  let reportIsBookmarked = false
  if (reportId && id && userId) {
    reportIsBookmarked = (await service.isBookmarked(id, reportId, userId)) || false
  }

  return reportIsBookmarked
}

/**
 * Sets up the download configuration for the active report
 *
 * @param {Request} req
 * @param {Response} res
 * @param {DownloadPermissionService} service
 * @return {*}
 */
const setUpDownloadConfig = async (req: Request, res: Response, service: DownloadPermissionService) => {
  const { reportId, id } = <{ id: string; reportId: string }>req.params
  const userId = res.locals['dprUser'].id

  let downloadEnabled = false
  if (reportId && id && userId) {
    downloadEnabled = await service.downloadEnabledForReport(userId, reportId, id)
  }

  return downloadEnabled
}

/**
 * Sets up the feedback configuration for the active report
 *
 * @param {Request} req
 * @param {Response} res
 * @return {*}
 */
const setupDownloadFeedbackPaths = (req: Request, res: Response) => {
  const { reportId, id, tableId } = <{ id: string; reportId: string; tableId: string }>req.params
  const { nestedBaseUrl } = LocalsHelper.getRouteLocals(res)

  let feedbackSubmissionFormPath
  if (reportId && id) {
    feedbackSubmissionFormPath = tableId
      ? `/dpr/download-report/request-download/${reportId}/${id}/tableId/${tableId}/form`
      : `/dpr/download-report/request-download/${reportId}/${id}/form`

    feedbackSubmissionFormPath = setNestedPath(feedbackSubmissionFormPath, nestedBaseUrl)
  }

  return feedbackSubmissionFormPath
}

/**
 * Sets up the saved defaults as query strings
 *
 * @param {Request} req
 * @param {Response} res
 * @param {DefaultFilterValuesService} service
 * @return {*}
 */
const setupSavedDefaults = async (
  req: Request,
  res: Response,
  service: DefaultFilterValuesService,
  fields: components['schemas']['FieldDefinition'][],
) => {
  const { reportId, id } = <{ id: string; reportId: string }>req.params
  const userId = res.locals['dprUser'].id

  const savedRequestFilterValues = await service.get(userId, reportId, id, FiltersType.REQUEST)
  const savedInteractiveFilterValues = await service.get(userId, reportId, id, FiltersType.INTERACTIVE)

  const savedRequestDefaultsSearch =
    savedRequestFilterValues && savedRequestFilterValues.length
      ? createQsFromSavedDefaults(savedRequestFilterValues, fields)
      : ''

  const savedInteractiveDefaultsSearch =
    savedInteractiveFilterValues && savedInteractiveFilterValues.length
      ? createQsFromSavedDefaults(savedInteractiveFilterValues, fields)
      : ''

  return {
    savedRequestDefaultsSearch,
    savedInteractiveDefaultsSearch,
  }
}

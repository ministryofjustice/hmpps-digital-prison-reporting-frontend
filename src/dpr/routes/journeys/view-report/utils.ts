import { Request, Response } from 'express'
import {
  qsToQueryObject,
  normalizeQueryStringArray,
  queryObjectToQs,
  joinQueryStrings,
} from '../../../utils/queryMappers'
import { components } from '../../../types/api'
import { Services } from '../../../types/Services'
import LocalsHelper from '../../../utils/localsHelper'
import ColumnsUtils from '../../../components/_reports/report-heading/report-columns/report-columns-form/utils'
import { getActiveJourneyValue } from '../../../utils/sessionHelper'
import { getFields } from '../../../utils/definitionUtils'
import { LoadType } from '../../../types/UserReports'

/**
 * Apply interactive query to a REPORT
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Services} services
 * @param {('columns' | 'filters')} applyType
 * @return {*}
 */
export const applyReportInteractiveQuery = async (
  req: Request,
  res: Response,
  services: Services,
  applyType: 'columns' | 'filters',
  loadType: LoadType,
) => {
  const { reportId, id } = <{ id: string; reportId: string }>req.params
  const { token, definitionsPath } = LocalsHelper.getValues(res)

  // Get the definition
  const definition = await services.reportingService.getDefinition(token, reportId, id, definitionsPath)
  const fields = getFields(definition) || []

  return applyInteractiveQuery(req, res, applyType, loadType, fields)
}

/**
 * Apply interactive query to a DASHBOARD
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Services} services
 * @param {('columns' | 'filters')} applyType
 * @return {*}
 */
export const applyDashboardInteractiveQuery = async (
  req: Request,
  res: Response,
  applyType: 'columns' | 'filters',
  loadType: LoadType,
) => {
  return applyInteractiveQuery(req, res, applyType, loadType)
}

/**
 * Apply the interactive query
 *
 * @param {Request} req
 * @param {Response} res
 * @param {('columns' | 'filters')} applyType
 * @param {components['schemas']['FieldDefinition'][]} fields
 */
const applyInteractiveQuery = async (
  req: Request,
  res: Response,
  applyType: 'columns' | 'filters',
  loadType: LoadType,
  fields?: components['schemas']['FieldDefinition'][],
) => {
  const { tableId, id, reportId } = <{ id: string; reportId: string; tableId: string }>req.params

  // Get the stored interactive query data
  const sessionkey = loadType === LoadType.ASYNC ? { id, tableId, reportId } : { id, reportId }
  const queryDataFromSession = getActiveJourneyValue(req, sessionkey, 'currentReportSearch')
  const queryData = queryDataFromSession ? qsToQueryObject(queryDataFromSession, '') : {}

  // Set the query values from the current query
  const preventDefault = queryData?.['preventDefault']
  const pageSize = queryData?.['pageSize']
  const selectedPage = applyType === 'columns' ? queryData?.['selectedPage'] : 1
  const sortColumn = queryData?.['sortColumn']
  const sortedAsc = queryData?.['sortedAsc']

  // Create merged form data
  let formData: Record<string, string | string[]> = {
    ...(preventDefault && { preventDefault }),
    ...(selectedPage && { selectedPage }),
    ...(pageSize && { pageSize }),
    ...(sortColumn && { sortColumn }),
    ...(sortedAsc && { sortedAsc }),
    ...req.body,
  }

  formData =
    applyType === 'columns' && fields
      ? applyColumns(req, queryData, formData, fields)
      : applyFilters(queryData, formData)

  const filtersString = queryObjectToQs(formData)

  // Redirect back to report
  res.redirect(`${req.baseUrl}?${filtersString}`)
}

/**
 * Apply columns
 *
 * @param {Request} req
 * @param {(Record<string, string | string[]>)} queryData
 * @param {(Record<string, string | string[]>)} formData
 * @param {components['schemas']['FieldDefinition'][]} fields
 * @return {*}
 */
const applyColumns = (
  req: Request,
  queryData: Record<string, string | string[]>,
  formData: Record<string, string | string[]>,
  fields: components['schemas']['FieldDefinition'][],
) => {
  const { columns: reqColumns } = req.body

  // Normalize the req columns - should always be an array
  let bodyColumns: string[] = []
  if (reqColumns) {
    bodyColumns = Array.isArray(reqColumns) ? reqColumns : [reqColumns]
  }

  // ensure mandatory cols are present and set the updated columns
  const mandatoryCols = ColumnsUtils.mandatoryColumns(fields)
  const columns = Array.from(new Set([...mandatoryCols, ...bodyColumns]))

  // Keep the filter values the same as current
  let filters = {}
  if (queryData) {
    filters = Object.keys(queryData)
      .filter((key) => key.includes('filters.'))
      .reduce((acc, key) => ({ ...acc, [key]: queryData[key] }), {})
  }

  return { ...formData, columns, ...filters }
}

/**
 * Apply filters
 *
 * @param {(Record<string, string | string[]>)} queryData
 * @param {(Record<string, string | string[]>)} formData
 * @return {*}
 */
const applyFilters = (queryData: Record<string, string | string[]>, formData: Record<string, string | string[]>) => {
  // Ensure current columns stay the same and are normalized
  const columns = normalizeQueryStringArray(queryData?.['columns']) || []

  return { ...formData, columns }
}

/**
 * Reset filters action
 *
 * @param {Request} req
 * @param {Response} res
 */
const resetFilters = (req: Request, res: Response, sessionKey: { id: string; reportId: string; tableId?: string }) => {
  // Create the reset querystring
  const finalQuery = resetFiltersQueryString(req, sessionKey)

  // Redirect with new query string - query string will handle all rendered elements
  if (finalQuery) {
    res.redirect(`${req.baseUrl}?${finalQuery}`)
  }
}

/**
 * Creates the query string to reset the filters
 *
 * @param {Request} req
 * @param {{ id: string; reportId: string; tableId?: string }} sessionKey
 * @return {*}  {string}
 */
const resetFiltersQueryString = (
  req: Request,
  sessionKey: { id: string; reportId: string; tableId?: string },
): string => {
  const defaultSessionKey = { id: sessionKey.id, reportId: sessionKey.reportId }
  const defaultFiltersSearch = getActiveJourneyValue(req, defaultSessionKey, 'interactiveDefaultFiltersSearch')
  const savedInteractiveDefaultsSearch = getActiveJourneyValue(req, defaultSessionKey, 'savedInteractiveDefaultsSearch')

  // Set the effective qs: if saved defaults, use those. Otherwise use DPD defaults
  const effectiveQueryString =
    savedInteractiveDefaultsSearch && savedInteractiveDefaultsSearch.length
      ? savedInteractiveDefaultsSearch
      : defaultFiltersSearch

  // Get all the current stuff
  const currentColumnsSearch = getActiveJourneyValue(req, sessionKey, 'currentReportColumnsSearch')
  const currentSortSearch = getActiveJourneyValue(req, sessionKey, 'currentSortSearch')
  const currentPageSizeSearch = getActiveJourneyValue(req, sessionKey, 'currentPageSizeSearch')

  // Create the final querystring
  return joinQueryStrings(effectiveQueryString, currentColumnsSearch, currentSortSearch, currentPageSizeSearch)
}

/**
 * Creates the query string to reset the columns
 *
 * @param {Request} req
 * @param {{ id: string; reportId: string; tableId?: string }} sessionKey
 * @return {*}  {string}
 */
const resetColumnsQueryString = (
  req: Request,
  sessionKey: { id: string; reportId: string; tableId?: string },
): string => {
  // get the default DPD filters
  const defaultSessionKey = { id: sessionKey.id, reportId: sessionKey.reportId }
  const defaultColumnsSearch = getActiveJourneyValue(req, defaultSessionKey, 'defaultColumnsSearch')

  // Get all the current stuff
  const currentReportFiltersSearch = getActiveJourneyValue(req, sessionKey, 'currentReportFiltersSearch')
  const currentSortSearch = getActiveJourneyValue(req, sessionKey, 'currentSortSearch')
  const currentPageSizeSearch = getActiveJourneyValue(req, sessionKey, 'currentPageSizeSearch')

  // Create the final querystring
  return joinQueryStrings(defaultColumnsSearch, currentReportFiltersSearch, currentSortSearch, currentPageSizeSearch)
}

/**
 * Creates the default query string
 *
 * @param {Request} req
 * @return {*}  {(string | undefined)}
 */
const createDefaultQueryString = (req: Request): string | undefined => {
  const { id, reportId } = req.params as {
    id: string
    reportId: string
    tableId: string
  }

  // Get the report defaults
  const sessionKey = { id, reportId }
  const defaultFiltersSearch = getActiveJourneyValue(req, sessionKey, 'interactiveDefaultFiltersSearch')
  const defaultColumnsSearch = getActiveJourneyValue(req, sessionKey, 'defaultColumnsSearch')
  const savedInteractiveDefaultsSearch = getActiveJourneyValue(req, sessionKey, 'savedInteractiveDefaultsSearch')

  /**
   * A report will always have default columns.
   * Redirect when the request has no query params,
   * applying default columns and optional filters.
   */
  const hasIncomingQueryParams = Object.keys(req.query).length > 0
  if (hasIncomingQueryParams || !defaultColumnsSearch) {
    return undefined
  }

  const filtersToApply =
    savedInteractiveDefaultsSearch && savedInteractiveDefaultsSearch.length
      ? savedInteractiveDefaultsSearch
      : defaultFiltersSearch

  return filtersToApply ? joinQueryStrings(defaultColumnsSearch, filtersToApply) : defaultColumnsSearch
}

/**
 * Redirects the report to use the defaults
 *
 * @param {Response} res
 * @param {Request} req
 * @return {*}
 */
const redirectWithDefaults = (res: Response, req: Request) => {
  const finalQuery = createDefaultQueryString(req)
  if (finalQuery) {
    const baseUrl = req.originalUrl.split('?')[0].replace(/\/$/, '')
    res.redirect(`${baseUrl}?${finalQuery}`)
    return true
  }
  return false
}

export default {
  applyDashboardInteractiveQuery,
  applyReportInteractiveQuery,
  resetFilters,
  resetFiltersQueryString,
  resetColumnsQueryString,
  redirectWithDefaults,
}

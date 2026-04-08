import { Request, Response } from 'express'
import { qsToQueryObject, normalizeQueryStringArray, queryObjectToQs } from 'src/dpr/utils/urlHelper'
import { components } from '../../../types/api'
import { Services } from '../../../types/Services'
import LocalsHelper from '../../../utils/localsHelper'
import ColumnsUtils from '../../../components/_reports/report-heading/report-columns/report-columns-form/utils'
import { getActiveJourneyValue } from 'src/dpr/utils/sessionHelper'
import { getFields } from 'src/dpr/utils/definitionUtils'
import { LoadType } from 'src/dpr/types/UserReports'

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

export default {
  applyDashboardInteractiveQuery,
  applyReportInteractiveQuery,
}

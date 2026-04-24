import { Response, Request } from 'express'
import { DownloadActionParams } from '../../../components/_reports/report-heading/report-actions/types'
import { Services } from '../../../types/Services'
import { components } from '../../../types/api'
import LocalsHelper from '../../../utils/localsHelper'
import logger from '../../../utils/logger'
import { getActiveJourneyValue } from '../../../utils/sessionHelper'
import { qsToQueryObject } from '../../../utils/queryMappers'
import { getField, getFields, validateDefinition } from '../../../utils/definitionUtils'

/**
 * Streams the download for an Async repoort
 *
 * @param {({
 *   services: Services
 *   token: string
 *   tableId: string
 *   reportId: string
 *   id: string
 *   queryParams: Record<string, string | string[]>
 *   res: Response
 * })} args
 * @return {*}
 */
const streamDownloadAsyncData = async (args: {
  services: Services
  token: string
  tableId: string
  reportId: string
  id: string
  queryParams: Record<string, string | string[]>
  res: Response
}) => {
  const { token, services, tableId, reportId, id, queryParams, res } = args

  return services.reportingService.downloadAsyncReport(token, reportId, id, tableId, queryParams, res)
}

/**
 * Streams the download for a sync report
 *
 * @param {({
 *   definition: components['schemas']['SingleVariantReportDefinition']
 *   services: Services
 *   token: string
 *   queryParams: Record<string, string | string[]>
 *   res: Response
 * })} args
 * @return {*}
 */
const streamDownloadSyncData = async (args: {
  definition: components['schemas']['SingleVariantReportDefinition']
  services: Services
  token: string
  queryParams: Record<string, string | string[]>
  res: Response
}) => {
  const { token, services, queryParams, definition, res } = args
  const { variant } = validateDefinition(definition)
  const { resourceName } = variant

  return services.reportingService.downloadSyncReport(token, resourceName, queryParams, res)
}

/**
 * Downloads the report
 *
 * @param {{
 *   req: Request
 *   services: Services
 *   res: Response
 *   redirect: string
 * }} {
 *   req,
 *   services,
 *   res,
 *   redirect,
 * }
 */
export const downloadReport = async ({ req, services, res }: { req: Request; services: Services; res: Response }) => {
  const { reportId, id, tableId } = req.params as { reportId: string; id: string; tableId?: string }
  const { token, definitionsPath: dataProductDefinitionsPath } = LocalsHelper.getValues(res)

  const definition = await services.reportingService.getDefinition(token, reportId, id, dataProductDefinitionsPath)
  const queryParams = setQueryForDownload(req, definition, dataProductDefinitionsPath)

  logger.info(`Initiating streaming...`)

  if (!tableId) {
    await streamDownloadSyncData({
      definition,
      services,
      token,
      queryParams,
      res,
    })
  } else {
    await streamDownloadAsyncData({
      services,
      token,
      reportId,
      id,
      tableId,
      queryParams,
      res,
    })
  }
}

/**
 * Initialises the download config in the UI
 *
 * @param {Response} res
 * @param {Request} req
 * @param {ExtractedDefinitionData} definitionData
 * @param {LoadType} loadType
 * @param {ExtractedRequestData} [requestData]
 * @return {*}  {(DownloadActionParams | undefined)}
 */
export const setUpDownload = (res: Response, req: Request): DownloadActionParams | undefined => {
  const { downloadingEnabled } = LocalsHelper.getValues(res)
  let downloadConfig: DownloadActionParams | undefined

  if (downloadingEnabled) {
    const { tableId, id, reportId } = <{ id: string; tableId?: string; reportId: string }>req.params
    const { csrfToken } = LocalsHelper.getValues(res)
    const { downloadActionEndpoint } = LocalsHelper.getRouteLocals(res)

    const downloadEnabledForReport = getActiveJourneyValue(req, { id, reportId }, 'downloadEnabled')
    const formaction = tableId
      ? `${downloadActionEndpoint}${reportId}/${id}/tableId/${tableId}`
      : `${downloadActionEndpoint}${reportId}/${id}`

    return {
      enabled: downloadingEnabled,
      formAction: formaction,
      canDownload: Boolean(downloadEnabledForReport),
      csrfToken,
    }
  }

  return downloadConfig
}

/**
 * Sets the query for the download API request
 *
 * @param {string} currentReportSearch
 * @param {components['schemas']['SingleVariantReportDefinition']} definition
 * @return {*}
 */
const setQueryForDownload = (
  req: Request,
  definition: components['schemas']['SingleVariantReportDefinition'],
  dataProductDefinitionsPath: string | undefined,
) => {
  const { reportId, id, tableId } = req.params as { reportId: string; id: string; tableId?: string }

  const sessionKey = tableId ? { reportId, id, tableId } : { reportId, id }
  const currentReportSearch = getActiveJourneyValue(req, sessionKey, 'currentReportSearch') || ''

  // Filters query
  const filtersQuery = qsToQueryObject(currentReportSearch, 'filters.')

  // Sort query
  let sortQuery = qsToQueryObject(currentReportSearch, 'sort')
  if (!sortQuery || Object.keys(sortQuery).length === 0) {
    // Fall back to default
    const defaultSortQueryString = getActiveJourneyValue(req, sessionKey, 'defaultSortQueryString') || ''
    sortQuery = qsToQueryObject(defaultSortQueryString, 'sort')
  }

  // Columns
  const columnsQuery = qsToQueryObject(currentReportSearch, 'columns')
  const validColumnsQuery = setColumnsForDownload(columnsQuery, definition)

  return {
    ...filtersQuery,
    ...validColumnsQuery,
    ...sortQuery,
    ...(dataProductDefinitionsPath && { dataProductDefinitionsPath }),
  }
}

/**
 * Gets the columns/fields for the download request
 *
 * - Fields with fieldSource of 'specfield' should be discarded
 *
 * @param {Columns} columns
 * @param {ExtractedDefinitionData} definitionData
 * @return {*}
 */
const setColumnsForDownload = (
  query: Record<string, string | string[]>,
  definition: components['schemas']['SingleVariantReportDefinition'],
): Record<string, string[]> => {
  const fields = getFields(definition)
  const { specification } = definition.variant

  // Ensure sections heading are always included in download, if present
  const sections = specification?.sections || []

  // master columns list
  const requestedColumns = [...new Set([...query['columns'], ...sections])]

  // Ensure only valid columns are part of download query
  const validColumns = requestedColumns.filter((fieldName) => {
    const field = getField(fields, fieldName)
    return field && (field.fieldSource === 'specfield' || field.fieldSource === undefined)
  })

  return { columns: validColumns }
}

export default {
  downloadReport,
  setUpDownload,
}

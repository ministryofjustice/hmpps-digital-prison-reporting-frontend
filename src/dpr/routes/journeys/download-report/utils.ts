import { Response, Request } from 'express'
import { DownloadActionParams } from '../../../components/_reports/report-heading/report-actions/types'
import { Services } from '../../../types/Services'
import { LoadType } from '../../../types/UserReports'
import { components } from '../../../types/api'
import LocalsHelper from '../../../utils/localsHelper'
import { Template } from '../../../types/Templates'
import ReportQuery from '../../../types/ReportQuery'
import logger from '../../../utils/logger'
import { ExtractedDefinitionData, ExtractedRequestData } from '../view-report/async/report/types'
import type { Columns } from '../../../components/_reports/report-heading/report-columns/report-columns-form/types'
import { getActiveJourneyValue } from '../../../utils/sessionHelper'
import { qsToQueryObject } from '../../../utils/queryMappers'

const streamDownloadAsyncData = async (args: {
  services: Services
  token: string
  tableId: string
  reportId: string
  id: string
  queryParams: {
    dataProductDefinitionsPath: string
    columns: string[]
    sortedAsc?: string
    sortColumn?: string
  }
  res: Response
}) => {
  const { token, services, tableId, reportId, id, queryParams, res } = args
  const query: Record<string, string | string[]> = {
    ...queryParams,
  }
  return services.reportingService.downloadAsyncReport(token, reportId, id, tableId, query, res)
}

const streamDownloadSyncData = async (args: {
  definition: components['schemas']['SingleVariantReportDefinition']
  services: Services
  token: string
  queryParams: {
    dataProductDefinitionsPath: string
    sortedAsc?: string
    sortColumn?: string
    columns: string
  }
  res: Response
}) => {
  const { token, services, queryParams, definition, res } = args
  const { variant } = definition
  const { resourceName, specification } = variant
  if (!specification) {
    logger.error(`No specification found for definition ID: ${definition.id} variant ID: ${variant.id}`)
    throw new Error(`No specification found for definition ID: ${definition.id} variant ID: ${variant.id}`)
  }
  const reportQuery = new ReportQuery({
    fields: specification.fields,
    template: specification.template as Template,
    queryParams: {
      ...queryParams,
    },
    definitionsPath: <string>queryParams.dataProductDefinitionsPath,
  })
  return services.reportingService.downloadSyncReport(token, resourceName, reportQuery, res)
}

export const downloadReport = async ({
  req,
  services,
  res,
  redirect,
  loadType,
}: {
  req: Request
  services: Services
  res: Response
  redirect: string
  loadType?: LoadType
}) => {
  const { dprUser, token } = LocalsHelper.getValues(res)
  const { reportId, id, tableId, dataProductDefinitionsPath, cols: columns, sortedAsc, sortColumn } = req.body
  const { downloadPermissionService } = services
  const canDownloadReport = await downloadPermissionService.downloadEnabledForReport(dprUser.id, reportId, id)

  if (!canDownloadReport) {
    res.redirect(redirect)
  } else {
    const streamDownloadQueryParams = {
      dataProductDefinitionsPath,
      ...(columns && { columns: JSON.parse(columns) }),
      ...(sortedAsc && { sortedAsc }),
      ...(sortColumn && { sortColumn }),
    }
    const definition = await services.reportingService.getDefinition(token, reportId, id, dataProductDefinitionsPath)

    logger.info(`Initiating streaming...`)
    if (loadType === LoadType.SYNC) {
      const currentReportSearch = getActiveJourneyValue(req, { id, reportId }, 'currentReportSearch') || ''
      const result = qsToQueryObject(currentReportSearch, 'filters.')
      const queryParams = {
        ...streamDownloadQueryParams,
        ...result,
      }

      console.log(JSON.stringify({ queryParams }, null, 2))

      await streamDownloadSyncData({
        definition,
        services,
        token,
        queryParams,
        res,
      })
    } else {
      const currentReportSearch = getActiveJourneyValue(req, { id, reportId, tableId }, 'currentReportSearch') || ''
      const result = qsToQueryObject(currentReportSearch, 'filters.')
      const queryParams = {
        ...streamDownloadQueryParams,
        ...result,
      }

      console.log(JSON.stringify({ queryParams }, null, 2))

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
}

export const setUpDownload = (
  res: Response,
  req: Request,
  definitionData: ExtractedDefinitionData,
  columns: Columns,
  loadType: LoadType,
  requestData?: ExtractedRequestData,
): DownloadActionParams | undefined => {
  const { downloadingEnabled } = LocalsHelper.getValues(res)
  let downloadConfig: DownloadActionParams | undefined

  if (downloadingEnabled) {
    const { definitionsPath, csrfToken } = LocalsHelper.getValues(res)
    const { downloadActionEndpoint } = LocalsHelper.getRouteLocals(res)
    const { tableId, id, reportId } = <{ id: string; tableId: string; reportId: string }>req.params
    const downloadEnabled = getActiveJourneyValue(req, { id, reportId }, 'downloadEnabled')
    const { reportName, name, specification } = definitionData

    const sections = specification.sections || []
    const downloadColumns = [...new Set([...columns.value, ...sections])]

    const sortColumn = <string>requestData?.queryData?.['sortColumn']
    const sortedAsc = <string>requestData?.queryData?.['sortedAsc']

    return {
      enabled: downloadingEnabled,
      name,
      reportName,
      reportId,
      id,
      tableId,
      columns: downloadColumns,
      definitionPath: definitionsPath,
      loadType,
      formAction: downloadActionEndpoint,
      canDownload: Boolean(downloadEnabled),
      ...(sortColumn && { sortColumn }),
      ...(sortedAsc && { sortedAsc }),
      csrfToken,
    }
  }

  return downloadConfig
}

export default {
  downloadReport,
  setUpDownload,
}

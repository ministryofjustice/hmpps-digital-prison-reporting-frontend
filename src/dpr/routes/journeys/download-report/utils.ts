import { Response, Request } from 'express'
import { KeysList } from 'json-2-csv/lib/types'
import { Services } from '../../../types/Services'
import Dict = NodeJS.Dict
import { LoadType } from '../../../types/UserReports'
import { components } from '../../../types/api'
import LocalsHelper from '../../../utils/localsHelper'
import { Template } from '../../../types/Templates'
import ReportQuery from '../../../types/ReportQuery'
import logger from '../../../utils/logger'

export const getKeys = (reportData: Dict<string>[], fields: components['schemas']['FieldDefinition'][]): KeysList => {
  const keys: KeysList = []
  const keyNames: string[] = []
  reportData.forEach((row) => {
    Object.keys(row).forEach((key) => {
      const field = fields.find((f) => f.name === key)
      if (field && !keyNames.includes(key)) {
        keyNames.push(key)
        keys.push({
          field: key,
          title: field.display,
        })
      }
    })
  })
  return keys
}

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
  assertHasSpecification(definition.id, definition.variant)
  const { variant } = definition
  const { resourceName, specification } = variant
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

function assertHasSpecification(
  id: string,
  variant: components['schemas']['VariantDefinition'],
): asserts variant is components['schemas']['VariantDefinition'] & {
  specification: components['schemas']['Specification']
} {
  if (!variant.specification) {
    logger.error(`No specification found for definition ID: ${id} variant ID: ${variant.id}`)
    throw new Error(`No specification found for definition ID: ${id} variant ID: ${variant.id}`)
  }
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
      await streamDownloadSyncData({
        definition,
        services,
        token,
        queryParams: streamDownloadQueryParams,
        res,
      })
    } else {
      await streamDownloadAsyncData({
        services,
        token,
        reportId,
        id,
        tableId,
        queryParams: streamDownloadQueryParams,
        res,
      })
    }
  }
}

export default {
  downloadReport,
  getKeys,
}

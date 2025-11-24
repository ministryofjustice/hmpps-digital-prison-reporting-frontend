import { Response, Request } from 'express'
import { json2csv, Json2CsvOptions } from 'json-2-csv'
import { KeysList } from 'json-2-csv/lib/types'
import { Services } from '../../../types/Services'
import Dict = NodeJS.Dict
import { LoadType } from '../../../types/UserReports'
import { components } from '../../../types/api'
import LocalsHelper from '../../../utils/localsHelper'
import { Template } from '../../../types/Templates'
import ReportQuery from '../../../types/ReportQuery'

const convertToCsv = (reportData: Dict<string>[], options: Json2CsvOptions) => {
  const csvData = json2csv(reportData, options)
  return csvData
}

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

const applyColumnsAndSort = (data: Dict<string>[], columns: string[]) => {
  return data.map((row) => {
    return Object.keys(row)
      .filter((key) => columns.includes(key))
      .reduce((obj: Dict<string>, key) => {
        // eslint-disable-next-line no-param-reassign
        obj[key] = row[key]
        return obj
      }, {})
  })
}

const removeHtmlTags = (
  reportData: Dict<string>[],
  reportDefinition: components['schemas']['SingleVariantReportDefinition'],
) => {
  // Find HMTL field + name
  const { specification } = reportDefinition.variant
  if (specification) {
    const { fields } = specification
    const htmlFields = fields.filter((field) => {
      return field.type === 'HTML'
    })

    if (htmlFields.length) {
      reportData.map((d) => {
        htmlFields.forEach((field) => {
          const { name } = field
          const colValue = d[name]
          if (colValue) {
            const innerText = /target="_blank">(.*?)<\/a>/g.exec(colValue)
            // eslint-disable-next-line prefer-destructuring, no-param-reassign
            d[name] = innerText ? innerText[1] : colValue
          }
        })
        return d
      })
    }
  }
  return reportData
}

const dowloadAsyncData = async (args: {
  services: Services
  token: string
  tableId: string
  reportId: string
  id: string
  queryParams: {
    dataProductDefinitionsPath: string
    sortedAsc?: string
    sortColumn?: string
  }
}) => {
  const { token, services, tableId, reportId, id, queryParams } = args
  const pageSize = await services.reportingService.getAsyncCount(token, tableId)
  const query: Record<string, string | string[]> = {
    ...queryParams,
    pageSize: pageSize.toString(),
  }
  return services.reportingService.getAsyncReport(token, reportId, id, tableId, query)
}

const downloadSyncData = async (args: {
  definition: components['schemas']['SingleVariantReportDefinition']
  services: Services
  token: string
  queryParams: {
    dataProductDefinitionsPath: string
    sortedAsc?: string
    sortColumn?: string
  }
}) => {
  const { token, services, queryParams, definition } = args
  const { variant } = definition
  const { resourceName, specification } = variant
  let data: Dict<string>[] = []

  if (specification) {
    const countReportQuery = new ReportQuery({
      fields: specification.fields,
      template: specification.template as Template,
      queryParams,
      definitionsPath: <string>queryParams.dataProductDefinitionsPath,
    })
    const count = await services.reportingService.getCount(resourceName, token, countReportQuery)

    const dataReportQuery = new ReportQuery({
      fields: specification.fields,
      template: specification.template as Template,
      queryParams: {
        ...queryParams,
        pageSize: count.toString(),
      },
      definitionsPath: <string>queryParams.dataProductDefinitionsPath,
    })
    const reportData = await services.reportingService.getListWithWarnings(resourceName, token, dataReportQuery)
    data = reportData.data
  }

  return data
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
  const {
    reportId,
    id,
    tableId,
    dataProductDefinitionsPath,
    reportName,
    name,
    cols: columns,
    sortedAsc,
    sortColumn,
  } = req.body
  const { downloadPermissionService } = services
  const canDownloadReport = await downloadPermissionService.downloadEnabledForReport(dprUser.id, reportId, id)
  if (!canDownloadReport) {
    res.redirect(redirect)
  } else {
    const definition = await services.reportingService.getDefinition(token, reportId, id, dataProductDefinitionsPath)
    const queryParams = {
      dataProductDefinitionsPath,
      ...(sortedAsc && { sortedAsc }),
      ...(sortColumn && { sortColumn }),
    }

    let reportData
    if (loadType === LoadType.SYNC) {
      reportData = await downloadSyncData({
        definition,
        services,
        token,
        queryParams,
      })
    } else {
      reportData = await dowloadAsyncData({
        services,
        token,
        reportId,
        id,
        tableId,
        queryParams,
      })
    }
    if (columns) {
      reportData = applyColumnsAndSort(reportData, JSON.parse(columns))
    }
    reportData = removeHtmlTags(reportData, definition)
    const fields = definition.variant.specification?.fields || []
    const keys: KeysList = getKeys(reportData, fields)
    const csvData = convertToCsv(reportData, { keys, emptyFieldValue: '' })

    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Content-disposition', `attachment; filename=${reportName}-${name}-${new Date().toISOString()}.csv`)
    res.end(csvData)
  }
}

export default {
  downloadReport,
  getKeys,
}

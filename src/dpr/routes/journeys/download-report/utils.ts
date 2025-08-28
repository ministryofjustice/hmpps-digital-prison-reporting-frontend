import { Response, Request } from 'express'
import { json2csv, Json2CsvOptions } from 'json-2-csv'
import { KeysList } from 'json-2-csv/lib/types'
import { Services } from '../../../types/Services'
import Dict = NodeJS.Dict
import { LoadType } from '../../../types/UserReports'
import SyncReportUtils from '../view-report/sync/report/utils'
import { components } from '../../../types/api'
import LocalsHelper from '../../../utils/localsHelper'

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
      if (!keyNames.includes(key)) {
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
  const { fields } = reportDefinition.variant.specification
  const htmlFields = fields.filter((field) => {
    return field.type === 'HTML'
  })

  if (htmlFields.length) {
    reportData.map((d) => {
      htmlFields.forEach((field) => {
        const { name } = field
        const innerText = /target="_blank">(.*?)<\/a>/g.exec(d[name])
        // eslint-disable-next-line prefer-destructuring, no-param-reassign
        d[name] = innerText ? innerText[1] : d[name]
      })
      return d
    })
  }

  return reportData
}

export default {
  async downloadReport({
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
  }) {
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

    const canDownload = await services.downloadPermissionService.downloadEnabled(dprUser.id, reportId, id)
    if (!canDownload) {
      res.redirect(redirect)
    } else {
      const reportDefinition = await services.reportingService.getDefinition(
        token,
        reportId,
        id,
        dataProductDefinitionsPath,
      )

      let reportData
      if (loadType === LoadType.SYNC) {
        const { reportData: listWithWarnings } = await SyncReportUtils.getReportData({
          services,
          req,
          token,
          reportId,
          id,
        })
        reportData = listWithWarnings.data
      } else {
        const pageSize = await services.reportingService.getAsyncCount(token, tableId)
        const query = {
          dataProductDefinitionsPath,
          pageSize,
          ...(sortedAsc && { sortedAsc }),
          ...(sortColumn && { sortColumn }),
        }
        reportData = await services.reportingService.getAsyncReport(token, reportId, id, tableId, query)
      }
      if (columns) {
        reportData = applyColumnsAndSort(reportData, JSON.parse(columns))
      }
      reportData = removeHtmlTags(reportData, reportDefinition)
      const keys: KeysList = getKeys(reportData, reportDefinition.variant.specification.fields)
      const csvData = convertToCsv(reportData, { keys, emptyFieldValue: '' })

      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Content-disposition', `attachment; filename=${reportName}-${name}-${new Date().toISOString()}.csv`)
      res.end(csvData)
    }
  },
  getKeys,
}

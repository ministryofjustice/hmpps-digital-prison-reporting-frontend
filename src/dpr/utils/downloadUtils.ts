import { Response, Request } from 'express'
import { json2csv, Json2CsvOptions } from 'json-2-csv'
import { KeysList } from 'json-2-csv/lib/types'
import { Services } from '../types/Services'
import Dict = NodeJS.Dict
import { LoadType } from '../types/UserReports'
import SyncReportUtils from '../components/_sync/sync-report/utils'
import EmbeddedReportUtils from '../components/_embedded/embedded-report/utils'
import { components } from '../types/api'

const convertToCsv = (reportData: Dict<string>[], options: Json2CsvOptions) => {
  const csvData = json2csv(reportData, options)
  return csvData
}

const getKeys = (
  reportData: Dict<string>[],
  reportDefinition: components['schemas']['SingleVariantReportDefinition'],
): KeysList => {
  const { fields } = reportDefinition.variant.specification
  const keys: KeysList = []
  Object.keys(reportData[0]).forEach((key) => {
    const field = fields.find((f) => f.name === key)
    keys.push({
      field: key,
      title: field.display,
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
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
    const token = res.locals.user?.token ? res.locals.user.token : 'token'

    const { reportId, id, tableId, dataProductDefinitionsPath, reportName, name, cols: columns } = req.body

    const canDownload = await services.downloadPermissionService.downloadEnabled(userId, reportId, id)
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
        const { reportData: listWithWarnings } = await SyncReportUtils.getSyncReportData(
          services,
          req,
          token,
          reportId,
          id,
        )
        reportData = listWithWarnings.data
      } else if (loadType === LoadType.EMBEDDED) {
        const { reportData: listWithWarnings } = await EmbeddedReportUtils.getSyncReportData(
          services,
          req,
          token,
          reportId,
          id,
          {
            dpdPath: dataProductDefinitionsPath,
          },
        )
        reportData = listWithWarnings.data
      } else {
        const pageSize = await services.reportingService.getAsyncCount(token, tableId)
        reportData = await services.reportingService.getAsyncReport(token, reportId, id, tableId, {
          dataProductDefinitionsPath,
          pageSize,
        })
      }

      if (columns) {
        reportData = applyColumnsAndSort(reportData, JSON.parse(columns))
      }
      const keys: KeysList = getKeys(reportData, reportDefinition)
      const csvData = convertToCsv(reportData, { keys })

      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Content-disposition', `attachment; filename=${reportName}-${name}-${new Date().toISOString()}.csv`)
      res.end(csvData)
    }
  },
}

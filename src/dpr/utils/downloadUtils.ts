import { Response, Request } from 'express'
import { json2csv } from 'json-2-csv'
import fs from 'fs-extra'
import { Services } from '../types/Services'
import Dict = NodeJS.Dict
import logger from './logger'
import { LoadType } from '../types/UserReports'
import SyncReportUtils from './renderSyncReport'

const convertToCsv = (reportData: Dict<string>[]) => {
  const csvData = json2csv(reportData)
  return csvData
}

const saveToFile = async (csvData: string, reportName: string, variantName: string) => {
  const filepath = `./download/${reportName}-${variantName}-${new Date().toISOString()}.csv`
  await fs.outputFile(filepath, csvData)
  return {
    filepath,
  }
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
    loadType: LoadType
  }) {
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
    const token = res.locals.user?.token ? res.locals.user.token : 'token'

    const { reportId, id, tableId, dataProductDefinitionsPath, reportName, variantName, cols: columns } = req.body

    const canDownload = await services.downloadPermissionService.downloadEnabled(userId, reportId, id)
    if (!canDownload) {
      res.redirect(redirect)
    } else {
      let reportData
      if (loadType === LoadType.SYNC) {
        const { reportData: listWithWarnings } = await SyncReportUtils.getSyncReportData(
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
        reportData = await services.reportingService.getAsyncReport(token, reportId, id, tableId, {
          dataProductDefinitionsPath,
        })
      }

      if (columns) {
        reportData = applyColumnsAndSort(reportData, JSON.parse(columns))
      }
      const csvData = convertToCsv(reportData)
      const fileData = await saveToFile(csvData, reportName, variantName)

      res.download(fileData.filepath, (err) => {
        if (err) {
          logger.error(err)
        } else {
          logger.info(`Download completed: ${userId}: ${reportName} - ${variantName}`)
          fs.unlinkSync(fileData.filepath)
        }
      })
    }
  },
}

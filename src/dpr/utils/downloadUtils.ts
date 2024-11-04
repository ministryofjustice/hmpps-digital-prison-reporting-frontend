import { Response, Request } from 'express'
import { json2csv } from 'json-2-csv'
import fs from 'fs-extra'
import { Services } from '../types/Services'
import Dict = NodeJS.Dict
import logger from './logger'

const convertToCsv = (reportData: Dict<string>[]) => {
  const csvData = json2csv(reportData)
  return csvData
}

const saveToFile = async (csvData: string, reportName: string, variantName: string) => {
  const filepath = `./download/${reportName}-${variantName}-${new Date().toISOString()}.csv`
  await fs.outputFile(filepath, csvData)

  const data = await fs.readFile(filepath, 'utf8')
  console.log(data)

  return {
    filepath,
  }
}

export default {
  async downloadReport({ req, services, res }: { req: Request; services: Services; res: Response }) {
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
    const token = res.locals.user?.token ? res.locals.user.token : 'token'

    const { reportId, id, tableId, dataProductDefinitionsPath, reportName, variantName } = req.body

    const canDownload = await services.downloadPermissionService.downloadEnabled(userId, reportId, id)
    if (!canDownload) {
      res.redirect(`/async/report/${reportId}/${id}/request/${tableId}/report/download-disabled`)
    } else {
      const reportData = await services.reportingService.getAsyncReport(token, reportId, id, tableId, {
        dataProductDefinitionsPath,
      })

      const csvData = convertToCsv(reportData)
      const fileData = await saveToFile(csvData, reportName, variantName)

      res.download(fileData.filepath, (err) => {
        logger.error(err)
      })
    }
  },
}

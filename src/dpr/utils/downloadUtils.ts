import { Response, Request } from 'express'
import { Services } from '../types/Services'
import Dict = NodeJS.Dict
import logger from './logger'

const convertToCsv = (reportData: Dict<string>[]) => {
  const csvData = ''
  return csvData
}

const saveToFile = (csvData: string) => {
  return {
    filepath: './src/dpr/download/test.txt',
  }
}

export default {
  async downloadReport({ req, services, res }: { req: Request; services: Services; res: Response }) {
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
    const token = res.locals.user?.token ? res.locals.user.token : 'token'

    const { reportId, id, tableId, dataProductDefinitionsPath } = req.body

    const canDownload = await services.downloadPermissionService.downloadEnabled(userId, reportId, id)
    if (!canDownload) {
      res.redirect(`/async/report/${reportId}/${id}/request/${tableId}/report/download-disabled`)
    } else {
      const reportData = await services.reportingService.getAsyncReport(token, reportId, id, tableId, {
        dataProductDefinitionsPath,
      })

      const csvData = convertToCsv(reportData)
      const fileData = saveToFile(csvData)

      res.download(fileData.filepath, (err) => {
        logger.error(err)
      })
    }
  },
}

import { Request } from 'express'
import { SyncReportOptions, SyncReportUtilsParams } from '../types/SyncReportUtils'
import ReportQuery from '../types/ReportQuery'
import SyncReportUtils from '../components/sync-report-list/utils'
import { LoadType } from '../types/UserReports'
import { Services } from '../types/Services'

const initUserOptions = async (options: SyncReportOptions, services: Services, req: Request, userId: string) => {
  const { reportId, id } = req.params

  let canDownload
  let bookmarked
  let removeBookmark = true

  if (options.download) {
    canDownload = await services.downloadPermissionService.downloadEnabled(userId, reportId, id)
  }

  if (options.bookmark) {
    removeBookmark = !options.bookmark
    bookmarked = await services.bookmarkService.isBookmarked(id, userId)
  }

  return {
    bookmarked,
    removeBookmark,
    canDownload,
  }
}

const getSyncReportData = async (services: Services, req: Request, token: string, reportId: string, id: string) => {
  const { dataProductDefinitionsPath: defPath } = req.query

  const reportDefinition = await services.reportingService.getDefinition(token, reportId, id, defPath)
  const { variant } = reportDefinition
  const { resourceName, specification } = variant

  const reportQuery = new ReportQuery(specification, req.query, <string>defPath)
  return {
    reportData: await services.reportingService.getListWithWarnings(resourceName, token, reportQuery),
    reportDefinition,
    reportQuery,
  }
}

const getReport = async ({ req, res, services, options = {} }: SyncReportUtilsParams) => {
  const csrfToken = (res.locals.csrfToken as unknown as string) || 'csrfToken'
  const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
  const token = res.locals.user?.token ? res.locals.user.token : 'token'
  const { reportId, id } = req.params

  const { reportData, reportDefinition, reportQuery } = await getSyncReportData(services, req, token, reportId, id)
  const count = await services.reportingService.getCount(reportDefinition.variant.resourceName, token, reportQuery)
  const userOptions = await initUserOptions(options, services, req, userId)
  const renderData = await SyncReportUtils.getRenderData({
    req,
    reportDefinition,
    reportQuery,
    reportData,
    count,
    csrfToken,
    options,
  })

  return {
    renderData: {
      ...renderData,
      ...userOptions,
      csrfToken,
      loadType: LoadType.SYNC,
      reportId,
      id,
    },
  }
}

export default {
  getReport,
  getSyncReportData,
}

import { AsyncReportUtilsParams } from '../types/AsyncReportUtils'
import ReportQuery from '../types/ReportQuery'
import SyncReportUtils from '../components/sync-report-list/utils'
import { ListWithWarnings } from '../data/types'
import { LoadType } from '../types/UserReports'

const getReport = async ({ req, res, services }: AsyncReportUtilsParams) => {
  const csrfToken = (res.locals.csrfToken as unknown as string) || 'csrfToken'
  const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
  const token = res.locals.user?.token ? res.locals.user.token : 'token'

  const { reportId, id } = req.params
  const { dataProductDefinitionsPath } = req.query

  const reportDefinition = await services.reportingService.getDefinition(
    token,
    reportId,
    id,
    dataProductDefinitionsPath,
  )

  const { variant } = reportDefinition
  const { resourceName, specification } = variant
  const reportQuery = new ReportQuery(specification, req.query, <string>dataProductDefinitionsPath)

  const reportData: ListWithWarnings = await services.reportingService.getListWithWarnings(
    resourceName,
    token,
    reportQuery,
  )

  const count = await services.reportingService.getCount(resourceName, token, reportQuery)
  const canDownload = await services.downloadPermissionService.downloadEnabled(userId, reportId, id)

  const renderData = SyncReportUtils.getRenderData({
    req,
    reportDefinition,
    reportQuery,
    reportData,
    count,
    csrfToken,
  })

  return {
    renderData: {
      ...renderData,
      csrfToken,
      canDownload,
      loadType: LoadType.SYNC,
      bookmarked: await services.bookmarkService.isBookmarked(id, userId),
    },
  }
}

export default {
  getReport,
}

import { Request } from 'express'
import { SyncReportFeatures, SyncReportOptions, SyncReportUtilsParams } from '../types/SyncReportUtils'
import ReportQuery from '../types/ReportQuery'
import SyncReportUtils from '../components/sync-report-list/utils'
import { LoadType } from '../types/UserReports'
import { Services } from '../types/Services'

const initAdditionalFeatures = async (
  features: SyncReportFeatures,
  services: Services,
  req: Request,
  userId: string,
) => {
  const { reportId, id } = req.params

  let canDownload
  let bookmarked
  let removeBookmark = true

  if (features.download) {
    canDownload = await services.downloadPermissionService.downloadEnabled(userId, reportId, id)
  }

  if (features.bookmark) {
    removeBookmark = !features.bookmark
    bookmarked = await services.bookmarkService.isBookmarked(id, userId)
  }

  return {
    bookmarked,
    removeBookmark,
    canDownload,
  }
}

const getSyncReportData = async (
  services: Services,
  req: Request,
  token: string,
  reportId: string,
  id: string,
  options: SyncReportOptions,
) => {
  const { dpdPath } = options
  const reportDefinition = await services.reportingService.getDefinition(token, reportId, id, dpdPath)
  const { variant } = reportDefinition
  const { resourceName, specification } = variant

  const reportQuery = new ReportQuery(specification, req.query, <string>dpdPath)
  return {
    reportData: await services.reportingService.getListWithWarnings(resourceName, token, reportQuery),
    reportDefinition,
    reportQuery,
  }
}

const getReport = async ({ req, res, services, features = {}, options = {} }: SyncReportUtilsParams) => {
  const csrfToken = (res.locals.csrfToken as unknown as string) || 'csrfToken'
  const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
  const token = res.locals.user?.token ? res.locals.user.token : 'token'
  const { reportId, id } = req.params
  const { dataProductDefinitionsPath } = req.query

  // eslint-disable-next-line no-param-reassign
  options.dpdPath = <string>dataProductDefinitionsPath || options.dpdPath

  const { reportData, reportDefinition, reportQuery } = await getSyncReportData(
    services,
    req,
    token,
    reportId,
    id,
    options,
  )
  const count = await services.reportingService.getCount(reportDefinition.variant.resourceName, token, reportQuery)
  const userFeaturesConfig = await initAdditionalFeatures(features, services, req, userId)
  const renderData = await SyncReportUtils.getRenderData({
    req,
    reportDefinition,
    reportQuery,
    reportData,
    count,
    csrfToken,
    features,
    options,
  })

  return {
    renderData: {
      ...renderData,
      ...userFeaturesConfig,
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

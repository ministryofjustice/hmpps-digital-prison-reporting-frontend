import type { Request } from 'express'
import type { components } from '../../../types/api'
import type { ListWithWarnings } from '../../../data/types'
import type { Columns } from '../../_reports/report-columns-form/types'
import {
  EmbeddedReportFeaturesList,
  type EmbeddedReportFeatures,
  type EmbeddedReportUtilsParams,
} from '../../../types/EmbeddedReportUtils'
import type { Services } from '../../../types/Services'
import type { DownloadActionParams } from '../../_reports/report-actions/types'
import { LoadType, ReportType } from '../../../types/UserReports'
import ReportQuery from '../../../types/ReportQuery'

import ReportActionsUtils from '../../_reports/report-actions/utils'
import SyncReportUtils from '../../_sync/sync-report/utils'
import LocalsHelper from '../../../utils/localsHelper'

const setActions = (
  csrfToken: string,
  reportDefinition: components['schemas']['SingleVariantReportDefinition'],
  columns: Columns,
  url: string,
  canDownload: boolean,
  count: number,
  dataProductDefinitionsPath: string,
  features: EmbeddedReportFeatures,
  currentUrl: string,
  currentQueryParams: string,
) => {
  const { name: reportName, variant, id: reportId } = reportDefinition
  const { name, id, printable } = variant

  const downloadFeature = features?.list?.includes(EmbeddedReportFeaturesList.download)

  const downloadConfig: DownloadActionParams = {
    enabled: count > 0 && downloadFeature,
    name,
    reportName,
    csrfToken,
    reportId,
    id,
    columns: columns.value,
    loadType: LoadType.SYNC,
    definitionPath: dataProductDefinitionsPath,
    canDownload,
    currentUrl,
    currentQueryParams,
  }

  return ReportActionsUtils.getActions({
    ...(downloadFeature && {
      download: downloadConfig,
    }),
    print: {
      enabled: printable,
    },
    share: {
      reportName,
      name,
      url,
    },
    copy: {
      url,
    },
  })
}

const initAdditionalFeatures = async (
  features: EmbeddedReportFeatures,
  services: Services,
  req: Request,
  userId: string,
) => {
  const { reportId, id } = req.params

  let canDownload
  let bookmarked
  let removeBookmark = true

  const downloadFeatureEnabled = features?.list?.includes(EmbeddedReportFeaturesList.download)
  if (downloadFeatureEnabled) {
    canDownload = await services.downloadPermissionService.downloadEnabled(userId, reportId, id)
  }

  const bookmarkFeatureEnabled = features?.list?.includes(EmbeddedReportFeaturesList.bookmark)
  if (bookmarkFeatureEnabled) {
    removeBookmark = !bookmarkFeatureEnabled
    bookmarked = await services.bookmarkService.isBookmarked(id, userId)
  }

  return {
    bookmarked,
    removeBookmark,
    canDownload,
  }
}

const getReport = async ({ req, res, services, features, options = {} }: EmbeddedReportUtilsParams) => {
  const { csrfToken, userId, token } = LocalsHelper.getValues(res)
  const { reportId, id } = req.params

  req.query = LocalsHelper.setDdpPathToReqQuery(req, options.dpdPath)
  const { dataProductDefinitionsPath } = req.query

  const { reportData, reportDefinition, reportQuery } = await SyncReportUtils.getReportData({
    services,
    req,
    token,
    reportId,
    id,
  })

  const count = await services.reportingService.getCount(reportDefinition.variant.resourceName, token, reportQuery)
  const userFeaturesConfig = await initAdditionalFeatures(features, services, req, userId)
  const renderData = await getRenderData({
    req,
    reportDefinition,
    reportQuery,
    reportData,
    count,
    csrfToken,
    features,
    canDownload: userFeaturesConfig.canDownload,
  })

  const result = {
    renderData: {
      ...renderData,
      ...userFeaturesConfig,
      csrfToken,
      loadType: LoadType.SYNC,
      reportId,
      id,
      dataProductDefinitionsPath,
    },
  }

  return result
}

const getRenderData = async ({
  req,
  reportDefinition,
  reportQuery,
  reportData,
  count,
  csrfToken,
  features,
  canDownload,
}: {
  req: Request
  reportDefinition: components['schemas']['SingleVariantReportDefinition']
  reportQuery: ReportQuery
  reportData: ListWithWarnings
  csrfToken: string
  count: number
  features: EmbeddedReportFeatures
  canDownload: boolean
}) => {
  const { dataProductDefinitionsPath } = req.query
  const { name: reportName, description: reportDescription } = reportDefinition
  const { specification, name, description, classification, printable } = reportDefinition.variant
  const { data } = reportData

  const reportRenderData = await SyncReportUtils.getReportRenderData(req, count, specification, reportQuery, data)

  const actions = setActions(
    csrfToken,
    reportDefinition,
    reportRenderData.columns,
    `${req.protocol}://${req.get('host')}${req.originalUrl}`,
    canDownload,
    count,
    <string>dataProductDefinitionsPath,
    features,
    reportRenderData.reportUrl,
    reportRenderData.reportSearch,
  )

  return {
    ...reportRenderData,
    reportName,
    name,
    description: description || reportDescription,
    count,
    type: ReportType.REPORT,
    classification,
    printable,
    actions,
    warnings: reportData.warnings,
  }
}

export default {
  getRenderData,
  getReport,
}

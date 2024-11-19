import parseUrl from 'parseurl'
import { Request } from 'express'
import PaginationUtils from '../../_reports/report-pagination/utils'
import TotalsUtils from '../../_reports/report-totals/utils'
import { components } from '../../../types/api'
import DataTableBuilder from '../../../utils/DataTableBuilder/DataTableBuilder'
import { DataTable } from '../../../utils/DataTableBuilder/types'
import ColumnUtils from '../../_reports/report-columns-form/utils'
import ReportQuery from '../../../types/ReportQuery'
import { ListWithWarnings } from '../../../data/types'
import { LoadType, ReportType } from '../../../types/UserReports'
import { Columns } from '../../_reports/report-columns-form/types'
import ReportActionsUtils from '../../_reports/report-actions/utils'
import { SyncReportFeatures, SyncReportOptions, SyncReportUtilsParams } from '../../../types/SyncReportUtils'
import SyncFiltersUtils from '../../_filters/filters-interactive/utils'
import { DownloadActionParams } from '../../_reports/report-actions/types'
import { Services } from '../../../types/Services'

const setActions = (
  csrfToken: string,
  reportDefinition: components['schemas']['SingleVariantReportDefinition'],
  columns: Columns,
  url: string,
  features: SyncReportFeatures = {},
  options: SyncReportOptions = {},
) => {
  const { name: reportName, variant, id: reportId } = reportDefinition
  const { name, id, printable } = variant

  const downloadConfig: DownloadActionParams = {
    enabled: true,
    name,
    reportName,
    csrfToken,
    reportId,
    id,
    type: ReportType.REPORT,
    columns: columns.value,
    loadType: LoadType.SYNC,
    definitionPath: options.dpdPath,
    canDownload: features.download,
  }

  return ReportActionsUtils.getActions({
    ...(features.download && {
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
  const renderData = await getRenderData({
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

const getRenderData = async ({
  req,
  reportDefinition,
  reportQuery,
  reportData,
  count,
  csrfToken,
  features,
  options,
}: {
  req: Request
  reportDefinition: components['schemas']['SingleVariantReportDefinition']
  reportQuery: ReportQuery
  reportData: ListWithWarnings
  csrfToken: string
  count: number
  features: SyncReportFeatures
  options: SyncReportOptions
}) => {
  const { name: reportName, description: reportDescription } = reportDefinition
  const { specification, name, description, classification, printable } = reportDefinition.variant
  const { data } = reportData

  const url = parseUrl(req)
  const pagination = PaginationUtils.getPaginationData(url, count)

  const dataTable: DataTable = new DataTableBuilder(specification.fields)
    .withHeaderSortOptions(reportQuery)
    .buildTable(data)

  const totals = TotalsUtils.getTotals(
    pagination.pageSize,
    pagination.currentPage,
    pagination.totalRows,
    dataTable.rowCount,
  )

  const filters = await SyncFiltersUtils.getFilters({
    fields: specification.fields,
    req,
  })

  const columns = ColumnUtils.getColumns(specification, reportQuery.columns)

  const actions = setActions(
    csrfToken,
    reportDefinition,
    columns,
    `${req.protocol}://${req.get('host')}${req.originalUrl}`,
    features,
    options,
  )

  return {
    reportName,
    name,
    description: description || reportDescription,
    ...dataTable,
    count,
    type: ReportType.REPORT,
    columns,
    filters,
    pagination,
    totals,
    classification,
    printable,
    actions,
    warnings: reportData.warnings,
  }
}

export default {
  getRenderData,
  getReport,
  getSyncReportData,
}

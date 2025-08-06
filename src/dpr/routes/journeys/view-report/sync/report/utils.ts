import parseUrl from 'parseurl'
import type { Request, Response } from 'express'
import Dict = NodeJS.Dict
import type { components } from '../../../../../types/api'
import type { DataTable } from '../../../../../utils/DataTableBuilder/types'
import type { ListWithWarnings } from '../../../../../data/types'
import type { Columns } from '../../../../../components/_reports/report-columns-form/types'
import type { Services } from '../../../../../types/Services'
import type { DownloadActionParams } from '../../../../../components/_reports/report-actions/types'
import { LoadType, ReportType, RequestStatus } from '../../../../../types/UserReports'
import ReportQuery from '../../../../../types/ReportQuery'
import { Template } from '../../../../../types/Templates'

import PaginationUtils from '../../../../../components/_reports/report-pagination/utils'
import TotalsUtils from '../../../../../components/_reports/report-totals/utils'
import ColumnUtils from '../../../../../components/_reports/report-columns-form/utils'
import ReportActionsUtils from '../../../../../components/_reports/report-actions/utils'
import FiltersUtils from '../../../../../components/_filters/utils'
import LocalsHelper from '../../../../../utils/localsHelper'
import UserStoreItemBuilder from '../../../../../utils/UserStoreItemBuilder'

import DataTableBuilder from '../../../../../utils/DataTableBuilder/DataTableBuilder'

const setActions = (
  csrfToken: string,
  reportDefinition: components['schemas']['SingleVariantReportDefinition'],
  columns: Columns,
  url: string,
  canDownload: boolean,
  count: number,
  dataProductDefinitionsPath: string,
  currentUrl: string,
  currentQueryParams: string,
  nestedBaseUrl: string,
) => {
  const { name: reportName, variant, id: reportId } = reportDefinition
  const { name, id, printable } = variant

  const downloadConfig: DownloadActionParams = {
    enabled: count > 0,
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
    nestedBaseUrl,
  }

  return ReportActionsUtils.getActions({
    download: downloadConfig,
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

const setAsRecentlyViewed = async (
  req: Request,
  services: Services,
  reportName: string,
  name: string,
  description: string,
  reportId: string,
  id: string,
  userId: string,
) => {
  const stateData = {
    type: ReportType.REPORT,
    reportId,
    id,
    reportName,
    description,
    name,
  }
  const recentlyViewedData = new UserStoreItemBuilder()
    .addReportData(stateData)
    .addStatus(RequestStatus.READY)
    .addTimestamp()
    .addReportUrls(req)
    .build()

  await services.recentlyViewedService.setRecentlyViewed(recentlyViewedData, userId)
}

const getReportData = async ({
  services,
  req,
  token,
  reportId,
  id,
  dataProductDefinitionsPath,
}: {
  services: Services
  req: Request
  token: string
  reportId: string
  id: string
  dataProductDefinitionsPath?: string
}) => {
  const reportDefinition = await services.reportingService.getDefinition(
    token,
    reportId,
    id,
    dataProductDefinitionsPath,
  )
  const { variant } = reportDefinition
  const { resourceName, specification } = variant

  const reportQuery = new ReportQuery({
    fields: specification.fields,
    template: specification.template as Template,
    queryParams: req.query,
    definitionsPath: <string>dataProductDefinitionsPath,
  })

  return {
    reportData: await services.reportingService.getListWithWarnings(resourceName, token, reportQuery),
    reportDefinition,
    reportQuery,
  }
}

const getReport = async ({ req, res, services }: { req: Request; res: Response; services: Services }) => {
  const { token, csrfToken, userId } = LocalsHelper.getValues(res)
  const { reportId, id } = req.params
  const dataProductDefinitionsPath = <string>req.query.dataProductDefinitionsPath

  const { reportData, reportDefinition, reportQuery } = await getReportData({
    services,
    req,
    token,
    reportId,
    id,
    dataProductDefinitionsPath,
  })
  const count = await services.reportingService.getCount(reportDefinition.variant.resourceName, token, reportQuery)
  const canDownload = await services.downloadPermissionService.downloadEnabled(userId, reportId, id)
  const bookmarked = await services.bookmarkService.isBookmarked(id, reportId, userId)

  const renderData = await getRenderData({
    req,
    res,
    reportDefinition,
    reportQuery,
    reportData,
    count,
    csrfToken,
    canDownload,
  })

  if (Object.keys(renderData).length) {
    setAsRecentlyViewed(
      req,
      services,
      reportId,
      id,
      renderData.reportName,
      renderData.name,
      renderData.description,
      userId,
    )
  }

  return {
    renderData: {
      ...renderData,
      csrfToken,
      loadType: LoadType.SYNC,
      reportId,
      id,
      bookmarked,
      dataProductDefinitionsPath,
    },
  }
}

const getReportRenderData = async (
  req: Request,
  count: number,
  specification: components['schemas']['Specification'],
  reportQuery: ReportQuery,
  data: Dict<string>[],
) => {
  const url = parseUrl(req)
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
  const pathname = url.search ? req.originalUrl.split(url.search)[0] : req.originalUrl
  const pagination = PaginationUtils.getPaginationData(url, count, req)

  const dataTable: DataTable = new DataTableBuilder(specification.fields)
    .withHeaderSortOptions(reportQuery)
    .buildTable(data)

  const totals = TotalsUtils.getTotals(
    pagination.pageSize,
    pagination.currentPage,
    pagination.totalRows,
    dataTable.rowCount,
  )

  const filterData = await FiltersUtils.getFilters({
    fields: specification.fields,
    req,
  })

  const columns = ColumnUtils.getColumns(specification, reportQuery.columns)

  return {
    dataTable: [dataTable],
    totals,
    filterData,
    columns,
    pagination,
    reportUrl: pathname.replace('/download-disabled', '').replace('/download-disabled?', ''),
    reportSearch: url.search,
    encodedSearch: url.search ? encodeURIComponent(url.search) : undefined,
    fullUrl,
  }
}

const getRenderData = async ({
  req,
  res,
  reportDefinition,
  reportQuery,
  reportData,
  count,
  csrfToken,
  canDownload,
}: {
  req: Request
  res: Response
  reportDefinition: components['schemas']['SingleVariantReportDefinition']
  reportQuery: ReportQuery
  reportData: ListWithWarnings
  csrfToken: string
  count: number
  canDownload: boolean
}) => {
  const { dataProductDefinitionsPath } = req.query
  const { nestedBaseUrl } = LocalsHelper.getValues(res)
  const { name: reportName, description: reportDescription } = reportDefinition
  const { specification, name, description, classification, printable } = reportDefinition.variant
  const { data } = reportData

  const reportRenderData = await getReportRenderData(req, count, specification, reportQuery, data)

  const actions = setActions(
    csrfToken,
    reportDefinition,
    reportRenderData.columns,
    `${req.protocol}://${req.get('host')}${req.originalUrl}`,
    canDownload,
    count,
    <string>dataProductDefinitionsPath,
    reportRenderData.reportUrl,
    reportRenderData.reportSearch,
    nestedBaseUrl,
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
    canDownload,
    nestedBaseUrl,
  }
}

export default {
  getRenderData,
  getReport,
  getReportData,
  getReportRenderData,
  setActions,
}

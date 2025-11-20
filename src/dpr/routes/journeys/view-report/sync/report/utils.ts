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
import { FilterValue } from '../../../../../components/_filters/types'

import PaginationUtils from '../../../../../components/_reports/report-pagination/utils'
import TotalsUtils from '../../../../../components/_reports/report-totals/utils'
import ColumnUtils from '../../../../../components/_reports/report-columns-form/utils'
import ReportActionsUtils from '../../../../../components/_reports/report-actions/utils'
import FiltersUtils from '../../../../../components/_filters/utils'
import SelectedFiltersUtils from '../../../../../components/_filters/filters-selected/utils'
import LocalsHelper from '../../../../../utils/localsHelper'
import UserStoreItemBuilder from '../../../../../utils/UserStoreItemBuilder'

import DataTableBuilder from '../../../../../utils/DataTableBuilder/DataTableBuilder'
import { FiltersType } from '../../../../../components/_filters/filtersTypeEnum'

export const setActions = (
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
      enabled: Boolean(printable),
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

const setAsRecentlyViewed = async ({
  req,
  services,
  reportName,
  name,
  description,
  reportId,
  id,
  userId,
  filters,
}: {
  req: Request
  services: Services
  reportName: string
  name: string
  description: string
  reportId: string
  id: string
  userId: string
  filters: FilterValue[]
}) => {
  const stateData = {
    type: ReportType.REPORT,
    reportId,
    id,
    reportName,
    description,
    name,
  }

  const interactiveQueryData: { query: Dict<string>; querySummary: Array<Dict<string>> } = {
    query: <Dict<string>>req.query,
    querySummary: SelectedFiltersUtils.getQuerySummary(<Dict<string>>req.query, filters),
  }

  const recentlyViewedData = new UserStoreItemBuilder(stateData)
    .addInteractiveQuery(interactiveQueryData)
    .addStatus(RequestStatus.READY)
    .addTimestamp()
    .addReportUrls(req)
    .build()

  await services.recentlyViewedService?.setRecentlyViewed(recentlyViewedData, userId)
}

export const getReportData = async ({
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
    fields: specification?.fields || [],
    template: (specification?.template as Template) || 'list',
    queryParams: req.query,
    definitionsPath: <string>dataProductDefinitionsPath,
  })

  return {
    reportData: await services.reportingService.getListWithWarnings(resourceName, token, reportQuery),
    reportDefinition,
    reportQuery,
  }
}

export const getReport = async ({ req, res, services }: { req: Request; res: Response; services: Services }) => {
  const { token, csrfToken, dprUser } = LocalsHelper.getValues(res)
  const { reportId, id } = req.params
  const dataProductDefinitionsPath = <string>req.query['dataProductDefinitionsPath']

  const { reportData, reportDefinition, reportQuery } = await getReportData({
    services,
    req,
    token,
    reportId,
    id,
    dataProductDefinitionsPath,
  })
  const count = await services.reportingService.getCount(reportDefinition.variant.resourceName, token, reportQuery)
  const canDownload = Boolean(await services.downloadPermissionService?.downloadEnabled(dprUser.id, reportId, id))
  const bookmarked = Boolean(await services.bookmarkService?.isBookmarked(id, reportId, dprUser.id))

  const renderData = await getRenderData({
    req,
    res,
    services,
    reportDefinition,
    reportQuery,
    reportData,
    count,
    csrfToken,
    canDownload,
  })

  if (Object.keys(renderData).length) {
    await setAsRecentlyViewed({
      req,
      services,
      reportName: renderData.reportName,
      name: renderData.name,
      description: renderData.description || '',
      reportId,
      id,
      userId: dprUser.id,
      filters: renderData.filterData.filters,
    })
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

export const getReportRenderData = async ({
  req,
  res,
  services,
  count,
  specification,
  reportQuery,
  data,
  filtersType,
}: {
  req: Request
  res?: Response
  services?: Services
  count: number
  specification: components['schemas']['Specification']
  reportQuery: ReportQuery
  data: Dict<string>[]
  filtersType?: FiltersType
}) => {
  const url = parseUrl(req)
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
  const pathname = url?.search ? req.originalUrl.split(url.search)[0] : req.originalUrl

  const dataTable: DataTable = new DataTableBuilder(specification.fields)
    .withHeaderSortOptions(reportQuery)
    .buildTable(data)

  let pagination
  let totals
  if (url) {
    pagination = PaginationUtils.getPaginationData(url, count, req)
    totals = TotalsUtils.getTotals(
      pagination.pageSize,
      pagination.currentPage,
      pagination.totalRows,
      dataTable.rowCount,
    )
  }

  const filterData = await FiltersUtils.getFilters({
    fields: specification.fields,
    req,
    res,
    services,
    filtersType: filtersType || FiltersType.INTERACTIVE,
  })

  const columns = ColumnUtils.getColumns(specification, req)

  return {
    dataTable: [dataTable],
    totals,
    filterData,
    columns,
    pagination,
    reportUrl: pathname.replace('/download-disabled', '').replace('/download-disabled?', ''),
    reportSearch: url?.search,
    encodedSearch: url?.search ? encodeURIComponent(url.search) : undefined,
    fullUrl,
  }
}

export const getRenderData = async ({
  req,
  res,
  services,
  reportDefinition,
  reportQuery,
  reportData,
  count,
  csrfToken,
  canDownload,
}: {
  req: Request
  res: Response
  services: Services
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

  if (!specification) {
    throw new Error('No specicication found in definition')
  }

  const reportRenderData = await getReportRenderData({ req, res, services, count, specification, reportQuery, data })

  const actions = setActions(
    csrfToken,
    reportDefinition,
    reportRenderData.columns,
    `${req.protocol}://${req.get('host')}${req.originalUrl}`,
    canDownload,
    count,
    <string>dataProductDefinitionsPath,
    reportRenderData.reportUrl,
    reportRenderData.reportSearch || '',
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

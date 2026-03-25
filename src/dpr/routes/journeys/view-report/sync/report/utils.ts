import parseUrl from 'parseurl'
import type { Request, Response } from 'express'
import Dict = NodeJS.Dict
import type { components } from '../../../../../types/api'
import type { DataTable } from '../../../../../utils/DataTableBuilder/types'
import type { ListWithWarnings } from '../../../../../data/types'
import type { Services } from '../../../../../types/Services'
import { LoadType, ReportType, RequestStatus } from '../../../../../types/UserReports'
import ReportQuery from '../../../../../types/ReportQuery'
import { Template } from '../../../../../types/Templates'
import { FilterValue } from '../../../../../components/_filters/types'

import PaginationUtils from '../../../../../components/_reports/report-page/report-template/report-pagination/utils'
import TotalsUtils from '../../../../../components/_reports/report-page/report-template/report-totals/utils'
import ColumnUtils from '../../../../../components/_reports/report-heading/report-columns/report-columns-form/utils'
import ReportActionsUtils from '../../../../../components/_reports/report-heading/report-actions/utils'
import FiltersUtils from '../../../../../components/_filters/utils'
import SelectedFiltersUtils from '../../../../../components/_filters/filters-selected/utils'
import LocalsHelper from '../../../../../utils/localsHelper'
import UserStoreItemBuilder from '../../../../../utils/UserStoreItemBuilder'

import { FiltersType } from '../../../../../components/_filters/filtersTypeEnum'
import { ReportTemplateData } from '../../../../../utils/TemplateBuilder/SectionedDataHelper/types'
import ReportTemplateUtils from '../../../../../components/_reports/report-page/report-template/utils'
import { setUpBookmark } from '../../../../../components/bookmark/utils'
import { setUpDownload } from '../../../download-report/utils'
import ViewAsyncReportUtils from '../../async/report/utils'
import { Columns } from '../../../../../components/_reports/report-heading/report-columns/report-columns-form/types'
import { getSessionValue } from '../../../../../utils/sessionHelper'

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
  const { reportId, id } = <{ id: string; reportId: string }>req.params
  const dataProductDefinitionsPath = <string>req.query['dataProductDefinitionsPath']

  // Get the report data
  const { reportData, reportDefinition, reportQuery } = await getReportData({
    services,
    req,
    token,
    reportId,
    id,
    dataProductDefinitionsPath,
  })
  const { variant } = reportDefinition
  const { specification } = variant

  if (!specification) {
    throw new Error('No specification found in variant definition')
  }

  // Get the columns
  const columns = ColumnUtils.getColumns(specification, req)

  // Get the count
  const count = await services.reportingService.getCount(reportDefinition.variant.resourceName, token, reportQuery)

  // Get the report actions
  const extractedDefinitionData = ViewAsyncReportUtils.extractDataFromDefinition(reportDefinition)
  const bookmarkConfig = setUpBookmark(res, req, services.bookmarkService)
  const downloadConfig = setUpDownload(res, req, extractedDefinitionData, columns, LoadType.SYNC)
  const actions = ReportActionsUtils.setActions(extractedDefinitionData, downloadConfig)
  const feedbackFormHref = getSessionValue(req, 'currentReportJourney', 'feedbackSubmissionFormPath')

  // Get the table data and filters, pagination etc
  const renderData = await getRenderData({
    req,
    res,
    services,
    reportDefinition,
    reportQuery,
    reportData,
    count,
    csrfToken,
    columns,
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
      feedbackFormHref,
      ...renderData,
      csrfToken,
      loadType: LoadType.SYNC,
      reportId,
      id,
      bookmarkConfig,
      downloadConfig,
      actions,
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
  definition,
  columns,
}: {
  req: Request
  res?: Response
  services?: Services
  count: number
  specification: components['schemas']['Specification']
  reportQuery: ReportQuery
  data: Dict<string>[]
  filtersType?: FiltersType
  definition: components['schemas']['SingleVariantReportDefinition']
  columns: Columns
}) => {
  const url = parseUrl(req)
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
  const pathname = url?.search ? req.originalUrl.split(url.search)[0] : req.originalUrl
  const reportDefinition = {
    ...definition,
    variant: {
      ...definition.variant,
      interactive: true,
    },
  }

  // Get the data table
  const dataTable: DataTable | ReportTemplateData = ReportTemplateUtils.createReportTemplateData(
    reportDefinition,
    columns,
    data,
    [], // child data - N/A for sync reports
    [], // summaries data - N/A for sync reports
    reportQuery,
  )

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

  return {
    dataTable,
    totals,
    filterData,
    columns,
    pagination,
    reportUrl: pathname.replace('/download-disabled', '').replace('/download-disabled?', ''),
    reportSearch: url?.search,
    encodedSearch: url?.search ? encodeURIComponent(url.search) : undefined,
    fullUrl,
    template: specification.template,
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
  columns,
}: {
  req: Request
  res: Response
  services: Services
  reportDefinition: components['schemas']['SingleVariantReportDefinition']
  reportQuery: ReportQuery
  reportData: ListWithWarnings
  csrfToken: string
  count: number
  columns: Columns
}) => {
  const { name: reportName, description: reportDescription } = reportDefinition
  const { specification, name, description, classification, printable } = reportDefinition.variant
  const { data } = reportData

  if (!specification) {
    throw new Error('No specicication found in definition')
  }

  const reportRenderData = await getReportRenderData({
    req,
    res,
    services,
    count,
    specification,
    reportQuery,
    data,
    definition: reportDefinition,
    columns,
  })

  return {
    ...reportRenderData,
    reportName,
    name,
    description: description || reportDescription,
    count,
    type: ReportType.REPORT,
    classification,
    printable,
    warnings: reportData.warnings,
  }
}

export default {
  getRenderData,
  getReport,
  getReportData,
  getReportRenderData,
}

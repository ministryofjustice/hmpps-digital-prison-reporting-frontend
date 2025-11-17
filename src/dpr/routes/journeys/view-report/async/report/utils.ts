import parseUrl from 'parseurl'
import { Url } from 'url'
import { Request, Response } from 'express'

// Types
import type { Columns } from '../../../../../components/_reports/report-columns-form/types'
import type { AsyncReportUtilsParams } from '../../../../../types/AsyncReportUtils'
import type { DataTable } from '../../../../../utils/DataTableBuilder/types'
import type { components } from '../../../../../types/api'
import type { AsyncSummary, RequestedReport } from '../../../../../types/UserReports'
import { LoadType, ReportType } from '../../../../../types/UserReports'
import ReportQuery from '../../../../../types/ReportQuery'
import type { ChildData } from '../../../../../utils/ParentChildDataTableBuilder/types'
import type { ExtractedDefinitionData, ExtractedRequestData, ReportUrls } from './types'
import type { DownloadActionParams } from '../../../../../components/_reports/report-actions/types'
import { FiltersType } from '../../../../../components/_filters/filtersTypeEnum'
import type { Services } from '../../../../../types/Services'

// Utils
import definitionUtils from '../../../../../utils/definitionUtils'
import PaginationUtils from '../../../../../components/_reports/report-pagination/utils'
import TotalsUtils from '../../../../../components/_reports/report-totals/utils'
import ReportFiltersUtils from '../../../../../components/_filters/utils'
import ColumnUtils from '../../../../../components/_reports/report-columns-form/utils'
import ReportActionsUtils from '../../../../../components/_reports/report-actions/utils'
import UserReportsUtils from '../../../../../components/user-reports/utils'
import LocalsHelper from '../../../../../utils/localsHelper'
import DataTableUtils from '../../../../../components/_reports/report-data-table/utils'
import RequestedReportService from '../../../my-reports/requested-reports/service'

import CollatedSummaryBuilder from '../../../../../utils/CollatedSummaryBuilder/CollatedSummaryBuilder'

export const getData = async ({
  res,
  req,
  services,
  token,
  userId,
}: AsyncReportUtilsParams & { token: string; userId: string }) => {
  const { definitionsPath: definitionPath } = LocalsHelper.getValues(res)
  const { reportId, variantId, id, tableId } = req.params
  const reportVariantId = variantId || id

  // Get the definition
  const definition: components['schemas']['SingleVariantReportDefinition'] =
    await services.reportingService.getDefinition(token, reportId, reportVariantId, definitionPath)
  const { variant } = definition
  const { specification } = variant

  if (!specification) {
    throw new Error('No specification found in variant definition')
  }

  // Get the request data
  const requestedReportService = <RequestedReportService>services.requestedReportService
  const requestData: RequestedReport | undefined = await requestedReportService.getReportByTableId(tableId, userId)

  // Get the columns
  const columns = ColumnUtils.getColumns(specification, req)

  // initialise report query
  const reportQuery = await initReportQuery(definition, columns, res, req, services, requestData)

  // Get the reportData
  const reportData = await getReportData({ definition, services, token, req, res, reportQuery })

  // Get the summary data, if applicable
  const { summaries } = definition.variant
  const summariesData = !summaries ? [] : await getSummariesData(summaries, services, token, req, res)

  // Get the child data, if applicable
  const { childVariants } = definition.variant
  const childData: ChildData[] = !childVariants
    ? []
    : await getChildData(childVariants, services, token, req, res, requestData)

  return {
    definition,
    requestData,
    reportData,
    summariesData,
    childData,
    reportQuery,
    columns,
  }
}

const initReportQuery = async (
  definition: components['schemas']['SingleVariantReportDefinition'],
  columns: Columns,
  res: Response,
  req: Request,
  services: Services,
  requestData?: RequestedReport,
) => {
  const { definitionsPath } = LocalsHelper.getValues(res)
  const fields = definitionUtils.getFields(definition)
  const template = definitionUtils.getTemplate(definition)

  const filtersData = await ReportFiltersUtils.getFilters({
    fields,
    req,
    filtersType: FiltersType.INTERACTIVE,
    res,
    services,
  })

  // Sort
  const sortColumn = req.query?.['sortColumn'] || requestData?.query?.data?.['sortColumn']
  const sortedAsc = req.query?.['sortedAsc'] || requestData?.query?.data?.['sortedAsc']

  // Pagination
  const selectedPage = req.query?.['selectedPage']
  const pageSize = req.query?.['pageSize']

  // Filters
  const filtersQuery = ReportFiltersUtils.setRequestQueryFromFilterValues(filtersData.filters)

  const queryParams = {
    ...(sortColumn && { sortColumn }),
    ...(sortedAsc && { sortedAsc }),
    ...filtersQuery,
    ...(pageSize && { pageSize }),
    ...(selectedPage && { pageSize }),
    ...(columns && { columns: columns.value }),
  }

  return new ReportQuery({
    fields,
    template,
    queryParams,
    definitionsPath,
  })
}

const getReportData = async (args: {
  definition: components['schemas']['SingleVariantReportDefinition']
  services: Services
  token: string
  req: Request
  res: Response
  reportQuery: ReportQuery
}) => {
  const { services, token, req, reportQuery } = args
  const { reportId, variantId, id, tableId } = req.params
  const reportVariantId = variantId || id

  return services.reportingService.getAsyncReport(
    token,
    reportId,
    reportVariantId,
    tableId,
    reportQuery.toRecordWithFilterPrefix(true),
  )
}

export const getSummariesData = async (
  summaries: components['schemas']['ReportSummary'][],
  services: Services,
  token: string,
  req: Request,
  res: Response,
): Promise<AsyncSummary[]> => {
  const { reportId, variantId, id, tableId } = req.params
  const { definitionsPath: dataProductDefinitionsPath } = LocalsHelper.getValues(res)
  const reportVariantId = variantId || id

  return Promise.all(
    summaries.map(async (summary) => {
      const summaryReport = await services.reportingService.getAsyncSummaryReport(
        token,
        reportId,
        reportVariantId,
        tableId,
        summary.id,
        {
          dataProductDefinitionsPath,
        },
      )

      return {
        ...summary,
        data: summaryReport,
      }
    }),
  )
}

export const getChildData = async (
  childVariants: components['schemas']['ChildVariantDefinition'][],
  services: Services,
  token: string,
  req: Request,
  res: Response,
  requestData?: RequestedReport,
): Promise<ChildData[]> => {
  const { definitionsPath: dataProductDefinitionsPath } = LocalsHelper.getValues(res)
  const { reportId } = req.params
  const childExecutionData = requestData?.childExecutionData
  if (!childExecutionData) {
    throw new Error('getChildData: No execution data found for child variants')
  }
  return Promise.all(
    childVariants.map(async (childVariant) => {
      const { specification } = childVariant
      if (!specification) {
        throw new Error('getChildData: No specification found in child variant definition')
      }

      const query = new ReportQuery({
        fields: specification?.fields || [],
        template: specification.template,
        queryParams: req.query,
        definitionsPath: dataProductDefinitionsPath,
      }).toRecordWithFilterPrefix(true)

      const childData = childExecutionData.find((e) => e.variantId === childVariant.id)
      if (!childData || !childData.tableId) {
        throw new Error('getChildData: No matching child execution data found')
      }
      const { tableId: childTableId } = childData

      const childReport = await services.reportingService.getAsyncReport(
        token,
        reportId,
        childVariant.id,
        childTableId,
        query,
      )

      return {
        id: childVariant.id,
        data: childReport,
      }
    }),
  )
}

/**
 * Entry point function to render the report
 *
 * @param {AsyncReportUtilsParams} { req, res, services }
 * @return {*}
 */
export const renderReport = async ({ req, res, services }: AsyncReportUtilsParams) => {
  const { token, dprUser } = LocalsHelper.getValues(res)

  // Get the report data
  const { definition, requestData, reportData, childData, summariesData, reportQuery, columns } = await getData({
    req,
    res,
    services,
    token,
    userId: dprUser.id,
  })

  // Get the data table
  const dataTable: DataTable[] = DataTableUtils.createDataTable(
    definition,
    columns,
    reportData,
    childData,
    summariesData,
    reportQuery,
  )

  // Get the template data
  const templateData = await getTemplateData(
    req,
    res,
    services,
    definition,
    summariesData,
    dataTable,
    columns,
    reportQuery,
    requestData,
  )

  const renderData = {
    ...templateData,
    dataTable,
  }

  if (requestData && Object.keys(requestData).length) {
    UserReportsUtils.updateLastViewed({
      req,
      services,
      reportStateData: requestData,
      userId: dprUser.id,
      filters: templateData.filterData.filters,
    })
  }

  return { renderData }
}

const getTemplateData = async (
  req: Request,
  res: Response,
  services: Services,
  definition: components['schemas']['SingleVariantReportDefinition'],
  summariesData: AsyncSummary[],
  dataTable: DataTable[],
  columns: Columns,
  reportQuery: ReportQuery,
  requestData?: RequestedReport,
) => {
  const { nestedBaseUrl } = LocalsHelper.getValues(res)

  // get url data
  const url = parseUrl(req)
  if (!url) {
    throw new Error('Unable to set url data from request')
  }

  const urls = url ? setUrls(url, req) : undefined

  // get from definition
  const definitionData = extractDataFromDefinition(definition)
  const { fields, specification } = definitionData

  // get from requestedData
  const requestedData = requestData ? extractDataFromRequest(requestData) : undefined

  // Get the count
  const count = await getCount(definition, services, res, req, reportQuery)

  // Get the filters
  const filterData = await ReportFiltersUtils.getFilters({
    fields,
    req,
    res,
    services,
    filtersType: FiltersType.INTERACTIVE,
  })

  // Set the features
  const features = await setFeatures(services, res, req, columns, count, definitionData, requestedData, urls)

  // Set the extra meta data
  const meta = setMetaData(res, req)

  let reportSummaries
  if (summariesData.length) {
    const collatedSummaryBuilder = new CollatedSummaryBuilder(specification, summariesData)
    reportSummaries = collatedSummaryBuilder.collatePageSummaries()
  }

  let pagination
  let totals
  if (definitionData.template === 'list') {
    pagination = PaginationUtils.getPaginationData(url, count, req)
    const { pageSize, currentPage, totalRows } = pagination
    totals = TotalsUtils.getTotals(pageSize, currentPage, totalRows, dataTable[0].rowCount)
  }

  return {
    ...(showColumns(specification) && { columns }),
    filterData,
    count,
    nestedBaseUrl,
    ...meta,
    ...features,
    ...definitionData,
    ...requestedData,
    ...urls,
    ...(pagination && { pagination }),
    ...(totals && { totals }),
    ...(reportSummaries && { reportSummaries }),
  }
}

const showColumns = (specification: components['schemas']['Specification']) => {
  const { template } = specification

  return !['row-section', 'row-section-child', 'summary', 'summary-section'].includes(template)
}

const setMetaData = (res: Response, req: Request) => {
  const { csrfToken } = LocalsHelper.getValues(res)
  const { tableId, reportId, id } = req.params

  return {
    csrfToken,
    loadType: LoadType.ASYNC,
    type: ReportType.REPORT,
    tableId,
    reportId,
    id,
  }
}

const setUrls = (url: Url, req: Request): ReportUrls => {
  const { search } = url
  const encodedSearch = search ? encodeURIComponent(search) : undefined
  const pathname = search ? req.originalUrl.split(search)[0] : req.originalUrl
  const reportUrl = pathname.replace('/download-disabled', '').replace('/download-disabled?', '')

  return {
    reportUrl,
    reportSearch: search || undefined,
    encodedSearch,
    pathname,
  }
}

const setFeatures = async (
  services: Services,
  res: Response,
  req: Request,
  columns: Columns,
  count: number,
  definitionData: ExtractedDefinitionData,
  requestData?: ExtractedRequestData,
  urls?: ReportUrls,
) => {
  const { csrfToken, dprUser, bookmarkingEnabled, downloadingEnabled } = LocalsHelper.getValues(res)
  const { reportId, id } = req.params
  const { downloadPermissionService, bookmarkService } = services

  let canDownload = false
  if (downloadingEnabled && downloadPermissionService) {
    canDownload = await downloadPermissionService.downloadEnabled(dprUser.id, reportId, id)
  }

  let bookmarked
  if (bookmarkingEnabled && bookmarkService) {
    bookmarked = await bookmarkService.isBookmarked(id, reportId, dprUser.id)
  }

  const actions = setActions(csrfToken, columns, canDownload, count, res, req, definitionData, requestData, urls)

  return {
    actions,
    canDownload,
    bookmarked,
  }
}

const getCount = async (
  definition: components['schemas']['SingleVariantReportDefinition'],
  services: Services,
  res: Response,
  req: Request,
  reportQuery: ReportQuery,
) => {
  const { token } = LocalsHelper.getValues(res)
  const { tableId, reportId, id } = req.params

  return !definition.variant.interactive
    ? services.reportingService.getAsyncCount(token, tableId)
    : services.reportingService.getAsyncInteractiveCount(token, tableId, reportId, id, reportQuery)
}

const extractDataFromDefinition = (
  definition: components['schemas']['SingleVariantReportDefinition'],
): ExtractedDefinitionData => {
  const { variant, name: reportName, description: reportDescription } = definition
  const { classification, printable, specification, name, description } = variant
  if (!specification) {
    throw new Error('No specification found in variant definition')
  }
  const { template, fields } = specification

  return {
    reportName,
    name,
    description: description || reportDescription,
    classification,
    printable: Boolean(printable),
    specification,
    template,
    fields,
  }
}

const extractDataFromRequest = (requestData: RequestedReport): ExtractedRequestData => {
  const { query, url, timestamp } = requestData

  return {
    executionId: requestData.executionId,
    requestedTimestamp: timestamp.requested ? new Date(timestamp.requested).toLocaleString() : undefined,
    querySummary: query?.summary || [],
    queryData: query?.data,
    requestUrl: url?.request,
    defaultQuery: url?.report?.default,
    dataProductDefinitionsPath: requestData.dataProductDefinitionsPath,
  }
}

const setActions = (
  csrfToken: string,
  columns: Columns,
  canDownload: boolean,
  count: number,
  res: Response,
  req: Request,
  definitionData: ExtractedDefinitionData,
  requestData?: ExtractedRequestData,
  urls?: ReportUrls,
) => {
  const { reportName, name, printable } = definitionData
  const { tableId, id, reportId } = req.params
  const { nestedBaseUrl, definitionsPath } = LocalsHelper.getValues(res)

  // DownloadActionParams
  let downloadConfig: DownloadActionParams | undefined
  if (urls) {
    downloadConfig = {
      enabled: count > 0 && canDownload !== undefined,
      name,
      reportName,
      csrfToken,
      reportId,
      id,
      tableId,
      columns: columns.value,
      definitionPath: definitionsPath,
      loadType: LoadType.ASYNC,
      nestedBaseUrl,
      canDownload,
      currentUrl: urls.pathname,
      currentQueryParams: urls.reportSearch,
      ...(requestData?.queryData && {
        sortColumn: <string>requestData.queryData['sortColumn'],
        sortedAsc: <string>requestData.queryData['sortedAsc'],
      }),
    }
  }

  let shareConfig
  let copyConfig
  if (requestData?.requestUrl?.fullUrl) {
    shareConfig = {
      reportName,
      name,
      url: requestData.requestUrl.fullUrl,
    }
    copyConfig = {
      url: requestData.requestUrl.fullUrl,
    }
  }

  let refreshConfig
  if (requestData?.executionId && requestData?.requestUrl?.fullUrl) {
    refreshConfig = {
      url: requestData.requestUrl.fullUrl,
      executionId: requestData.executionId,
    }
  }

  return ReportActionsUtils.getActions({
    ...(downloadConfig && { download: downloadConfig }),
    ...(shareConfig && { share: shareConfig }),
    ...(refreshConfig && { refresh: refreshConfig }),
    ...(copyConfig && { copy: copyConfig }),
    print: { enabled: printable },
  })
}

export default {
  renderReport,
}

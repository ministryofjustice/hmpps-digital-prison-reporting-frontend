import parseUrl from 'parseurl'
import { Url } from 'url'
import { Request, Response } from 'express'
import Dict = NodeJS.Dict
import type { Columns } from '../../../../../components/_reports/report-columns-form/types'
import type { Template } from '../../../../../types/Templates'
import type { AsyncReportUtilsParams } from '../../../../../types/AsyncReportUtils'
import type { DataTable } from '../../../../../utils/DataTableBuilder/types'
import type { components } from '../../../../../types/api'
import type { AsyncSummary, RequestedReport } from '../../../../../types/UserReports'
import { LoadType, ReportType } from '../../../../../types/UserReports'
import ReportQuery from '../../../../../types/ReportQuery'

import CollatedSummaryBuilder from '../../../../../utils/CollatedSummaryBuilder/CollatedSummaryBuilder'

import PaginationUtils from '../../../../../components/_reports/report-pagination/utils'
import TotalsUtils from '../../../../../components/_reports/report-totals/utils'
import ReportFiltersUtils from '../../../../../components/_filters/utils'
import ColumnUtils from '../../../../../components/_reports/report-columns-form/utils'
import ReportActionsUtils from '../../../../../components/_reports/report-actions/utils'
import UserReportsUtils from '../../../../../components/user-reports/utils'
import LocalsHelper from '../../../../../utils/localsHelper'
import { DownloadActionParams } from '../../../../../components/_reports/report-actions/types'
import { Services } from '../../../../../types/Services'
import { ChildData } from '../../../../../utils/ParentChildDataTableBuilder/types'
import DataTableUtils from '../../../../../components/_reports/report-data-table/utils'

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

  // Get the request data
  const requestData: RequestedReport = await services.requestedReportService.getReportByTableId(tableId, userId)

  // Get the reportData
  const { reportData, reportQuery } = await getReportData(definition, services, token, req, res)

  // Get the summary data, if applicable
  const summariesData = !definition.variant.summaries
    ? []
    : await getSummariesData(definition, services, token, req, res)

  // Get the child data, if applicable
  const childData: ChildData[] = !definition.variant.childVariants
    ? []
    : await getChildData(definition, services, token, req, res, requestData)

  return {
    definition,
    requestData,
    reportData,
    summariesData,
    childData,
    reportQuery,
  }
}

const getReportData = async (
  reportDefinition: components['schemas']['SingleVariantReportDefinition'],
  services: Services,
  token: string,
  req: Request,
  res: Response,
) => {
  const { definitionsPath } = LocalsHelper.getValues(res)
  const { reportId, variantId, id, tableId } = req.params
  const reportVariantId = variantId || id
  const { variant } = reportDefinition
  const { specification } = variant

  const reportQuery = new ReportQuery({
    fields: specification.fields,
    template: specification.template as Template,
    queryParams: req.query,
    definitionsPath,
  })

  const reportData = await services.reportingService.getAsyncReport(
    token,
    reportId,
    reportVariantId,
    tableId,
    reportQuery.toRecordWithFilterPrefix(true),
  )

  return {
    reportData,
    reportQuery,
  }
}

export const getSummariesData = async (
  reportDefinition: components['schemas']['SingleVariantReportDefinition'],
  services: Services,
  token: string,
  req: Request,
  res: Response,
): Promise<AsyncSummary[]> => {
  const { reportId, variantId, id, tableId } = req.params
  const { definitionsPath: dataProductDefinitionsPath } = LocalsHelper.getValues(res)
  const reportVariantId = variantId || id

  return Promise.all(
    reportDefinition.variant.summaries.map(async (summary) => {
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
  reportDefinition: components['schemas']['SingleVariantReportDefinition'],
  services: Services,
  token: string,
  req: Request,
  res: Response,
  requestData: RequestedReport,
): Promise<ChildData[]> => {
  const { definitionsPath: dataProductDefinitionsPath } = LocalsHelper.getValues(res)
  const { reportId } = req.params

  console.log(JSON.stringify(reportDefinition.variant, null, 2))

  return Promise.all(
    reportDefinition.variant.childVariants.map(async (childVariant) => {
      const { specification } = childVariant

      const query = new ReportQuery({
        fields: specification.fields,
        template: reportDefinition.variant.specification.template,
        queryParams: req.query,
        definitionsPath: dataProductDefinitionsPath,
      }).toRecordWithFilterPrefix(true)

      const { tableId: childTableId } = requestData.childExecutionData.find((e) => e.variantId === childVariant.id)

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
const renderReport = async ({ req, res, services }: AsyncReportUtilsParams) => {
  const { token, userId } = LocalsHelper.getValues(res)

  // Get the report data
  const { definition, requestData, reportData, childData, summariesData, reportQuery } = await getData({
    req,
    res,
    services,
    token,
    userId,
  })

  // Get the columns
  const columns = ColumnUtils.getColumns(definition.variant.specification, <string[]>req.query.columns)

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
    requestData,
    summariesData,
    dataTable,
    columns,
    reportQuery,
  )

  const renderData = {
    ...templateData,
    dataTable,
  }

  if (Object.keys(requestData).length) {
    UserReportsUtils.updateLastViewed({
      req,
      services,
      reportStateData: requestData,
      userId,
      search: renderData.search,
      href: renderData.pathname,
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
  requestData: RequestedReport,
  summariesData: AsyncSummary[],
  dataTable: DataTable[],
  columns: Columns,
  reportQuery: ReportQuery,
) => {
  const url = parseUrl(req)
  const urls = setUrls(url, req)
  const definitionData = extractDataFromDefinition(definition)
  const { fields, specification } = definitionData
  const requestedData = extractDataFromRequest(requestData)
  const count = await getCount(definition, requestData, services, res, reportQuery)
  const interactive = true
  const filterData = await ReportFiltersUtils.getFilters({
    fields,
    req,
    interactive,
  })
  const features = await setFeatures(services, res, requestData, definition, columns, count, urls)
  const meta = setMetaData(definition, res)

  let reportSummaries
  if (summariesData.length) {
    const collatedSummaryBuilder = new CollatedSummaryBuilder(specification, summariesData)
    reportSummaries = collatedSummaryBuilder.collatePageSummaries()
  }

  let pagination
  let totals
  if (meta.template === 'list') {
    pagination = PaginationUtils.getPaginationData(url, count, req)
    const { pageSize, currentPage, totalRows } = pagination
    totals = TotalsUtils.getTotals(pageSize, currentPage, totalRows, dataTable[0].rowCount)
  }

  return {
    ...(showColumns(specification) && { columns }),
    filterData,
    count,
    ...meta,
    ...features,
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

const setMetaData = (definition: components['schemas']['SingleVariantReportDefinition'], res: Response) => {
  const { classification } = definition.variant
  const { template } = definition.variant.specification
  const { csrfToken } = LocalsHelper.getValues(res)

  return {
    csrfToken,
    classification,
    template,
    loadType: LoadType.ASYNC,
    type: ReportType.REPORT,
  }
}

const setUrls = (url: Url, req: Request) => {
  const { search } = url
  const pathname = url.search ? req.originalUrl.split(url.search)[0] : req.originalUrl
  const reportUrl = pathname.replace('/download-disabled', '').replace('/download-disabled?', '')
  const reportSearch = search
  const encodedSearch = search ? encodeURIComponent(search) : undefined

  return {
    reportUrl,
    reportSearch,
    encodedSearch,
    search,
    pathname,
  }
}

const setFeatures = async (
  services: Services,
  res: Response,
  requestData: RequestedReport,
  definition: components['schemas']['SingleVariantReportDefinition'],
  columns: Columns,
  count: number,
  urls: Dict<string>,
) => {
  const { csrfToken, userId, bookmarkingEnabled, downloadingEnabled } = LocalsHelper.getValues(res)
  const { reportId } = requestData
  const id = requestData.variantId || requestData.id
  const { variant } = definition

  let canDownload
  if (downloadingEnabled) {
    canDownload = await services.downloadPermissionService.downloadEnabled(userId, reportId, id)
  }

  let bookmarked
  if (bookmarkingEnabled) {
    bookmarked = await services.bookmarkService.isBookmarked(id, reportId, userId)
  }

  const actions = setActions(csrfToken, variant, requestData, columns, canDownload, count, urls.pathname, urls.search)
  const { printable } = variant

  return {
    actions,
    canDownload,
    bookmarked,
    printable,
  }
}

const getCount = async (
  definition: components['schemas']['SingleVariantReportDefinition'],
  requestData: RequestedReport,
  services: Services,
  res: Response,
  reportQuery: ReportQuery,
) => {
  const { token } = LocalsHelper.getValues(res)
  const { tableId, reportId } = requestData
  const id = requestData.variantId || requestData.id

  return !definition.variant.interactive
    ? services.reportingService.getAsyncCount(token, tableId)
    : services.reportingService.getAsyncInteractiveCount(token, tableId, reportId, id, reportQuery)
}

const extractDataFromDefinition = (definition: components['schemas']['SingleVariantReportDefinition']) => {
  const { variant } = definition
  const { classification, printable, specification } = variant
  const { template, fields } = specification
  const { interactive } = <components['schemas']['VariantDefinition'] & { interactive?: boolean }>variant

  return {
    classification,
    printable,
    specification,
    template,
    interactive,
    fields,
    variant,
  }
}

const extractDataFromRequest = (requestData: RequestedReport) => {
  return {
    reportName: requestData.reportName,
    name: requestData.name,
    description: requestData.description,
    requestedTimestamp: new Date(requestData.timestamp.requested).toLocaleString(),
    reportId: requestData.reportId,
    tableId: requestData.tableId,
    id: requestData.variantId || requestData.id,
    executionId: requestData.executionId,
    querySummary: requestData.query.summary,
    requestUrl: requestData.url.request,
    defaultQuery: requestData.url.report.default,
    dataProductDefinitionsPath: requestData.dataProductDefinitionsPath,
  }
}

const setActions = (
  csrfToken: string,
  variant: components['schemas']['VariantDefinition'],
  requestData: RequestedReport,
  columns: Columns,
  canDownload: boolean,
  count: number,
  currentUrl: string,
  currentQueryParams: string,
) => {
  const { reportName, name, id, variantId, reportId, tableId, executionId, dataProductDefinitionsPath, url } =
    requestData
  const requestUrl = url.request.fullUrl
  const { printable } = variant
  const ID = variantId || id

  const downloadConfig: DownloadActionParams = {
    enabled: count > 0 && canDownload !== undefined,
    name,
    reportName,
    csrfToken,
    reportId,
    id: ID,
    tableId,
    columns: columns.value,
    definitionPath: dataProductDefinitionsPath,
    loadType: LoadType.ASYNC,
    canDownload,
    currentUrl,
    currentQueryParams,
  }

  const shareConfig = {
    reportName,
    name,
    url: requestUrl,
  }

  const refreshConfig = {
    url: requestUrl,
    executionId,
  }

  return ReportActionsUtils.getActions({
    download: downloadConfig,
    print: { enabled: printable },
    share: shareConfig,
    refresh: refreshConfig,
    copy: { url: requestUrl },
  })
}

export default {
  renderReport,
}

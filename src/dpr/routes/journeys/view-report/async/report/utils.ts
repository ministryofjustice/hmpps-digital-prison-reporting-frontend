import parseUrl from 'parseurl'
import { Request, Response } from 'express'

// Types
import { ReportTemplateData } from '../../../../../utils/TemplateBuilder/SectionedDataHelper/types'
import { ChildData } from '../../../../../utils/TemplateBuilder/ParentChildDataBuilder/types'
import type { Columns } from '../../../../../components/_reports/report-heading/report-columns/report-columns-form/types'
import type { AsyncReportUtilsParams } from '../../../../../types/AsyncReportUtils'
import type { DataTable } from '../../../../../utils/DataTableBuilder/types'
import type { components } from '../../../../../types/api'
import type { AsyncSummary, RequestedReport } from '../../../../../types/UserReports'
import { LoadType, ReportType } from '../../../../../types/UserReports'
import ReportQuery from '../../../../../types/ReportQuery'
import type { ExtractedDefinitionData, ExtractedRequestData } from './types'
import { FiltersType } from '../../../../../components/_filters/filtersTypeEnum'
import type { Services } from '../../../../../types/Services'

// Utils
import definitionUtils, { getFields, hasInteractiveFilters } from '../../../../../utils/definitionUtils'
import PaginationUtils from '../../../../../components/_reports/report-page/report-template/report-pagination/utils'
import TotalsUtils from '../../../../../components/_reports/report-page/report-template/report-totals/utils'
import ReportFiltersUtils from '../../../../../components/_filters/utils'
import ColumnUtils from '../../../../../components/_reports/report-heading/report-columns/report-columns-form/utils'
import ReportActionsUtils from '../../../../../components/_reports/report-heading/report-actions/utils'
import UserReportsUtils from '../../../../../components/user-reports/utils'
import LocalsHelper from '../../../../../utils/localsHelper'
import ReportTemplateUtils from '../../../../../components/_reports/report-page/report-template/utils'
import RequestedReportService from '../../../my-reports/requested-reports/service'
import { setUpBookmark } from '../../../../../components/bookmark/utils'
import { setUpDownload } from '../../../download-report/utils'
import { getActiveJourneyValue } from '../../../../../utils/sessionHelper'
import { extractParamsByPrefix } from 'src/dpr/utils/urlHelper'

export const getData = async ({
  res,
  req,
  services,
  token,
  userId,
}: AsyncReportUtilsParams & { token: string; userId: string }) => {
  const { definitionsPath: definitionPath } = LocalsHelper.getValues(res)
  const { variantId, id, tableId, reportId } = <{ id: string; variantId: string; tableId: string; reportId: string }>(
    req.params
  )
  const reportVariantId = variantId || id

  // Get the request data
  const requestedReportService = <RequestedReportService>services.requestedReportService
  const requestData: RequestedReport | undefined = await requestedReportService.getReportByTableId(tableId, userId)
  const queryData = requestData?.query?.data

  // Get the definition
  const definition: components['schemas']['SingleVariantReportDefinition'] =
    await services.reportingService.getDefinition(token, reportId, reportVariantId, definitionPath, queryData)
  const { variant } = definition
  const { specification } = variant

  if (!specification) {
    throw new Error('No specification found in variant definition')
  }

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
  const { id, tableId, reportId } = <{ id: string; variantId: string; tableId: string; reportId: string }>req.params
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
  const sortColumn = req.query?.['sortColumn'] || requestData?.sortBy?.data?.['sortColumn']
  const sortedAsc = req.query?.['sortedAsc'] || requestData?.sortBy?.data?.['sortedAsc']

  // Pagination
  const selectedPage = req.query?.['selectedPage']
  const pageSize = req.query?.['pageSize']

  // Filters
  // const filtersQuery = ReportFiltersUtils.setRequestQueryFromFilterValues(filtersData.filters)

  // Filters from query string
  // 1. Initialise the filters query to the defaults from the DPD
  const interactiveDefaultSearch = getActiveJourneyValue(req, { id, reportId }, 'interactiveDefaultFiltersSearch')
  let filtersQuery = interactiveDefaultSearch ? extractParamsByPrefix(interactiveDefaultSearch, 'filters.') : {}

  // 2. Get the search params from the current report and use those if they are present
  const currentSearch = getActiveJourneyValue(req, { id, reportId, tableId }, 'currentReportFiltersSearch')
  console.log({ currentSearch })
  if (currentSearch) {
    filtersQuery = extractParamsByPrefix(currentSearch, 'filters.')
  }

  const queryParams = {
    ...(sortColumn && { sortColumn }),
    ...(sortedAsc && { sortedAsc }),
    ...filtersQuery,
    ...(pageSize && { pageSize }),
    ...(selectedPage && { selectedPage }),
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
  const { reportId, variantId, id, tableId } = <{ id: string; variantId: string; tableId: string; reportId: string }>(
    req.params
  )
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
  const { reportId, variantId, id, tableId } = <{ id: string; variantId: string; tableId: string; reportId: string }>(
    req.params
  )
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
  const { reportId } = <{ reportId: string }>req.params
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
        template: 'parent-child',
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
  const dataTable: DataTable | ReportTemplateData = ReportTemplateUtils.createReportTemplateData(
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
  dataTable: DataTable | ReportTemplateData,
  columns: Columns,
  reportQuery: ReportQuery,
  requestData?: RequestedReport,
) => {
  // get url data
  const url = parseUrl(req)
  if (!url) {
    throw new Error('Unable to set url data from request')
  }

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
  const features = await setFeatures(services, res, req, columns, definitionData, requestedData)

  // Set the extra meta data
  const meta = setMetaData(res, req)

  let pagination
  let totals
  if (definitionData.template === 'list') {
    pagination = PaginationUtils.getPaginationData(url, count, req)
    const { pageSize, currentPage, totalRows } = pagination
    totals = TotalsUtils.getTotals(pageSize, currentPage, totalRows, dataTable.rowCount)
  }

  return {
    ...(showColumns(specification) && { columns }),
    filterData,
    count,
    ...meta,
    ...features,
    ...definitionData,
    ...requestedData,
    ...(pagination && { pagination }),
    ...(totals && { totals }),
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

const setFeatures = async (
  services: Services,
  res: Response,
  req: Request,
  columns: Columns,
  definitionData: ExtractedDefinitionData,
  requestData?: ExtractedRequestData,
) => {
  const { tableId, reportId, id } = <{ id: string; tableId: string; reportId: string }>req.params
  const bookmarkConfig = setUpBookmark(res, req, services.bookmarkService)
  const downloadConfig = setUpDownload(res, req, definitionData, columns, LoadType.ASYNC, requestData)
  const actions = ReportActionsUtils.setActions(definitionData, downloadConfig, requestData)
  const feedbackSubmissionFormPath = getActiveJourneyValue(req, { id, reportId, tableId }, 'feedbackSubmissionFormPath')

  return {
    actions,
    downloadConfig,
    bookmarkConfig,
    feedbackFormHref: feedbackSubmissionFormPath,
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
  const { tableId, reportId, id } = <{ id: string; tableId: string; reportId: string }>req.params

  return !definition.variant.interactive || !hasInteractiveFilters(getFields(definition))
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

export default {
  renderReport,
  extractDataFromDefinition,
}

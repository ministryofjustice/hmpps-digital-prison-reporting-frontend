import { Request, Response } from 'express'
import type { ParsedQs } from 'qs'

import { ReportType, RequestStatus } from '../../../types/UserReports'
import { DashboardService, ReportingService } from '../../../services'
import { AsyncReportUtilsParams } from '../../../types/AsyncReportUtils'
import LocalsHelper from '../../../utils/localsHelper'
import { QueryData, SetQueryFromFiltersResult } from 'src/dpr/components/_async/async-filters-form/types'
import { buildSortData, buildFilterData } from 'src/dpr/components/_async/async-filters-form/utils'
import { buildQuerySummary } from 'src/dpr/components/_async/request-details/utils'
import { components } from 'src/dpr/types/api'
import ReportQuery from 'src/dpr/types/ReportQuery'
import { Services } from 'src/dpr/types/Services'
import { getDashboardFields, getFields } from 'src/dpr/utils/definitionUtils'
import { formBodyToQueryObject, qsToQueryObject } from 'src/dpr/utils/queryMappers'
import { setActiveJourneySortSearch, getActiveJourneyValue } from 'src/dpr/utils/sessionHelper'
import { ChildReportExecutionData, ExecutionData } from 'src/dpr/types/ExecutionData'
import { QuerySummaryItem } from 'src/dpr/components/_async/request-details/types'
import { RequestedReportBuilder } from '../my-reports/requested-reports/builder'

export const cancelRequest = async ({ req, res, services }: AsyncReportUtilsParams) => {
  const { token, dprUser } = LocalsHelper.getValues(res)
  const { reportId, id, executionId, type } = req.params

  let service: ReportingService | DashboardService = services.reportingService
  if (type === ReportType.REPORT) service = services.reportingService
  if (type === ReportType.DASHBOARD) service = services.dashboardService

  const response = await service.cancelAsyncRequest(token, reportId as string, id as string, executionId as string)

  if (response && response['cancellationSucceeded']) {
    await services.requestedReportService.updateStatus(executionId as string, dprUser.id, RequestStatus.ABORTED)
  }
}

/**
 * Sends the request for the async report
 *
 * @param {AsyncReportUtilsParams} { req, res, services }
 * @return {*}
 */
export const request = async ({
  req,
  res,
  services,
  internal = false,
}: {
  req: Request
  res: Response
  services: Services
  internal?: boolean | undefined
}) => {
  const { token } = LocalsHelper.getValues(res)
  const requestArgs = { req, token }

  const requestData = await requestProduct({
    ...requestArgs,
    services,
    internal,
  })

  const { executionData } = requestData

  if (executionData.executionId && executionData.tableId) {
    await updateStore({
      req,
      res,
      services,
      ...requestData,
    })
  } else {
    throw new Error('No execution data returned')
  }

  return executionData
}

const getReportRequestDataFromRequestBody = async (req: Request, token: string, services: Services) => {
  const { reportId, id } = req.body as { reportId: string; id: string }
  const { body } = req

  const definition = await services.reportingService.getDefinition(token, reportId, id)
  const definitionSummary = await services.reportingService.getDefinitionSummary(token, reportId)
  const variantSummary = definitionSummary.variants.find(v => v.id === id)

  const fields = getFields(definition)
  const queryParams = formBodyToQueryObject(body)
  const sortData = buildSortData(body)
  const querySummary = buildQuerySummary(body, fields)
  const filterData = buildFilterData(body)
  const schedule = variantSummary?.schedule

  return {
    reportId,
    id,
    queryParams,
    sortData,
    querySummary,
    filterData,
    fields,
    definition,
    schedule,
  }
}

const getReportRequestDataFromRequestQuery = async (req: Request, token: string, services: Services) => {
  const { reportId, id, internalRequestId } = req.params as { reportId: string; id: string; internalRequestId: string }
  const { query } = req

  const definition = await services.reportingService.getDefinition(token, reportId, id)
  const definitionSummary = await services.reportingService.getDefinitionSummary(token, reportId)
  const variantSummary = definitionSummary.variants.find(v => v.id === id)

  const fields = getFields(definition)
  const queryParams = query
  const sortData = buildSortData(query)
  const querySummary = buildQuerySummary(query, fields)
  const filterData = buildFilterData(query)
  const schedule = variantSummary?.schedule

  return {
    reportId,
    id,
    queryParams,
    sortData,
    querySummary,
    filterData,
    fields,
    definition,
    schedule,
    internalRequestId,
  }
}

const getDashboardRequestDataFromRequestBody = async (req: Request, token: string, services: Services) => {
  const { reportId, id } = req.body as { reportId: string; id: string }
  const definition = await services.dashboardService.getDefinition(token, reportId, id)

  const fields = getDashboardFields(definition)
  const childVariants = definition.childVariants ?? []
  const queryParams = formBodyToQueryObject(req.body)
  const querySummary = buildQuerySummary(req.body, fields)
  const filterData = buildFilterData(req.body)

  // TODO: sections from body

  return {
    reportId,
    id,
    fields,
    childVariants,
    queryParams,
    querySummary,
    filterData,
    definition,
  }
}

const getDashboardRequestDataFromRequestQuery = async (req: Request, token: string, services: Services) => {
  const { reportId, id, internalRequestId } = req.body as { reportId: string; id: string; internalRequestId: string }
  const { query } = req

  const definition = await services.dashboardService.getDefinition(token, reportId, id)

  const fields = getDashboardFields(definition)
  const childVariants = definition.childVariants ?? []
  const queryParams = query
  const querySummary = buildQuerySummary(query, fields)
  const filterData = buildFilterData(query)

  // TODO: sections from definition

  return {
    reportId,
    id,
    fields,
    childVariants,
    queryParams,
    querySummary,
    filterData,
    definition,
    internalRequestId,
  }
}

export const requestProduct = async ({
  req,
  token,
  services,
  internal = false,
}: {
  req: Request
  token: string
  services: Services
  internal?: boolean | undefined
}): Promise<{
  executionData: ExecutionData
  childExecutionData: Array<ChildReportExecutionData>
  queryData?: SetQueryFromFiltersResult | undefined
  interactiveQueryData?: QueryData | undefined
  reportMeta: {
    name: string
    reportName: string
    description: string
    reportId: string
    id: string
    type: ReportType
    schedule?: string | null | undefined
  }
  internalRequestId?: string | undefined
}> => {
  const type = internal ? (req.params as { type: ReportType }).type : (req.body as { type: ReportType }).type

  switch (type) {
    case ReportType.REPORT:
      return internal
        ? requestReport(await getReportRequestDataFromRequestQuery(req, token, services), req, token, services)
        : requestReport(await getReportRequestDataFromRequestBody(req, token, services), req, token, services)

    case ReportType.DASHBOARD:
      return internal
        ? requestDashboard(await getDashboardRequestDataFromRequestQuery(req, token, services), req, token, services)
        : requestDashboard(await getDashboardRequestDataFromRequestBody(req, token, services), req, token, services)

    default:
      throw new Error(`Unsupported report type: ${type}`)
  }
}

/**
 * Updates the store with the request details
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Services} services
 * @param {SetQueryFromFiltersResult} querySummaryData
 * @param {string} executionData
 * @return {*}  {Promise<string>}
 */
export const updateStore = async ({
  req,
  res,
  services,
  queryData,
  interactiveQueryData,
  executionData,
  childExecutionData,
  reportMeta,
  internalRequestId,
}: {
  req: Request
  res: Response
  services: Services
  queryData?: SetQueryFromFiltersResult | undefined
  interactiveQueryData?: QueryData | undefined
  executionData: ExecutionData
  childExecutionData: Array<ChildReportExecutionData>
  reportMeta: { reportId: string; id: string; name: string; reportName: string; description: string; type: ReportType }
  internalRequestId?: string | undefined
}): Promise<void> => {
  const { dprUser } = LocalsHelper.getValues(res)

  const requestedReportDataBuilder = new RequestedReportBuilder(req, res)
    .withReportMetaData(reportMeta)
    .withExecutionData(executionData)
    .withChildExecutionData(childExecutionData)
    .withQueryData(queryData)
    .withInteractiveQuery(interactiveQueryData)

  if (internalRequestId) {
    requestedReportDataBuilder.withInternalRequestId(internalRequestId)
  }

  const requestedReportData = requestedReportDataBuilder.build()

  if (!requestedReportData) {
    return
  }

  await services.requestedReportService.addReport(dprUser.id, requestedReportData)

  const removedExecutionIds = await services.requestedReportService.removeDuplicateRequestedReports(dprUser.id)

  if (!removedExecutionIds.length) {
    return
  }

  await services.recentlyViewedService.removeSupersededViewedReports(removedExecutionIds, dprUser.id)
}

/**
 * Request the report - get the execution data
 *
 * @param {Request} req
 * @param {Response} res
 * @param {string} token
 * @param {Services} services
 * @return {*}
 */
const requestReport = async (
  {
    reportId,
    id,
    queryParams,
    sortData,
    querySummary,
    filterData,
    fields,
    definition,
    schedule,
    internalRequestId,
  }: {
    reportId: string
    id: string
    queryParams: Record<string, string> | ParsedQs
    sortData: Record<string, string> | undefined
    querySummary: QuerySummaryItem[]
    filterData: Record<string, string>
    fields: components['schemas']['FieldDefinition'][]
    definition: components['schemas']['SingleVariantReportDefinition']
    schedule: string | null | undefined
    internalRequestId?: string | undefined
  },
  req: Request,
  token: string,
  services: Services,
) => {
  const reportMeta = {
    type: ReportType.REPORT,
    reportId,
    id,
    description: definition.variant.description ?? definition.description ?? '',
    name: definition.variant.name,
    reportName: definition.name,
    ...(schedule && { schedule }),
  }

  const childVariants = definition.variant.childVariants ?? []

  const query = new ReportQuery({
    fields,
    queryParams,
    reportType: ReportType.REPORT,
  }).toRecordWithFilterPrefix(true) as Record<string, string>

  const requestResponse = await services.reportingService.requestAsyncReport(token, reportId, id, {
    ...query,
  })

  const { executionId, tableId } = requestResponse

  if (!executionId || !tableId) {
    throw new Error('Execution of report request failed - no execution data returned')
  }

  const executionData = {
    executionId,
    tableId,
  }

  setActiveJourneySortSearch(req, { reportId, id, tableId }, sortData)

  const queryData = {
    querySummary,
    filterData,
    query,
    ...(sortData && { sortData }),
  }

  const interactiveDefaultFiltersSearch = getActiveJourneyValue(
    req,
    { id, reportId },
    'interactiveDefaultFiltersSearch',
  )

  let interactiveQueryData: QueryData | undefined
  if (interactiveDefaultFiltersSearch) {
    const interactiveQueryObject = qsToQueryObject(interactiveDefaultFiltersSearch)
    const interactiveQuerySummary = buildQuerySummary(interactiveQueryObject, fields)

    interactiveQueryData = {
      query: interactiveQueryObject,
      querySummary: interactiveQuerySummary,
    }
  }

  const childExecutionData = await requestChildVariants(
    childVariants,
    services,
    ReportType.REPORT,
    token,
    reportId,
    queryData,
  )

  return {
    reportMeta,
    executionData,
    childExecutionData,
    queryData,
    interactiveQueryData,
    internalRequestId,
  }
}

/**
 * Request the child variants
 *
 * @param {(Array<components['schemas']['ChildVariantDefinition']>
 *     | Array<components['schemas']['DashboardDefinition']>)} childVariants
 * @param {Services} services
 * @param {ReportType} reportType
 * @param {string} token
 * @param {string} reportId
 * @param {SetQueryFromFiltersResult} [queryData]
 * @return {*}  {Promise<Array<ChildReportExecutionData>>}
 */
const requestChildVariants = async (
  childVariants:
    Array<components['schemas']['ChildVariantDefinition']> | Array<components['schemas']['DashboardDefinition']>,
  services: Services,
  reportType: ReportType,
  token: string,
  reportId: string,
  queryData?: SetQueryFromFiltersResult,
): Promise<Array<ChildReportExecutionData>> => {
  const query = queryData
    ? Object.fromEntries(Object.entries(queryData.query).filter(([key]) => key !== 'sortColumn' && key !== 'sortedAsc'))
    : {}

  const results: Array<ChildReportExecutionData | null> = await Promise.all(
    childVariants.map(async childVariant => {
      const response =
        reportType === ReportType.DASHBOARD
          ? await services.dashboardService.requestAsyncDashboard(
              token,
              reportId,
              childVariant.id,
              <Record<string, string | number | boolean>>query,
            )
          : await services.reportingService.requestAsyncReport(
              token,
              reportId,
              childVariant.id,
              <Record<string, string | number | boolean>>query,
            )

      const { executionId, tableId } = response

      if (!executionId || !tableId) {
        if (reportType === ReportType.DASHBOARD) {
          return null
        }

        throw new Error('requestChildVariants: No executionId or tableId in response')
      }

      return {
        executionId,
        tableId,
        variantId: childVariant.id,
      }
    }),
  )

  return results.filter((result): result is ChildReportExecutionData => result !== null)
}

/**
 * Request the dashboard - get the execution data
 *
 * @param {Request} req
 * @param {Response} res
 * @param {string} token
 * @param {Services} services
 * @return {*}
 */
const requestDashboard = async (
  {
    reportId,
    id,
    fields,
    childVariants,
    queryParams,
    querySummary,
    filterData,
    definition,
    internalRequestId,
  }: {
    reportId: string
    id: string
    fields: components['schemas']['FieldDefinition'][]
    childVariants: components['schemas']['DashboardDefinition'][]
    queryParams: Record<string, string> | ParsedQs
    querySummary: QuerySummaryItem[]
    filterData: Record<string, string>
    definition: components['schemas']['DashboardDefinition']
    internalRequestId?: string | undefined
  },
  req: Request,
  token: string,
  services: Services,
) => {
  const reportMeta = {
    type: ReportType.DASHBOARD,
    reportId,
    id,
    description: definition.description ?? '',
    name: definition.name,
    reportName: definition.name,
  }

  const query = new ReportQuery({
    fields,
    queryParams,
    reportType: ReportType.DASHBOARD,
  }).toRecordWithFilterPrefix(true) as Record<string, string>

  const requestResponse = await services.dashboardService.requestAsyncDashboard(token, reportId, id, {
    ...query,
  })

  const { executionId, tableId } = requestResponse

  if (!executionId || !tableId) {
    throw new Error('Execution of report request failed - no execution data returned')
  }

  const executionData = {
    executionId,
    tableId,
  }

  const queryData = {
    querySummary,
    filterData,
    query,
  }

  const interactiveDefaultFiltersSearch = getActiveJourneyValue(
    req,
    { id, reportId },
    'interactiveDefaultFiltersSearch',
  )

  let interactiveQueryData: QueryData | undefined
  if (interactiveDefaultFiltersSearch) {
    const interactiveQueryObject = qsToQueryObject(interactiveDefaultFiltersSearch)
    const interactiveQuerySummary = buildQuerySummary(interactiveQueryObject, fields)

    interactiveQueryData = {
      query: interactiveQueryObject,
      querySummary: interactiveQuerySummary,
    }
  }

  const childExecutionData = await requestChildVariants(
    childVariants,
    services,
    ReportType.DASHBOARD,
    token,
    reportId,
    queryData,
  )

  return {
    reportMeta,
    executionData,
    childExecutionData,
    queryData,
    interactiveQueryData,
    internalRequestId,
  }
}

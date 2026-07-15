/* eslint-disable no-param-reassign */
import { NextFunction, Request, Response } from 'express'

// Utils
import { buildFilterData, buildSortData } from '../../../../components/_async/async-filters-form/utils'
import { buildMasterSections } from '../../../../components/_dashboards/dashboard-section/utils'
import { getRequestFilters } from '../../../../components/_filters/utils'
import LocalsHelper from '../../../../utils/localsHelper'

// Types
import type { SetQueryFromFiltersResult } from '../../../../components/_async/async-filters-form/types'
import { buildQuerySummary } from '../../../../components/_async/request-details/utils'
import { DashboardDefinition } from '../../../../components/_dashboards/dashboard-visualisation/types'
import type { components } from '../../../../types/api'
import type { AsyncReportUtilsParams, RequestDataResult, RequestReportData } from '../../../../types/AsyncReportUtils'
import type { ChildReportExecutionData, ExecutionData } from '../../../../types/ExecutionData'
import ReportQuery from '../../../../types/ReportQuery'
import type { Services } from '../../../../types/Services'
import { ReportType } from '../../../../types/UserReports'
import { getDashboardFields, getFields } from '../../../../utils/definitionUtils'
import { formBodyToQueryObject } from '../../../../utils/queryMappers'
import { getActiveJourneyValue, setActiveJourneySortSearch } from '../../../../utils/sessionHelper'
import { joinQueryStrings } from '../../../../utils/urlHelper'
import { RequestedReportBuilder } from '../../my-reports/requested-reports/builder'

// ----------------------------------------------------------------------
// POST
// ----------------------------------------------------------------------

/**
 * Sends the request for the async report
 *
 * @param {AsyncReportUtilsParams} { req, res, services }
 * @return {*}
 */
export const request = async ({ req, res, services }: AsyncReportUtilsParams) => {
  const { token } = LocalsHelper.getValues(res)
  const requestArgs = { req, res, token }

  const { executionData, queryData, childExecutionData } = await requestProduct({
    ...requestArgs,
    services,
  })

  if (executionData.executionId && executionData.tableId) {
    await updateStore({
      req,
      res,
      services,
      queryData,
      executionData,
      childExecutionData,
    })
  } else {
    throw new Error('No execution data returned')
  }

  return executionData
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
  executionData,
  childExecutionData,
}: {
  req: Request
  res: Response
  services: Services
  queryData?: SetQueryFromFiltersResult | undefined
  executionData: ExecutionData
  childExecutionData: Array<ChildReportExecutionData>
}): Promise<void> => {
  const { dprUser } = LocalsHelper.getValues(res)

  const requestedReportData = new RequestedReportBuilder(req, res)
    .withExecutionData(executionData)
    .withChildExecutionData(childExecutionData)
    .withQueryData(queryData)
    .build()

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
 * Request the child variants
 *
 * @param {(Array<components['schemas']['ChildVariantDefinition']>
 *     | Array<components['schemas']['DashboardDefinition']>)} childVariants
 * @param {Services} services
 * @param {ReportType} reportType
 * @param {string} token
 * @param {string} reportId
 * @param {SetQueryFromFiltersResult} [queryData]
 * @param {string} [dataProductDefinitionsPath]
 * @return {*}  {Promise<Array<ChildReportExecutionData>>}
 */
const requestChildVariants = async (
  childVariants:
    | Array<components['schemas']['ChildVariantDefinition']>
    | Array<components['schemas']['DashboardDefinition']>,
  services: Services,
  reportType: ReportType,
  token: string,
  reportId: string,
  queryData?: SetQueryFromFiltersResult,
  dataProductDefinitionsPath?: string,
): Promise<Array<ChildReportExecutionData>> => {
  const query = queryData
    ? Object.fromEntries(Object.entries(queryData.query).filter(([key]) => key !== 'sortColumn' && key !== 'sortedAsc'))
    : {}

  const results: Array<ChildReportExecutionData | null> = await Promise.all(
    childVariants.map(async childVariant => {
      const queryParams = {
        ...query,
        ...(dataProductDefinitionsPath && { dataProductDefinitionsPath }),
      }

      const response =
        reportType === ReportType.DASHBOARD
          ? await services.dashboardService.requestAsyncDashboard(token, reportId, childVariant.id, queryParams)
          : await services.reportingService.requestAsyncReport(token, reportId, childVariant.id, queryParams)

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
const requestDashboard = async (req: Request, res: Response, token: string, services: Services) => {
  const { definitionsPath: dataProductDefinitionsPath, dpdPathFromQuery } = LocalsHelper.getValues(res)
  const { reportId, id } = req.body as { reportId: string; id: string }

  const definition = await services.dashboardService.getDefinition(token, reportId, id, dataProductDefinitionsPath)

  // TODO: Update this type to components['schemas']['DashboardDefinition'] when `childVariants` field is present
  const childVariants = (<DashboardDefinition>definition).childVariants ?? []

  const fields = getDashboardFields(definition)

  const query = new ReportQuery({
    fields,
    queryParams: formBodyToQueryObject(req.body),
    definitionsPath: <string>dataProductDefinitionsPath,
    reportType: ReportType.DASHBOARD,
  }).toRecordWithFilterPrefix(true) as Record<string, string>

  const requestResponse = await services.dashboardService.requestAsyncDashboard(token, reportId, id, {
    ...query,
    dataProductDefinitionsPath,
  })

  const { executionId, tableId } = requestResponse

  if (!executionId || !tableId) {
    throw new Error('Execution of report request failed - no execution data returned')
  }

  const executionData = {
    executionId,
    tableId,
    ...(dpdPathFromQuery && { dataProductDefinitionsPath }),
  }

  const querySummary = buildQuerySummary(req.body, fields)
  const filterData = buildFilterData(req.body)

  const queryData = {
    querySummary,
    filterData,
    query,
  }

  const childExecutionData = await requestChildVariants(
    childVariants,
    services,
    ReportType.DASHBOARD,
    token,
    reportId,
    queryData,
    dataProductDefinitionsPath,
  )

  return {
    executionData,
    childExecutionData,
    queryData,
  }
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
const requestReport = async (req: Request, res: Response, token: string, services: Services) => {
  const { definitionsPath: dataProductDefinitionsPath, dpdPathFromQuery } = LocalsHelper.getValues(res)
  const { reportId, id } = req.body as { reportId: string; id: string }

  const definition = await services.reportingService.getDefinition(token, reportId, id, dataProductDefinitionsPath)

  const childVariants = (<components['schemas']['SingleVariantReportDefinition']>definition).variant.childVariants ?? []

  const fields = getFields(definition)

  const query = new ReportQuery({
    fields,
    queryParams: formBodyToQueryObject(req.body),
    definitionsPath: <string>dataProductDefinitionsPath,
    reportType: ReportType.REPORT,
  }).toRecordWithFilterPrefix(true) as Record<string, string>

  const requestResponse = await services.reportingService.requestAsyncReport(token, reportId, id, {
    ...query,
    dataProductDefinitionsPath,
  })
  const { executionId, tableId } = requestResponse

  if (!executionId || !tableId) {
    throw new Error('Execution of report request failed - no execution data returned')
  }

  const executionData = {
    executionId,
    tableId,
    ...(dpdPathFromQuery && { dataProductDefinitionsPath }),
  }

  const sortData = buildSortData(req.body)
  setActiveJourneySortSearch(req, { reportId, id, tableId }, sortData)

  const querySummary = buildQuerySummary(req.body, fields)
  const filterData = buildFilterData(req.body)

  const queryData = {
    querySummary,
    filterData,
    query,
    ...(sortData && { sortData }),
  }

  const childExecutionData = await requestChildVariants(
    childVariants,
    services,
    ReportType.REPORT,
    token,
    reportId,
    queryData,
    dataProductDefinitionsPath,
  )

  return {
    executionData,
    childExecutionData,
    queryData,
  }
}

const requestProduct = async ({
  req,
  res,
  token,
  services,
}: {
  req: Request
  res: Response
  token: string
  services: Services
}): Promise<{
  executionData: ExecutionData
  childExecutionData: Array<ChildReportExecutionData>
  queryData?: SetQueryFromFiltersResult | undefined
}> => {
  const { type } = req.body as { type: ReportType }

  switch (type) {
    case ReportType.REPORT:
      return requestReport(req, res, token, services)

    case ReportType.DASHBOARD:
      return requestDashboard(req, res, token, services)

    default:
      throw new Error(`Unsupported report type: ${type}`)
  }
}

// ----------------------------------------------------------------------
// ERROR
// ----------------------------------------------------------------------

export const getFiltersFromReqBody = (req: Request) => {
  return Object.keys(req.body)
    .filter(attr => attr.includes('filters.'))
    .filter(attr => !!req.body[attr])
    .map(attr => {
      return { name: attr, value: req.body[attr] }
    })
}

// ----------------------------------------------------------------------
// GET
// ----------------------------------------------------------------------

/**
 * Returns the data required for rendering the async filters component
 *
 * @param {AsyncReportUtilsParams} { req, res, dataSources }
 * @return {*}
 */
export const renderRequest = async ({
  req,
  res,
  services,
  next,
}: {
  req: Request
  res: Response
  next: NextFunction
  services: Services
}): Promise<RequestDataResult | boolean> => {
  try {
    const { reportId, type, id } = req.params as { reportId: string; type: ReportType; id: string }
    const {
      token,
      csrfToken,
      definitionsPath: definitionPath,
      dprUser,
      saveDefaultsEnabled,
    } = LocalsHelper.getValues(res)
    const { definition } = res.locals

    let name: string = ''
    let reportName: string = ''
    let description: string = ''
    let fields: components['schemas']['FieldDefinition'][] = []
    let sections: components['schemas']['DashboardDefinition']['sections'] = []

    if (type === ReportType.REPORT) {
      const reportData = await renderReportRequestData(
        definition as components['schemas']['SingleVariantReportDefinition'],
      )

      name = reportData.name
      reportName = reportData.reportName
      description = reportData.description
      fields = reportData.fields
    }

    if (type === ReportType.DASHBOARD) {
      const dashboardData = await renderDashboardRequestData({
        req,
        token,
        reportId: reportId as string,
        definitionPath,
        services,
        definition: definition as components['schemas']['DashboardDefinition'],
      })

      name = dashboardData.name
      reportName = dashboardData.reportName
      description = dashboardData.description
      fields = dashboardData.fields
      sections = dashboardData.sections
    }

    const filtersData = await getRequestFilters(req, res, fields)

    const hasDefaults = await services.defaultFilterValuesService.hasDefaults(dprUser.id, reportId, id)

    const reportData: RequestReportData = {
      reportName,
      name,
      description,
      reportId,
      id,
      definitionPath,
      csrfToken,
      sections,
      hasDefaults,
      type,
      saveDefaultsEnabled,
    }

    return {
      title: `Request ${type}`,
      filtersDescription: `Customise your ${type} using the filters below and submit your request.`,
      filtersData,
      reportData,
    }
  } catch (error) {
    next(error)
    return false
  }
}

const renderDashboardRequestData = async ({
  req,
  token,
  reportId,
  definitionPath,
  services,
  definition,
}: {
  req: Request
  token: string
  reportId: string
  definitionPath: string
  services: Services
  definition: components['schemas']['DashboardDefinition']
}) => {
  const productDefinitions =
    req.session['allDefinitions'] ?? (await services.reportingService.getDefinitions(token, definitionPath))

  const productDefinition = productDefinitions.find(
    (def: components['schemas']['ReportDefinitionSummary']) => def.id === reportId,
  )

  // TODO: Remove the "as" when components['schemas']['DashboardDefinition'] includes the `childVariants` field
  const { childVariants } = definition as DashboardDefinition

  const masterDefinition = definition
  if (childVariants?.length) {
    // TODO: Remove the casting of definition when components['schemas']['DashboardDefinition'] includes the `childVariants` field
    masterDefinition.sections = buildMasterSections(<DashboardDefinition>definition)
  }

  const { name, description, sections, filterFields: fields } = masterDefinition

  return {
    reportName: productDefinition?.name || '',
    name: name || '',
    description: description || productDefinition?.description || '',
    sections: sections || [],
    fields: fields || [],
  }
}

const renderReportRequestData = async (definition: components['schemas']['SingleVariantReportDefinition']) => {
  const fields = getFields(definition)
  return {
    definition,
    reportName: definition.name,
    name: definition.variant.name,
    description: definition.variant.description || definition.description || '',
    template: definition.variant.specification,
    fields,
  }
}

/**
 * Ensures that the request will always contain the correct qs on first render
 *
 * @param {Response} res
 * @param {Request} req
 * @return {*}
 */
export const redirectWithDefaults = (res: Response, req: Request) => {
  const effectiveQueryString = setDefaultQueryString(req)

  if (effectiveQueryString && Object.keys(req.query).length === 0) {
    const baseUrl = req.originalUrl.split('?')[0].replace(/\/$/, '')
    res.redirect(`${baseUrl}?${effectiveQueryString}`)
    return true
  }
  return false
}

/**
 * Sets the defaults query string for pre-filters
 *
 * @param {Request} req
 * @return {*}
 */
export const setDefaultQueryString = (req: Request) => {
  const { id, reportId } = req.params as {
    id: string
    reportId: string
  }
  const sessionKey = { id, reportId }
  const defaultFiltersSearch = getActiveJourneyValue(req, sessionKey, 'defaultFiltersSearch')
  const savedRequestDefaultsSearch = getActiveJourneyValue(req, sessionKey, 'savedRequestDefaultsSearch')
  const defaultSortQueryString = getActiveJourneyValue(req, sessionKey, 'defaultSortQueryString')

  // If DPD defaults, use those unless there are saved defaults
  const effectiveQueryString =
    savedRequestDefaultsSearch && savedRequestDefaultsSearch.length > 0
      ? savedRequestDefaultsSearch
      : defaultFiltersSearch

  if (defaultSortQueryString && defaultSortQueryString.length > 0) {
    return joinQueryStrings(effectiveQueryString, defaultSortQueryString)
  }

  return effectiveQueryString
}

export default {
  request,
  renderRequest,
  getFiltersFromReqBody,
}

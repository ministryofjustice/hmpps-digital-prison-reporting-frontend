/* eslint-disable no-param-reassign */
import { Request, Response, NextFunction } from 'express'

// Utils
import { buildFilterData, buildSortData } from '../../../../components/_async/async-filters-form/utils'
import LocalsHelper from '../../../../utils/localsHelper'
import { getRequestFilters } from '../../../../components/_filters/utils'
import { removeDuplicates } from '../../../../utils/reportStoreHelper'
import UserStoreItemBuilder from '../../../../utils/UserStoreItemBuilder'

// Types
import type ReportingService from '../../../../services/reportingService'
import { ReportType, RequestFormData, RequestStatus } from '../../../../types/UserReports'
import type { ExecutionData, ChildReportExecutionData } from '../../../../types/ExecutionData'
import type { AsyncReportUtilsParams, RequestDataResult, RequestReportData } from '../../../../types/AsyncReportUtils'
import type { SetQueryFromFiltersResult } from '../../../../components/_async/async-filters-form/types'
import type { components } from '../../../../types/api'
import type { Services } from '../../../../types/Services'
import { getDefinitionByType, getFields } from '../../../../utils/definitionUtils'
import { getActiveJourneyValue, setActiveJourneySortSearch } from '../../../../utils/sessionHelper'
import { formBodyToQueryObject } from '../../../../utils/queryMappers'
import { joinQueryStrings } from '../../../../utils/urlHelper'
import { buildQuerySummary } from '../../../../components/_async/request-details/utils'
import logger from '../../../../utils/logger'

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
  const { search, id, type } = req.body
  const { dprUser, definitionsPath, dpdPathFromQuery } = LocalsHelper.getValues(res)

  await removeDuplicates({ storeService: services.requestedReportService, userId: dprUser.id, id, search })
  await removeDuplicates({ storeService: services.recentlyViewedService, userId: dprUser.id, id, search })

  const requestFormData: RequestFormData = req.body
  const reportData = {
    type: requestFormData.type as ReportType,
    reportId: requestFormData.reportId,
    reportName: requestFormData.reportName,
    description: requestFormData.description,
    id: requestFormData.id,
    name: requestFormData.name,
  }

  let requestedReportData
  switch (type) {
    case ReportType.REPORT:
      requestedReportData = new UserStoreItemBuilder(reportData, requestFormData)
        .addExecutionData(executionData)
        .addChildExecutionData(childExecutionData)
        .addFilters(queryData?.filterData)
        .addSortData(queryData?.sortData)
        .addDefinitionsPath(definitionsPath, dpdPathFromQuery)
        .addRequestUrls(req)
        .addQuery(queryData)
        .addStatus(RequestStatus.SUBMITTED)
        .addTimestamp()
        .build()
      break
    case ReportType.DASHBOARD: {
      requestedReportData = new UserStoreItemBuilder(reportData, requestFormData)
        .addExecutionData(executionData)
        .addChildExecutionData(childExecutionData)
        .addFilters(queryData?.filterData)
        .addDefinitionsPath(definitionsPath, dpdPathFromQuery)
        .addRequestUrls(req)
        .addQuery(queryData)
        .addStatus(RequestStatus.SUBMITTED)
        .addTimestamp()
        .addMetrics(JSON.parse(req.body.sections))
        .build()
      break
    }
    default:
      break
  }

  if (requestedReportData) await services.requestedReportService.addReport(dprUser.id, requestedReportData)
}

const requestChildReports = async (
  childVariants: Array<components['schemas']['ChildVariantDefinition']>,
  reportingService: ReportingService,
  token: string,
  reportId: string,
  queryData?: SetQueryFromFiltersResult,
  dataProductDefinitionsPath?: string,
): Promise<Array<ChildReportExecutionData>> => {
  let query: Record<string, string>
  if (queryData) {
    query = queryData.query
    delete query['sortColumn']
    delete query['sortedAsc']
  }

  return Promise.all(
    childVariants.map((childVariant) =>
      reportingService
        .requestAsyncReport(token, reportId, childVariant.id, {
          ...(query && query),
          ...(dataProductDefinitionsPath && { dataProductDefinitionsPath }),
        })
        .then((response) => {
          const { executionId, tableId } = response
          if (!executionId || !tableId) {
            throw new Error('requestChildReports: No execution of tableId in response')
          }
          return { executionId, tableId, variantId: childVariant.id }
        }),
    ),
  )
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
  const { definitionsPath: dataProductDefinitionsPath, dpdPathFromQuery } = LocalsHelper.getValues(res)
  const { reportId, id, type } = req.body as { reportId: string; id: string; type: ReportType }

  const query = formBodyToQueryObject(req.body)

  let executionId
  let tableId
  let childVariants: components['schemas']['ChildVariantDefinition'][] = []
  let sortData: Record<string, string> | undefined

  const { definition, fields } = await getDefinitionByType(type, services, token, reportId, id)

  if (type === ReportType.REPORT) {
    const requestReportResponse = await services.reportingService.requestAsyncReport(token, reportId, id, {
      ...query,
      dataProductDefinitionsPath,
    })
    executionId = requestReportResponse['executionId']
    tableId = requestReportResponse['tableId']
    childVariants = (<components['schemas']['SingleVariantReportDefinition']>definition).variant.childVariants ?? []
    sortData = buildSortData(req.body)
    setActiveJourneySortSearch(req, { reportId, id, tableId }, sortData)
  }

  if (type === ReportType.DASHBOARD) {
    const requestDashboardResponse = await services.dashboardService.requestAsyncDashboard(token, reportId, id, {
      ...query,
      dataProductDefinitionsPath,
    })
    executionId = requestDashboardResponse['executionId']
    tableId = requestDashboardResponse['tableId']
  }

  const querySummary = buildQuerySummary(req.body, fields)
  const filterData = buildFilterData(req.body)

  const queryData = {
    querySummary,
    filterData,
    query,
    ...(sortData && { sortData }),
  }

  const childExecutionData = await requestChildReports(
    childVariants,
    services.reportingService,
    token,
    reportId,
    queryData,
    dataProductDefinitionsPath,
  )

  const executionData = {
    executionId,
    tableId,
    ...(dpdPathFromQuery && { dataProductDefinitionsPath }),
  }

  return {
    executionData,
    childExecutionData,
    queryData,
  }
}

// ----------------------------------------------------------------------
// ERROR
// ----------------------------------------------------------------------

export const getFiltersFromReqBody = (req: Request) => {
  return Object.keys(req.body)
    .filter((attr) => attr.includes('filters.'))
    .filter((attr) => !!req.body[attr])
    .map((attr) => {
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
    const { token, csrfToken, definitionsPath: definitionPath, dprUser } = LocalsHelper.getValues(res)
    const { definition, saveDefaultsEnabled } = res.locals

    logger.info('PERSONALISATION DEBUG: saveDefaultsEnabled', saveDefaultsEnabled)

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
      const definitionApiArgs = { token, reportId: reportId as string, definitionPath, services }
      const dashboardData = await renderDashboardRequestData({
        ...definitionApiArgs,
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
  token,
  reportId,
  definitionPath,
  services,
  definition,
}: {
  token: string
  reportId: string
  definitionPath: string
  services: Services
  definition: components['schemas']['DashboardDefinition']
}) => {
  const productDefinitions = await services.reportingService.getDefinitions(token, definitionPath)
  const productDefinition = productDefinitions.find(
    (def: components['schemas']['ReportDefinitionSummary']) => def.id === reportId,
  )
  const { name, description, sections, filterFields: fields } = definition

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

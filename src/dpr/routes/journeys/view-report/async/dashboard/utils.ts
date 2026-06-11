import { Request, Response } from 'express'
import type { ParsedQs } from 'qs'
import { DashboardSection } from '../../../../../components/_dashboards/dashboard-visualisation/types'
import type { AsyncReportUtilsParams } from '../../../../../types/AsyncReportUtils'
import { Services } from '../../../../../types/Services'
import Dict = NodeJS.Dict

import type { DashboardDataResponse } from '../../../../../types/Metrics'
import type { RequestedReport } from '../../../../../types/UserReports'
import { ReportType } from '../../../../../types/UserReports'
import type { components } from '../../../../../types/api'

import { createDashboardSections } from '../../../../../components/_dashboards/dashboard-section/utils'
import { validateDashboardVisualisations } from '../../../../../components/_dashboards/dashboard-visualisation/utils'
import { FilterType } from '../../../../../components/_filters/filter-input/enum'
import { buildAppliedFilters } from '../../../../../components/_filters/filters-applied/utils'
import { FilterValue, GranularDateRangeFilterValue, PartialDate } from '../../../../../components/_filters/types'
import FilterUtils from '../../../../../components/_filters/utils'
import ReportActionsUtils from '../../../../../components/_reports/report-heading/report-actions/utils'
import { setUpBookmark } from '../../../../../components/bookmark/utils'
import ReportQuery from '../../../../../types/ReportQuery'
import ErrorHandler from '../../../../../utils/ErrorHandler/ErrorHandler'
import DefinitionUtils, { getDashboardFields } from '../../../../../utils/definitionUtils'
import LocalsHelper from '../../../../../utils/localsHelper'
import { extractFiltersFromQuery } from '../../../../../utils/queryMappers'
import { updateLastViewedAsync } from '../../utils'
import DashboardSchema from './validate'
import { getMyReport } from '../../../my-reports/utils'

const setDashboardActions = (
  dashboardDefinition: components['schemas']['DashboardDefinition'],
  reportDefinition: components['schemas']['ReportDefinitionSummary'],
  requestData?: RequestedReport,
) => {
  const reportName = reportDefinition.name
  const { name } = dashboardDefinition
  const actionsUrl = requestData?.url?.request?.fullUrl
  const executionId = requestData?.executionId

  let actions = {}
  if (actionsUrl) {
    actions = {
      share: {
        reportName,
        name,
        url: actionsUrl,
      },
      copy: {
        url: actionsUrl,
      },
    }
    if (executionId) {
      actions = {
        ...actions,
        refresh: {
          url: actionsUrl,
          executionId,
        },
      }
    }
  }

  return ReportActionsUtils.getActions(actions)
}

const getDefinitionData = async ({
  req,
  res,
  services,
  queryData,
}: {
  req: Request
  res: Response
  services: Services
  queryData?: Dict<string | string[]> | undefined
}) => {
  const { token, definitionsPath } = LocalsHelper.getValues(res)
  const { reportId, id, tableId } = <{ id: string; reportId: string; tableId: string }>req.params

  // Dashboard Definition,
  const dashboardDefinition =
    (res.locals['definition'] as components['schemas']['DashboardDefinition']) ??
    (await services.dashboardService.getDefinition(token, reportId, id, definitionsPath, queryData))

  // Validate definition
  DashboardSchema.DashboardSchema.parse(dashboardDefinition)
  // validate visualisations
  await validateDashboardVisualisations(dashboardDefinition)

  // Report summary data
  const reportDefinition =
    res.locals['reportDefinitionSummary'] ??
    (await DefinitionUtils.getReportSummary(reportId, services.reportingService, token, definitionsPath))

  // Get the filters
  const fields = getDashboardFields(dashboardDefinition)
  const filters = await FilterUtils.getInteractiveFilters({
    fields,
    req,
  })

  // Get the applied Filters
  const appliedFilters = buildAppliedFilters(req, { reportId, id, tableId }, fields)

  // Create the query
  const query = new ReportQuery({
    fields,
    queryParams: extractFiltersFromQuery(req.query) as ParsedQs,
    definitionsPath,
    reportType: ReportType.DASHBOARD,
  }).toRecordWithFilterPrefix(true)

  return {
    query,
    filters,
    dashboardDefinition,
    reportDefinition,
    appliedFilters,
    fields,
  }
}

const updateStore = async (
  services: Services,
  tableId: string,
  userId: string,
  sections: DashboardSection[],
  req: Request,
  res: Response,
  fields: components['schemas']['FieldDefinition'][],
): Promise<RequestedReport | undefined> => {
  const dashboardRequestData = await getMyReport({ tableId }, 'requestedReports', services, userId)

  // Add to recently viewed
  if (sections && sections.length && dashboardRequestData) {
    await updateLastViewedAsync(req, res, services, dashboardRequestData, userId, fields)
  }

  return dashboardRequestData
}

const getPartialDate = (filters: FilterValue[]) => {
  let partialDate: PartialDate | undefined
  const granularDateRangeFilter = <GranularDateRangeFilterValue | undefined>(
    filters.find(f => f.type === FilterType.granularDateRange.toLowerCase())
  )
  if (granularDateRangeFilter) {
    partialDate = granularDateRangeFilter.value.partialDate
  }
  return partialDate
}

export const renderAsyncDashboard = async ({ req, res, services }: AsyncReportUtilsParams) => {
  const { token, csrfToken, dprUser } = LocalsHelper.getValues(res)
  const { reportId, id, tableId } = <{ id: string; variantId: string; tableId: string; reportId: string }>req.params
  const { bookmarkService, requestedReportService } = services
  const { id: userId } = dprUser

  let requestData: RequestedReport | undefined = await getMyReport({ tableId }, 'requestedReports', services, userId)
  const queryData = requestData?.query?.data
  const querySummary = requestData?.query?.summary

  // Get the definition Data
  const { query, filters, reportDefinition, dashboardDefinition, appliedFilters, fields } = await getDefinitionData({
    req,
    res,
    services,
    queryData,
  })

  // Get the dashboard data and check if expired
  const { dashboardData, expired } = await getDashboardData(token, reportId, id, tableId, query, services)

  const partialDate = getPartialDate(filters)

  const bookmarkConfig = setUpBookmark(res, req, bookmarkService)

  // Get the dashboard parts
  const dashboardFeatureFlags = res.app.locals['featureFlags'].flags
  const sections: DashboardSection[] = createDashboardSections(
    dashboardDefinition,
    dashboardData,
    query,
    dashboardFeatureFlags,
    partialDate,
  )

  // Update the store
  if (requestedReportService) {
    requestData = await updateStore(services, tableId, dprUser.id, sections, req, res, fields)
  }

  return {
    dashboardData: {
      token,
      id,
      reportId,
      querySummary,
      name: dashboardDefinition.name,
      description: dashboardDefinition.description,
      reportName: reportDefinition.name,
      csrfToken,
      sections,
      filters,
      type: ReportType.DASHBOARD,
      actions: setDashboardActions(dashboardDefinition, reportDefinition, requestData),
      bookmarkConfig,
      appliedFilters,
    },
    expired,
  }
}

/**
 * Gets the data for a dashboard
 *
 * @param {string} token
 * @param {string} reportId
 * @param {string} id
 * @param {string} tableId
 * @param {(Record<string, string | string[]>)} query
 * @param {Services} services
 * @return {*}
 */
const getDashboardData = async (
  token: string,
  reportId: string,
  id: string,
  tableId: string,
  query: Record<string, string | string[]>,
  services: Services,
) => {
  let dashboardData: DashboardDataResponse[] = []
  let expired = false
  try {
    const dashboardResultData: DashboardDataResponse[][] = await services.dashboardService.getAsyncDashboard(
      token,
      id,
      reportId,
      tableId,
      query,
    )
    dashboardData = Array.isArray(dashboardResultData) ? dashboardResultData.flat().filter(Boolean) : []
  } catch (error) {
    const dprError = new ErrorHandler(error).formatError()
    if (dprError.status === 404) {
      expired = true
    } else {
      throw error
    }
  }

  return {
    dashboardData,
    expired,
  }
}

export default {
  renderAsyncDashboard,
  getDefinitionData,
  setDashboardActions,
}

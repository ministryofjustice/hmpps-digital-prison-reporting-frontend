import { Request, Response } from 'express'
import { Services } from '../../../../../types/Services'
import Dict = NodeJS.Dict
import { DashboardSection } from '../../../../../components/_dashboards/dashboard-visualisation/types'
import type { AsyncReportUtilsParams } from '../../../../../types/AsyncReportUtils'

import type { DashboardDataResponse } from '../../../../../types/Metrics'
import type { RequestedReport } from '../../../../../types/UserReports'
import { ReportType } from '../../../../../types/UserReports'
import type { components } from '../../../../../types/api'

import DefinitionUtils, { getDashboardFields } from '../../../../../utils/definitionUtils'
import UserReportsUtils from '../../../../../components/user-reports/utils'
import FilterUtils from '../../../../../components/_filters/utils'
import ReportActionsUtils from '../../../../../components/_reports/report-heading/report-actions/utils'
import ReportQuery from '../../../../../types/ReportQuery'
import LocalsHelper from '../../../../../utils/localsHelper'
import { FilterValue, GranularDateRangeFilterValue, PartialDate } from '../../../../../components/_filters/types'
import { FilterType } from '../../../../../components/_filters/filter-input/enum'
import { validateDashboardVisualisations } from '../../../../../components/_dashboards/dashboard-visualisation/utils'
import { createDashboardSections } from '../../../../../components/_dashboards/dashboard-section/utils'
import DashboardSchema from './validate'
import { setUpBookmark } from '../../../../../components/bookmark/utils'
import { buildAppliedFilters } from '../../../../../components/_filters/filters-applied/utils'
import { extractFiltersFromQuery } from '../../../../../utils/queryMappers'
import { ParsedQs } from 'qs'

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
  const { token } = LocalsHelper.getValues(res)
  const { reportId, id, tableId } = <{ id: string; reportId: string; tableId: string }>req.params
  const dataProductDefinitionsPath = <string>req.query['dataProductDefinitionsPath']

  // Dashboard Definition,
  const dashboardDefinition = await services.dashboardService.getDefinition(
    token,
    reportId,
    id,
    dataProductDefinitionsPath,
    queryData,
  )

  // Validate definition
  DashboardSchema.DashboardSchema.parse(dashboardDefinition)
  // validate visualisations
  await validateDashboardVisualisations(dashboardDefinition)

  // Report summary data
  const reportDefinition = await DefinitionUtils.getReportSummary(
    reportId,
    services.reportingService,
    token,
    <string>dataProductDefinitionsPath,
  )

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
    fields: dashboardDefinition.filterFields || [],
    queryParams: extractFiltersFromQuery(req.query) as ParsedQs,
    definitionsPath: <string>dataProductDefinitionsPath,
    reportType: ReportType.DASHBOARD,
  }).toRecordWithFilterPrefix(true)

  return {
    query,
    filters,
    dashboardDefinition,
    reportDefinition,
    appliedFilters,
  }
}

const updateStore = async (
  services: Services,
  tableId: string,
  userId: string,
  sections: DashboardSection[],
  req: Request,
  filters: FilterValue[],
): Promise<RequestedReport | undefined> => {
  const { requestedReportService } = services
  const dashboardRequestData = await requestedReportService.getReportByTableId(tableId, userId)

  // Add to recently viewed
  if (sections && sections.length && dashboardRequestData) {
    UserReportsUtils.updateLastViewed({
      services,
      reportStateData: dashboardRequestData,
      userId,
      req,
      filters,
    })
  }

  return dashboardRequestData
}

const getPartialDate = (filters: FilterValue[]) => {
  let partialDate: PartialDate | undefined
  const granularDateRangeFilter = <GranularDateRangeFilterValue | undefined>(
    filters.find((f) => f.type === FilterType.granularDateRange.toLowerCase())
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

  let requestData: RequestedReport | undefined = await requestedReportService.getReportByTableId(tableId, userId)
  const queryData = requestData?.query?.data

  // Get the definition Data
  const { query, filters, reportDefinition, dashboardDefinition, appliedFilters } = await getDefinitionData({
    req,
    res,
    services,
    queryData,
  })

  // Get the results data
  const dashboardData: DashboardDataResponse[][] = await services.dashboardService.getAsyncDashboard(
    token,
    id,
    reportId,
    tableId,
    query,
  )

  const flattenedData: DashboardDataResponse[] = Array.isArray(dashboardData)
    ? dashboardData.flat().filter(Boolean)
    : []
  const partialDate = getPartialDate(filters)

  const bookmarkConfig = setUpBookmark(res, req, bookmarkService)

  // Get the dashboard parts
  const dashboardFeatureFlags = res.app.locals['featureFlags'].flags
  const sections: DashboardSection[] = createDashboardSections(
    dashboardDefinition,
    flattenedData,
    query,
    dashboardFeatureFlags,
    partialDate,
  )

  // Update the store
  if (requestedReportService) {
    requestData = await updateStore(services, tableId, dprUser.id, sections, req, filters)
  }

  return {
    dashboardData: {
      token,
      id,
      reportId,
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
  }
}

export default {
  renderAsyncDashboard,
  getDefinitionData,
  setDashboardActions,
}

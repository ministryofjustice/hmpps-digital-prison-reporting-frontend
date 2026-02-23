import { Request, Response } from 'express'
import { Services } from '../../../../../types/Services'
import Dict = NodeJS.Dict
import {
  DashboardSection,
  DashboardVisualisation,
  DashboardVisualisationType,
} from '../../../../../components/_dashboards/dashboard-visualisation/types'
import type { AsyncReportUtilsParams } from '../../../../../types/AsyncReportUtils'

import type { DashboardDataResponse } from '../../../../../types/Metrics'
import type { RequestedReport } from '../../../../../types/UserReports'
import { ReportType } from '../../../../../types/UserReports'
import type { components } from '../../../../../types/api'

import ChartUtils from '../../../../../components/_charts/utils'
import DefinitionUtils from '../../../../../utils/definitionUtils'
import UserReportsUtils from '../../../../../components/user-reports/utils'
import DashboardListUtils from '../../../../../components/_dashboards/dashboard-list/utils'
import FilterUtils from '../../../../../components/_filters/utils'
import ScorecardsUtils from '../../../../../components/_dashboards/scorecard/utils'
import ScorecardVisualisation from '../../../../../components/_dashboards/scorecard/Scorecard'
import ScorecardGroupVisualisation from '../../../../../components/_dashboards/scorecard-group/ScorecardGroup'
import ReportActionsUtils from '../../../../../components/_reports/report-heading/report-actions/utils'
import ReportQuery from '../../../../../types/ReportQuery'
import LocalsHelper from '../../../../../utils/localsHelper'
import { FilterValue, GranularDateRangeFilterValue, PartialDate } from '../../../../../components/_filters/types'
import { FiltersType } from '../../../../../components/_filters/filtersTypeEnum'
import { FilterType } from '../../../../../components/_filters/filter-input/enum'
import { FEATURE_FLAG_KEYS } from '../../../../../utils/featureFlagsHelper'
import { validateDashboardDefinitions } from '../../../../../components/_dashboards/dashboard-visualisation/utils'

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
  const { reportId, id } = <{ id: string; reportId: string }>req.params
  const dataProductDefinitionsPath = <string>req.query['dataProductDefinitionsPath']

  // Dashboard Definition,
  const dashboardDefinition = await services.dashboardService.getDefinition(
    token,
    reportId,
    id,
    dataProductDefinitionsPath,
    queryData,
  )

  // Report summary data
  const reportDefinition = await DefinitionUtils.getReportSummary(
    reportId,
    services.reportingService,
    token,
    <string>dataProductDefinitionsPath,
  )

  // Get the filters
  const filtersData = await FilterUtils.getFilters({
    fields: dashboardDefinition.filterFields || [],
    req,
    filtersType: FiltersType.INTERACTIVE,
  })

  const filtersQuery = FilterUtils.setRequestQueryFromFilterValues(filtersData.filters)

  // Create the query
  const query = new ReportQuery({
    fields: dashboardDefinition.filterFields || [],
    queryParams: filtersQuery,
    definitionsPath: <string>dataProductDefinitionsPath,
    reportType: ReportType.DASHBOARD,
  }).toRecordWithFilterPrefix(true)

  return {
    query,
    filters: filtersData,
    dashboardDefinition,
    reportDefinition,
  }
}

const getSections = (
  dashboardDefinition: components['schemas']['DashboardDefinition'],
  dashboardData: DashboardDataResponse[],
  query: Record<string, string | string[]>,
  dashboardFeatureFlags: Record<string, boolean>,
  partialDate?: PartialDate,
): DashboardSection[] => {
  return dashboardDefinition.sections.map((section: components['schemas']['DashboardSectionDefinition']) => {
    const { id, display: title, description } = section

    const featureFlagVisTypeMap = {
      [DashboardVisualisationType.LIST]: true,
      [DashboardVisualisationType.BAR]: dashboardFeatureFlags[FEATURE_FLAG_KEYS.BAR_CHARTS],
      [DashboardVisualisationType.LINE]: dashboardFeatureFlags[FEATURE_FLAG_KEYS.LINE_CHARTS],
      [DashboardVisualisationType.DONUT]: dashboardFeatureFlags[FEATURE_FLAG_KEYS.DONUT_CHARTS],
      [DashboardVisualisationType.SCORECARD]: dashboardFeatureFlags[FEATURE_FLAG_KEYS.SCORECARD_CHARTS],
      [DashboardVisualisationType.SCORECARD_GROUP]: dashboardFeatureFlags[FEATURE_FLAG_KEYS.SCORECARD_GROUP_CHARTS],
      [DashboardVisualisationType.MATRIX_TIMESERIES]: dashboardFeatureFlags[FEATURE_FLAG_KEYS.MATRIX_TIMESERIES_CHARTS],
      [DashboardVisualisationType.BAR_TIMESERIES]: dashboardFeatureFlags[FEATURE_FLAG_KEYS.BAR_TIMESERIES_CHARTS],
      [DashboardVisualisationType.LINE_TIMESERIES]: dashboardFeatureFlags[FEATURE_FLAG_KEYS.LINE_TIMESERIES_CHARTS],
    }

    let hasScorecard = false
    const visualisations: DashboardVisualisation[] = section.visualisations.map(
      (visDefinition: components['schemas']['DashboardVisualisationDefinition']) => {
        const { type, display, description: visDescription, id: visId } = visDefinition
        const isEnabled = featureFlagVisTypeMap[type]

        let data: DashboardVisualisation['data'] | undefined

        switch (type) {
          case DashboardVisualisationType.LIST:
            data = DashboardListUtils.createList(visDefinition, dashboardData)
            break

          case DashboardVisualisationType.SCORECARD:
            hasScorecard = true
            data = new ScorecardVisualisation().withDefinition(visDefinition).withData(dashboardData).build()
            break

          case DashboardVisualisationType.SCORECARD_GROUP:
            data = new ScorecardGroupVisualisation().withDefinition(visDefinition).withData(dashboardData).build()
            break

          case DashboardVisualisationType.BAR:
          case DashboardVisualisationType.LINE:
          case DashboardVisualisationType.DONUT: {
            data = ChartUtils.createChart(visDefinition, dashboardData, type)
            break
          }
          case DashboardVisualisationType.MATRIX_TIMESERIES:
          case DashboardVisualisationType.BAR_TIMESERIES:
          case DashboardVisualisationType.LINE_TIMESERIES: {
            data = ChartUtils.createTimeseriesCharts(visDefinition, dashboardData, type, query, partialDate)
            break
          }
          default:
            break
        }

        return {
          id: visId,
          title: display || '',
          description: visDescription || '',
          type,
          data,
          isEnabled: isEnabled ?? true,
        }
      },
    )

    if (hasScorecard)
      ScorecardsUtils.mergeScorecardsIntoGroup(
        visualisations,
        featureFlagVisTypeMap[DashboardVisualisationType.SCORECARD_GROUP],
      )

    return { id, title: title || '', description: description || '', visualisations }
  })
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
  const { token, csrfToken, dprUser, nestedBaseUrl, bookmarkingEnabled } = LocalsHelper.getValues(res)
  const { reportId, id, tableId } = <{ id: string; variantId: string; tableId: string; reportId: string }>req.params
  const { bookmarkService, requestedReportService } = services
  const { id: userId } = dprUser

  let requestData: RequestedReport | undefined = await requestedReportService.getReportByTableId(tableId, userId)
  const queryData = requestData?.query?.data

  // Get the definition Data
  const { query, filters, reportDefinition, dashboardDefinition } = await getDefinitionData({
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

  const flattenedData: DashboardDataResponse[] = dashboardData.flat()
  const partialDate = getPartialDate(filters.filters)

  let bookmarked
  if (bookmarkingEnabled) {
    bookmarked = await bookmarkService.isBookmarked(id, reportId, dprUser.id)
  }

  // validate dashboard
  await validateDashboardDefinitions(dashboardDefinition)

  // Get the dashboard parts
  const dashboardFeatureFlags = res.app.locals['featureFlags'].flags
  const sections: DashboardSection[] = getSections(
    dashboardDefinition,
    flattenedData,
    query,
    dashboardFeatureFlags,
    partialDate,
  )

  // Update the store
  if (requestedReportService) {
    requestData = await updateStore(services, tableId, dprUser.id, sections, req, filters.filters)
  }

  return {
    dashboardData: {
      token,
      id,
      reportId,
      name: dashboardDefinition.name,
      description: dashboardDefinition.description,
      reportName: reportDefinition.name,
      bookmarked,
      bookmarkingEnabled,
      nestedBaseUrl,
      csrfToken,
      sections,
      filters,
      type: ReportType.DASHBOARD,
      actions: setDashboardActions(dashboardDefinition, reportDefinition, requestData),
    },
  }
}

export default {
  renderAsyncDashboard,
  getDefinitionData,
  getSections,
  setDashboardActions,
}

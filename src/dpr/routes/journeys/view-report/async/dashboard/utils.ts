import parseUrl from 'parseurl'
import { Url } from 'url'
import { Request } from 'express'
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
import ReportActionsUtils from '../../../../../components/_reports/report-actions/utils'
import ReportQuery from '../../../../../types/ReportQuery'
import LocalsHelper from '../../../../../utils/localsHelper'
import { Services } from '../../../../../types/Services'
import { FilterValue } from '../../../../../components/_filters/types'
import { FiltersType } from '../../../../../components/_filters/filtersTypeEnum'

const setDashboardActions = (
  dashboardDefinition: components['schemas']['DashboardDefinition'],
  reportDefinition: components['schemas']['ReportDefinitionSummary'],
  requestData: RequestedReport,
) => {
  const reportName = reportDefinition.name
  const { name } = dashboardDefinition
  const actionsUrl = requestData.url.request.fullUrl
  const { executionId } = requestData

  return ReportActionsUtils.getActions({
    share: {
      reportName,
      name,
      url: actionsUrl,
    },
    refresh: {
      url: actionsUrl,
      executionId,
    },
    copy: {
      url: actionsUrl,
    },
  })
}

const getDefinitionData = async ({ req, res, services, next }: AsyncReportUtilsParams) => {
  const { token } = LocalsHelper.getValues(res)
  const { reportId, id } = req.params
  const { dataProductDefinitionsPath } = req.query

  // Dashboard Definition,
  const dashboardDefinition: components['schemas']['DashboardDefinition'] =
    await services.dashboardService.getDefinition(token, reportId, id, dataProductDefinitionsPath)

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
): DashboardSection[] => {
  return dashboardDefinition.sections.map((section: components['schemas']['DashboardSectionDefinition']) => {
    const { id, display: title, description } = section

    let hasScorecard = false
    const visualisations = section.visualisations.map(
      (visDefinition: components['schemas']['DashboardVisualisationDefinition']) => {
        const { type, display, description: visDescription, id: visId } = visDefinition

        let data: DashboardVisualisation['data']

        switch (type) {
          case DashboardVisualisationType.LIST:
            data = DashboardListUtils.createList(visDefinition, dashboardData)
            break

          case DashboardVisualisationType.SCORECARD:
            hasScorecard = true
            data = new ScorecardVisualisation(dashboardData, visDefinition).build()
            break

          case DashboardVisualisationType.SCORECARD_GROUP:
            data = new ScorecardVisualisation(dashboardData, visDefinition, true).build()
            break

          case DashboardVisualisationType.BAR:
          case DashboardVisualisationType.LINE:
          case DashboardVisualisationType.DONUT: {
            data = ChartUtils.createChart(visDefinition, dashboardData)
            break
          }
          case DashboardVisualisationType.MATRIX:
          case DashboardVisualisationType.MATRIX_TIMESERIES: {
            data = ChartUtils.createMatrixChart(visDefinition, dashboardData, query)
            break
          }
          case DashboardVisualisationType.BAR_TIMESERIES:
          case DashboardVisualisationType.LINE_TIMESERIES: {
            data = ChartUtils.createTimeseriesCharts(visDefinition, dashboardData)
            break
          }
          default:
            break
        }

        return {
          id: visId,
          title: display,
          description: visDescription,
          type,
          data,
        }
      },
    )

    if (hasScorecard) ScorecardsUtils.mergeScorecardsIntoGroup(visualisations)

    return { id, title, description, visualisations }
  })
}

const updateStore = async (
  services: Services,
  tableId: string,
  userId: string,
  sections: DashboardSection[],
  url: Url,
  req: Request,
  filters: FilterValue[],
) => {
  const dashboardRequestData: RequestedReport = await services.requestedReportService.getReportByTableId(
    tableId,
    userId,
  )

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

export const renderAsyncDashboard = async ({ req, res, services, next }: AsyncReportUtilsParams) => {
  const { token, csrfToken, dprUser, nestedBaseUrl } = LocalsHelper.getValues(res)
  const { reportId, id, tableId } = req.params
  const url = parseUrl(req)

  // Get the definition Data
  const { query, filters, reportDefinition, dashboardDefinition } = await getDefinitionData({
    req,
    res,
    services,
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

  // Get the dashboard parts
  const sections: DashboardSection[] = getSections(dashboardDefinition, flattenedData, query)

  // Update the store
  const dashboardRequestData = await updateStore(services, tableId, dprUser.id, sections, url, req, filters.filters)

  return {
    dashboardData: {
      token,
      id,
      reportId,
      name: dashboardDefinition.name,
      description: dashboardDefinition.description,
      reportName: reportDefinition.name,
      bookmarked: await services.bookmarkService.isBookmarked(id, reportId, dprUser.id),
      nestedBaseUrl,
      csrfToken,
      sections,
      filters,
      type: ReportType.DASHBOARD,
      actions: setDashboardActions(dashboardDefinition, reportDefinition, dashboardRequestData),
    },
  }
}

export default {
  renderAsyncDashboard,
}

import parseUrl from 'parseurl'
import { Url } from 'url'
import type { AsyncReportUtilsParams } from '../../../types/AsyncReportUtils'

import {
  DashboardUIVisualisation,
  DashboardVisualisationType,
  ListVisualisation,
  type DashboardDefinition,
  type DashboardSection,
  type DashboardUISection,
  type DashboardVisualisation,
} from './types'
import type { DashboardDataResponse } from '../../../types/Metrics'
import type { RequestedReport } from '../../../types/UserReports'
import { ReportType } from '../../../types/UserReports'
import type { components } from '../../../types/api'

import ChartUtils from '../../_charts/utils'
import DefinitionUtils from '../../../utils/definitionUtils'
import UserReportsUtils from '../../user-reports/utils'
import DashboardListUtils from '../dashboard-list/utils'
import FilterUtils from '../../_filters/utils'
import ScorecardsUtils from '../scorecard/utils'
import ReportActionsUtils from '../../_reports/report-actions/utils'
import ReportQuery from '../../../types/ReportQuery'
import LocalsHelper from '../../../utils/localsHelper'
import { Services } from '../../../types/Services'

const setDashboardActions = (
  dashboardDefinition: DashboardDefinition,
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
  const dashboardDefinition: DashboardDefinition = await services.dashboardService.getDefinition(
    token,
    id,
    reportId,
    dataProductDefinitionsPath,
  )

  // Report summary data
  const reportDefinition = await DefinitionUtils.getReportSummary(
    reportId,
    services.reportingService,
    token,
    <string>dataProductDefinitionsPath,
  )

  // Get the filters
  const filters = await FilterUtils.getFilters({
    fields: dashboardDefinition.filterFields || [],
    req,
    interactive: true,
  })

  // Create the query
  const query = new ReportQuery({
    fields: dashboardDefinition.filterFields || [],
    queryParams: req.query,
    definitionsPath: <string>dataProductDefinitionsPath,
  }).toRecordWithFilterPrefix(true)

  return {
    query,
    filters,
    dashboardDefinition,
    reportDefinition,
  }
}

const getSections = (
  dashboardDefinition: DashboardDefinition,
  dashboardData: DashboardDataResponse[],
): DashboardUISection[] => {
  return dashboardDefinition.sections.map((section: DashboardSection) => {
    const { id, display: title, description } = section

    let hasScorecard = false
    const visualisations = section.visualisations.map((visDefinition: DashboardVisualisation) => {
      const { type, display, description: visDescription, id: visId } = visDefinition

      let data: DashboardUIVisualisation['data']

      switch (type) {
        case DashboardVisualisationType.LIST:
          data = DashboardListUtils.createList(visDefinition as ListVisualisation, dashboardData)
          break

        case DashboardVisualisationType.SCORECARD:
          hasScorecard = true
          data = ScorecardsUtils.createScorecard(visDefinition, dashboardData)
          break

        case DashboardVisualisationType.SCORECARD_GROUP:
          data = ScorecardsUtils.createScorecards(visDefinition, dashboardData)
          break

        case DashboardVisualisationType.BAR:
        case DashboardVisualisationType.LINE:
        case DashboardVisualisationType.BAR_TIMESERIES:
        case DashboardVisualisationType.LINE_TIMESERIES:
        case DashboardVisualisationType.DONUT: {
          data = ChartUtils.createChart(visDefinition, dashboardData)
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
    })

    if (hasScorecard) ScorecardsUtils.mergeScorecardsIntoGroup(visualisations)

    return { id, title, description, visualisations }
  })
}

const updateStore = async (
  services: Services,
  tableId: string,
  userId: string,
  sections: DashboardUISection[],
  url: Url,
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
      search: url.search,
      href: url.href,
    })
  }

  return dashboardRequestData
}

export default {
  renderAsyncDashboard: async ({ req, res, services, next }: AsyncReportUtilsParams) => {
    const { token, csrfToken, userId } = LocalsHelper.getValues(res)
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
    const sections: DashboardUISection[] = getSections(dashboardDefinition, flattenedData)

    // Update the store
    const dashboardRequestData = await updateStore(services, tableId, userId, sections, url)

    return {
      dashboardData: {
        token,
        id,
        reportId,
        name: dashboardDefinition.name,
        description: dashboardDefinition.description,
        reportName: reportDefinition.name,
        bookmarked: await services.bookmarkService.isBookmarked(id, userId),
        csrfToken,
        sections,
        filters,
        type: ReportType.DASHBOARD,
        actions: setDashboardActions(dashboardDefinition, reportDefinition, dashboardRequestData),
      },
    }
  },
}

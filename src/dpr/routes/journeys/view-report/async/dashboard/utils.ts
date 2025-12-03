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
import ReportActionsUtils from '../../../../../components/_reports/report-actions/utils'
import ReportQuery from '../../../../../types/ReportQuery'
import LocalsHelper from '../../../../../utils/localsHelper'
import { FilterValue } from '../../../../../components/_filters/types'
import { FiltersType } from '../../../../../components/_filters/filtersTypeEnum'

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
  queryData: Dict<string | string[]> | undefined
}) => {
  const { token } = LocalsHelper.getValues(res)
  const { reportId, id } = req.params
  const dataProductDefinitionsPath = <string>req.query['dataProductDefinitionsPath']

  // Dashboard Definition,
  const dashboardDefinition: components['schemas']['DashboardDefinition'] =
    await services.dashboardService.getDefinition(token, reportId, id, dataProductDefinitionsPath, queryData)

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

  console.log(JSON.stringify({ query }))

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
    const visualisations: DashboardVisualisation[] = section.visualisations.map(
      (visDefinition: components['schemas']['DashboardVisualisationDefinition']) => {
        const { type, display, description: visDescription, id: visId } = visDefinition

        let data: DashboardVisualisation['data'] | undefined

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
          title: display || '',
          description: visDescription || '',
          type,
          data,
        }
      },
    )

    if (hasScorecard) ScorecardsUtils.mergeScorecardsIntoGroup(visualisations)

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

export const renderAsyncDashboard = async ({ req, res, services }: AsyncReportUtilsParams) => {
  const { token, csrfToken, dprUser, nestedBaseUrl } = LocalsHelper.getValues(res)
  const { reportId, id, tableId } = req.params
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

  // Get the dashboard parts
  const sections: DashboardSection[] = getSections(dashboardDefinition, flattenedData, query)

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
      bookmarked: bookmarkService ? await bookmarkService.isBookmarked(id, reportId, dprUser.id) : false,
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
}

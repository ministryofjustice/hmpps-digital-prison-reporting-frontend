import type { Request, Response } from 'express'
import Dict = NodeJS.Dict

import type { Services } from '../../../../../types/Services'
import { ReportType, RequestStatus } from '../../../../../types/UserReports'
import { FilterValue } from '../../../../../components/_filters/types'
import SelectedFiltersUtils from '../../../../../components/_filters/filters-selected/utils'
import LocalsHelper from '../../../../../utils/localsHelper'
import UserStoreItemBuilder from '../../../../../utils/UserStoreItemBuilder'
import { DashboardDataResponse } from '../../../../../types/Metrics'
import AsyncDashboardUtils from '../../async/dashboard/utils'
import { DashboardSection } from '../../../../../components/_dashboards/dashboard-visualisation/types'
import { components } from '../../../../../types/api'
import ReportActionsUtils from '../../../../../components/_reports/report-heading/report-actions/utils'

const setAsRecentlyViewed = async ({
  req,
  services,
  reportName,
  name,
  description,
  reportId,
  id,
  userId,
  filters,
}: {
  req: Request
  services: Services
  reportName: string
  name: string
  description: string
  reportId: string
  id: string
  userId: string
  filters: FilterValue[]
}) => {
  const stateData = {
    type: ReportType.DASHBOARD,
    reportId,
    id,
    reportName,
    description,
    name,
  }

  const interactiveQueryData: { query: Dict<string>; querySummary: Array<Dict<string>> } = {
    query: <Dict<string>>req.query,
    querySummary: SelectedFiltersUtils.getQuerySummary(<Dict<string>>req.query, filters),
  }

  const recentlyViewedData = new UserStoreItemBuilder(stateData)
    .addInteractiveQuery(interactiveQueryData)
    .addStatus(RequestStatus.READY)
    .addTimestamp()
    .addReportUrls(req)
    .build()

  await services.recentlyViewedService.setRecentlyViewed(recentlyViewedData, userId)
}

export const renderSyncDashboard = async ({
  req,
  res,
  services,
}: {
  req: Request
  res: Response
  services: Services
}) => {
  const { token, csrfToken, dprUser, nestedBaseUrl } = LocalsHelper.getValues(res)
  const { reportId, id } = req.params
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`

  const {
    query,
    filters: filterData,
    reportDefinition,
    dashboardDefinition,
  } = await AsyncDashboardUtils.getDefinitionData({
    req,
    res,
    services,
  })

  const dashboardData: DashboardDataResponse[][] = await services.dashboardService.getSyncDashboard(
    token,
    id,
    reportId,
    query,
  )
  const flattenedData: DashboardDataResponse[] = dashboardData.flat()

  // Get the dashboard parts
  const sections: DashboardSection[] = AsyncDashboardUtils.getSections(dashboardDefinition, flattenedData, query)

  await setAsRecentlyViewed({
    req,
    services,
    reportName: reportDefinition.name,
    name: dashboardDefinition.name,
    description: dashboardDefinition.description || reportDefinition.description || '',
    reportId,
    id,
    userId: dprUser.id,
    filters: filterData.filters,
  })

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
      filters: filterData,
      type: ReportType.DASHBOARD,
      actions: setActions(dashboardDefinition, reportDefinition, fullUrl),
    },
  }
}

export const setActions = (
  definition: components['schemas']['DashboardDefinition'],
  summaryDefinition: components['schemas']['ReportDefinitionSummary'],
  url: string,
) => {
  const { name: reportName } = summaryDefinition
  const { name } = definition

  return ReportActionsUtils.getActions({
    share: {
      reportName,
      name,
      url,
    },
    copy: {
      url,
    },
  })
}

export default {
  renderSyncDashboard,
}

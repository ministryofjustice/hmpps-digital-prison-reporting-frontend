import type { Request, Response } from 'express'
import type { Services } from '../../../../../types/Services'
import { ReportType } from '../../../../../types/UserReports'
import LocalsHelper from '../../../../../utils/localsHelper'
import { DashboardDataResponse } from '../../../../../types/Metrics'
import AsyncDashboardUtils from '../../async/dashboard/utils'
import { DashboardSection } from '../../../../../components/_dashboards/dashboard-visualisation/types'
import { components } from '../../../../../types/api'
import ReportActionsUtils from '../../../../../components/_reports/report-heading/report-actions/utils'
import { setUpBookmark } from '../../../../../components/bookmark/utils'
import { createDashboardSections } from '../../../../../components/_dashboards/dashboard-section/utils'
import { updateLastViewedSync } from '../../utils'

export const renderSyncDashboard = async ({
  req,
  res,
  services,
}: {
  req: Request
  res: Response
  services: Services
}) => {
  const { token, csrfToken, dprUser } = LocalsHelper.getValues(res)
  const { reportId, id } = <{ id: string; reportId: string }>req.params
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`

  const { query, filters, reportDefinition, dashboardDefinition, appliedFilters, fields } =
    await AsyncDashboardUtils.getDefinitionData({
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
  const dashboardFeatureFlags = res.app.locals['featureFlags'].flags
  const sections: DashboardSection[] = createDashboardSections(
    dashboardDefinition,
    flattenedData,
    query,
    dashboardFeatureFlags,
  )

  const bookmarkConfig = setUpBookmark(res, req, services.bookmarkService)

  const stateData = {
    type: ReportType.DASHBOARD,
    reportId,
    id,
    reportName: reportDefinition.name,
    name: reportDefinition.name,
    description: dashboardDefinition.description || reportDefinition.description || '',
  }

  await updateLastViewedSync(req, services, stateData, dprUser.id, fields)

  return {
    dashboardData: {
      token,
      id,
      reportId,
      name: dashboardDefinition.name,
      description: dashboardDefinition.description,
      reportName: reportDefinition.name,
      bookmarkConfig,
      csrfToken,
      sections,
      filters,
      type: ReportType.DASHBOARD,
      actions: setActions(dashboardDefinition, reportDefinition, fullUrl),
      appliedFilters,
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

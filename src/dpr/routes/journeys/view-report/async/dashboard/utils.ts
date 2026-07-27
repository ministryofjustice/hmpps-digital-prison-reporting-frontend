import type { AsyncReportUtilsParams } from '../../../../../types/AsyncReportUtils'

import type { RequestedReport } from '../../../../../types/UserReports'
import { LoadType } from '../../../../../types/UserReports'
import type { components } from '../../../../../types/api'

import Dashboard from '../../../../../components/_dashboards/Dashboard'

import { validateDashboardVisualisations } from '../../../../../components/_dashboards/dashboard-visualisation/utils'
import LocalsHelper from '../../../../../utils/localsHelper'
import { getMyReport } from '../../../my-reports/utils'
import { updateLastViewedAsync } from '../../utils'
import DashboardSchema from './validate'

export const renderDashboard = async ({ req, res, services }: AsyncReportUtilsParams) => {
  const { token, dprUser, definitionsPath } = LocalsHelper.getValues(res)
  const { id, tableId, reportId } = <{ id: string; tableId: string; reportId: string }>req.params

  const requestData: RequestedReport | undefined = await getMyReport(
    { tableId },
    'requestedReports',
    services,
    dprUser.id,
  )

  // get pre-filter query data required by getDefinition
  const queryData = requestData?.query?.data

  // Get the definition
  const definition =
    (res.locals['definition'] as components['schemas']['DashboardDefinition']) ??
    (await services.dashboardService.getDefinition(token, reportId, id, definitionsPath, queryData))

  // Validate definition
  DashboardSchema.DashboardSchema.parse(definition)
  // validate visualisations
  await validateDashboardVisualisations(definition)

  // Create the report config
  const reportConfig = await new Dashboard(services, res, req, definition, LoadType.ASYNC, requestData).build()
  const { dashboardData } = reportConfig

  if (dashboardData && dashboardData.sections?.length && requestData && Object.keys(requestData).length) {
    // Save the data to redis
    await updateLastViewedAsync(req, res, services, requestData, dprUser.id, dashboardData.fields || [])
  }

  return reportConfig
}

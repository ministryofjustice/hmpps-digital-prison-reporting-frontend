import { LoadType, ReportType } from '../../../../../types/UserReports'
import LocalsHelper from '../../../../../utils/localsHelper'
import { components } from '../../../../../types/api'
import { updateLastViewedSync } from '../../utils'
import { AsyncReportUtilsParams } from '../../../../../types/AsyncReportUtils'
import Dashboard from '../../../../../components/_dashboards/Dashboard'
import { getAllDefinitionsForReport } from '../../../../../utils/definitionUtils'

export const renderDashboard = async ({ req, res, services }: AsyncReportUtilsParams) => {
  const { token, dprUser } = LocalsHelper.getValues(res)
  const { id, reportId } = <{ id: string; reportId: string }>req.params

  const { variantDefinition, variantSummary } = await getAllDefinitionsForReport(res, services, reportId, id, token)

  // Create the report config
  const dashboardConfig = await new Dashboard(
    services,
    res,
    req,
    <components['schemas']['DashboardDefinition']>variantDefinition,
    variantSummary,
    LoadType.SYNC,
  ).build()

  // Save the data to redis
  if (dashboardConfig && dashboardConfig.dashboardData && Object.keys(dashboardConfig.dashboardData).length) {
    const { dashboardData } = dashboardConfig
    const { reportName, description, name, fields } = dashboardData as {
      reportName: string
      description: string
      name: string
      fields: components['schemas']['FieldDefinition'][]
    }

    const stateData = {
      type: ReportType.REPORT,
      reportId,
      id,
      reportName,
      description,
      name,
    }

    await updateLastViewedSync(req, res, services, stateData, dprUser.id, fields)
  }

  return dashboardConfig
}

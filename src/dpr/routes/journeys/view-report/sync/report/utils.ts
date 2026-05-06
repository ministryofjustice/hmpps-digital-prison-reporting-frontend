import { LoadType, ReportType } from '../../../../../types/UserReports'
import Report from '../../../../../components/_reports/Report'
import LocalsHelper from '../../../../../utils/localsHelper'
import { AsyncReportUtilsParams } from '../../../../../types/AsyncReportUtils'
import { components } from '../../../../../types/api'
import { updateLastViewedSync } from '../../utils'

export const renderReport = async ({ req, res, services }: AsyncReportUtilsParams) => {
  const { token, dprUser, definitionsPath } = LocalsHelper.getValues(res)
  const { id, reportId } = <{ id: string; reportId: string }>req.params

  // Get the definition
  const definition: components['schemas']['SingleVariantReportDefinition'] =
    await services.reportingService.getDefinition(token, reportId, id, definitionsPath)

  // Create the report config
  const reportConfig = await new Report(services, res, req, definition, LoadType.SYNC).build()

  // Save the data to redis
  if (reportConfig && Object.keys(reportConfig.renderData).length) {
    const { renderData } = reportConfig
    const { reportName, description, name, fields } = renderData
    const stateData = {
      type: ReportType.REPORT,
      reportId,
      id,
      reportName,
      description,
      name,
    }

    await updateLastViewedSync(req, services, stateData, dprUser.id, fields)
  }

  return reportConfig
}

import { getAllDefinitionsForReport } from 'src/dpr/utils/definitionUtils'
import { LoadType, ReportType } from '../../../../../types/UserReports'
import Report from '../../../../../components/_reports/Report'
import LocalsHelper from '../../../../../utils/localsHelper'
import { AsyncReportUtilsParams } from '../../../../../types/AsyncReportUtils'
import { components } from '../../../../../types/api'
import { updateLastViewedSync } from '../../utils'

export const renderReport = async ({ req, res, services }: AsyncReportUtilsParams) => {
  const { token, dprUser } = LocalsHelper.getValues(res)
  const { id, reportId } = <{ id: string; reportId: string }>req.params

  const { variantDefinition, variantSummary } = await getAllDefinitionsForReport(res, services, reportId, id, token)

  // Create the report config
  const reportConfig = await new Report(
    services,
    res,
    req,
    <components['schemas']['SingleVariantReportDefinition']>variantDefinition,
    variantSummary,
    LoadType.SYNC,
  ).build()

  // Save the data to redis
  if (reportConfig && reportConfig.renderData && Object.keys(reportConfig.renderData).length) {
    const { renderData } = reportConfig
    const { reportName, description, name, fields } = renderData as {
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

  return reportConfig
}

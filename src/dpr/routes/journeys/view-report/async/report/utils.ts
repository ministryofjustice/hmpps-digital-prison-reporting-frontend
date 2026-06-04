import { LoadType, RequestedReport } from '../../../../../types/UserReports'
import Report from '../../../../../components/_reports/Report'
import LocalsHelper from '../../../../../utils/localsHelper'
import { AsyncReportUtilsParams } from '../../../../../types/AsyncReportUtils'
import { components } from '../../../../../types/api'
import { updateLastViewedAsync } from '../../utils'

export const renderReport = async ({ req, res, services }: AsyncReportUtilsParams) => {
  const { token, dprUser, definitionsPath } = LocalsHelper.getValues(res)
  const { id, tableId, reportId } = <{ id: string; tableId: string; reportId: string }>req.params
  const requestData: RequestedReport | undefined = await services.requestedReportService.getReportByTableId(
    tableId,
    dprUser.id,
  )
  // get pre-filter query data required by getDefinition
  const queryData = requestData?.query?.data

  // Get the definition
  const definition =
    (res.locals['definition'] as components['schemas']['SingleVariantReportDefinition']) ??
    (await services.reportingService.getDefinition(token, reportId, id, definitionsPath, queryData))

  // Create the report config
  const reportConfig = await new Report(services, res, req, definition, LoadType.ASYNC, requestData).build()
  const { renderData } = reportConfig

  if (renderData && requestData && Object.keys(requestData).length) {
    // Save the data to redis
    await updateLastViewedAsync(req, services, requestData, dprUser.id, renderData.fields || [])
  }

  return reportConfig
}

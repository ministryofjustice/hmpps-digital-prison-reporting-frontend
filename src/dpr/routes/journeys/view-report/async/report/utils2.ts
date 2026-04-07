import { LoadType, RequestedReport } from 'src/dpr/types/UserReports'
import Report from '../../../../../components/_reports/Report'
import LocalsHelper from '../../../../../utils/localsHelper'
import { AsyncReportUtilsParams } from '../../../../../types/AsyncReportUtils'
import { components } from 'src/dpr/types/api'

export const renderReport = async ({ req, res, services }: AsyncReportUtilsParams) => {
  const { token, dprUser, definitionsPath } = LocalsHelper.getValues(res)
  const { id, tableId, reportId } = <{ id: string; variantId: string; tableId: string; reportId: string }>req.params
  const requestData: RequestedReport | undefined = await services.requestedReportService.getReportByTableId(
    tableId,
    dprUser.id,
  )
  // get pre-filter query data required by getDefinition
  const queryData = requestData?.query?.data

  // Get the definition
  const definition: components['schemas']['SingleVariantReportDefinition'] =
    await services.reportingService.getDefinition(token, reportId, id, definitionsPath, queryData)

  // Create the report config
  return await new Report(services, res, req, definition, LoadType.ASYNC, requestData).build()
}

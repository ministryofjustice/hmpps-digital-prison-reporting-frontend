import { getAllDefinitionsForReport } from 'src/dpr/utils/definitionUtils'
import { LoadType, RequestedReport } from '../../../../../types/UserReports'
import Report from '../../../../../components/_reports/Report'
import LocalsHelper from '../../../../../utils/localsHelper'
import { AsyncReportUtilsParams } from '../../../../../types/AsyncReportUtils'
import { components } from '../../../../../types/api'
import { updateLastViewedAsync } from '../../utils'
import { getMyReport } from '../../../my-reports/utils'

export const renderReport = async ({ req, res, services }: AsyncReportUtilsParams) => {
  const { token, dprUser } = LocalsHelper.getValues(res)
  const { id, tableId, reportId } = <{ id: string; tableId: string; reportId: string }>req.params

  const requestData: RequestedReport | undefined = await getMyReport(
    { tableId },
    'requestedReports',
    services,
    dprUser.id,
  )

  // get pre-filter query data required by getDefinition
  const queryData = requestData?.query?.data

  const { variantDefinition, variantSummary } = await getAllDefinitionsForReport(
    res,
    services,
    reportId,
    id,
    token,
    queryData,
  )

  // Create the report config
  const reportConfig = await new Report(
    services,
    res,
    req,
    <components['schemas']['SingleVariantReportDefinition']>variantDefinition,
    variantSummary,
    LoadType.ASYNC,
    requestData,
  ).build()
  const { renderData } = reportConfig

  if (renderData && requestData && Object.keys(requestData).length) {
    // Save the data to redis
    await updateLastViewedAsync(req, res, services, requestData, dprUser.id, renderData.fields || [])
  }

  return reportConfig
}

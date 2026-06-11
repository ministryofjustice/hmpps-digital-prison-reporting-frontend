import { RequestStatus } from '../../../../types/UserReports'
import { AsyncReportUtilsParams } from '../../../../types/AsyncReportUtils'
import LocalsHelper from '../../../../utils/localsHelper'
import { buildCurrentStatusView } from '../../../../components/_async/async-polling/current-status/utils'
import { getMyReport } from '../../my-reports/utils'

export const initPollingView = async ({ req, res, services }: AsyncReportUtilsParams) => {
  const { dprUser } = LocalsHelper.getValues(res)
  const { executionId, type } = req.params as {
    executionId: string
    type: string
  }

  const requestReportData = await getMyReport({ executionId }, 'requestedReports', services, dprUser.id)
  if (!requestReportData) return {}

  const title = `${type.charAt(0).toUpperCase() + type.substring(1).toLowerCase()} request status`
  const data = buildCurrentStatusView(requestReportData, requestReportData.status || RequestStatus.SUBMITTED, res)

  const config = {
    title,
    data: {
      ...data,
      path: req.baseUrl,
    },
  }

  return config
}

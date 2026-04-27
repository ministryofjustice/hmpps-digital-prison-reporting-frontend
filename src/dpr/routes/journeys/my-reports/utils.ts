import { Services } from 'src/dpr/types/Services'
import { ReportType } from 'src/dpr/types/UserReports'

/**
 * Gets the request status of a report/dashboard
 *
 * @param {Services} services
 * @param {ReportType} reportType
 * @param {string} id
 * @param {string} reportId
 * @param {string} tableId
 * @param {string} executionId
 * @param {string} token
 * @param {string} [definitionsPath='']
 * @return {*}
 */
export const getRequestStatus = async (
  services: Services,
  reportType: ReportType,
  id: string,
  reportId: string,
  tableId: string,
  executionId: string,
  token: string,
  definitionsPath: string = '',
) => {
  if (reportType === ReportType.REPORT) {
    return await services.reportingService.getAsyncReportStatus(
      token,
      reportId,
      id,
      executionId,
      definitionsPath,
      tableId,
    )
  } else {
    return await services.dashboardService.getAsyncStatus(token, reportId, id, executionId, definitionsPath, tableId)
  }
}

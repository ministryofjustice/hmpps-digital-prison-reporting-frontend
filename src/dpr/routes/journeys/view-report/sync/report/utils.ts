import type { Request } from 'express'
import { LoadType, ReportType, RequestStatus } from '../../../../../types/UserReports'
import Report from '../../../../../components/_reports/Report'
import LocalsHelper from '../../../../../utils/localsHelper'
import { AsyncReportUtilsParams } from '../../../../../types/AsyncReportUtils'
import { components } from '../../../../../types/api'
import { Services } from '../../../../../types/Services'
import { FilterValue } from '../../../../../components/_filters/types'
import UserStoreItemBuilder from '../../../../../utils/UserStoreItemBuilder'
import SelectedFiltersUtils from '../../../../../components/_filters/filters-selected/utils'

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
    await setAsRecentlyViewed({
      req,
      services,
      reportName: renderData.reportName,
      name: renderData.name,
      description: renderData.description || '',
      reportId,
      id,
      userId: dprUser.id,
      filters: renderData.filterData,
    })
  }

  return reportConfig
}

/**
 * TODO: Consolidate this with the async one.
 *
 * @param {{
 *   req: Request
 *   services: Services
 *   reportName: string
 *   name: string
 *   description: string
 *   reportId: string
 *   id: string
 *   userId: string
 *   filters: FilterValue[]
 * }} {
 *   req,
 *   services,
 *   reportName,
 *   name,
 *   description,
 *   reportId,
 *   id,
 *   userId,
 *   filters,
 * }
 */
const setAsRecentlyViewed = async ({
  req,
  services,
  reportName,
  name,
  description,
  reportId,
  id,
  userId,
  filters,
}: {
  req: Request
  services: Services
  reportName: string
  name: string
  description: string
  reportId: string
  id: string
  userId: string
  filters: FilterValue[]
}) => {
  const stateData = {
    type: ReportType.REPORT,
    reportId,
    id,
    reportName,
    description,
    name,
  }

  const interactiveQueryData: { query: Record<string, string>; querySummary: Record<string, string>[] } = {
    query: <Record<string, string>>req.query,
    querySummary: SelectedFiltersUtils.getQuerySummary(<Record<string, string>>req.query, filters),
  }

  const recentlyViewedData = new UserStoreItemBuilder(stateData)
    .addInteractiveQuery(interactiveQueryData)
    .addStatus(RequestStatus.READY)
    .addTimestamp()
    .addReportUrls(req)
    .build()

  await services.recentlyViewedService?.setRecentlyViewed(recentlyViewedData, userId)
}

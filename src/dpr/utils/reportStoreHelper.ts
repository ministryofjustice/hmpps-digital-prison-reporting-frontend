import { Request, Response } from 'express'
import { SetQueryFromFiltersResult } from '../components/async-filters/types'
import type RecentlyViewedStoreService from '../services/recentlyViewedService'
import type AsyncReportStoreService from '../services/requestedReportsService'
import { Services } from '../types/Services'
import { ReportType, RequestFormData, RequestStatus, UserReportData } from '../types/UserReports'
import UserStoreItemBuilder from './UserStoreItemBuilder'
import { ExecutionData } from '../types/AsyncReportUtils'

/**
 * Updates the store with the request details
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Services} services
 * @param {SetQueryFromFiltersResult} querySummaryData
 * @param {string} executionId
 * @param {string} tableId
 * @return {*}  {Promise<string>}
 */
export const updateStore = async ({
  req,
  res,
  services,
  queryData,
  executionData,
}: {
  req: Request
  res: Response
  services: Services
  queryData?: SetQueryFromFiltersResult
  executionData: ExecutionData
}): Promise<string> => {
  const { search, variantId, type } = req.body
  const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'

  removeDuplicates({ storeService: services.asyncReportsStore, userId, variantId, search })
  removeDuplicates({ storeService: services.recentlyViewedStoreService, userId, variantId, search })

  const reportData: RequestFormData = req.body

  let requestedReportData
  switch (type) {
    case ReportType.REPORT:
      requestedReportData = new UserStoreItemBuilder(reportData)
        .addExecutionData(executionData)
        .addFilters(queryData.filterData)
        .addSortData(queryData.sortData)
        .addUrls()
        .addQuery(queryData)
        .addStatus(RequestStatus.SUBMITTED)
        .addTimestamp()
        .build()
      break
    case ReportType.DASHBOARD:
      requestedReportData = new UserStoreItemBuilder(reportData)
        .addExecutionData(executionData)
        .addUrls()
        .addStatus(RequestStatus.SUBMITTED)
        .addTimestamp()
        .build()
      break
    default:
      break
  }

  await services.asyncReportsStore.addReport(userId, requestedReportData)

  return requestedReportData.url.polling.pathname
}

export const removeDuplicates = async ({
  storeService,
  userId,
  variantId,
  search,
}: {
  storeService: AsyncReportStoreService | RecentlyViewedStoreService
  userId: string
  variantId: string
  search: string
}) => {
  const reports = await storeService.getAllReportsByVariantId(variantId, userId)
  const ids = getDuplicateRequestIds(search, reports)
  if (ids.length) {
    await Promise.all(
      ids.map(async (id: string) => {
        await await storeService.removeReport(id, userId)
      }),
    )
  }
}

/**
 * Gets the execution IDs of duplicate requests
 * - Checks whether the request query are the same
 *
 * @param {string} newReportSearchParams
 * @param {UserReportData[]} existingReports
 * @return {string[]}  ids of the duplicate requests
 */
export const getDuplicateRequestIds = (newReportSearchParams: string, existingReports: UserReportData[]) => {
  const duplicates: string[] = []
  const newQueryParams = new URLSearchParams(newReportSearchParams)

  existingReports.forEach((existingReportData: UserReportData) => {
    const matches: boolean[] = []
    const existingQueryParams = new URLSearchParams(existingReportData.url.request.search)

    if (existingQueryParams.entries.length === newQueryParams.entries.length) {
      newQueryParams.forEach((newValue, newKey) => {
        const match = existingQueryParams.has(newKey, newValue)
        matches.push(match)
      })
    }
    if (matches.every(Boolean)) {
      duplicates.push(existingReportData.executionId)
    }
  })

  return duplicates
}

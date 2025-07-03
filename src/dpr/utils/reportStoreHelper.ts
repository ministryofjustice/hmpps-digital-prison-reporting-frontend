import type { RecentlyViewedStoreService, RequestedReportService } from '../services'
import { UserReportData } from '../types/UserReports'

export const removeDuplicates = async ({
  storeService,
  userId,
  id,
  search,
}: {
  storeService: RequestedReportService | RecentlyViewedStoreService
  userId: string
  id: string
  search: string
}) => {
  const reports = await storeService.getAllReportsById(id, userId)
  const duplicateIds = getDuplicateRequestIds(search, reports)
  if (duplicateIds.length) {
    await Promise.all(
      duplicateIds.map(async (duplicateId: string) => {
        await await storeService.removeReport(duplicateId, userId)
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

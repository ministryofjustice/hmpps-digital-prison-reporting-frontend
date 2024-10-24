import { RequestedReport, UserReportData } from '../types/UserReports'
import * as ReportStoreHelper from './reportStoreHelper'
import type RequestedReportService from '../services/requestedReportService'
import type RecentlyViewedStoreService from '../services/recentlyViewedService'

describe('ReportStoreHelper', () => {
  describe('removeDuplicates', () => {
    let requestedReportService: RequestedReportService
    let recentlyViewedService: RecentlyViewedStoreService
    let reports: UserReportData[]

    const matchingSearch = '?paramOne=red&paramTwo.thing=blue&paramThree=yellow'
    const misMatchSearch = '?paramOne=red&paramTwo.thing=blue&paramThree=blue'
    const requestedId = 'requested-id'

    beforeEach(() => {
      reports = [
        {
          id: requestedId,
          executionId: 'executionId-1',
          url: {
            request: {
              search: matchingSearch,
            },
          },
        },
        {
          id: requestedId,
          executionId: 'executionId-2',
          url: {
            request: {
              search: matchingSearch,
            },
          },
        },
        {
          id: requestedId,
          executionId: 'executionId-3',
          url: {
            request: {
              search: misMatchSearch,
            },
          },
        },
        {
          variantId: requestedId,
          executionId: 'executionId-4',
          url: {
            request: {
              search: matchingSearch,
            },
          },
        },
        {
          variantId: requestedId,
          executionId: 'executionId-5',
          url: {
            request: {
              search: misMatchSearch,
            },
          },
        },
      ] as unknown as UserReportData[]

      recentlyViewedService = {
        getAllReportsById: jest.fn().mockResolvedValue([...reports]),
        removeReport: jest.fn(),
      } as unknown as RecentlyViewedStoreService

      requestedReportService = {
        getAllReportsById: jest.fn().mockResolvedValue([...reports]),
        removeReport: jest.fn(),
      } as unknown as RequestedReportService
    })

    it('should remove the duplicate requested reports', async () => {
      await ReportStoreHelper.removeDuplicates({
        userId: 'userId',
        storeService: requestedReportService,
        id: 'requested-id',
        search: matchingSearch,
      })

      expect(requestedReportService.removeReport).toHaveBeenCalledTimes(3)
    })

    it('should remove the duplicate viewed reports', async () => {
      await ReportStoreHelper.removeDuplicates({
        userId: 'userId',
        storeService: recentlyViewedService,
        id: 'requested-id',
        search: matchingSearch,
      })

      expect(recentlyViewedService.removeReport).toHaveBeenCalledTimes(3)
    })
  })

  describe('getDuplicateRequestIds', () => {
    it('should find a duplicate entry with same query params', () => {
      const matchingParams = '?paramOne=red&paramTwo.thing=blue&paramThree=yellow'

      const newParams = matchingParams
      const existingParams: RequestedReport[] = [
        {
          executionId: 'exexutionId1',
          url: {
            request: {
              search: matchingParams,
            },
          },
        } as unknown as RequestedReport,
      ]

      const result = ReportStoreHelper.getDuplicateRequestIds(newParams, existingParams)

      expect(result).toEqual(['exexutionId1'])
    })

    it('should find multiple duplicate entries with same query params', () => {
      const matchingParams = '?paramOne=red&paramTwo.thing=blue&paramThree=yellow'

      const newParams = matchingParams
      const existingParams: RequestedReport[] = [
        {
          executionId: 'exexutionId1',
          url: {
            request: {
              search: matchingParams,
            },
          },
        } as unknown as RequestedReport,
        {
          executionId: 'exexutionId2',
          url: {
            request: {
              search: matchingParams,
            },
          },
        } as unknown as RequestedReport,
      ]

      const result = ReportStoreHelper.getDuplicateRequestIds(newParams, existingParams)

      expect(result).toEqual(['exexutionId1', 'exexutionId2'])
    })

    it('should find a duplicate entry with same query params when order is different', () => {
      const matchingParams = '?paramOne=red&paramThree=yellow&paramTwo.thing=blue'

      const newParams = matchingParams
      const existingParams: RequestedReport[] = [
        {
          executionId: 'exexutionId1',
          url: {
            request: {
              search: matchingParams,
            },
          },
        } as unknown as RequestedReport,
      ]

      const result = ReportStoreHelper.getDuplicateRequestIds(newParams, existingParams)

      expect(result).toEqual(['exexutionId1'])
    })

    it('should not find duplicate entries with same query params due to length', () => {
      const newQParams = '?paramOne=red&paramTwo.thing=blue&paramThree=yellow'
      const existingQParams = '?paramOne=red&paramTwo.thing=blue&paramThree=black'

      const newParams = newQParams
      const existingParams: RequestedReport[] = [
        {
          exexutionId: 'exexutionId1',
          url: {
            request: {
              search: existingQParams,
            },
          },
        } as unknown as RequestedReport,
      ]

      const result = ReportStoreHelper.getDuplicateRequestIds(newParams, existingParams)

      expect(result).toEqual([])
    })

    it('should not find duplicate entries with same query params due to length', () => {
      const matchingParams = '?paramOne=red&paramTwo.thing=blue&paramThree=yellow'
      const existingParams: RequestedReport[] = [
        {
          exexutionId: 'exexutionId1',
          url: {
            request: {
              search: `${matchingParams}&extraParam=black`,
            },
          },
        } as unknown as RequestedReport,
      ]

      const result = ReportStoreHelper.getDuplicateRequestIds(matchingParams, existingParams)

      expect(result).toEqual([])
    })
  })
})

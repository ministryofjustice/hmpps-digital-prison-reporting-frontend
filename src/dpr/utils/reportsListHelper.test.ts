import * as ReportsListHelper from './reportsListHelper'
import { filterReports, formatCardData } from '../components/async-request-list/utils'
import * as recentlyViewedUtils from '../components/recently-viewed-list/utils'
import mockRedisData from '../../../test-app/mockAsyncData/mockRedisReportData'
import { AsyncReportData } from '../types/AsyncReport'
import { RecentlyViewedReportData } from '../types/RecentlyViewed'

describe('ReportsListHelper', () => {
  describe('formatCards', () => {
    afterEach(() => {
      jest.restoreAllMocks()
      jest.clearAllMocks()
    })

    it('should filter out retried and last viewed items for requested reports', async () => {
      const result = await ReportsListHelper.formatCards(
        mockRedisData.mockRequestedReports as AsyncReportData[],
        filterReports,
        formatCardData,
      )

      expect(result.length).toEqual(1)
    })

    it('should filter out retried and last viewed items for requested reports', async () => {
      const result = await ReportsListHelper.formatCards(
        mockRedisData.mockViewedReports as RecentlyViewedReportData[],
        recentlyViewedUtils.filterReports,
        recentlyViewedUtils.formatCardData,
      )

      expect(result.length).toEqual(1)
    })
  })
})

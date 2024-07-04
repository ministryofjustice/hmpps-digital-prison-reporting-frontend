import RecentlyViewedStoreService from '../services/recentlyViewedService'
import AsyncReportStoreService from '../services/requestedReportsService'
import * as RecentlyViewedUtils from './recentlyViewedUtils'

describe('AsyncReportsListUtils', () => {
  describe('formatCards', () => {
    const formatCardDataSpy = jest.spyOn(RecentlyViewedUtils, 'formatCardData').mockImplementation()
    const mockAsyncStore = {} as unknown as AsyncReportStoreService
    const mockRecentlyViewedStore = {
      getAllReports: jest.fn(() => {
        return Promise.resolve([
          { timestamp: { requested: 'requestedTs' } },
          { timestamp: { refresh: 'requestedTs' } },
          { timestamp: { refresh: 'requestedTs' } },
          { timestamp: { lastViewed: 'requestedTs' } },
          { timestamp: { retried: 'requestedTs' } },
        ])
      }),
    } as unknown as RecentlyViewedStoreService

    it('should set the correct href and timestamp for PICKED status', async () => {
      await RecentlyViewedUtils.formatCards(
        {
          recentlyViewedStoreService: mockRecentlyViewedStore,
          asyncReportsStore: mockAsyncStore,
          reportingService: {},
          bookmarkService: {},
        },
        '',
      )
      expect(formatCardDataSpy).toHaveBeenCalledTimes(2)
    })
  })
})

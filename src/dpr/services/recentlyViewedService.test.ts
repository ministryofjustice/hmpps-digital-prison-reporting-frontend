/* eslint-disable @typescript-eslint/no-explicit-any */
import RecentlyViewedStoreService from './recentlyViewedService'
import MockUserStoreService from '../../../test-app/mocks/mockClients/store/mockRedisStore'
import type ReportDataStore from '../data/reportDataStore'
import { ReportStoreConfig } from '../types/ReportStore'
import MockViewedListData from '../../../test-app/mocks/mockClients/store/mockViewedUserListDataV2'
import MockRequestedListData from '../../../test-app/mocks/mockClients/store/mockRequestedUserListDataV2'
import { RequestedReport, RequestStatus } from '../types/UserReports'

describe('RecentlyViewedStoreService', () => {
  const mockUserStore: ReportDataStore = new MockUserStoreService() as unknown as ReportDataStore
  const recentlyViewedService: RecentlyViewedStoreService = new RecentlyViewedStoreService(mockUserStore)

  let saveStateSpy: jest.SpyInstance<Promise<void>, [userId: string, userConfig: ReportStoreConfig], any>
  const mockDate = new Date(1466424490000)
  jest.spyOn(global, 'Date').mockImplementation(() => mockDate)

  beforeEach(() => {
    jest.spyOn(recentlyViewedService, 'getState').mockResolvedValue({
      recentlyViewedReports: [MockViewedListData.viewedReady],
    } as unknown as ReportStoreConfig)

    saveStateSpy = jest.spyOn(recentlyViewedService, 'saveState')
  })

  describe('getAllReports', () => {
    it('should return all the reports', async () => {
      const res = await recentlyViewedService.getAllReports('userId')
      expect(res.length).toEqual(1)
      expect(res[0]).toEqual(MockViewedListData.viewedReady)
    })
  })

  describe('getAllReportsById', () => {
    it('should return all the reports with a specific id', async () => {
      const res = await recentlyViewedService.getAllReportsById('variantId-1', 'userId')

      expect(res.length).toEqual(1)
      expect(res[0]).toEqual(MockViewedListData.viewedReady)
    })

    it('should return no reports when no ID in store', async () => {
      const res = await recentlyViewedService.getAllReportsById('variantId-2', 'userId')

      expect(res.length).toEqual(0)
    })
  })

  describe('setRecentlyViewed', () => {
    it('should set recently viewed with an id', async () => {
      const viewedReport = {
        ...MockRequestedListData.requestedReady,
        status: RequestStatus.READY,
        timestamp: {
          ...MockRequestedListData.requestedReady.timestamp,
          lastViewed: mockDate,
        },
      }

      delete viewedReport.url.polling
      delete viewedReport.url.request.pathname
      delete viewedReport.url.report.pathname
      delete viewedReport.dataProductDefinitionsPath

      await recentlyViewedService.setRecentlyViewed(viewedReport as unknown as RequestedReport, 'userId')

      expect(saveStateSpy).toHaveBeenCalledWith('userId', {
        recentlyViewedReports: [viewedReport, MockViewedListData.viewedReady],
      })
    })

    it('should remove report if id already exists', async () => {
      const addReportSpy = jest.spyOn(recentlyViewedService, 'addReport').mockResolvedValue(null)
      const existingViewed = {
        ...MockRequestedListData.requestedReady,
        executionId: MockViewedListData.viewedReady.executionId,
      }

      await recentlyViewedService.setRecentlyViewed(existingViewed as unknown as RequestedReport, 'userId')

      const userConfig = {
        recentlyViewedReports: [],
      } as unknown as ReportStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userConfig)
      expect(addReportSpy).toHaveBeenCalledWith(existingViewed, 'userId', userConfig)
    })
  })

  describe('setToExpired', () => {
    it('should set a record to expired', async () => {
      await recentlyViewedService.setToExpired(MockViewedListData.viewedReady.executionId, 'userId')

      const expiredRecord = {
        ...MockViewedListData.viewedReady,
        status: RequestStatus.EXPIRED,
        timestamp: {
          ...MockViewedListData.viewedReady.timestamp,
          expired: mockDate,
        },
      }

      const userConfig = {
        recentlyViewedReports: [expiredRecord],
      } as unknown as ReportStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userConfig)
    })
  })

  describe('removeReport', () => {
    it('should remove a report from the list', async () => {
      await recentlyViewedService.removeReport(MockViewedListData.viewedReady.executionId, 'userId')

      const userConfig = {
        recentlyViewedReports: [],
      } as unknown as ReportStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userConfig)
    })
  })
})

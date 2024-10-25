/* eslint-disable @typescript-eslint/no-explicit-any */
import RequestedReportService from './requestedReportService'
import type UserDataStore from '../data/userDataStore'
import MockUserStoreService from '../../../test-app/mocks/mockClients/store/mockRedisStore'
import { RequestedReport, RequestStatus } from '../types/UserReports'
import { UserStoreConfig } from '../types/UserStore'
import MockRequestedListData from '../../../test-app/mocks/mockClients/store/mockRequestedUserListDataV1'
import MockRequestedListData2 from '../../../test-app/mocks/mockClients/store/mockRequestedUserListDataV2'

describe('RequestedReportService', () => {
  const mockUserStore: UserDataStore = new MockUserStoreService() as unknown as UserDataStore
  const requestedReportService: RequestedReportService = new RequestedReportService(mockUserStore)

  let saveStateSpy: jest.SpyInstance<Promise<void>, [userId: string, userConfig: UserStoreConfig], any>
  const mockDate = new Date(1466424490000)
  jest.spyOn(global, 'Date').mockImplementation(() => mockDate)

  beforeEach(() => {
    jest.spyOn(requestedReportService, 'getState').mockResolvedValue({
      requestedReports: [MockRequestedListData.requestedReady, MockRequestedListData2.requestedReady],
    } as unknown as UserStoreConfig)

    saveStateSpy = jest.spyOn(requestedReportService, 'saveState')
  })

  describe('getAllReports', () => {
    it('should return all the reports', async () => {
      const res = await requestedReportService.getAllReports('userId')

      expect(res.length).toEqual(2)
      expect(res[0]).toEqual(MockRequestedListData.requestedReady)
      expect(res[1]).toEqual(MockRequestedListData2.requestedReady)
    })
  })

  describe('getAllReportsById', () => {
    it('should return all the reports with a specific id', async () => {
      const res = await requestedReportService.getAllReportsById(
        MockRequestedListData.requestedReady.variantId,
        'userId',
      )

      expect(res.length).toEqual(2)
      expect(res[0]).toEqual(MockRequestedListData.requestedReady)
      expect(res[1]).toEqual(MockRequestedListData2.requestedReady)
    })

    it('should return no reports when no ID in store', async () => {
      const res = await requestedReportService.getAllReportsById('dsdfsdfsdf-2', 'userId')

      expect(res.length).toEqual(0)
    })
  })

  describe('getReportByTableId', () => {
    it('should return all the reports with a tableId', async () => {
      const res = await requestedReportService.getReportByTableId(
        MockRequestedListData.requestedReady.tableId,
        'userId',
      )
      expect(res).toEqual(MockRequestedListData.requestedReady)
    })

    it('should return no reports when no ID in store', async () => {
      const res = await requestedReportService.getAllReportsById('dsdfsdfsdf-2', 'userId')

      expect(res.length).toEqual(0)
    })
  })

  describe('getReportByExecutionId', () => {
    it('should return all the reports with a executionId', async () => {
      const res = await requestedReportService.getReportByExecutionId(
        MockRequestedListData.requestedReady.executionId,
        'userId',
      )
      expect(res).toEqual(MockRequestedListData.requestedReady)
    })

    it('should return no reports when no ID in store', async () => {
      const res = await requestedReportService.getAllReportsById('dsdfsdfsdf-2', 'userId')

      expect(res.length).toEqual(0)
    })
  })

  describe('removeReport', () => {
    it('should remove a report from the list', async () => {
      await requestedReportService.removeReport(MockRequestedListData.requestedReady.executionId, 'userId')

      const userConfig = {
        requestedReports: [MockRequestedListData2.requestedReady],
      } as unknown as UserStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userConfig)
    })
  })

  describe('updateLastViewed', () => {
    it('should upadate a record with lastView timestamp', async () => {
      await requestedReportService.updateLastViewed(MockRequestedListData.requestedReady.executionId, 'userId')

      const lastViewedRecord = {
        ...MockRequestedListData.requestedReady,
        timestamp: {
          ...MockRequestedListData.requestedReady.timestamp,
          lastViewed: mockDate,
        },
      }

      const userConfig = {
        requestedReports: [lastViewedRecord, MockRequestedListData2.requestedReady],
      } as unknown as UserStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userConfig)
    })
  })

  describe('setToExpired', () => {
    it('should set a record to expired', async () => {
      await requestedReportService.setToExpired(MockRequestedListData.requestedReady.executionId, 'userId')

      const expiredRecord = {
        ...MockRequestedListData.requestedReady,
        status: RequestStatus.EXPIRED,
        timestamp: {
          ...MockRequestedListData.requestedReady.timestamp,
          expired: mockDate,
        },
      }

      const userConfig = {
        requestedReports: [expiredRecord, MockRequestedListData2.requestedReady],
      } as unknown as UserStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userConfig)
    })
  })

  describe('updateStatus', () => {
    it('should updated the records status - PICKED', async () => {
      await requestedReportService.updateStatus(
        MockRequestedListData.requestedReady.executionId,
        'userId',
        RequestStatus.PICKED,
      )

      const pickedRecord = {
        ...MockRequestedListData.requestedReady,
        status: RequestStatus.PICKED,
      }

      const userConfig = {
        requestedReports: [pickedRecord, MockRequestedListData2.requestedReady],
      } as unknown as UserStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userConfig)
    })

    it('should updated the records status - FAILED', async () => {
      await requestedReportService.updateStatus(
        MockRequestedListData.requestedReady.executionId,
        'userId',
        RequestStatus.FAILED,
        'errorMessage',
      )

      const failedRecord = {
        ...MockRequestedListData.requestedReady,
        status: RequestStatus.FAILED,
        timestamp: {
          ...MockRequestedListData.requestedReady.timestamp,
          failed: mockDate,
        },
        errorMessage: 'errorMessage',
      }

      const userConfig = {
        requestedReports: [failedRecord, MockRequestedListData2.requestedReady],
      } as unknown as UserStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userConfig)
    })

    it('should updated the records status - EXPIRED', async () => {
      await requestedReportService.updateStatus(
        MockRequestedListData.requestedReady.executionId,
        'userId',
        RequestStatus.EXPIRED,
      )

      const expiredRecord = {
        ...MockRequestedListData.requestedReady,
        status: RequestStatus.EXPIRED,
        timestamp: {
          ...MockRequestedListData.requestedReady.timestamp,
          expired: mockDate,
        },
      }

      const userConfig = {
        requestedReports: [expiredRecord, MockRequestedListData2.requestedReady],
      } as unknown as UserStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userConfig)
    })

    it('should updated the records status - ABORTED', async () => {
      await requestedReportService.updateStatus(
        MockRequestedListData.requestedReady.executionId,
        'userId',
        RequestStatus.ABORTED,
      )

      const abortedRecord = {
        ...MockRequestedListData.requestedReady,
        status: RequestStatus.ABORTED,
        timestamp: {
          ...MockRequestedListData.requestedReady.timestamp,
          aborted: mockDate,
        },
      }

      const userConfig = {
        requestedReports: [abortedRecord, MockRequestedListData2.requestedReady],
      } as unknown as UserStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userConfig)
    })

    it('should updated the records status - SUBMITTED', async () => {
      await requestedReportService.updateStatus(
        MockRequestedListData.requestedReady.executionId,
        'userId',
        RequestStatus.SUBMITTED,
      )

      const submittedRecord = {
        ...MockRequestedListData.requestedReady,
        status: RequestStatus.SUBMITTED,
        timestamp: {
          ...MockRequestedListData.requestedReady.timestamp,
          requested: mockDate,
        },
      }

      const userConfig = {
        requestedReports: [submittedRecord, MockRequestedListData2.requestedReady],
      } as unknown as UserStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userConfig)
    })

    it('should updated the records status - FINISHED', async () => {
      await requestedReportService.updateStatus(
        MockRequestedListData.requestedReady.executionId,
        'userId',
        RequestStatus.FINISHED,
      )

      const { reportId, variantId, tableId } = MockRequestedListData.requestedReady

      const finishedRecord = {
        ...MockRequestedListData.requestedReady,
        status: RequestStatus.FINISHED,
        timestamp: {
          ...MockRequestedListData.requestedReady.timestamp,
          completed: mockDate,
        },
        url: {
          ...MockRequestedListData.requestedReady.url,
          report: {
            fullUrl: `http://localhost:3010/async-reports/${reportId}/${variantId}/request/${tableId}/report`,
            pathname: `/async-reports/${reportId}/${variantId}/request/${tableId}/report`,
          },
        },
      }

      const userConfig = {
        requestedReports: [finishedRecord, MockRequestedListData2.requestedReady],
      } as unknown as UserStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userConfig)
    })

    it('should updated the records timestamp if no status', async () => {
      await requestedReportService.updateStatus(MockRequestedListData.requestedReady.executionId, 'userId')

      const lastviewedTsRecord = {
        ...MockRequestedListData.requestedReady,
        status: RequestStatus.FINISHED,
        timestamp: {
          ...MockRequestedListData.requestedReady.timestamp,
          lastViewed: mockDate,
        },
      }

      const userConfig = {
        requestedReports: [lastviewedTsRecord, MockRequestedListData2.requestedReady],
      } as unknown as UserStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userConfig)
    })
  })

  describe('addReport', () => {
    it('should return all the reports', async () => {
      await requestedReportService.addReport(
        'userId',
        MockRequestedListData2.requestedSubmitted as unknown as RequestedReport,
      )

      const userConfig = {
        requestedReports: [
          MockRequestedListData2.requestedSubmitted,
          MockRequestedListData.requestedReady,
          MockRequestedListData2.requestedReady,
        ],
      } as unknown as UserStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userConfig)
    })
  })
})

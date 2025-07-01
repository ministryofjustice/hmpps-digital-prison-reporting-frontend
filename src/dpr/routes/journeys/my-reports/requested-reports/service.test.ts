/* eslint-disable @typescript-eslint/no-explicit-any */
import type ReportDataStore from '../../../../data/reportDataStore'
import RequestedReportService from './service'
import { RequestedReport, RequestStatus } from '../../../../types/UserReports'
import { ReportStoreConfig } from '../../../../types/ReportStore'

import MockUserStoreService from '../../../../../../test-app/mocks/mockClients/store/mockRedisStore'
import MockRequestedListData2 from '../../../../../../test-app/mocks/mockClients/store/mockRequestedUserListDataV2'

describe('RequestedReportService', () => {
  const mockUserStore: ReportDataStore = new MockUserStoreService() as unknown as ReportDataStore
  const requestedReportService: RequestedReportService = new RequestedReportService(mockUserStore)

  let saveStateSpy: jest.SpyInstance<Promise<void>, [userId: string, userConfig: ReportStoreConfig], any>
  const mockDate = new Date(1466424490000)
  jest.spyOn(global, 'Date').mockImplementation(() => mockDate)

  beforeEach(() => {
    jest.spyOn(requestedReportService, 'getState').mockResolvedValue({
      requestedReports: [MockRequestedListData2.requestedReady],
    } as unknown as ReportStoreConfig)

    saveStateSpy = jest.spyOn(requestedReportService, 'saveState')
  })

  describe('getAllReports', () => {
    it('should return all the reports', async () => {
      const res = await requestedReportService.getAllReports('userId')

      expect(res.length).toEqual(1)
      expect(res[0]).toEqual(MockRequestedListData2.requestedReady)
    })
  })

  describe('getAllReportsById', () => {
    it('should return all the reports with a specific id', async () => {
      const res = await requestedReportService.getAllReportsById(MockRequestedListData2.requestedReady.id, 'userId')

      expect(res.length).toEqual(1)
      expect(res[0]).toEqual(MockRequestedListData2.requestedReady)
    })

    it('should return no reports when no ID in store', async () => {
      const res = await requestedReportService.getAllReportsById('dsdfsdfsdf-2', 'userId')

      expect(res.length).toEqual(0)
    })
  })

  describe('getReportByTableId', () => {
    it('should return all the reports with a tableId', async () => {
      const res = await requestedReportService.getReportByTableId(
        MockRequestedListData2.requestedReady.tableId,
        'userId',
      )
      expect(res).toEqual(MockRequestedListData2.requestedReady)
    })

    it('should return no reports when no ID in store', async () => {
      const res = await requestedReportService.getAllReportsById('dsdfsdfsdf-2', 'userId')

      expect(res.length).toEqual(0)
    })
  })

  describe('getReportByExecutionId', () => {
    it('should return all the reports with a executionId', async () => {
      const res = await requestedReportService.getReportByExecutionId(
        MockRequestedListData2.requestedReady.executionId,
        'userId',
      )
      expect(res).toEqual(MockRequestedListData2.requestedReady)
    })

    it('should return no reports when no ID in store', async () => {
      const res = await requestedReportService.getAllReportsById('dsdfsdfsdf-2', 'userId')

      expect(res.length).toEqual(0)
    })
  })

  describe('updateLastViewed', () => {
    it('should upadate a record with lastView timestamp', async () => {
      await requestedReportService.updateLastViewed(MockRequestedListData2.requestedReady.executionId, 'userId')

      const lastViewedRecord = {
        ...MockRequestedListData2.requestedReady,
        timestamp: {
          ...MockRequestedListData2.requestedReady.timestamp,
          lastViewed: mockDate,
        },
      }

      const userConfig = {
        requestedReports: [lastViewedRecord],
      } as unknown as ReportStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userConfig)
    })
  })

  describe('setToExpired', () => {
    it('should set a record to expired', async () => {
      await requestedReportService.setToExpired(MockRequestedListData2.requestedReady.executionId, 'userId')

      const expiredRecord = {
        ...MockRequestedListData2.requestedReady,
        status: RequestStatus.EXPIRED,
        timestamp: {
          ...MockRequestedListData2.requestedReady.timestamp,
          expired: mockDate,
        },
      }

      const userConfig = {
        requestedReports: [expiredRecord],
      } as unknown as ReportStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userConfig)
    })
  })

  describe('updateStatus', () => {
    it('should updated the records status - PICKED', async () => {
      await requestedReportService.updateStatus(
        MockRequestedListData2.requestedReady.executionId,
        'userId',
        RequestStatus.PICKED,
      )

      const pickedRecord = {
        ...MockRequestedListData2.requestedReady,
        status: RequestStatus.PICKED,
      }

      const userConfig = {
        requestedReports: [pickedRecord],
      } as unknown as ReportStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userConfig)
    })

    it('should updated the records status - FAILED', async () => {
      await requestedReportService.updateStatus(
        MockRequestedListData2.requestedReady.executionId,
        'userId',
        RequestStatus.FAILED,
        'errorMessage',
      )

      const failedRecord = {
        ...MockRequestedListData2.requestedReady,
        status: RequestStatus.FAILED,
        timestamp: {
          ...MockRequestedListData2.requestedReady.timestamp,
          failed: mockDate,
        },
        errorMessage: 'errorMessage',
      }

      const userConfig = {
        requestedReports: [failedRecord],
      } as unknown as ReportStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userConfig)
    })

    it('should updated the records status - EXPIRED', async () => {
      await requestedReportService.updateStatus(
        MockRequestedListData2.requestedReady.executionId,
        'userId',
        RequestStatus.EXPIRED,
      )

      const expiredRecord = {
        ...MockRequestedListData2.requestedReady,
        status: RequestStatus.EXPIRED,
        timestamp: {
          ...MockRequestedListData2.requestedReady.timestamp,
          expired: mockDate,
        },
      }

      const userConfig = {
        requestedReports: [expiredRecord],
      } as unknown as ReportStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userConfig)
    })

    it('should updated the records status - ABORTED', async () => {
      await requestedReportService.updateStatus(
        MockRequestedListData2.requestedReady.executionId,
        'userId',
        RequestStatus.ABORTED,
      )

      const abortedRecord = {
        ...MockRequestedListData2.requestedReady,
        status: RequestStatus.ABORTED,
        timestamp: {
          ...MockRequestedListData2.requestedReady.timestamp,
          aborted: mockDate,
        },
      }

      const userConfig = {
        requestedReports: [abortedRecord],
      } as unknown as ReportStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userConfig)
    })

    it('should updated the records status - SUBMITTED', async () => {
      await requestedReportService.updateStatus(
        MockRequestedListData2.requestedReady.executionId,
        'userId',
        RequestStatus.SUBMITTED,
      )

      const submittedRecord = {
        ...MockRequestedListData2.requestedReady,
        status: RequestStatus.SUBMITTED,
        timestamp: {
          ...MockRequestedListData2.requestedReady.timestamp,
          requested: mockDate,
        },
      }

      const userConfig = {
        requestedReports: [submittedRecord],
      } as unknown as ReportStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userConfig)
    })

    it('should updated the records status - FINISHED', async () => {
      await requestedReportService.updateStatus(
        MockRequestedListData2.requestedReady.executionId,
        'userId',
        RequestStatus.FINISHED,
      )

      const { reportId, id, tableId } = MockRequestedListData2.requestedReady

      const finishedRecord = {
        ...MockRequestedListData2.requestedReady,
        status: RequestStatus.FINISHED,
        timestamp: {
          ...MockRequestedListData2.requestedReady.timestamp,
          completed: mockDate,
        },
        url: {
          ...MockRequestedListData2.requestedReady.url,
          report: {
            fullUrl: `http://localhost:3010/async/report/${reportId}/${id}/request/${tableId}/report`,
            pathname: `/async/report/${reportId}/${id}/request/${tableId}/report`,
          },
        },
      }

      const userConfig = {
        requestedReports: [finishedRecord],
      } as unknown as ReportStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userConfig)
    })

    it('should updated the records timestamp if no status', async () => {
      await requestedReportService.updateStatus(MockRequestedListData2.requestedReady.executionId, 'userId')

      const lastviewedTsRecord = {
        ...MockRequestedListData2.requestedReady,
        status: RequestStatus.FINISHED,
        timestamp: {
          ...MockRequestedListData2.requestedReady.timestamp,
          lastViewed: mockDate,
        },
      }

      const userConfig = {
        requestedReports: [lastviewedTsRecord],
      } as unknown as ReportStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userConfig)
    })
  })

  describe('addReport', () => {
    it('should add a report to the list', async () => {
      await requestedReportService.addReport(
        'userId',
        MockRequestedListData2.requestedSubmitted as unknown as RequestedReport,
      )

      const userConfig = {
        requestedReports: [MockRequestedListData2.requestedSubmitted, MockRequestedListData2.requestedReady],
      } as unknown as ReportStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userConfig)
    })
  })

  describe('removeReport', () => {
    it('should remove a report from the list', async () => {
      await requestedReportService.removeReport(MockRequestedListData2.requestedReady.executionId, 'userId')

      const userConfig = {
        requestedReports: [],
      } as unknown as ReportStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userConfig)
    })
  })
})

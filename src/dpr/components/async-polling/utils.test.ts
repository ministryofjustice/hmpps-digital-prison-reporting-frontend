import AsyncPollingUtils from './utils'
import { RequestStatus } from '../../types/AsyncReport'
import ReportingService from '../../services/reportingService'
import AsyncReportStoreService from '../../services/requestedReportsService'

describe('AsyncPollinutils', () => {
  let mocAsyncReportsStore: AsyncReportStoreService

  beforeEach(() => {
    mocAsyncReportsStore = {
      updateStatus: jest.fn(),
      getReportByExecutionId: jest.fn().mockResolvedValue({ data: 'stuff' }),
    } as unknown as AsyncReportStoreService
  })

  describe('getStatus', () => {
    it('should get status and update report data', async () => {
      const mockReportingService = {
        getAsyncReportStatus: jest.fn().mockResolvedValue({ status: RequestStatus.FINISHED }),
      } as unknown as ReportingService

      const res = await AsyncPollingUtils.getStatus(
        'token',
        'reportId',
        'variantId',
        'executionId',
        RequestStatus.STARTED,
        mockReportingService,
        mocAsyncReportsStore,
        '',
      )

      expect(res).toEqual({ status: RequestStatus.FINISHED, reportData: { data: 'stuff' } })
      expect(mocAsyncReportsStore.updateStatus).toHaveBeenCalledWith('executionId', RequestStatus.FINISHED, undefined)
    })

    it('should return the status without updating the user store', async () => {
      const mockReportingService = {
        getAsyncReportStatus: jest.fn().mockResolvedValue({ status: RequestStatus.STARTED }),
      } as unknown as ReportingService

      const res = await AsyncPollingUtils.getStatus(
        'token',
        'reportId',
        'variantId',
        'executionId',
        RequestStatus.STARTED,
        mockReportingService,
        mocAsyncReportsStore,
        '',
      )

      expect(res).toEqual({ status: RequestStatus.STARTED })
      expect(mocAsyncReportsStore.updateStatus).not.toHaveBeenCalled()
    })

    it('should return an error message', async () => {
      const mockReportingService = {
        getAsyncReportStatus: jest
          .fn()
          .mockResolvedValue({ status: RequestStatus.FAILED, error: 'Mock error message' }),
      } as unknown as ReportingService

      const res = await AsyncPollingUtils.getStatus(
        'token',
        'reportId',
        'variantId',
        'executionId',
        RequestStatus.STARTED,
        mockReportingService,
        mocAsyncReportsStore,
        '',
      )

      expect(res).toEqual({
        status: RequestStatus.FAILED,
        errorMessage: 'Mock error message',
        reportData: { data: 'stuff' },
      })
    })
  })
})

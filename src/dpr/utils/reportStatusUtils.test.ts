import BookmarkService from '../services/bookmarkService'
import ReportingService from '../services/reportingService'
import AsyncReportStoreService from '../services/requestedReportsService'
import { RequestStatus } from '../types/AsyncReport'
import { Services } from '../types/Services'
import ReportStatusUtils from './reportStatusUtils'

describe('ReportStatusUtils', () => {
  let mocAsyncReportsStore: AsyncReportStoreService

  const services: Services = {
    asyncReportsStore: {},
    recentlyViewedStoreService: {},
    bookmarkService: {},
    reportingService: {},
  }

  beforeEach(() => {
    mocAsyncReportsStore = {
      updateStatus: jest.fn(),
      getReportByExecutionId: jest.fn().mockResolvedValue({ data: 'stuff' }),
    } as unknown as AsyncReportStoreService

    services.asyncReportsStore = mocAsyncReportsStore
  })

  describe('getStatus', () => {
    it('should get status and update report data', async () => {
      const mockReportingService = {
        getAsyncReportStatus: jest.fn().mockResolvedValue({ status: RequestStatus.FINISHED }),
      } as unknown as ReportingService

      services.reportingService = mockReportingService

      const res = await ReportStatusUtils.getStatus(
        'token',
        'reportId',
        'variantId',
        'executionId',
        RequestStatus.STARTED,
        services,
        '',
      )

      expect(res).toEqual({ status: RequestStatus.FINISHED, reportData: { data: 'stuff' } })
      expect(mocAsyncReportsStore.updateStatus).toHaveBeenCalledWith('executionId', RequestStatus.FINISHED, undefined)
    })

    it('should return the status without updating the user store', async () => {
      const mockReportingService = {
        getAsyncReportStatus: jest.fn().mockResolvedValue({ status: RequestStatus.STARTED }),
      } as unknown as ReportingService

      services.reportingService = mockReportingService

      const res = await ReportStatusUtils.getStatus(
        'token',
        'reportId',
        'variantId',
        'executionId',
        RequestStatus.STARTED,
        services,
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

      services.reportingService = mockReportingService

      const res = await ReportStatusUtils.getStatus(
        'token',
        'reportId',
        'variantId',
        'executionId',
        RequestStatus.STARTED,
        services,
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

import { Response, Request } from 'express'
import ReportingService from '../services/reportingService'
import { RequestStatus } from '../types/AsyncReport'
import { Services } from '../types/Services'
import * as ReportStatusHelper from './reportStatusHelper'

describe('ReportStatusHelper', () => {
  const services: Services = {
    asyncReportsStore: {},
    recentlyViewedStoreService: {},
    bookmarkService: {},
    reportingService: {},
  }

  let res: Response
  beforeEach(() => {
    res = {
      locals: {
        token: 'Token',
      },
    } as unknown as Response
  })

  describe('getStatus', () => {
    it('should get the request status', async () => {
      services.reportingService = {
        getAsyncReportStatus: jest.fn().mockResolvedValue({ status: RequestStatus.FINISHED }),
      } as unknown as ReportingService

      const req = {
        body: {
          status: RequestStatus.STARTED,
          requestedAt: new Date(),
        },
      } as unknown as Request

      const result = await ReportStatusHelper.getStatus({ req, res, services })

      expect(result.status).toEqual(RequestStatus.FINISHED)
    })

    it('should get the request status as failed', async () => {
      services.reportingService = {
        getAsyncReportStatus: jest.fn().mockResolvedValue({ status: RequestStatus.FAILED, error: 'Error Message' }),
      } as unknown as ReportingService

      const req = {
        body: {
          status: RequestStatus.STARTED,
          requestedAt: new Date(),
        },
      } as unknown as Request

      const result = await ReportStatusHelper.getStatus({ req, res, services })

      expect(result.status).toEqual(RequestStatus.FAILED)
      expect(result.errorMessage).toEqual('Error Message')
    })

    it('should get the request status as expired', async () => {
      services.reportingService = {
        getAsyncReportStatus: jest.fn().mockRejectedValue(new Error('Async error')),
      } as unknown as ReportingService

      const req = {
        body: {
          status: RequestStatus.FINISHED,
          requestedAt: new Date(),
        },
      } as unknown as Request

      const result = await ReportStatusHelper.getStatus({ req, res, services })

      expect(result.status).toEqual(RequestStatus.EXPIRED)
    })

    it('should timeout the request and return status as failed', async () => {
      services.reportingService = {
        getAsyncReportStatus: jest.fn().mockResolvedValue({ status: RequestStatus.STARTED }),
      } as unknown as ReportingService

      const req = {
        body: {
          status: RequestStatus.STARTED,
          requestedAt: '2024-07-23T10:00:22.834Z',
        },
      } as unknown as Request

      const result = await ReportStatusHelper.getStatus({ req, res, services })

      expect(result.status).toEqual(RequestStatus.FAILED)
      expect(result.errorMessage).toEqual('Request taking too long. Request Halted')
    })
  })

  describe('getExpiredStatus', () => {
    it('should get status as expired', async () => {
      services.reportingService = {
        getAsyncReportStatus: jest.fn().mockRejectedValue(new Error('Async error')),
      } as unknown as ReportingService

      const req = {
        body: {
          executionId: 'executionId',
          status: RequestStatus.READY,
          requestedAt: new Date(),
        },
      } as unknown as Request

      const result = await ReportStatusHelper.getExpiredStatus({ req, res, services })

      expect(result.isExpired).toBeTruthy()
      expect(result.executionId).toEqual('executionId')
    })

    it('should notget status as expired', async () => {
      services.reportingService = {
        getAsyncReportStatus: jest.fn().mockResolvedValue({ status: RequestStatus.FINISHED }),
      } as unknown as ReportingService

      const req = {
        body: {
          executionId: 'executionId',
          status: RequestStatus.FINISHED,
          requestedAt: new Date(),
        },
      } as unknown as Request

      const result = await ReportStatusHelper.getExpiredStatus({ req, res, services })

      expect(result.isExpired).toBeFalsy()
      expect(result.executionId).toEqual('executionId')
    })
  })
})

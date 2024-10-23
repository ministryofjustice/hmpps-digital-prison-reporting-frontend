import { Response, Request } from 'express'
import ReportingService from '../services/reportingService'
import { ReportType, RequestStatus } from '../types/UserReports'
import { Services } from '../types/Services'
import * as ReportStatusHelper from './requestStatusHelper'
import MetricService from '../services/metricsService'
import DashboardService from '../services/dashboardService'

describe('ReportStatusHelper', () => {
  const services: Services = {
    requestedReportService: {},
    recentlyViewedService: {},
    bookmarkService: {},
    reportingService: {},
    dashboardService: {},
    metricService: {} as unknown as MetricService,
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
          type: ReportType.REPORT,
        },
      } as unknown as Request

      const result = await ReportStatusHelper.getStatus({ req, res, services })

      expect(result.status).toEqual(RequestStatus.FINISHED)
    })

    it('should get the request dashboard status', async () => {
      services.dashboardService = {
        getAsyncStatus: jest.fn().mockResolvedValue({ status: RequestStatus.FINISHED }),
      } as unknown as DashboardService

      const req = {
        body: {
          status: RequestStatus.STARTED,
          requestedAt: new Date(),
          type: ReportType.DASHBOARD,
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
          type: ReportType.REPORT,
        },
      } as unknown as Request

      const result = await ReportStatusHelper.getStatus({ req, res, services })

      expect(result.status).toEqual(RequestStatus.FAILED)
      expect(result.errorMessage).toEqual({ developerMessage: 'Error Message' })
    })

    it('should get the request dashboard status as failed', async () => {
      services.dashboardService = {
        getAsyncStatus: jest.fn().mockResolvedValue({ status: RequestStatus.FAILED, error: 'Error Message' }),
      } as unknown as DashboardService

      const req = {
        body: {
          status: RequestStatus.STARTED,
          requestedAt: new Date(),
          type: ReportType.DASHBOARD,
        },
      } as unknown as Request

      const result = await ReportStatusHelper.getStatus({ req, res, services })

      expect(result.status).toEqual(RequestStatus.FAILED)
      expect(result.errorMessage).toEqual({ developerMessage: 'Error Message' })
    })

    it('should get the request status as expired', async () => {
      services.reportingService = {
        getAsyncReportStatus: jest.fn().mockRejectedValue(new Error('Async error')),
      } as unknown as ReportingService

      const req = {
        body: {
          status: RequestStatus.FINISHED,
          requestedAt: new Date(),
          type: ReportType.REPORT,
        },
      } as unknown as Request

      const result = await ReportStatusHelper.getStatus({ req, res, services })

      expect(result.status).toEqual(RequestStatus.EXPIRED)
    })

    it('should get the request dashboard status as expired', async () => {
      services.dashboardService = {
        getAsyncStatus: jest.fn().mockRejectedValue(new Error('Async error')),
      } as unknown as DashboardService

      const req = {
        body: {
          status: RequestStatus.FINISHED,
          requestedAt: new Date(),
          type: ReportType.DASHBOARD,
        },
      } as unknown as Request

      const result = await ReportStatusHelper.getStatus({ req, res, services })

      expect(result.status).toEqual(RequestStatus.EXPIRED)
    })

    it('should timeout the request and return status as failed', async () => {
      services.reportingService = {
        getAsyncReportStatus: jest.fn().mockResolvedValue({ status: RequestStatus.STARTED }),
      } as unknown as ReportingService

      const requestedAt = new Date()
      requestedAt.setMinutes(requestedAt.getMinutes() - 20)

      const req = {
        body: {
          status: RequestStatus.STARTED,
          requestedAt,
          type: ReportType.REPORT,
        },
      } as unknown as Request

      const result = await ReportStatusHelper.getStatus({ req, res, services })

      expect(result.status).toEqual(RequestStatus.FAILED)
      expect(result.errorMessage).toEqual({ userMessage: 'Request taking too long. Request Halted' })
    })

    it('should timeout the dashboard request and return status as failed', async () => {
      services.dashboardService = {
        getAsyncStatus: jest.fn().mockResolvedValue({ status: RequestStatus.STARTED }),
      } as unknown as DashboardService

      const requestedAt = new Date()
      requestedAt.setMinutes(requestedAt.getMinutes() - 20)

      const req = {
        body: {
          status: RequestStatus.STARTED,
          requestedAt,
          type: ReportType.DASHBOARD,
        },
      } as unknown as Request

      const result = await ReportStatusHelper.getStatus({ req, res, services })

      expect(result.status).toEqual(RequestStatus.FAILED)
      expect(result.errorMessage).toEqual({ userMessage: 'Request taking too long. Request Halted' })
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
          type: ReportType.REPORT,
        },
      } as unknown as Request

      const result = await ReportStatusHelper.getExpiredStatus({ req, res, services })

      expect(result.isExpired).toBeTruthy()
      expect(result.executionId).toEqual('executionId')
    })

    it('should get dashboard status as expired', async () => {
      services.dashboardService = {
        getAsyncStatus: jest.fn().mockRejectedValue(new Error('Async error')),
      } as unknown as DashboardService

      const req = {
        body: {
          executionId: 'executionId',
          status: RequestStatus.READY,
          requestedAt: new Date(),
          type: ReportType.DASHBOARD,
        },
      } as unknown as Request

      const result = await ReportStatusHelper.getExpiredStatus({ req, res, services })

      expect(result.isExpired).toBeTruthy()
      expect(result.executionId).toEqual('executionId')
    })

    it('should not get status as expired', async () => {
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

    it('should not get dashboard status as expired', async () => {
      services.dashboardService = {
        getAsyncStatus: jest.fn().mockResolvedValue({ status: RequestStatus.FINISHED }),
      } as unknown as DashboardService

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

  describe('timeoutRequest', () => {
    it('should timeout the request', async () => {
      const requestedAt = new Date()
      requestedAt.setMinutes(requestedAt.getMinutes() - 20)

      const compareTime = new Date()

      const result = ReportStatusHelper.shouldTimeoutRequest({
        requestedAt,
        compareTime,
        durationMins: 15,
      })

      expect(result).toBeTruthy()
    })

    it('should not timeout the request', async () => {
      const requestedAt = new Date()
      requestedAt.setMinutes(requestedAt.getMinutes() - 10)

      const compareTime = new Date()

      const result = ReportStatusHelper.shouldTimeoutRequest({
        requestedAt,
        compareTime,
        durationMins: 15,
      })

      expect(result).toBeFalsy()
    })
  })
})

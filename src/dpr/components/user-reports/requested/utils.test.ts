import { Response, Request } from 'express'
import UserReportRequestListUtils from './utils'
import type { RequestedReportService, ReportingService } from '../../../services'
import { Services } from '../../../types/Services'
import mockRequested from '../../../../../test-app/mocks/mockClients/store/mockRequestedUserListDataV2'
import { ReportType, RequestStatus } from '../../../types/UserReports'

describe('UserReportRequestListUtils', () => {
  let res: Response
  let req: Request
  let requestedReportService: RequestedReportService
  let reportingService: ReportingService
  let services: Services

  describe('getRequestStatus', () => {
    beforeEach(() => {
      res = {
        locals: {
          user: {
            uuid: 'UuId',
            token: 'ToKeN',
          },
          csfrToken: 'CsRfToKeN',
        },
      } as unknown as Response

      req = {
        body: {
          executionId: 'executionId',
          status: 'SUBMITTED',
          type: ReportType.REPORT,
        },
      } as unknown as Request

      requestedReportService = {
        updateStatus: jest.fn(),
        getReportByExecutionId: jest.fn().mockResolvedValue(mockRequested.requestedReady),
      } as unknown as RequestedReportService

      reportingService = {
        getAsyncReportStatus: jest.fn().mockResolvedValue({
          status: RequestStatus.FINISHED,
        }),
      } as unknown as ReportingService

      services = {
        requestedReportService,
        reportingService,
      } as unknown as Services
    })

    it('getRequestStatus', async () => {
      const result = await UserReportRequestListUtils.getRequestStatus({
        res,
        req,
        services,
      })

      expect(result).toEqual({ reportData: mockRequested.requestedReady, status: RequestStatus.FINISHED })
    })
  })
})

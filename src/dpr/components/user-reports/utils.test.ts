/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express'
import { RequestedReport, RequestStatus } from '../../types/UserReports'
import UserReportUtils, { setDataFromStatus } from './utils'
import RequestedReportsUtils from './requested/utils'
import ViewedReportsUtils from './viewed/utils'
import type RequestedReportService from '../../services/requestedReportService'
import type RecentlyViewedStoreService from '../../services/recentlyViewedService'
import mockDashboardData from '../../../../test-app/mocks/mockClients/store/mockRequestedDashboardData'
import mockRequestedData from '../../../../test-app/mocks/mockClients/store/mockRequestedUserListDataV2'
import mockViewedData from '../../../../test-app/mocks/mockClients/store/mockViewedUserListDataV2'

describe('AsyncRequestListUtils', () => {
  describe('setDataFromStatus', () => {
    let reportData: RequestedReport

    beforeEach(() => {
      reportData = {
        executionId: 'executionId',
        url: {
          request: { fullUrl: 'requestUrl' },
          report: { fullUrl: 'reportUrl' },
          polling: { fullUrl: 'pollingUrl' },
        },
        timestamp: {
          failed: 'ts',
          aborted: 'ts',
          completed: 'ts',
          expired: 'ts',
          requested: 'ts',
          lastViewed: 'ts',
        },
      } as unknown as RequestedReport
    })

    it('should set the correct href and timestamp for FAILED status', async () => {
      const result = setDataFromStatus(RequestStatus.FAILED, reportData)
      const expectedResult = {
        href: 'pollingUrl',
        timestamp: 'Failed at: null',
      }
      expect(result).toEqual(expectedResult)
    })

    it('should set the correct href and timestamp for FAILED status', async () => {
      const result = setDataFromStatus(RequestStatus.FAILED, reportData)
      const expectedResult = {
        href: 'pollingUrl',
        timestamp: 'Failed at: null',
      }
      expect(result).toEqual(expectedResult)
    })

    it('should set the correct href and timestamp for ABORTED status', async () => {
      const result = setDataFromStatus(RequestStatus.ABORTED, reportData)
      const expectedResult = {
        href: 'requestUrl',
        timestamp: 'Aborted at: null',
      }
      expect(result).toEqual(expectedResult)
    })

    it('should set the correct href and timestamp for FINISHED status', async () => {
      const result = setDataFromStatus(RequestStatus.FINISHED, reportData)
      const expectedResult = {
        href: 'reportUrl',
        timestamp: 'Ready at: null',
      }
      expect(result).toEqual(expectedResult)
    })

    it('should set the correct href and timestamp for EXPIRED status', async () => {
      const result = setDataFromStatus(RequestStatus.EXPIRED, reportData)
      const expectedResult = {
        href: 'requestUrl',
        timestamp: 'Expired at: null',
      }
      expect(result).toEqual(expectedResult)
    })

    it('should set the correct href and timestamp for SUBMITTED status', async () => {
      const result = setDataFromStatus(RequestStatus.SUBMITTED, reportData)
      const expectedResult = {
        href: 'pollingUrl',
        timestamp: 'Requested at: null',
      }
      expect(result).toEqual(expectedResult)
    })

    it('should set the correct href and timestamp for STARTED status', async () => {
      const result = setDataFromStatus(RequestStatus.STARTED, reportData)
      const expectedResult = {
        href: 'pollingUrl',
        timestamp: 'Requested at: null',
      }
      expect(result).toEqual(expectedResult)
    })

    it('should set the correct href and timestamp for PICKED status', async () => {
      const result = setDataFromStatus(RequestStatus.PICKED, reportData)
      const expectedResult = {
        href: 'pollingUrl',
        timestamp: 'Requested at: null',
      }
      expect(result).toEqual(expectedResult)
    })
  })

  describe('renderList', () => {
    let res: Response
    let storeService: RequestedReportService | RecentlyViewedStoreService
    let requestedReportService: RequestedReportService
    let recentlyViewedStoreService: RecentlyViewedStoreService

    beforeEach(() => {
      res = {
        locals: {
          user: {
            uuid: 'UuId',
          },
          csfrToken: 'CsRfToKeN',
          requestedReports: [
            mockRequestedData.requestedReady,
            mockRequestedData.requestedFailed,
            mockRequestedData.requestedExpired,
            mockRequestedData.requestedAborted,
            mockDashboardData.submittedDashboard,
            mockDashboardData.failedDashboard,
            mockDashboardData.expiredDashboard,
          ],
          recentlyViewedReports: [mockViewedData.viewedReady, mockViewedData.viewedExpired],
        },
      } as unknown as Response

      requestedReportService = {
        getAllReports: jest.fn(),
      } as unknown as RequestedReportService

      recentlyViewedStoreService = {
        getAllReports: jest.fn(),
      } as unknown as RecentlyViewedStoreService
    })

    describe('Requested Reports', () => {
      beforeEach(() => {
        requestedReportService = {
          getAllReports: jest
            .fn()
            .mockResolvedValue([
              mockRequestedData.requestedReady,
              mockRequestedData.requestedFailed,
              mockRequestedData.requestedExpired,
              mockRequestedData.requestedAborted,
              mockDashboardData.submittedDashboard,
              mockDashboardData.failedDashboard,
              mockDashboardData.expiredDashboard,
            ]),
        } as unknown as RequestedReportService

        storeService = requestedReportService
      })

      it('should return the render list data with reports', async () => {
        const result = await UserReportUtils.renderList({
          res,
          maxRows: 11,
          filterFunction: RequestedReportsUtils.filterReports,
          reportsData: res.locals.requestedReports,
          type: 'requested',
        })

        expect(result.tableData.rows.length).toEqual(7)
        expect(result.tableData.head.length).toEqual(4)
        expect(result.meta.length).toEqual(7)

        const v1Ready = result.tableData.rows[0]
        expect(v1Ready[3].html).toContain(
          'http://localhost:3010/async/report/test-report-3/variantId-1/request/tblId_1729765628165/report',
        )
        expect(v1Ready[2].html).toContain('FINISHED')

        const v1Failed = result.tableData.rows[1]
        const v1FailedRetryUrl =
          'http://localhost:3010/async/report/test-report-3/variantId-2/request/exId_1729765694790'
        expect(v1Failed[2].html).toContain('FAILED')
        expect(v1Failed[3].html).toContain(v1FailedRetryUrl)
        expect(v1Failed[3].html).toContain('remove')

        const v1Expired = result.tableData.rows[2]
        const v1ExpiredRetryUrl =
          'http://localhost:3010/async/report/test-report-3/variantId-4/request?filters.field1=value1.3&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&sortColumn=field1&sortedAsc=true&filters.field2=value2.1'
        expect(v1Expired[2].html).toContain('EXPIRED')
        expect(v1Expired[3].html).toContain(v1ExpiredRetryUrl)
        expect(v1Expired[3].html).toContain('remove')

        const v1Aborted = result.tableData.rows[3]
        const v1AbortedRetryUrl =
          'http://localhost:3010/async/report/test-report-3/variantId-1/request?filters.field1=value1.1&filters.field2=value2.3&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2007-05-04&sortColumn=field1&sortedAsc=true&filters.field6=Value+6.1'
        expect(v1Aborted[2].html).toContain('ABORTED')
        expect(v1Aborted[3].html).toContain(v1AbortedRetryUrl)
        expect(v1Aborted[3].html).toContain('remove')
      })

      it('should return the render list with dashboards', async () => {
        const result = await UserReportUtils.renderList({
          res,
          maxRows: 11,
          filterFunction: RequestedReportsUtils.filterReports,
          reportsData: res.locals.requestedReports,
          type: 'requested',
        })

        expect(result.tableData.rows.length).toEqual(7)
        expect(result.tableData.head.length).toEqual(4)
        expect(result.meta.length).toEqual(7)

        const v2Ready = result.tableData.rows[4]
        expect(v2Ready[3].html).toContain(
          'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-1/request/exId_1724943092098',
        )
        expect(v2Ready[2].html).toContain('SUBMITTED')

        const v2Failed = result.tableData.rows[5]
        const v2FailedRetryUrl =
          'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-2/request/exId_1724943092123'
        expect(v2Failed[2].html).toContain('FAILED')
        expect(v2Failed[3].html).toContain(v2FailedRetryUrl)
        expect(v2Failed[3].html).toContain('remove')

        const v2Expired = result.tableData.rows[6]
        const v2ExpiredRetryUrl = 'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-3/request'
        expect(v2Expired[2].html).toContain('EXPIRED')
        expect(v2Expired[3].html).toContain(v2ExpiredRetryUrl)
        expect(v2Expired[3].html).toContain('remove')
      })
    })

    describe('Viewed Reports', () => {
      beforeEach(() => {
        recentlyViewedStoreService = {
          getAllReports: jest.fn().mockResolvedValue([mockViewedData.viewedReady, mockViewedData.viewedExpired]),
        } as unknown as RecentlyViewedStoreService

        storeService = recentlyViewedStoreService
      })

      it('should return the render list data', async () => {
        const result = await UserReportUtils.renderList({
          res,
          maxRows: 11,
          filterFunction: ViewedReportsUtils.filterReports,
          reportsData: res.locals.recentlyViewedReports,
          type: 'viewed',
        })

        expect(result.tableData.rows.length).toEqual(2)
        expect(result.tableData.head.length).toEqual(4)
        expect(result.meta.length).toEqual(2)

        const v1Ready = result.tableData.rows[0]
        expect(v1Ready[3].html).toContain(
          'http://localhost:3010/async/report/test-report-3/variantId-1/request/tblId_1729766362362/report',
        )
        expect(v1Ready[2].html).toContain('READY')

        const v1Expired = result.tableData.rows[1]
        const v1ExpiredRetryUrl =
          'http://localhost:3010/async/report/test-report-3/variantId-1/request?filters.field2=value2.3&filters.field3.start=2003-09-05&filters.field3.end=2007-05-01&filters.field7=2007-05-04&sortColumn=field1&sortedAsc=true&filters.field4=Inigo+Montoya'
        expect(v1Expired[2].html).toContain('EXPIRED')
        expect(v1Expired[3].html).toContain(v1ExpiredRetryUrl)
        expect(v1Expired[3].html).toContain('remove')
      })
    })
  })
})

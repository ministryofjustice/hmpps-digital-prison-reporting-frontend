/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express'
import { RequestedReport, RequestStatus } from '../../types/UserReports'
import UserReportUtils, { setDataFromStatus } from './utils'
import RequestedReportsUtils from '../user-reports-request-list/utils'
import ViewedReportsUtils from '../user-reports-viewed-list/utils'
import type RequestedReportService from '../../services/requestedReportService'
import type RecentlyViewedStoreService from '../../services/recentlyViewedService'
import mockDashboardData from '../../../../test-app/mocks/mockClients/store/mockRequestedDashboardData'
import mockRequestedDataV1 from '../../../../test-app/mocks/mockClients/store/mockRequestedUserListDataV1'
import mockRequestedDataV2 from '../../../../test-app/mocks/mockClients/store/mockRequestedUserListDataV2'
import mockViewedDataV1 from '../../../../test-app/mocks/mockClients/store/mockViewedUserListDataV1'
import mockViewedDataV2 from '../../../../test-app/mocks/mockClients/store/mockViewedUserListDataV2'

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
        timestamp: 'Failed at: Invalid Date',
      }
      expect(result).toEqual(expectedResult)
    })

    it('should set the correct href and timestamp for FAILED status', async () => {
      const result = setDataFromStatus(RequestStatus.FAILED, reportData)
      const expectedResult = {
        href: 'pollingUrl',
        timestamp: 'Failed at: Invalid Date',
      }
      expect(result).toEqual(expectedResult)
    })

    it('should set the correct href and timestamp for ABORTED status', async () => {
      const result = setDataFromStatus(RequestStatus.ABORTED, reportData)
      const expectedResult = {
        href: 'requestUrl',
        timestamp: 'Aborted at: Invalid Date',
      }
      expect(result).toEqual(expectedResult)
    })

    it('should set the correct href and timestamp for FINISHED status', async () => {
      const result = setDataFromStatus(RequestStatus.FINISHED, reportData)
      const expectedResult = {
        href: 'reportUrl',
        timestamp: 'Ready at: Invalid Date',
      }
      expect(result).toEqual(expectedResult)
    })

    it('should set the correct href and timestamp for EXPIRED status', async () => {
      const result = setDataFromStatus(RequestStatus.EXPIRED, reportData)
      const expectedResult = {
        href: 'requestUrl',
        timestamp: 'Expired at: Invalid Date',
      }
      expect(result).toEqual(expectedResult)
    })

    it('should set the correct href and timestamp for SUBMITTED status', async () => {
      const result = setDataFromStatus(RequestStatus.SUBMITTED, reportData)
      const expectedResult = {
        href: 'pollingUrl',
        timestamp: 'Requested at: Invalid Date',
      }
      expect(result).toEqual(expectedResult)
    })

    it('should set the correct href and timestamp for STARTED status', async () => {
      const result = setDataFromStatus(RequestStatus.STARTED, reportData)
      const expectedResult = {
        href: 'pollingUrl',
        timestamp: 'Requested at: Invalid Date',
      }
      expect(result).toEqual(expectedResult)
    })

    it('should set the correct href and timestamp for PICKED status', async () => {
      const result = setDataFromStatus(RequestStatus.PICKED, reportData)
      const expectedResult = {
        href: 'pollingUrl',
        timestamp: 'Requested at: Invalid Date',
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
              mockRequestedDataV1.requestedReady,
              mockRequestedDataV1.requestedFailed,
              mockRequestedDataV1.requestedExpired,
              mockRequestedDataV1.requestedAborted,
              mockRequestedDataV2.requestedReady,
              mockRequestedDataV2.requestedFailed,
              mockRequestedDataV2.requestedExpired,
              mockRequestedDataV2.requestedAborted,
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
          storeService,
          type: 'requested',
        })

        expect(result.tableData.rows.length).toEqual(11)
        expect(result.tableData.head.length).toEqual(5)
        expect(result.meta.length).toEqual(11)

        const v1Ready = result.tableData.rows[0]
        expect(v1Ready[4].html).toContain(
          'http://localhost:3010/async-reports/test-report-3/variantId-1/request/tblId_1729765628165/report',
        )
        expect(v1Ready[3].html).toContain('FINISHED')

        const v1Failed = result.tableData.rows[1]
        const v1FailedRetryUrl =
          'http://localhost:3010/async-reports/test-report-3/variantId-2/request/exId_1729765694790'
        expect(v1Failed[3].html).toContain('FAILED')
        expect(v1Failed[4].html).toContain(v1FailedRetryUrl)
        expect(v1Failed[4].html).toContain('remove')

        const v1Expired = result.tableData.rows[2]
        const v1ExpiredRetryUrl =
          'http://localhost:3010/async-reports/test-report-3/variantId-4/request?filters.field1=value1.3&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&sortColumn=field1&sortedAsc=true&filters.field2=value2.1'
        expect(v1Expired[3].html).toContain('EXPIRED')
        expect(v1Expired[4].html).toContain(v1ExpiredRetryUrl)
        expect(v1Expired[4].html).toContain('remove')

        const v1Aborted = result.tableData.rows[3]
        const v1AbortedRetryUrl =
          'http://localhost:3010/async-reports/test-report-3/variantId-1/request?filters.field1=value1.1&filters.field2=value2.3&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2007-05-04&sortColumn=field1&sortedAsc=true&filters.field6=Value+6.1'
        expect(v1Aborted[3].html).toContain('ABORTED')
        expect(v1Aborted[4].html).toContain(v1AbortedRetryUrl)
        expect(v1Aborted[4].html).toContain('remove')

        const v2Ready = result.tableData.rows[4]
        expect(v2Ready[4].html).toContain(
          'http://localhost:3010/async/report/test-report-3/variantId-1/request/tblId_1729765628165/report',
        )
        expect(v2Ready[3].html).toContain('FINISHED')

        const v2Failed = result.tableData.rows[5]
        const v2FailedRetryUrl =
          'http://localhost:3010/async/report/test-report-3/variantId-2/request/exId_1729765694790'
        expect(v2Failed[3].html).toContain('FAILED')
        expect(v2Failed[4].html).toContain(v2FailedRetryUrl)
        expect(v2Failed[4].html).toContain('remove')

        const v2Expired = result.tableData.rows[6]
        const v2ExpiredRetryUrl =
          'http://localhost:3010/async/report/test-report-3/variantId-4/request?filters.field1=value1.3&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&sortColumn=field1&sortedAsc=true&filters.field2=value2.1'
        expect(v2Expired[3].html).toContain('EXPIRED')
        expect(v2Expired[4].html).toContain(v2ExpiredRetryUrl)
        expect(v2Expired[4].html).toContain('remove')

        const v2Aborted = result.tableData.rows[7]
        const v2AbortedRetryUrl =
          'http://localhost:3010/async/report/test-report-3/variantId-1/request?filters.field1=value1.1&filters.field2=value2.3&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2007-05-04&sortColumn=field1&sortedAsc=true&filters.field6=Value+6.1'
        expect(v2Aborted[3].html).toContain('ABORTED')
        expect(v2Aborted[4].html).toContain(v2AbortedRetryUrl)
        expect(v2Aborted[4].html).toContain('remove')
      })

      it('should return the render list with dashboards', async () => {
        const result = await UserReportUtils.renderList({
          res,
          maxRows: 11,
          filterFunction: RequestedReportsUtils.filterReports,
          storeService,
          type: 'requested',
        })

        expect(result.tableData.rows.length).toEqual(11)
        expect(result.tableData.head.length).toEqual(5)
        expect(result.meta.length).toEqual(11)

        const submittedDashboard = result.tableData.rows[8]

        expect(submittedDashboard[4].html).toContain(
          'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-1/request/exId_1724943092098',
        )
        expect(submittedDashboard[3].html).toContain('SUBMITTED')

        const dashboardFailed = result.tableData.rows[9]
        const dashboardFailedRetryUrl =
          'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-2/request/exId_1724943092123'
        expect(dashboardFailed[3].html).toContain('FAILED')
        expect(dashboardFailed[4].html).toContain(dashboardFailedRetryUrl)
        expect(dashboardFailed[4].html).toContain('remove')

        const dashboardExpired = result.tableData.rows[10]
        const dashboardExpiredUrl = 'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-3/request?'
        expect(dashboardExpired[3].html).toContain('EXPIRED')
        expect(dashboardExpired[4].html).toContain(dashboardExpiredUrl)
        expect(dashboardExpired[4].html).toContain('remove')
      })
    })

    describe('Viewed Reports', () => {
      beforeEach(() => {
        recentlyViewedStoreService = {
          getAllReports: jest
            .fn()
            .mockResolvedValue([
              mockViewedDataV1.viewedReady,
              mockViewedDataV1.viewedExpired,
              mockViewedDataV2.viewedReady,
              mockViewedDataV2.viewedExpired,
            ]),
        } as unknown as RecentlyViewedStoreService

        storeService = recentlyViewedStoreService
      })

      it('should return the render list data', async () => {
        const result = await UserReportUtils.renderList({
          res,
          maxRows: 11,
          filterFunction: ViewedReportsUtils.filterReports,
          storeService,
          type: 'viewed',
        })

        expect(result.tableData.rows.length).toEqual(4)
        expect(result.tableData.head.length).toEqual(5)
        expect(result.meta.length).toEqual(4)

        const v1Ready = result.tableData.rows[0]
        expect(v1Ready[4].html).toContain(
          'http://localhost:3010/async-reports/test-report-3/variantId-1/request/tblId_1729766362362/report',
        )
        expect(v1Ready[3].html).toContain('READY')

        const v1Expired = result.tableData.rows[1]
        const v1ExpiredRetryUrl =
          'http://localhost:3010/async-reports/test-report-3/variantId-1/request?filters.field1=value1.3&filters.field2=value2.3&filters.field3.start=2003-09-05&filters.field3.end=2007-05-01&filters.field7=2007-05-04&sortColumn=field1&sortedAsc=true&filters.field4=Inigo+Montoya'
        expect(v1Expired[3].html).toContain('EXPIRED')
        expect(v1Expired[4].html).toContain(v1ExpiredRetryUrl)
        expect(v1Expired[4].html).toContain('remove')

        const v2Ready = result.tableData.rows[2]
        expect(v2Ready[4].html).toContain(
          'http://localhost:3010/async/report/test-report-3/variantId-1/request/tblId_1729766362362/report',
        )
        expect(v1Ready[3].html).toContain('READY')

        const v2Expired = result.tableData.rows[3]
        const v2ExpiredRetryUrl =
          'http://localhost:3010/async/report/test-report-3/variantId-1/request?filters.field2=value2.3&filters.field3.start=2003-09-05&filters.field3.end=2007-05-01&filters.field7=2007-05-04&sortColumn=field1&sortedAsc=true&filters.field4=Inigo+Montoya'
        expect(v2Expired[3].html).toContain('EXPIRED')
        expect(v2Expired[4].html).toContain(v2ExpiredRetryUrl)
        expect(v2Expired[4].html).toContain('remove')
      })
    })
  })
})

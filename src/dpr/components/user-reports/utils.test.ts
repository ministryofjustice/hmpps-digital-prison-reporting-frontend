/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express'
import { RequestedReport, RequestStatus } from '../../types/UserReports'
import UserReportUtils, { setDataFromStatus } from './utils'
import RequestedReportsUtils from '../user-reports-request-list/utils'
import ViewedReportsUtils from '../user-reports-viewed-list/utils'
import type RequestedReportService from '../../services/requestedReportService'
import type RecentlyViewedStoreService from '../../services/recentlyViewedService'
import mockStoreDataV1 from '../../../../test-app/mocks/mockClients/store/mockUserListDataV1'
import mockStoreDataV2 from '../../../../test-app/mocks/mockClients/store/mockUserListDataV2'

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
              ...mockStoreDataV1.mockRequestedReports,
              ...mockStoreDataV2.mockRequestedReports,
              ...mockStoreDataV2.mockRequestedDashboards,
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
        expect(result.tableData.head.length).toEqual(6)
        expect(result.meta.length).toEqual(11)

        const v1Ready = result.tableData.rows[0]
        expect(v1Ready[1].html).toContain(
          'http://localhost:3010/async-reports/test-report-1/variantId-1/request/tblId_1724943092549/report',
        )
        expect(v1Ready[5].html).toContain('FINISHED')

        const v1Failed = result.tableData.rows[1]
        const v1FailedRetryUrl =
          'http://localhost:3010/async-reports/test-report-2/variantId-2/request/exId_1721738244285'
        expect(v1Failed[1].html).toContain(v1FailedRetryUrl)
        expect(v1Failed[5].html).toContain('FAILED')
        expect(v1Failed[5].html).toContain(v1FailedRetryUrl)
        expect(v1Failed[5].html).toContain('Remove')

        const v1Expired = result.tableData.rows[2]
        const v1ExpiredRetryUrl =
          'http://localhost:3010/async-reports/test-report-1/variantId-1/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true'
        expect(v1Expired[1].html).toContain(v1ExpiredRetryUrl)
        expect(v1Expired[5].html).toContain('EXPIRED')
        expect(v1Expired[5].html).toContain(v1ExpiredRetryUrl)
        expect(v1Expired[5].html).toContain('Remove')

        const v1Aborted = result.tableData.rows[3]
        const v1AbortedRetryUrl =
          'localhost:3010/async-reports/test-report-1/variantId-5/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true'
        expect(v1Aborted[1].html).toContain(v1AbortedRetryUrl)
        expect(v1Aborted[5].html).toContain('ABORTED')
        expect(v1Aborted[5].html).toContain(v1AbortedRetryUrl)
        expect(v1Aborted[5].html).toContain('Remove')

        const v2Ready = result.tableData.rows[4]
        expect(v2Ready[1].html).toContain(
          'http://localhost:3010/async/report/test-report-1/variantId-1/request/tblId_1724943092549/report',
        )
        expect(v2Ready[5].html).toContain('FINISHED')

        const v2Failed = result.tableData.rows[5]
        const v2FailedRetryUrl =
          'http://localhost:3010/async/report/test-report-2/variantId-2/request/exId_1721738244285'
        expect(v2Failed[1].html).toContain(v2FailedRetryUrl)
        expect(v2Failed[5].html).toContain('FAILED')
        expect(v2Failed[5].html).toContain(v2FailedRetryUrl)
        expect(v2Failed[5].html).toContain('Remove')

        const v2Expired = result.tableData.rows[6]
        const v2ExpiredRetryUrl =
          'http://localhost:3010/async/report/test-report-1/variantId-1/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true'
        expect(v2Expired[1].html).toContain(v2ExpiredRetryUrl)
        expect(v2Expired[5].html).toContain('EXPIRED')
        expect(v2Expired[5].html).toContain(v2ExpiredRetryUrl)
        expect(v2Expired[5].html).toContain('Remove')

        const v2Aborted = result.tableData.rows[7]
        const v2AbortedRetryUrl =
          'http://localhost:3010/async/report/test-report-1/variantId-5/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true'
        expect(v2Aborted[1].html).toContain(v2AbortedRetryUrl)
        expect(v2Aborted[5].html).toContain('ABORTED')
        expect(v2Aborted[5].html).toContain(v2AbortedRetryUrl)
        expect(v2Aborted[5].html).toContain('Remove')
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
        expect(result.tableData.head.length).toEqual(6)
        expect(result.meta.length).toEqual(11)

        const submittedDashboard = result.tableData.rows[8]
        expect(submittedDashboard[1].html).toContain(
          'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-1/request/exId_1724943092098',
        )
        expect(submittedDashboard[5].html).toContain('SUBMITTED')

        const dashboardFailed = result.tableData.rows[9]
        const dashboardFailedRetryUrl =
          'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-2/request/exId_1724943092123'
        expect(dashboardFailed[1].html).toContain(dashboardFailedRetryUrl)
        expect(dashboardFailed[5].html).toContain('FAILED')
        expect(dashboardFailed[5].html).toContain(dashboardFailedRetryUrl)
        expect(dashboardFailed[5].html).toContain('Remove')

        const dashboardExpired = result.tableData.rows[10]
        const dashboardExpiredUrl = 'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-3/request?'
        expect(dashboardExpired[1].html).toContain(dashboardExpiredUrl)
        expect(dashboardExpired[5].html).toContain('EXPIRED')
        expect(dashboardExpired[5].html).toContain(dashboardExpiredUrl)
        expect(dashboardExpired[5].html).toContain('Remove')
      })
    })

    describe('Viewed Reports', () => {
      beforeEach(() => {
        recentlyViewedStoreService = {
          getAllReports: jest
            .fn()
            .mockResolvedValue([...mockStoreDataV1.mockViewedReports, ...mockStoreDataV2.mockViewedReports]),
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

        expect(result.tableData.rows.length).toEqual(5)
        expect(result.tableData.head.length).toEqual(6)
        expect(result.meta.length).toEqual(5)

        const v1Ready = result.tableData.rows[0]
        expect(v1Ready[1].html).toContain(
          'http://localhost:3010/async-reports/test-report-1/variantId-1/request/tblId_1721738244284/report',
        )
        expect(v1Ready[5].html).toContain('READY')

        const v1Expired = result.tableData.rows[1]
        const v1ExpiredRetryUrl =
          'http://localhost:3010/async-reports/test-report-2/variantId-2/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true'
        expect(v1Expired[1].html).toContain(v1ExpiredRetryUrl)
        expect(v1Expired[5].html).toContain('EXPIRED')
        expect(v1Expired[5].html).toContain(v1ExpiredRetryUrl)
        expect(v1Expired[5].html).toContain('Remove')

        const v2Ready = result.tableData.rows[3]
        expect(v2Ready[1].html).toContain(
          'http://localhost:3010/async/report/test-report-1/variantId-1/request/tblId_1721738244284/report',
        )
        expect(v1Ready[5].html).toContain('READY')

        const v2Expired = result.tableData.rows[4]
        const v2ExpiredRetryUrl =
          'http://localhost:3010/async/report/test-report-2/variantId-2/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true'
        expect(v2Expired[1].html).toContain(v2ExpiredRetryUrl)
        expect(v2Expired[5].html).toContain('EXPIRED')
        expect(v2Expired[5].html).toContain(v2ExpiredRetryUrl)
        expect(v2Expired[5].html).toContain('Remove')
      })
    })
  })
})

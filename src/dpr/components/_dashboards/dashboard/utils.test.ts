/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request } from 'express'
import { Url } from 'url'
import { Services } from '../../../types/Services'
import DashboardUtils from './utils'
import DashboardService from '../../../services/dashboardService'
import DashboardClient from '../../../data/dashboardClient'

import MockDashboardClient from '../../../../../test-app/mocks/mockClients/dashboards/mock-client'
import RecentlyViewedStoreService from '../../../services/recentlyViewedService'
import RequestedReportService from '../../../services/requestedReportService'
import MockDashboardRequestData from '../../../../../test-app/mocks/mockClients/store/mockRequestedDashboardData'
import ReportingService from '../../../services/reportingService'
import MockDefinitions from '../../../../../test-app/mocks/mockClients/reports/mockReportDefinition'
import BookmarkService from '../../../services/bookmarkService'
import { RequestedReport } from '../../../types/UserReports'
import { ChartCardData } from '../../../types/Charts'

jest.mock('parseurl', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({ pathname: 'pathname', search: 'search' }) as Url),
}))

describe('DashboardUtils', () => {
  let req: Request
  let res: Response

  describe('Async', () => {
    let dashboardClient: DashboardClient
    let dashboardService: DashboardService
    let services: Services
    let recentlyViewedService: RecentlyViewedStoreService
    let requestedReportService: RequestedReportService
    let reportingService: ReportingService
    let bookmarkService: BookmarkService
    let updateLastViewedSpy: jest.SpyInstance<Promise<void>, [id: string, userId: string], any>
    let setRecentlyViewedSpy: jest.SpyInstance<Promise<void>, [reportData: RequestedReport, userId: string], any>

    beforeEach(() => {
      dashboardClient = new MockDashboardClient() as unknown as DashboardClient
      dashboardService = new DashboardService(dashboardClient)

      recentlyViewedService = {
        setRecentlyViewed: jest.fn(),
      } as unknown as RecentlyViewedStoreService

      requestedReportService = {
        getReportByTableId: jest.fn().mockResolvedValue(MockDashboardRequestData.readyDashboard),
        updateLastViewed: jest.fn(),
      } as unknown as RequestedReportService

      reportingService = {
        getDefinitions: jest.fn().mockResolvedValue(MockDefinitions.reports),
      } as unknown as ReportingService

      bookmarkService = {
        isBookmarked: jest.fn().mockResolvedValue(true),
      } as unknown as BookmarkService

      setRecentlyViewedSpy = jest.spyOn(recentlyViewedService, 'setRecentlyViewed')
      updateLastViewedSpy = jest.spyOn(requestedReportService, 'updateLastViewed')

      req = {
        params: {
          reportId: 'test-report-1',
          id: 'test-dashboard-8',
        },
        query: {
          'filters.establishment_id': 'MDI',
        },
      } as unknown as Request

      res = {
        locals: {
          user: {
            token: 'ToK3n',
            uuid: 'Us3rId',
          },
        },
      } as unknown as Response

      services = {
        dashboardService,
        requestedReportService,
        recentlyViewedService,
        reportingService,
        bookmarkService,
      } as unknown as Services
    })

    describe('renderAsyncDashboard', () => {
      it('should return the data to render a dashboard', async () => {
        const result = await DashboardUtils.renderAsyncDashboard({
          req,
          res,
          services,
        })

        expect(result.dashboardData.name).toEqual('Test Dashboard')
        expect(result.dashboardData.description).toEqual('Dashboard used for testing testing')
        expect(result.dashboardData.sections.length).toEqual(7)

        expect(result.dashboardData.sections[0].title).toEqual('Section 1 - Ethnicity charts')
        expect(result.dashboardData.sections[1].title).toEqual('Section 2 - Nationality charts')
        expect(result.dashboardData.sections[2].title).toEqual('Section 3 - Religion charts')

        const chartData = result.dashboardData.sections[0].visualisations[0].data as ChartCardData
        expect(chartData.chart.type).toEqual('bar')
        expect(chartData.table.head.length).toEqual(3)
      })

      it('should mark the dashboard as recently viewed', async () => {
        await DashboardUtils.renderAsyncDashboard({
          req,
          res,
          services,
        })

        expect(updateLastViewedSpy).toHaveBeenCalledWith(MockDashboardRequestData.readyDashboard.executionId, 'Us3rId')
        expect(setRecentlyViewedSpy).toHaveBeenCalledWith(MockDashboardRequestData.readyDashboard, 'Us3rId', 'search')
      })
    })
  })
})

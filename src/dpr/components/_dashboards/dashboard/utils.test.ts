/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request } from 'express'
import { Url } from 'url'
import { Services } from '../../../types/Services'

// Clients
import MockDashboardClient from '../../../../../test-app/mocks/mockClients/dashboards/mock-client'
import DashboardClient from '../../../data/dashboardClient'

// Utils
import DashboardUtils from './utils'
import UserReportsUtils from '../../user-reports/utils'

// Services
import {
  BookmarkService,
  ReportingService,
  RequestedReportService,
  RecentlyViewedStoreService,
  DashboardService,
} from '../../../services'

// Mocks
import MockDashboardRequestData from '../../../../../test-app/mocks/mockClients/store/mockRequestedDashboardData'
import MockDefinitions from '../../../../../test-app/mocks/mockClients/reports/mockReportDefinition'
import { RequestedReport } from '../../../types/UserReports'
import { ChartCardData } from '../../../types/Charts'
import { FilterValue } from '../../_filters/types'

jest.mock('parseurl', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({ pathname: 'pathname', search: 'search' } as Url)),
}))

describe('DashboardUtils', () => {
  let req: Request
  let res: Response

  describe('renderAsyncDashboard', () => {
    let dashboardClient: DashboardClient
    let dashboardService: DashboardService
    let services: Services
    let recentlyViewedService: RecentlyViewedStoreService
    let requestedReportService: RequestedReportService
    let reportingService: ReportingService
    let bookmarkService: BookmarkService
    let updateLastViewedSpy: jest.SpyInstance<
      Promise<void>,
      [
        {
          req: Request
          services: Services
          reportStateData: RequestedReport
          userId: string
          search: string
          href: string
          filters: FilterValue[]
        },
      ],
      any
    >

    beforeEach(() => {
      jest.clearAllMocks()
      jest.spyOn(UserReportsUtils, 'updateLastViewed').mockResolvedValue(null)

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

      updateLastViewedSpy = jest.spyOn(UserReportsUtils, 'updateLastViewed').mockResolvedValue(null)

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

      expect(updateLastViewedSpy).toHaveBeenCalledTimes(1)
    })
  })
})

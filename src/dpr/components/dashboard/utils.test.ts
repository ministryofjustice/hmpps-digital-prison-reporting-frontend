/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Response, Request } from 'express'
import { ChartType, ChartUnit } from '../../types/Charts'
import { MetricsDataResponse, MetricsDefinition } from '../../types/Metrics'
import { Services } from '../../types/Services'
import DashboardUtils from './utils'
import { DashboardDefinition } from '../../types/Dashboards'
import DashboardService from '../../services/dashboardService'
import MetricsService from '../../services/metricsService'
import DashboardClient from '../../data/dashboardClient'

import MockDashboardClient from '../../../../test-app/mocks/mockClients/dashboards/mockDashboardClient'
import MockMetricClient from '../../../../test-app/mocks/mockClients/metrics/mockMetricClient'
import MetricsClient from '../../data/metricsClient'
import RecentlyViewedStoreService from '../../services/recentlyViewedService'
import RequestedReportService from '../../services/requestedReportService'
import MockDashboardRequestData from '../../../../test-app/mocks/mockClients/store/mockRequestedDashboardData'
import { RequestedReport } from '../../types/UserReports'
import ReportingService from '../../services/reportingService'
import MockDefinitions from '../../../../test-app/mocks/mockClients/reports/mockReportDefinition'
import BookmarkService from '../../services/bookmarkService'

describe('DashboardUtils', () => {
  let mockServices: Services
  let mockMetricsDataResponse: MetricsDataResponse
  let mockMetricDefinition: MetricsDefinition
  let mockDashboardDefinition: DashboardDefinition
  let req: Request
  let res: Response
  let next: NextFunction

  describe('Sync', () => {
    beforeEach(() => {
      mockDashboardDefinition = {
        id: 'test-dashboard-1',
        name: 'Test Dashboard 1',
        description: 'Test Dashboard 1 Description',
        metrics: [
          {
            id: 'test-metric-id-1',
          },
        ],
      }

      req = {
        params: {
          dashboardId: 'test-dashboard-1',
          dpdId: 'test-report-1',
        },
        body: {
          title: 'Test Dashboard 1',
          description: 'Test Dashboard 1 Description',
          metrics: JSON.stringify(mockDashboardDefinition.metrics),
        },
        query: {},
      } as unknown as Request

      res = {
        locals: {
          token: 'token',
        },
      } as unknown as Response

      next = ((error: Error) => {
        //
      }) as unknown as NextFunction

      mockMetricsDataResponse = {
        id: 'test-metric-id-1',
        data: [
          {
            establishment_id: 'KMI',
            missing_ethnicity_percentage: 25.09,
            present_ethnicity_percentage: 75.91,
            no_of_prisoners: 300,
            no_of_prisoners_without: 100,
            random_data: 20,
          },
          {
            establishment_id: 'LEI',
            missing_ethnicity_percentage: 47.09,
            present_ethnicity_percentage: 52.91,
            no_of_prisoners: 100,
            no_of_prisoners_without: 50,
            random_data: 50,
          },
        ],
        updated: 'string',
      }

      mockMetricDefinition = {
        id: 'test-metric-id-1',
        name: 'Missing Ethnicity By Establishment Metric',
        display: 'Missing Ethnicity By Establishment Metric',
        description: 'Missing Ethnicity By Establishment Metric',
        specification: [
          {
            name: 'establishment_id',
            display: 'Establishment ID',
            group: true,
          },
          {
            name: 'missing_ethnicity_percentage',
            display: '% Missing Ethnicity',
            chart: [ChartType.DONUT],
            unit: ChartUnit.PERCENTAGE,
          },
          {
            name: 'present_ethnicity_percentage',
            display: '% With Ethnicity',
            unit: ChartUnit.PERCENTAGE,
            chart: [ChartType.DONUT],
          },
          {
            name: 'no_of_prisoners',
            display: 'No. of Prisoners with ethnicity',
            chart: [ChartType.BAR],
          },
          {
            name: 'no_of_prisoners_without',
            display: 'No. of Prisoners without ethnicity',
            chart: [ChartType.BAR],
          },
          {
            name: 'random_data',
            display: 'Random Data ',
          },
        ],
      }

      mockServices = {
        dashboardService: {
          getDefinition: () => Promise.resolve(mockDashboardDefinition),
        },
        metricService: {
          getDefinition: () => Promise.resolve(mockMetricDefinition),
          getMetricData: () => Promise.resolve(mockMetricsDataResponse),
        },
      } as unknown as Services
    })

    describe('getDashboardData', () => {
      it('should get the dashboard data', async () => {
        const result = await DashboardUtils.getDashboardDataSync({
          res,
          req,
          next,
          services: mockServices,
        })

        const expectedResult = {
          definition: {
            id: 'test-dashboard-1',
            name: 'Test Dashboard 1',
            description: 'Test Dashboard 1 Description',
            metrics: [
              {
                id: 'test-metric-id-1',
              },
            ],
          },
          id: 'test-dashboard-1',
          dpdId: 'test-report-1',
          csrfToken: 'csrfToken',
        }

        expect(result).toEqual(expectedResult)
      })
    })

    describe('requestDashboardData', () => {
      it('should request the dashboard data', async () => {
        const result = await DashboardUtils.requestDashboardDataSync({
          res,
          req,
          next,
          services: mockServices,
        })

        const expectedResult = {
          title: 'Test Dashboard 1',
          description: 'Test Dashboard 1 Description',
          metrics: [
            {
              id: 'test-metric-id-1',
              title: 'Missing Ethnicity By Establishment Metric',
              description: 'Missing Ethnicity By Establishment Metric',
              data: {
                chart: [
                  {
                    type: 'bar',
                    data: {
                      labels: ['No. of Prisoners with ethnicity', 'No. of Prisoners without ethnicity'],
                      datasets: [
                        {
                          label: 'KMI',
                          data: [300, 100],
                          total: 400,
                        },
                        {
                          label: 'LEI',
                          data: [100, 50],
                          total: 150,
                        },
                      ],
                    },
                  },
                  {
                    type: 'doughnut',
                    unit: 'percentage',
                    data: {
                      labels: ['% Missing Ethnicity', '% With Ethnicity'],
                      datasets: [
                        {
                          label: 'KMI',
                          data: [25.09, 75.91],
                          total: 101,
                        },
                        {
                          label: 'LEI',
                          data: [47.09, 52.91],
                          total: 100,
                        },
                      ],
                    },
                  },
                ],
                table: {
                  head: [
                    {
                      text: 'Establishment ID',
                    },
                    {
                      text: '% Missing Ethnicity',
                    },
                    {
                      text: '% With Ethnicity',
                    },
                    {
                      text: 'No. of Prisoners with ethnicity',
                    },
                    {
                      text: 'No. of Prisoners without ethnicity',
                    },
                    {
                      text: 'Random Data ',
                    },
                  ],
                  rows: [
                    [
                      {
                        text: 'KMI',
                      },
                      {
                        text: '25.09%',
                      },
                      {
                        text: '75.91%',
                      },
                      {
                        text: '300',
                      },
                      {
                        text: '100',
                      },
                      {
                        text: '20',
                      },
                    ],
                    [
                      {
                        text: 'LEI',
                      },
                      {
                        text: '47.09%',
                      },
                      {
                        text: '52.91%',
                      },
                      {
                        text: '100',
                      },
                      {
                        text: '50',
                      },
                      {
                        text: '50',
                      },
                    ],
                  ],
                },
              },
            },
          ],
        }

        expect(result).toEqual(expectedResult)
      })
    })
  })

  describe('Async', () => {
    let dashboardClient: DashboardClient
    let metricsClient: MetricsClient
    let dashboardService: DashboardService
    let metricService: MetricsService
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

      metricsClient = new MockMetricClient() as unknown as MetricsClient
      metricService = new MetricsService(metricsClient)

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
          reportId: 'test-report-3',
          id: 'test-dashboard-8',
        },
        query: {},
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
        metricService,
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

        expect(result.dashboardData.name).toEqual('Test Dashboard 8')
        expect(result.dashboardData.description).toEqual('Async Dashboard Testing')
        expect(result.dashboardData.metrics.length).toEqual(3)
        expect(result.dashboardData.metrics.length).toEqual(3)

        expect(result.dashboardData.metrics[0].data.chart.length).toEqual(2)
        expect(result.dashboardData.metrics[0].data.table.head.length).toEqual(6)
        expect(result.dashboardData.metrics[0].title).toEqual('Missing Ethnicity By Establishment Metric')

        expect(result.dashboardData.metrics[1].data.chart.length).toEqual(1)
        expect(result.dashboardData.metrics[1].data.table.head.length).toEqual(3)
        expect(result.dashboardData.metrics[1].title).toEqual('Percentage Missing Ethnicity By Establishment Metric')

        expect(result.dashboardData.metrics[2].data.chart.length).toEqual(1)
        expect(result.dashboardData.metrics[2].data.table.head.length).toEqual(3)
        expect(result.dashboardData.metrics[2].title).toEqual('Missing Ethnicity By Establishment')
      })

      it('should mark the dashboard as recently viewed', async () => {
        await DashboardUtils.renderAsyncDashboard({
          req,
          res,
          services,
        })

        expect(updateLastViewedSpy).toHaveBeenCalledWith(MockDashboardRequestData.readyDashboard.executionId, 'Us3rId')
        expect(setRecentlyViewedSpy).toHaveBeenCalledWith(MockDashboardRequestData.readyDashboard, 'Us3rId')
      })
    })
  })
})

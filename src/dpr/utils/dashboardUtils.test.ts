import { NextFunction, Response, Request } from 'express'
import { ChartType, ChartUnit } from '../types/Charts'
import { MetricsDataResponse, MetricsDefinition } from '../types/Metrics'
import { Services } from '../types/Services'
import DashboardUtils from './dashboardUtils'
import { DashboardDefinition } from '../types/Dashboards'

describe('DashboardUtils', () => {
  let mockServices: Services
  let mockMetricsDataResponse: MetricsDataResponse
  let mockMetricDefinition: MetricsDefinition
  let mockDashboardDefinition: DashboardDefinition
  let req: Request
  let res: Response
  let next: NextFunction

  beforeEach(() => {
    mockDashboardDefinition = {
      id: 'test-dashboard-1',
      name: 'Test Dashboard 1',
      description: 'Test Dashboard 1 Description',
      metrics: [
        {
          id: 'test-metric-id-1',
          visualisationType: [ChartType.BAR, ChartType.DONUT],
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
        { status: 'Without', percent: 33 },
        { status: 'Older than 2 years', percent: 27 },
        { status: 'Under 2 years', percent: 40 },
      ],
      updated: 'ts',
    }

    mockMetricDefinition = {
      id: 'test-metric-id-1',
      name: 'testMetricId1',
      display: 'Prisoner Images by Status Percentage',
      description: 'Prisoner Images by Status Percentage',
      visualisationType: [ChartType.BAR, ChartType.DONUT],
      specification: [
        {
          name: 'status',
          display: 'Status',
        },
        {
          name: 'percent',
          display: 'Percent',
          unit: ChartUnit.PERCENTAGE,
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
      const result = await DashboardUtils.getDashboardData({
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
              visualisationType: ['bar', 'doughnut'],
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
      const result = await DashboardUtils.requestDashboardData({
        res,
        req,
        next,
        services: mockServices,
      })

      const expectedResult = {
        title: 'Test Dashboard 1',
        description: 'Test Dashboard 1 Description',
        data: [
          {
            id: 'test-metric-id-1',
            title: 'Prisoner Images by Status Percentage',
            description: 'Prisoner Images by Status Percentage',
            type: ['bar', 'doughnut'],
            unit: 'percentage',
            data: {
              chart: {
                labels: ['Without', 'Older than 2 years', 'Under 2 years'],
                datasets: [
                  {
                    label: 'Percent',
                    data: [33, 27, 40],
                    total: 100,
                  },
                ],
              },
              table: {
                head: [{ text: 'Status' }, { text: 'Percent' }],
                rows: [
                  [{ text: 'Without' }, { text: '33%' }],
                  [{ text: 'Older than 2 years' }, { text: '27%' }],
                  [{ text: 'Under 2 years' }, { text: '40%' }],
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

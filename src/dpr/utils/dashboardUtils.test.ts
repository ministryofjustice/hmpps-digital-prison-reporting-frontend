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

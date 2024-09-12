import { NextFunction, Response, Request } from 'express'
import { ChartType, ChartUnit } from '../types/Charts'
import { MetricsDataResponse, MetricsDefinition } from '../types/Metrics'
import { Services } from '../types/Services'
import MetricsUtils from './metricsUtils'

describe('MetricsUtils', () => {
  let mockServices: Services
  let mockMetricsDataResponse: MetricsDataResponse
  let mockMetricDefinition: MetricsDefinition
  let req: Request
  let res: Response
  let next: NextFunction

  beforeEach(() => {
    req = {
      params: {
        dpdId: 'dpd-id',
      },
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
      metricService: {
        getDefinition: () => Promise.resolve(mockMetricDefinition),
        getMetricData: () => Promise.resolve(mockMetricsDataResponse),
      },
    } as unknown as Services
  })

  describe('getMetricData', () => {
    it('shouldget the metric data', async () => {
      const result = await MetricsUtils.getMetricData({
        id: 'test-metric-id-1',
        type: [ChartType.BAR, ChartType.DONUT],
        res,
        req,
        next,
        services: mockServices,
      })

      expect(result).toEqual({
        definition: mockMetricDefinition,
        metric: mockMetricsDataResponse,
      })
    })
  })
})

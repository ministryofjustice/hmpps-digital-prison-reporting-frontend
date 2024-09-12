import MetricsService from './metricsService'
import MetricsClient from '../data/metricsClient'
import { MetricsDataResponse, MetricsDefinition } from '../types/Metrics'
import { ChartType, ChartUnit } from '../types/Charts'

jest.mock('../data/metricsClient')

describe('MetricsService', () => {
  let metricsClient: jest.Mocked<MetricsClient>
  let metricsService: MetricsService

  beforeEach(() => {
    metricsClient = new MetricsClient(null) as jest.Mocked<MetricsClient>
    metricsService = new MetricsService(metricsClient)
  })

  describe('getMetricData', () => {
    it('Retrieves a definition from client', async () => {
      const expectedResponse: MetricsDataResponse = {
        id: 'test-metric-id-1',
        data: [
          { status: 'Without', percent: 33 },
          { status: 'Older than 2 years', percent: 27 },
          { status: 'Under 2 years', percent: 40 },
        ],
        updated: 'ts',
      }

      metricsClient.getMetricData.mockResolvedValue(expectedResponse)

      const result = await metricsService.getMetricData('token', 'test-metric-id-1', 'dpd-id')

      expect(result).toEqual(expectedResponse)
    })
  })

  describe('getDefinition', () => {
    it('Retrieves a definition from client', async () => {
      const expectedResponse: MetricsDefinition = {
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

      metricsClient.getDefinition.mockResolvedValue(expectedResponse)

      const result = await metricsService.getDefinition('token', 'test-metric-id-1', 'dpd-id')

      expect(result).toEqual(expectedResponse)
    })
  })

  describe('getDefinitions', () => {
    it('Retrieves definitions from client', async () => {
      const expectedResponse: Array<MetricsDefinition> = [
        {
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
        },
      ]
      metricsClient.getDefinitions.mockResolvedValue(expectedResponse)

      const result = await metricsService.getDefinitions(null)

      expect(result).toEqual(expectedResponse)
    })
  })
})

import { ChartType, ChartUnit } from '../../types/Charts'
import { MetricsDataResponse, MetricsDefinition } from '../../types/Metrics'
import ChartCardUtils from './utils'

describe('ChartCard Utils', () => {
  let mockMetricsDataResponse: MetricsDataResponse
  let mockMetricDefinition: MetricsDefinition

  beforeEach(() => {
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
  })

  describe('getChartData', () => {
    it('should get the chart data', async () => {
      const expectedResult = {
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
      }
      const result = ChartCardUtils.getChartData({
        definition: mockMetricDefinition,
        metric: mockMetricsDataResponse,
      })
      expect(result).toEqual(expectedResult)
    })
  })
})

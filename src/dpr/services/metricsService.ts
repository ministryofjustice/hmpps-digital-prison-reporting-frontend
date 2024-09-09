import { ChartCardData } from '../types/Charts'

export default class MetricService {
  constructor(private readonly mockChartsApiData: ChartCardData[]) {
    // TODO: init MetricClient? needs creating. Or use existing ReportingClient
  }

  /**
   * Mock placeholder function for metric API
   * - get metric data
   * // TODO: implement properly once API is ready
   * @param {string} metricId
   * @param {ChartCardData[]} mockChartsApiData
   * @return {*}
   * @memberof MetricService
   */
  async getMetric(token: string, metricId: string) {
    // TODO: implement MetricClient
    const mockResultFromMetricClient = Promise.resolve(
      this.mockChartsApiData.find((chart: ChartCardData) => chart.id === metricId),
    )
    return mockResultFromMetricClient
  }
}

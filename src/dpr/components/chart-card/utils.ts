/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChartCardData } from '../../types/Charts'

export default {
  /**
   * Mock implementation of how data might be fetched and transformed
   *
   * @param {string} metricId
   * @param {ChartCardData[]} mockChartsApiData -temporary, will come from an API
   * @return {*}  {ChartCardData}
   */
  getChartData: async (metricId: string, mockMetricsService: any): Promise<ChartCardData> => {
    // TODO: get data from metrics API -
    const dataFromMetricsApi = await mockMetricsService.getMetricData(metricId)

    // TODO: convert data from the metric Api to ChartCardData
    const convertedChartData: ChartCardData = dataFromMetricsApi

    return convertedChartData
  },
}

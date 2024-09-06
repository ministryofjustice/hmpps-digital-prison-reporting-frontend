import { ChartCardData } from '../../types/Charts'

export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getChartData: (metricDataFromAPI: any): ChartCardData => {
    // TODO: convert data from the matric Api to ChartCardData
    const convertedChartData: ChartCardData = metricDataFromAPI
    return convertedChartData
  },
}

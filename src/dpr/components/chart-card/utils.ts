import { ChartCardData } from '../../types/Charts'

export default {
  getChartData: (metricDataFromAPI: any): ChartCardData => {
    // TODO: convert data from the matric Api to ChartCardData
    const convertedChartData: ChartCardData = metricDataFromAPI
    return convertedChartData
  },
}

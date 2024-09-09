/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncReportUtilsParams } from '../../types/AsyncReportUtils'
import { ChartCardData } from '../../types/Charts'

export default {
  getChartData: async ({
    res,
    services,
    next,
    id,
  }: AsyncReportUtilsParams & { id: string }): Promise<ChartCardData> => {
    try {
      const token = res.locals.user?.token ? res.locals.user.token : 'token'
      const metricData = await services.metricService.getMetricData(token, id)

      // TODO: convert data from the metric Api to ChartCardData herr
      // Currently returning data in its desired form
      const convertedChartData: ChartCardData = metricData

      return convertedChartData
    } catch (error) {
      next(error)
      return {} as unknown as ChartCardData
    }
  },
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncReportUtilsParams } from '../../types/AsyncReportUtils'
import { ChartCardData } from '../../types/Charts'

export default {
  /**
   * Mock implementation of how data might be fetched and transformed
   *
   * @param {(AsyncReportUtilsParams & { id: string })} {
   *     res,
   *     services,
   *     next,
   *     id,
   *   }
   * @return {*}  {Promise<ChartCardData>}
   */
  getChartData: async ({
    res,
    services,
    next,
    id,
  }: AsyncReportUtilsParams & { id: string }): Promise<ChartCardData> => {
    try {
      const token = res.locals.user?.token ? res.locals.user.token : 'token'
      const metricData = await services.metricService.getMetric(token, id)

      // TODO: convert data from the metric Api to ChartCardData
      const convertedChartData: ChartCardData = metricData

      return convertedChartData
    } catch (error) {
      next(error)
      return {} as unknown as ChartCardData
    }
  },
}

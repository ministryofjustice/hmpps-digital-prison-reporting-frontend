import { AsyncReportUtilsParams } from '../types/AsyncReportUtils'
import { ChartType } from '../types/Charts'
import { MetricsDataResponse, MetricsDefinition } from '../types/Metrics'

export default {
  getMetricData: async ({
    id,
    type,
    req,
    res,
    services,
    next,
  }: { id: string; type: ChartType[] } & AsyncReportUtilsParams): Promise<{
    definition: MetricsDefinition
    metric: MetricsDataResponse
  }> => {
    const token = res.locals.user?.token ? res.locals.user.token : 'token'
    const { dataProductDefinitionsPath, dpdId } = req.params

    const definition = await services.metricService.getDefinition(token, id, dpdId, dataProductDefinitionsPath)
    if (type) definition.visualisationType = type

    const metric = await services.metricService.getMetricData(token, id, dpdId)

    return {
      definition,
      metric,
    }
  },
}

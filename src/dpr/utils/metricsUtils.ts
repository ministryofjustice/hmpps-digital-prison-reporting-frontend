import { AsyncReportUtilsParams } from '../types/AsyncReportUtils'
import { MoJTableHead, MoJTableRow, MoJTable, ChartType } from '../types/Charts'
import { MetricsDataResponse, MetricsDefinition } from '../types/Metrics'

const convertToTable = (definition: MetricsDefinition, metric: MetricsDataResponse) => {
  const { specification } = definition
  const head: MoJTableHead[] = []

  Object.entries(metric.data[0]).forEach((key) => {
    const name = `${key[0]}`
    const spec = specification.find((s) => s.name === name)
    head.push({ text: spec ? spec.display : name })
  })

  const rows: MoJTableRow[][] = []
  metric.data.forEach((item: any) => {
    const row: MoJTableRow[] = []

    Object.entries(item).forEach((v) => {
      row.push({ text: `${v[1]}` })
    })
    rows.push(row)
  })

  return {
    head,
    rows,
  }
}

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
    table: MoJTable
  }> => {
    const token = res.locals.user?.token ? res.locals.user.token : 'token'
    const { dataProductDefinitionsPath } = req.params

    const definition = await services.metricService.getDefinition(token, id, dataProductDefinitionsPath)
    if (type) definition.visualisationType = type

    const metric = await services.metricService.getMetricData(token, id)
    const table = convertToTable(definition, metric)

    return {
      definition,
      table,
    }
  },
}

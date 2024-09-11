import { ChartCardData, ChartUnit, MoJTableHead, MoJTableRow, ChartDataset } from '../../types/Charts'
import { MetricsDataResponse, MetricsDefinition, MetricsDefinitionSpecification } from '../../types/Metrics'

export default {
  getChartData: ({
    definition,
    metric,
  }: {
    definition: MetricsDefinition
    metric: MetricsDataResponse
  }): ChartCardData => {
    const { id, display: title, description, visualisationType: type, specification } = definition
    const unit = specification[1].unit ? specification[1].unit : ChartUnit.NUMBER

    const labels = createLabels(metric)
    const datasets = createDatasets(metric, definition)
    const table = createTable(metric, definition, unit)

    const chartCardData = {
      id,
      title,
      description,
      type,
      unit,
      data: {
        chart: {
          labels,
          datasets,
        },
        table,
      },
    }

    return chartCardData
  },
}

const createLabels = (metric: MetricsDataResponse) => {
  return metric.data.map((d) => {
    return `${Object.values(d)[0]}`
  })
}

const createDatasets = (metric: MetricsDataResponse, definition: MetricsDefinition) => {
  const specification: MetricsDefinitionSpecification[] = JSON.parse(JSON.stringify(definition.specification))
  specification.shift()

  const datasets: ChartDataset[] = []
  specification.forEach((spec) => {
    const label = spec.display
    const data = metric.data.map((m) => {
      return m[spec.name] as number
    })
    datasets.push({
      label,
      data,
      total: data.reduce((acc: number, val: number) => acc + val, 0),
    })
  })

  return datasets
}

const createTable = (metric: MetricsDataResponse, definition: MetricsDefinition, unit: ChartUnit) => {
  const { specification } = definition
  const head: MoJTableHead[] = []
  const suffix = setSuffix(unit)

  Object.entries(metric.data[0]).forEach((key) => {
    const name = `${key[0]}`
    const spec = specification.find((s) => s.name === name)
    const text = spec ? spec.display : name
    head.push({ text })
  })

  const rows: MoJTableRow[][] = []

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metric.data.forEach((item: any) => {
    const row: MoJTableRow[] = []

    Object.entries(item).forEach((v) => {
      const value = typeof v[1] === 'number' ? `${v[1]}${suffix}` : `${v[1]}`
      row.push({ text: value })
    })
    rows.push(row)
  })

  return {
    head,
    rows,
  }
}

const setSuffix = (unit: ChartUnit) => {
  switch (unit) {
    case ChartUnit.PERCENTAGE:
      return '%'
    default:
      return ''
  }
}

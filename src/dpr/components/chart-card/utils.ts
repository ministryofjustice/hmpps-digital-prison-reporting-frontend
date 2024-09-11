import { ChartCardData, ChartUnit, MoJTableHead, MoJTableRow, ChartDataset } from '../../types/Charts'
import { MetricsDataResponse, MetricsDefinition } from '../../types/Metrics'

export default {
  getChartData: ({
    definition,
    metric,
  }: {
    definition: MetricsDefinition
    metric: MetricsDataResponse
  }): ChartCardData => {
    const { id, name: title, description, visualisationType: type, specification } = definition
    const unit = specification[1].unit ? specification[1].unit : ChartUnit.NUMBER

    const labels = createLabelsFromMetric(metric)
    const datasets = createDatasetsFromMetric(metric, definition)
    const table = createTableFromMetric(metric, definition, unit)

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

const createLabelsFromMetric = (metric: MetricsDataResponse) => {
  return metric.data.map((d) => {
    return `${Object.values(d)[0]}`
  })
}

const createDatasetsFromMetric = (metric: MetricsDataResponse, definition: MetricsDefinition) => {
  const { specification } = definition
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

const createTableFromMetric = (metric: MetricsDataResponse, definition: MetricsDefinition, unit: ChartUnit) => {
  const { specification } = definition
  const head: MoJTableHead[] = []
  const suffix = setSuffix(unit)

  Object.entries(metric.data[0]).forEach((key) => {
    const name = `${key[0]}`
    const spec = specification.find((s) => s.name === name)
    head.push({ text: spec ? spec.display : name })
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

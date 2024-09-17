import {
  ChartCardData,
  ChartUnit,
  MoJTableHead,
  MoJTableRow,
  ChartDataset,
  ChartType,
  ChartData,
  ChartCardValue,
  ChartsData,
  ChartValue,
  ChartGroup,
} from '../../types/Charts'
import { MetricsDataResponse, MetricsDefinition, MetricsDefinitionSpecification } from '../../types/Metrics'

export default {
  getChartData: ({
    definition,
    metric,
  }: {
    definition: MetricsDefinition
    metric: MetricsDataResponse
  }): ChartCardData => {
    const { id, display: title, description, specification } = definition
    const values = getValues(specification, metric)
    const chartsValues = getChartsData(values)
    const chartsData = chartsValues.map((value: ChartsData) => {
      return createVisualisationData(value)
    })

    return {
      id,
      title,
      description,
      data: {
        chart: chartsData,
        table: createTable(values),
      },
    }
  },
}

const getChartsData = (values: ChartValue[]) => {
  const availableChartTypes = [ChartType.BAR, ChartType.DONUT, ChartType.LINE]

  const chartsValues: ChartsData[] = []
  availableChartTypes.forEach((chartType: ChartType) => {
    const chartData = {
      type: chartType,
      datasets: [] as { data: ChartCardValue[]; group: ChartGroup }[],
    }

    values.forEach((value: ChartValue) => {
      const chartValues = value.data.filter((valueData: ChartCardValue) => {
        return valueData.chart?.includes(chartType)
      })
      if (chartValues.length) chartData.datasets.push({ data: chartValues, group: value.group })
    })

    if (chartData.datasets.length) chartsValues.push(chartData)
  })

  return chartsValues
}

const getValues = (specification: MetricsDefinitionSpecification[], metric: MetricsDataResponse): ChartValue[] => {
  return metric.data.map((d) => {
    const groupArray: ChartCardValue[] = []
    let groupValue = ''
    let groupName = ''

    Object.entries(d).forEach((attr) => {
      const specificationData = specification.find((spec: MetricsDefinitionSpecification) => {
        return spec.name === attr[0]
      })
      if (specificationData.group) {
        groupName = specificationData.display
        groupValue = `${attr[1]}`
      } else {
        groupArray.push({
          ...specificationData,
          value: attr[1],
        })
      }
    })

    return {
      ...(groupName.length && { group: { name: groupName, value: groupValue } }),
      data: groupArray,
    }
  })
}

const createVisualisationData = (value: ChartsData): ChartData => {
  const labels: string[] = value.datasets[0].data.map((d: ChartCardValue) => {
    return d.display
  })

  let unit
  const datasets: ChartDataset[] = value.datasets.map((d) => {
    const data = d.data.map((v) => +v.value)
    unit = d.data[0].unit
    const label = d.group ? d.group.value : ''
    return {
      label,
      data,
      total: data.reduce((acc: number, val: number) => acc + val, 0),
    }
  })

  const visData: ChartData = {
    type: value.type,
    unit,
    data: {
      labels,
      datasets,
    },
  }

  return visData
}

const createTable = (values: ChartValue[]) => {
  const head: MoJTableHead[] = []
  const rows: MoJTableRow[][] = []

  // Head
  if (values[0].group) {
    head.push({ text: values[0].group.name })
  }
  values[0].data.forEach((v) => {
    head.push({ text: v.display })
  })

  // Rows
  values.forEach((v) => {
    const row: MoJTableRow[] = []
    if (v.group) {
      row.push({ text: v.group.value })
    }
    v.data.forEach((d) => {
      const suffix = setSuffix(d.unit)
      row.push({ text: `${d.value}${suffix}` })
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

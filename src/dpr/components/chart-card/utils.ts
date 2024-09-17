import {
  ChartCardData,
  ChartUnit,
  MoJTableHead,
  MoJTableRow,
  ChartDataset,
  ChartType,
  ChartData,
  ChartDataValues,
} from '../../types/Charts'
import { MetricsDataResponse, MetricsDefinition, MetricsDefinitionSpecification } from '../../types/Metrics'

interface ChartValue {
  value: string | number
  name: string
  display: string
  unit?: ChartUnit
  chart?: ChartType[]
}

interface ChartValueS {
  group?: ChartGroup
  data: ChartValue[]
}

interface ChartGroup {
  name: string
  value: string
}

interface ChartsData {
  type: ChartType
  datasets: { data: ChartValue[]; group: ChartGroup }[]
}

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

const getChartsData = (values: ChartValueS[]) => {
  const availableChartTypes = [ChartType.BAR, ChartType.DONUT, ChartType.LINE]

  const chartsValues: { type: ChartType; datasets: { data: ChartValue[]; group: ChartGroup }[] }[] = []
  availableChartTypes.forEach((chartType: ChartType) => {
    const chartData = {
      type: chartType,
      datasets: [] as { data: ChartValue[]; group: ChartGroup }[],
    }

    values.forEach((value: ChartValueS) => {
      const chartValues = value.data.filter((valueData: ChartValue) => {
        return valueData.chart?.includes(chartType)
      })
      if (chartValues.length) chartData.datasets.push({ data: chartValues, group: value.group })
    })

    if (chartData.datasets.length) chartsValues.push(chartData)
  })

  return chartsValues
}

const getValues = (specification: MetricsDefinitionSpecification[], metric: MetricsDataResponse): ChartValueS[] => {
  return metric.data.map((d) => {
    const groupArray: ChartValue[] = []
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
  const labels: string[] = value.datasets[0].data.map((d: ChartValue) => {
    return d.display
  })

  let unit
  const datasets: ChartDataset[] = value.datasets.map((d: any) => {
    const data = d.data.map((v: any) => v.value)
    unit = d.data[0].unit
    return {
      label: d.group.value,
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

const createTable = (values: ChartValueS[]) => {
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

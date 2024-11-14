import { MoJTableHead, MoJTableRow, ChartData } from '../../types/Charts'
import { DashboardDefinition, DashboardMetricDefinition } from '../../types/Dashboards'
import { MetricsDataResponse } from '../../types/Metrics'

export default {
  getChartData: ({
    dashboardDefinition,
    dashboardMetricsData,
  }: {
    dashboardDefinition: DashboardDefinition
    dashboardMetricsData: MetricsDataResponse[]
  }) => {
    return dashboardDefinition.metrics.flatMap((definition: DashboardMetricDefinition) => {
      const { name: title, description, id: metricId } = definition
      const chart: ChartData[] = createChartData(definition, dashboardMetricsData)
      const table = createTable(definition, dashboardMetricsData)

      return {
        id: metricId,
        title,
        description,
        data: {
          chart,
          table,
        },
      }
    })
  },
}

const createChartData = (definition: DashboardMetricDefinition, dashboardMetricsData: MetricsDataResponse[]) => {
  return definition.charts.map((cd) => {
    const labels = cd.columns.map((col) => col.display)

    const datasets = dashboardMetricsData.map((row) => {
      const label = <string>row[cd.label.name as keyof MetricsDataResponse]
      const data = cd.columns.map((c) => +row[c.name as keyof MetricsDataResponse])
      const total = data.reduce((acc: number, val: number) => acc + val, 0)

      return {
        label,
        data,
        total,
      }
    })

    return {
      type: cd.type,
      unit: cd.unit,
      data: {
        labels,
        datasets,
      },
    }
  })
}

const createTable = (definition: DashboardMetricDefinition, dashboardMetricsData: MetricsDataResponse[]) => {
  const allColumns = definition.charts.flatMap((chartDefinition) => {
    return chartDefinition.columns.map((column) => column)
  })
  allColumns.unshift(definition.charts[0].label)

  const head: MoJTableHead[] = allColumns.map((column) => {
    return { text: column.display }
  })

  const rows: MoJTableRow[][] = dashboardMetricsData.map((row) => {
    return allColumns.map((col) => {
      return { text: <string>row[col.name as keyof MetricsDataResponse] }
    })
  })

  return {
    head,
    rows,
  }
}

import { MoJTableHead, MoJTableRow, ChartData, MoJTable, ChartDataset } from '../../../types/Charts'
import { DashboardChartDefinition, DashboardDefinition, DashboardMetricDefinition } from '../../../types/Dashboards'
import { MetricsDataResponse } from '../../../types/Metrics'

const getSnapshotCharts = (responseData: MetricsDataResponse[][], def: DashboardMetricDefinition) => {
  const data = responseData[responseData.length - 1]
  const chart = createSnapshotChartData(def, data)
  const table = createSnapshotTable(def, data)

  return {
    chart,
    table,
  }
}

const getTimeseriesChart = (responseData: MetricsDataResponse[][], def: DashboardMetricDefinition) => {
  const chart: ChartData[] = createTimeseriesChartData(def, responseData)
  // console.log(JSON.stringify(chart, null, 2))
  return {
    chart,
    table: {
      head: [],
      rows: [],
    } as MoJTable,
  }
}

export default {
  getChartData: ({
    dashboardDefinition,
    dashboardMetricsData,
  }: {
    dashboardDefinition: DashboardDefinition
    dashboardMetricsData: MetricsDataResponse[][]
  }) => {
    return dashboardDefinition.metrics.flatMap((definition: DashboardMetricDefinition) => {
      const { name: title, description, id: metricId, timeseries } = definition

      let chart: ChartData[] = []
      let table

      if (!timeseries) {
        ;({ chart, table } = getSnapshotCharts(dashboardMetricsData, definition))
      } else {
        ;({ chart, table } = getTimeseriesChart(dashboardMetricsData, definition))
      }

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

const createTimeseriesChartData = (
  definition: DashboardMetricDefinition,
  dashboardMetricsData: MetricsDataResponse[][],
): ChartData[] => {
  const chartData: ChartData[] = definition.charts.map((cd: DashboardChartDefinition) => {
    // get the timestamps as labels
    const labels = dashboardMetricsData.map((d: MetricsDataResponse[]) => d[0].timestamp as unknown as string)
    const datasetCount = dashboardMetricsData[0].length

    const datasets: ChartDataset[] = []
    for (let index = 0; index < datasetCount; index += 1) {
      const data = dashboardMetricsData.map((timeperiod) => {
        return +timeperiod[index][cd.columns[0].name].raw
      })
      const total = data.reduce((a, c) => a + c, 0)
      const label = dashboardMetricsData[0][index][cd.label.name].raw as string

      datasets.push({
        data,
        label,
        total,
      })
    }

    return {
      type: cd.type,
      unit: cd.unit,
      data: {
        labels,
        datasets,
      },
    }
  })

  return chartData
}

const createSnapshotChartData = (
  definition: DashboardMetricDefinition,
  dashboardMetricsData: MetricsDataResponse[],
): ChartData[] => {
  return definition.charts.map((cd: DashboardChartDefinition) => {
    const labels = cd.columns.map((col) => col.display)

    const datasets = dashboardMetricsData.map((row) => {
      const label = <string>row[cd.label.name as keyof MetricsDataResponse].raw
      const data = cd.columns.map((c) => +row[c.name as keyof MetricsDataResponse].raw)
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

const createSnapshotTable = (
  definition: DashboardMetricDefinition,
  dashboardMetricsData: MetricsDataResponse[],
): MoJTable => {
  const allColumns = definition.charts.flatMap((chartDefinition) => {
    return chartDefinition.columns.map((column) => column)
  })
  const uniqueColumns = allColumns.filter(
    (value, index, self) => index === self.findIndex((t) => t.name === value.name),
  )

  uniqueColumns.unshift(definition.charts[0].label)

  const head: MoJTableHead[] = uniqueColumns.map((column) => {
    return { text: column.display }
  })

  const rows: MoJTableRow[][] = dashboardMetricsData.map((row) => {
    return uniqueColumns.map((col) => {
      return { text: <string>row[col.name as keyof MetricsDataResponse].raw }
    })
  })

  return {
    head,
    rows,
  }
}

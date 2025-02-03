import { MoJTableHead, MoJTableRow, ChartData, MoJTable, ChartDataset } from '../../types/Charts'
import { DashboardChartDefinition } from '../../types/Dashboards'
import { MetricsDataResponse } from '../../types/Metrics'

const getSnapshotCharts = (responseData: MetricsDataResponse[][], def: DashboardChartDefinition[]) => {
  const data = responseData[responseData.length - 1]
  const chart: ChartData[] = createSnapshotChartData(def, data)
  const table: MoJTable = createSnapshotTable(def, data)

  return {
    chart,
    table,
  }
}

const getTimeseriesChart = (responseData: MetricsDataResponse[][], def: DashboardChartDefinition[]) => {
  const chart: ChartData[] = createTimeseriesChartData(def, responseData)
  const table: MoJTable = createTimeseriesTable(def, responseData)
  // console.log(JSON.stringify(table, null, 2))
  return {
    chart,
    table,
  }
}

export default {
  getChartData: ({
    chartDefinitions,
    dashboardMetricsData,
    timeseries,
  }: {
    chartDefinitions: DashboardChartDefinition[]
    dashboardMetricsData: MetricsDataResponse[][]
    timeseries?: boolean
  }) => {
    let chart: ChartData[] = []
    let table

    if (!timeseries) {
      ;({ chart, table } = getSnapshotCharts(dashboardMetricsData, chartDefinitions))
    } else {
      ;({ chart, table } = getTimeseriesChart(dashboardMetricsData, chartDefinitions))
    }

    return {
      chart,
      table,
    }
  },
}

const createTimeseriesChartData = (
  charts: DashboardChartDefinition[],
  dashboardMetricsData: MetricsDataResponse[][],
): ChartData[] => {
  const chartData: ChartData[] = charts.map((cd: DashboardChartDefinition) => {
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
      timeseries: true,
      data: {
        labels,
        datasets,
      },
    }
  })

  return chartData
}

const createSnapshotChartData = (
  charts: DashboardChartDefinition[],
  dashboardMetricsData: MetricsDataResponse[],
): ChartData[] => {
  return charts.map((cd: DashboardChartDefinition) => {
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

const createTimeseriesTable = (
  charts: DashboardChartDefinition[],
  dashboardMetricsData: MetricsDataResponse[][],
): MoJTable => {
  const allColumns = charts.flatMap((chartDefinition) => {
    return chartDefinition.columns.map((column) => column)
  })

  // Unique columns for timeseries should always only be length of 1
  const uniqueColumns = allColumns.filter(
    (value, index, self) => index === self.findIndex((t) => t.name === value.name),
  )

  const head: MoJTableHead[] = []
  head.push({
    text: 'Date',
  })

  // if there is more than one row
  if (dashboardMetricsData[0].length > 1) {
    // display the row group value as the column header
    dashboardMetricsData[0].forEach((row) => {
      head.push({
        text: <string>row[charts[0].label.name].raw,
      })
    })
  } else {
    uniqueColumns.forEach((col) => {
      head.push({
        text: col.display,
      })
    })
  }

  const tsData = dashboardMetricsData.map((timeperiodDataArr) => {
    return [
      {
        text: timeperiodDataArr[0].timestamp as unknown as string,
      },
      ...uniqueColumns.flatMap((col) => {
        return timeperiodDataArr.map((periodData) => {
          return { text: periodData[col.name as keyof MetricsDataResponse].raw }
        })
      }),
    ]
  })

  return {
    head,
    rows: tsData,
  } as MoJTable
}

const createSnapshotTable = (
  charts: DashboardChartDefinition[],
  dashboardMetricsData: MetricsDataResponse[],
): MoJTable => {
  const allColumns = charts.flatMap((chartDefinition) => {
    return chartDefinition.columns.map((column) => column)
  })
  const uniqueColumns = allColumns.filter(
    (value, index, self) => index === self.findIndex((t) => t.name === value.name),
  )

  uniqueColumns.unshift(charts[0].label)

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

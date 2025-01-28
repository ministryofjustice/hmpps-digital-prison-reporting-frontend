import { MoJTableHead, MoJTableRow, ChartData, MoJTable, ChartDataset, ChartUnit } from '../../../types/Charts'
import { MetricChart, MetricColumn, MetricDefinition, MetricsDataResponse } from '../../../types/Metrics'

const getSnapshotCharts = (responseData: MetricsDataResponse[][], def: MetricDefinition) => {
  const dataset = responseData[responseData.length - 1]

  const table: MoJTable = createSnapshotTable(def, dataset)
  const chart: ChartData[] = createSnapshotChartData(def, dataset)

  return {
    chart,
    table,
  }
}

const getTimeseriesChart = (responseData: MetricsDataResponse[][], def: MetricDefinition) => {
  const chart: ChartData[] = createTimeseriesChartData(def, responseData)
  const table: MoJTable = createTimeseriesTable(def, responseData)
  return {
    chart,
    table,
  }
}

export default {
  getChartData: ({
    metricsDefinition,
    dashboardData,
  }: {
    metricsDefinition: MetricDefinition[]
    dashboardData: MetricsDataResponse[][]
  }) => {
    return metricsDefinition.flatMap((definition: MetricDefinition) => {
      const { name: title, description, id: metricId, timeseries } = definition

      let chart: ChartData[] = []
      let table

      if (!timeseries) {
        ;({ chart, table } = getSnapshotCharts(dashboardData, definition))
      } else {
        ;({ chart, table } = getTimeseriesChart(dashboardData, definition))
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
  definition: MetricDefinition,
  dashboardMetricsData: MetricsDataResponse[][],
): ChartData[] => {
  const chartData: ChartData[] = definition.charts.map((cd: MetricChart) => {
    // get the timestamps as labels
    const labels = dashboardMetricsData.map((d: MetricsDataResponse[]) => d[0].timestamp as unknown as string)
    const datasetCount = dashboardMetricsData[0].length

    const datasets: ChartDataset[] = []
    let chartUnit: ChartUnit
    for (let index = 0; index < datasetCount; index += 1) {
      let unit: ChartUnit
      const data = dashboardMetricsData.map((timeperiod) => {
        unit = getColumn(definition.columns, cd.columns[0]).unit
        return +timeperiod[index][cd.columns[0]].raw
      })
      chartUnit = unit
      const total = data.reduce((a, c) => a + c, 0)
      const label = dashboardMetricsData[0][index][cd.label].raw as string

      datasets.push({
        data,
        label,
        total,
      })
    }

    return {
      type: cd.type,
      unit: chartUnit,
      timeseries: true,
      data: {
        labels,
        datasets,
      },
    }
  })

  return chartData
}

const getColumn = (colsDef: MetricColumn[], colName: string): MetricColumn => {
  return colsDef.find((defCol: MetricColumn) => {
    return defCol.name === colName
  })
}

const createSnapshotChartData = (
  definition: MetricDefinition,
  dashboardMetricsData: MetricsDataResponse[],
): ChartData[] => {
  const { columns } = definition
  return definition.charts.map((cd: MetricChart) => {
    let unit: ChartUnit
    const labels = cd.columns.map((col: string) => {
      const column: MetricColumn = getColumn(columns, col)
      unit = column.unit
      return column.display
    })

    const datasets = dashboardMetricsData.map((row) => {
      const labelCol = getColumn(columns, cd.label)
      const label = <string>row[labelCol.name as keyof MetricsDataResponse].raw
      const data = cd.columns.map((colId) => +row[colId as keyof MetricsDataResponse].raw)
      const total = data.reduce((acc: number, val: number) => acc + val, 0)

      return {
        label,
        data,
        total,
      }
    })

    return {
      type: cd.type,
      unit,
      data: {
        labels,
        datasets,
      },
    }
  })
}

const createTimeseriesTable = (
  definition: MetricDefinition,
  dashboardMetricsData: MetricsDataResponse[][],
): MoJTable => {
  const allColumns = definition.columns

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
        text: <string>row[definition.charts[0].label].raw,
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

const createSnapshotTable = (definition: MetricDefinition, dashboardMetricsData: MetricsDataResponse[]): MoJTable => {
  const allColumns = definition.columns
  const uniqueColumns = allColumns.filter(
    (value, index, self) => index === self.findIndex((t) => t.name === value.name),
  )

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

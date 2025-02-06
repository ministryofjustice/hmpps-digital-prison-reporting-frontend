import { ChartData, MoJTable, ChartCardData } from '../../types/Charts'
import { MetricsDataResponse } from '../../types/Metrics'
import { DashboardVisualisation, DashboardVisualisationType } from '../_dashboards/dashboard/types'
import DashboardSectionUtils from '../_dashboards/dashboard-section/utils'
import DashboardListUtils from '../_dashboards/dashboard-list/utils'

const createChart = (chartDefinition: DashboardVisualisation, rawData: MetricsDataResponse[][]): ChartCardData => {
  const timeseriesChartTypes = [DashboardVisualisationType.BAR_TIMESERIES, DashboardVisualisationType.LINE]
  const { type } = chartDefinition

  let table: MoJTable
  let chart: ChartData

  if (timeseriesChartTypes.includes(type)) {
    // chart = createTimeseriesChart(chartDefinition, rawData)
    // table = createTimeseriesTable(chartDefinition, rawData)
  } else {
    const data = rawData[rawData.length - 1]
    const dataSetRows = DashboardSectionUtils.getDatasetRows(chartDefinition, data)

    chart = createSnapshotChart(chartDefinition, dataSetRows)
    table = createSnapshotTable(chartDefinition, dataSetRows)
  }

  return {
    table,
    chart,
  }
}

export default {
  createChart,
}

const createSnapshotChart = (
  chartDefinition: DashboardVisualisation,
  dataSetRows: MetricsDataResponse[],
): ChartData => {
  const { type, columns } = chartDefinition
  const { keys, measures } = columns

  const labels = measures.map((col) => col.display)
  const labelId = keys[0].id as keyof MetricsDataResponse
  const unit = measures[0].unit ? measures[0].unit : undefined

  const filteredData = DashboardSectionUtils.filterRowsByDisplayColumns(chartDefinition, dataSetRows, true)
  const datasets = filteredData.map((row) => {
    const label = <string>row[labelId]?.raw
    const data = measures.map((c) => {
      const rowId = c.id as keyof MetricsDataResponse
      return row[rowId] ? +row[rowId].raw : 0
    })
    const total = data.reduce((acc: number, val: number) => acc + val, 0)
    return { label, data, total }
  })

  return {
    type,
    unit,
    data: {
      labels,
      datasets,
    },
  }
}

const createSnapshotTable = (chartDefinition: DashboardVisualisation, data: MetricsDataResponse[]): MoJTable => {
  const { columns } = chartDefinition
  const { keys, measures } = columns

  let headerColumns = [...measures]
  let includeKeys = false
  if (data.length > 1) {
    headerColumns = [...keys, ...measures]
    includeKeys = true
  }
  const filteredRowData = DashboardSectionUtils.filterRowsByDisplayColumns(chartDefinition, data, includeKeys)
  const head = headerColumns.map((column) => {
    return { text: column.display }
  })
  const rows = DashboardListUtils.createTableRows(filteredRowData)

  return {
    head,
    rows,
  }
}

// const createTimeseriesChart = (
//   chartDefinition: DashboardVisualisation,
//   dashboardMetricsData: MetricsDataResponse[][],
// ): ChartData => {
//   const { type, columns } = chartDefinition
//   const { keys, measures } = columns
//   const labelId = keys[0].id as keyof MetricsDataResponse
//   const unit = measures[0].unit ? measures[0].unit : undefined

//   // get the timestamps as labels
//   const labels = dashboardMetricsData.map((d: MetricsDataResponse[]) => d[0].timestamp as unknown as string)
//   const datasetCount = dashboardMetricsData[0].length

//   const datasets: ChartDataset[] = []
//   for (let index = 0; index < datasetCount; index += 1) {
//     const data = dashboardMetricsData.map((timeperiod) => {
//       return +timeperiod[index][measures[0].id].raw
//     })
//     const total = data.reduce((a, c) => a + c, 0)
//     const label = dashboardMetricsData[0][index][labelId].raw as string

//     datasets.push({
//       data,
//       label,
//       total,
//     })
//   }

//   return {
//     type,
//     unit,
//     timeseries: true,
//     data: {
//       labels,
//       datasets,
//     },
//   }
// }

// const createTimeseriesTable = (
//   charts: DashboardChartDefinition[],
//   dashboardMetricsData: MetricsDataResponse[][],
// ): MoJTable => {
//   const allColumns = charts.flatMap((chartDefinition) => {
//     return chartDefinition.columns.map((column) => column)
//   })

//   // Unique columns for timeseries should always only be length of 1
//   const uniqueColumns = allColumns.filter(
//     (value, index, self) => index === self.findIndex((t) => t.name === value.name),
//   )

//   const head: MoJTableHead[] = []
//   head.push({
//     text: 'Date',
//   })

//   // if there is more than one row
//   if (dashboardMetricsData[0].length > 1) {
//     // display the row group value as the column header
//     dashboardMetricsData[0].forEach((row) => {
//       head.push({
//         text: <string>row[charts[0].label.name].raw,
//       })
//     })
//   } else {
//     uniqueColumns.forEach((col) => {
//       head.push({
//         text: col.display,
//       })
//     })
//   }

//   const tsData = dashboardMetricsData.map((timeperiodDataArr) => {
//     return [
//       {
//         text: timeperiodDataArr[0].timestamp as unknown as string,
//       },
//       ...uniqueColumns.flatMap((col) => {
//         return timeperiodDataArr.map((periodData) => {
//           return { text: periodData[col.name as keyof MetricsDataResponse].raw }
//         })
//       }),
//     ]
//   })

//   return {
//     head,
//     rows: tsData,
//   } as MoJTable
// }

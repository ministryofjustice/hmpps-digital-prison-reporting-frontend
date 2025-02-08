import {
  ChartData,
  MoJTable,
  ChartCardData,
  ChartDataset,
  ChartType,
  ChartDetails,
  ChartMetaData,
} from '../../types/Charts'
import { MetricsDataResponse } from '../../types/Metrics'
import {
  BarChartVisualisationColumn,
  DashboardVisualisation,
  DashboardVisualisationColumns,
  DashboardVisualisationType,
} from '../_dashboards/dashboard/types'
import DashboardSectionUtils from '../_dashboards/dashboard-section/utils'
import DashboardListUtils from '../_dashboards/dashboard-list/utils'

const createChart = (chartDefinition: DashboardVisualisation, rawData: MetricsDataResponse[][]): ChartCardData => {
  const timeseriesChartTypes = [DashboardVisualisationType.BAR_TIMESERIES, DashboardVisualisationType.LINE]
  const { type } = chartDefinition

  let table: MoJTable
  let chart: ChartData
  let details: ChartDetails

  if (timeseriesChartTypes.includes(type)) {
    const timeseriesData = rawData.map((timesetData: MetricsDataResponse[]) => {
      const dataSetRows = DashboardSectionUtils.getDatasetRows(chartDefinition, timesetData)
      return DashboardSectionUtils.filterRowsByDisplayColumns(chartDefinition, dataSetRows, true)
    })

    chart = createTimeseriesChart(chartDefinition, timeseriesData)
    // table = createTimeseriesTable(chartDefinition, rawData)
    details = getChartDetails(timeseriesData[timeseriesData.length - 1])
  } else {
    const data = rawData[rawData.length - 1]
    const dataSetRows = DashboardSectionUtils.getDatasetRows(chartDefinition, data)
    const snapshotData = DashboardSectionUtils.filterRowsByDisplayColumns(chartDefinition, dataSetRows, true)

    chart = createSnapshotChart(chartDefinition, snapshotData)
    table = createSnapshotTable(chartDefinition, snapshotData)
    details = getChartDetails(dataSetRows)
  }

  return {
    details,
    table,
    chart,
  }
}

export default {
  createChart,
}

const getChartDetails = (data: MetricsDataResponse[]): ChartDetails => {
  const meta: ChartMetaData[] = []
  const headlines: ChartMetaData[] = []

  if (data[0]?.timestamp) {
    meta.push({
      label: 'Values for:',
      value: data[0]?.timestamp.raw,
    })
  }

  headlines.push({
    label: 'Headline 1',
    value: 300,
  })
  headlines.push({
    label: 'Headline 2',
    value: 600,
  })

  return {
    meta,
    headlines,
  }
}

const createSnapshotChart = (
  chartDefinition: DashboardVisualisation,
  snapshotData: MetricsDataResponse[],
): ChartData => {
  const { type, columns } = chartDefinition
  const { measures } = columns
  const isListChart = !!(<BarChartVisualisationColumn[]>measures).find((col) => col.axis)

  let labels: string[]
  let unit
  let datasets: ChartDataset[]

  if (!isListChart) {
    ;({ labels, unit, datasets } = buildChart(columns, snapshotData))
  } else {
    ;({ labels, unit, datasets } = buildChartFromListData(measures, snapshotData))
  }

  return {
    type: type as unknown as ChartType,
    unit,
    data: {
      labels,
      datasets,
    },
  }
}

const buildChart = (columns: DashboardVisualisationColumns, rawData: MetricsDataResponse[]) => {
  const { keys, measures } = columns
  const labels = measures.map((col) => col.display)
  const labelId = keys[0].id as keyof MetricsDataResponse
  const unit = measures[0].unit ? measures[0].unit : undefined

  const datasets = rawData.map((row) => {
    const label = <string>row[labelId]?.raw
    const data = measures.map((c) => {
      const rowId = c.id as keyof MetricsDataResponse
      return row[rowId] ? +row[rowId].raw : 0
    })
    const total = data.reduce((acc: number, val: number) => acc + val, 0)
    return { label, data, total } as ChartDataset
  })

  return {
    labels,
    unit,
    datasets,
  }
}

const buildChartFromListData = (measures: BarChartVisualisationColumn[], rawData: MetricsDataResponse[]) => {
  const xAxisColumn = measures.find((col) => col.axis === 'x')
  const yAxisColumn = measures.find((col) => col.axis === 'y')

  const labels = rawData.map((row) => {
    return `${row[xAxisColumn.id].raw}`
  })
  const unit = yAxisColumn?.unit || undefined
  const data = rawData.map((row) => +row[yAxisColumn.id].raw)
  const datasets = [
    {
      label: yAxisColumn.display,
      data,
      total: data.reduce((acc: number, val: number) => acc + val, 0),
    },
  ]

  return {
    labels,
    unit,
    datasets,
  }
}

const createSnapshotTable = (chartDefinition: DashboardVisualisation, data: MetricsDataResponse[]): MoJTable => {
  const { columns } = chartDefinition
  const { keys, measures } = columns

  const isListChart = !!(<BarChartVisualisationColumn[]>measures).find((col) => col.axis)

  let headerColumns = [...measures]
  let includeKeys = false
  if (data.length > 1 && !isListChart) {
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

const createTimeseriesChart = (
  chartDefinition: DashboardVisualisation,
  timeseriesData: MetricsDataResponse[][],
): ChartData => {
  const { type, columns } = chartDefinition
  const { keys, measures } = columns
  const labelId = keys[0].id as keyof MetricsDataResponse
  const unit = measures[0].unit ? measures[0].unit : undefined

  // get the timestamps as labels
  const labels = timeseriesData.map((d: MetricsDataResponse[]) => d[0].timestamp.raw as unknown as string)
  const datasetCount = timeseriesData[0].length

  const datasets: ChartDataset[] = []
  for (let index = 0; index < datasetCount; index += 1) {
    const data = timeseriesData.map((timeperiod) => {
      return +timeperiod[index][measures[1].id].raw
    })
    const total = data.reduce((a, c) => a + c, 0)
    const label = timeseriesData[0][index][labelId].raw as string

    datasets.push({
      data,
      label,
      total,
    })
  }

  return {
    type: type as unknown as ChartType,
    unit,
    timeseries: true,
    data: {
      labels,
      datasets,
    },
  }
}

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

import {
  ChartData,
  MoJTable,
  ChartCardData,
  ChartDataset,
  ChartType,
  ChartDetails,
  ChartMetaData,
} from '../../types/Charts'
import { DashboardDataResponse } from '../../types/Metrics'
import {
  BarChartVisualisationColumn,
  DashboardVisualisation,
  DashboardVisualisationColumns,
  DashboardVisualisationType,
} from '../_dashboards/dashboard/types'
import DashboardSectionUtils from '../_dashboards/dashboard-section/utils'
import DashboardListUtils from '../_dashboards/dashboard-list/utils'

const createChart = (chartDefinition: DashboardVisualisation, rawData: DashboardDataResponse[][]): ChartCardData => {
  const timeseriesChartTypes = [DashboardVisualisationType.BAR_TIMESERIES, DashboardVisualisationType.LINE]
  const { type } = chartDefinition

  let table: MoJTable
  let chart: ChartData
  let details: ChartDetails

  if (timeseriesChartTypes.includes(type)) {
    const timeseriesData = rawData.map((timesetData: DashboardDataResponse[]) => {
      const dataSetRows = DashboardSectionUtils.getDatasetRows(chartDefinition, timesetData)
      return DashboardSectionUtils.filterRowsByDisplayColumns(chartDefinition, dataSetRows, true)
    })

    chart = createTimeseriesChart(chartDefinition, timeseriesData)
    table = createTimeseriesTable(chartDefinition, timeseriesData)
    details = getChartDetails(chartDefinition, timeseriesData[timeseriesData.length - 1], true)
  } else {
    const data = rawData[rawData.length - 1]
    const dataSetRows = DashboardSectionUtils.getDatasetRows(chartDefinition, data)
    const snapshotData = DashboardSectionUtils.filterRowsByDisplayColumns(chartDefinition, dataSetRows, true)

    chart = createSnapshotChart(chartDefinition, snapshotData)
    table = createSnapshotTable(chartDefinition, dataSetRows)
    details = getChartDetails(chartDefinition, dataSetRows)
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

const getChartDetails = (
  chartDefinition: DashboardVisualisation,
  data: DashboardDataResponse[],
  timeseries = false,
): ChartDetails => {
  const meta: ChartMetaData[] = []
  const headlines: ChartMetaData[] = createHeadlines(chartDefinition, data, timeseries)

  if (data[0]?.ts) {
    meta.push({
      label: 'Values for:',
      value: data[0]?.ts.raw,
    })
  }

  return {
    meta,
    headlines,
  }
}

// TODO: Implement headlines for charts:
// - If timeseries chart: use latest value
// - If snapshot chart: use first value
const createHeadlines = (chartDefinition: DashboardVisualisation, data: DashboardDataResponse[], timeseries = false) => {
  const headlines: ChartMetaData[] = []
  const { columns } = chartDefinition
  const { measures } = columns
  const isListChart = !!(<BarChartVisualisationColumn[]>measures).find((col) => col.axis)
  let headline: ChartMetaData

  let headlineColumn: BarChartVisualisationColumn
  let value: number
  let label: string

  if (timeseries) {
    headlineColumn = <BarChartVisualisationColumn>measures.find((col) => col.id !== 'ts')
    if (headlineColumn) {
      label = `${data[0].ts.raw}`
      value = +data[0][headlineColumn.id].raw

      headline = {
        label,
        value,
      }
    }
  } else {
    headlineColumn = !isListChart
      ? <BarChartVisualisationColumn>measures[0]
      : measures.find((col: BarChartVisualisationColumn) => col.axis && col.axis === 'y')

    if (headlineColumn) {
      label = `Total ${headlineColumn.display.toLowerCase()}`
      value = data.reduce((acc: number, d: DashboardDataResponse) => acc + +d[headlineColumn.id].raw, 0)

      headline = {
        label,
        value,
      }
    }
  }

  headlines.push(headline)

  return headlines
}

const createSnapshotChart = (
  chartDefinition: DashboardVisualisation,
  snapshotData: DashboardDataResponse[],
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

const buildChart = (columns: DashboardVisualisationColumns, rawData: DashboardDataResponse[]) => {
  const { keys, measures } = columns
  const labels = measures.map((col) => col.display)
  const labelId = keys[keys.length - 1].id as keyof DashboardDataResponse
  const unit = measures[0].unit ? measures[0].unit : undefined

  const datasets = rawData.map((row) => {
    const label = `${row[labelId].raw}`
    const data = measures.map((c) => {
      const rowId = c.id as keyof DashboardDataResponse
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

const buildChartFromListData = (measures: BarChartVisualisationColumn[], rawData: DashboardDataResponse[]) => {
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

const createSnapshotTable = (chartDefinition: DashboardVisualisation, data: DashboardDataResponse[]): MoJTable => {
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
  timeseriesData: DashboardDataResponse[][],
): ChartData => {
  const { type, columns } = chartDefinition
  const { keys, measures } = columns

  const labelId = keys[keys.length - 1].id as keyof DashboardDataResponse
  const unit = measures[0].unit ? measures[0].unit : undefined

  const labels = timeseriesData.map((d: DashboardDataResponse[]) => d[0].ts.raw as unknown as string)
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

const createTimeseriesTable = (
  chartDefinition: DashboardVisualisation,
  timeseriesData: DashboardDataResponse[][],
): MoJTable => {
  const { columns } = chartDefinition
  const { keys, measures } = columns
  let flatTimeseriesData = timeseriesData.flat()
  const hasMultipleRowsPerTimePeriod = timeseriesData[0].length > 1
  let headerColumns = [...measures]

  if (hasMultipleRowsPerTimePeriod) {
    const timestampIndex = headerColumns.findIndex((m) => m.id === 'ts')
    const timestampCol = headerColumns[timestampIndex]

    headerColumns.splice(timestampIndex, 1)
    headerColumns = [...keys, ...headerColumns]
    headerColumns.unshift(timestampCol)
  } else {
    flatTimeseriesData = DashboardSectionUtils.filterRowsByDisplayColumns(chartDefinition, flatTimeseriesData)
  }

  const head = headerColumns.map((column) => {
    return { text: column.display }
  })

  const rows = DashboardListUtils.createTableRows(flatTimeseriesData)

  return {
    head,
    rows,
  } as MoJTable
}

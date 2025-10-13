import {
  ChartData,
  MoJTable,
  ChartCardData,
  ChartDataset,
  ChartType,
  ChartDetails,
  ChartMetaData,
  MatrixChartData,
} from '../../types/Charts'
import { DashboardDataResponse } from '../../types/Metrics'
import {
  BarChartVisualisationColumn,
  DashboardVisualisation,
  DashboardVisualisationColumns,
} from '../_dashboards/dashboard/types'
import DatasetHelper from '../../utils/datasetHelper'
import DashboardListUtils from '../_dashboards/dashboard-list/utils'
import { Granularity } from '../_inputs/granular-date-range/types'

const createChart = (chartDefinition: DashboardVisualisation, rawData: DashboardDataResponse[]): ChartCardData => {
  let table: MoJTable
  let chart: ChartData
  let details: ChartDetails

  const { dataSetRows, snapshotData } = getDataForSnapshotCharts(chartDefinition, rawData)
  if (dataSetRows.length) {
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

const createTimeseriesCharts = (
  chartDefinition: DashboardVisualisation,
  rawData: DashboardDataResponse[],
): ChartCardData => {
  let table: MoJTable
  let chart: ChartData
  let details: ChartDetails

  const { latestData, dataSetRows, timeseriesData } = getDataForTimeseriesCharts(chartDefinition, rawData)
  if (dataSetRows.length) {
    chart = createTimeseriesChart(chartDefinition, timeseriesData)
    table = createTimeseriesTable(chartDefinition, timeseriesData)
    details = getChartDetails(chartDefinition, latestData, true)
  }
  return {
    details,
    table,
    chart,
  }
}

const createMatrixChart = (
  chartDefinition: DashboardVisualisation,
  rawData: DashboardDataResponse[],
  query: Record<string, string | string[]>,
) => {
  let table: MoJTable
  let chart: ChartData
  let details: ChartDetails
  let granularity: Granularity

  Object.keys(query).forEach((key) => {
    if (key.includes('granularity')) {
      granularity = <Granularity>query[key]
    }
  })

  const { latestData, dataSetRows, timeseriesData } = getDataForTimeseriesCharts(chartDefinition, rawData)
  if (dataSetRows.length) {
    chart = createTimeseriesMatrixChart(chartDefinition, timeseriesData, granularity)
    table = createTimeseriesTable(chartDefinition, timeseriesData)
    details = getChartDetails(chartDefinition, latestData, true)
  }
  return {
    details,
    table,
    chart,
  }
}

export default {
  createChart,
  createTimeseriesCharts,
  createMatrixChart,
}

const getDataForSnapshotCharts = (chartDefinition: DashboardVisualisation, rawData: DashboardDataResponse[]) => {
  const data = DatasetHelper.getLastestDataset(rawData)
  const dataSetRows = DatasetHelper.getDatasetRows(chartDefinition, data)
  const snapshotData = DatasetHelper.filterRowsByDisplayColumns(chartDefinition, dataSetRows, true)

  return {
    dataSetRows,
    snapshotData,
  }
}

const getDataForTimeseriesCharts = (chartDefinition: DashboardVisualisation, rawData: DashboardDataResponse[]) => {
  const latestData = DatasetHelper.getLastestDataset(rawData)
  const dataSetRows = DatasetHelper.getDatasetRows(chartDefinition, rawData)
  const timeseriesData = DatasetHelper.filterRowsByDisplayColumns(chartDefinition, dataSetRows, true)

  return {
    latestData,
    dataSetRows,
    timeseriesData,
  }
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

const createHeadlines = (
  chartDefinition: DashboardVisualisation,
  data: DashboardDataResponse[],
  timeseries = false,
) => {
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
    ;({ labels, unit, datasets } = buildChartFromListData(columns, snapshotData))
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
  const labelId = keys[keys.length - 1]?.id as keyof DashboardDataResponse
  const unit = measures[0].unit ? measures[0].unit : undefined

  const datasets = rawData.map((row) => {
    const label = row[labelId] ? `${row[labelId].raw}` : 'All'
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

const buildChartFromListData = (columns: DashboardVisualisationColumns, rawData: DashboardDataResponse[]) => {
  const { measures, keys } = columns

  const xAxisColumn = (<BarChartVisualisationColumn[]>measures).find((col) => col.axis === 'x')
  const yAxisColumn = (<BarChartVisualisationColumn[]>measures).find((col) => col.axis === 'y')

  const unit = yAxisColumn?.unit || undefined
  const groupKey = DatasetHelper.getGroupKey(keys, rawData)
  const groupsData = groupKey ? DatasetHelper.groupRowsByKey(rawData, groupKey.id) : [rawData]

  const labels = groupsData[0]?.map((row) => {
    return `${row[xAxisColumn.id].raw}`
  })

  const datasets: ChartDataset[] = groupsData.map((groupData) => {
    const data = groupData.map((row) => +row[yAxisColumn.id].raw)
    return {
      label: groupKey ? `${groupData[0][groupKey.id].raw}` : yAxisColumn.display,
      data,
      total: data.reduce((acc: number, val: number) => acc + val, 0),
    }
  })

  return {
    labels,
    unit,
    datasets,
  }
}

const createSnapshotTable = (chartDefinition: DashboardVisualisation, data: DashboardDataResponse[]): MoJTable => {
  const { columns } = chartDefinition
  const { keys, measures } = columns

  const headerColumns = [...keys, ...measures]
  const head = headerColumns.map((column) => {
    return { text: column.display }
  })

  const filteredRowData = DatasetHelper.filterRowsByDisplayColumns(chartDefinition, data, true)
  const rows = DashboardListUtils.createTableRows(filteredRowData)

  return {
    head,
    rows,
  }
}

const createTimeseriesMatrixChart = (
  chartDefinition: DashboardVisualisation,
  timeseriesData: DashboardDataResponse[],
  granularity: Granularity,
): ChartData => {
  const { columns } = chartDefinition
  const { keys, measures } = columns

  const unit = measures[0].unit ? measures[0].unit : undefined
  const type = chartDefinition.type.split('-')[0]
  const groupKey = DatasetHelper.getGroupKey(keys, timeseriesData)
  const labelId = groupKey.id as keyof DashboardDataResponse

  const timeBlockData = DatasetHelper.groupRowsByTimestamp(timeseriesData)
  console.log(JSON.stringify({ timeBlockData }, null, 2))

  const matrixDataSets: ChartDataset[] = createMatrixDataSet(timeBlockData, granularity)
  console.log(JSON.stringify({ matrixDataSets }, null, 2))

  const datasets: ChartDataset[] = []
  for (let index = 0; index < timeBlockData[0].length; index += 1) {
    const data = timeBlockData.map((timeperiod) => {
      return +timeperiod[index][measures[1].id].raw
    })
    const total = data.reduce((a, c) => a + c, 0)
    const label = timeBlockData[0][index][labelId].raw as string

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
      datasets: matrixDataSets,
    },
  }
}

const createMatrixDataSet = (timeBlockData: DashboardDataResponse[][], granularity: Granularity) => {
  const dataset: MatrixChartData[] = initTimeseriesMatrixAxis(timeBlockData, granularity)
  return [{ label: 'test', data: dataset }]
}

const initTimeseriesMatrixAxis = (
  timeBlockData: DashboardDataResponse[][],
  granularity: Granularity,
): MatrixChartData[] => {
  let dataset: MatrixChartData[] = []
  switch (granularity) {
    case 'hourly':
      break
    case 'daily':
      break
    case 'monthly':
      // Assumes ts format is MMM YY
      dataset = timeBlockData.map((tsData) => {
        const ts = (<string>tsData[0].ts.raw).split(' ')
        return {
          y: ts[0],
          x: ts[1],
          v: 10,
        }
      })
      break
    case 'annually':
      break
    default:
      break
  }

  console.log(JSON.stringify({ dataset }, null, 2))

  return dataset
}

const createTimeseriesChart = (
  chartDefinition: DashboardVisualisation,
  timeseriesData: DashboardDataResponse[],
): ChartData => {
  const { columns } = chartDefinition
  const { keys, measures } = columns

  const unit = measures[0].unit ? measures[0].unit : undefined
  const type = chartDefinition.type.split('-')[0]
  const groupKey = DatasetHelper.getGroupKey(keys, timeseriesData)
  const labelId = groupKey.id as keyof DashboardDataResponse

  const timeBlockData = DatasetHelper.groupRowsByTimestamp(timeseriesData)
  const labels = timeBlockData.map((d: DashboardDataResponse[]) => d[0].ts.raw as unknown as string)
  const datasetCount = timeBlockData[0].length

  const datasets: ChartDataset[] = []
  for (let index = 0; index < datasetCount; index += 1) {
    const data = timeBlockData.map((timeperiod) => {
      return +timeperiod[index][measures[1].id].raw
    })
    const total = data.reduce((a, c) => a + c, 0)
    const label = timeBlockData[0][index][labelId].raw as string

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
  timeseriesData: DashboardDataResponse[],
): MoJTable => {
  const { columns } = chartDefinition
  const { keys, measures } = columns

  let flatTimeseriesData = timeseriesData.flat()
  const hasMultipleRowsPerTimePeriod = timeseriesData.length > 1
  let headerColumns = [...measures]

  if (hasMultipleRowsPerTimePeriod) {
    const timestampIndex = headerColumns.findIndex((m) => m.id === 'ts')
    const timestampCol = headerColumns[timestampIndex]

    headerColumns.splice(timestampIndex, 1)
    headerColumns = [...keys, ...headerColumns]
    headerColumns.unshift(timestampCol)
  } else {
    flatTimeseriesData = DatasetHelper.filterRowsByDisplayColumns(chartDefinition, flatTimeseriesData)
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

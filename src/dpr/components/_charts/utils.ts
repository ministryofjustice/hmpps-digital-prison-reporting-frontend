import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { ChartDetails, ChartMetaData } from '../../types/Charts'
import { DashboardDataResponse } from '../../types/Metrics'
import DatasetHelper from '../../utils/datasetHelper'
import DashboardListUtils from '../_dashboards/dashboard-list/utils'
import { Granularity } from '../_inputs/granular-date-range/types'
import HeatmapChart from './chart/heatmap/HeatmapChart'
import { components } from '../../types/api'
import {
  DashboardVisualisationData,
  DashboardVisualisationDataSet,
  DashboardVisualisatonCardData,
  MoJTable,
} from '../_dashboards/dashboard-visualisation/types'

dayjs.extend(weekOfYear)

export const createChart = (
  chartDefinition: components['schemas']['DashboardVisualisationDefinition'],
  rawData: DashboardDataResponse[],
): DashboardVisualisatonCardData | undefined => {
  let table: MoJTable | undefined
  let chart: DashboardVisualisationData | undefined
  let details: ChartDetails | undefined

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

export const createTimeseriesCharts = (
  chartDefinition: components['schemas']['DashboardVisualisationDefinition'],
  rawData: DashboardDataResponse[],
): DashboardVisualisatonCardData => {
  let table: MoJTable | undefined
  let chart: DashboardVisualisationData | undefined
  let details: ChartDetails | undefined

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

export const createMatrixChart = (
  chartDefinition: components['schemas']['DashboardVisualisationDefinition'],
  rawData: DashboardDataResponse[],
  query: Record<string, string | string[]>,
) => {
  let table: MoJTable | undefined
  let chart: DashboardVisualisationData | undefined
  let details: ChartDetails | undefined
  let granularity: Granularity = Granularity.DAILY

  Object.keys(query).forEach((key) => {
    if (key.includes('granularity')) {
      granularity = <Granularity>query[key]
    }
  })

  const { latestData, dataSetRows, timeseriesData } = getDataForTimeseriesCharts(chartDefinition, rawData)
  if (dataSetRows.length) {
    chart = new HeatmapChart(timeseriesData, granularity, chartDefinition).build()
    table = createTimeseriesTable(chartDefinition, timeseriesData)
    details = getChartDetails(chartDefinition, latestData, true)
  }
  return {
    details,
    table,
    chart,
  }
}

const getDataForSnapshotCharts = (
  chartDefinition: components['schemas']['DashboardVisualisationDefinition'],
  rawData: DashboardDataResponse[],
) => {
  const data = DatasetHelper.getLastestDataset(rawData)
  const dataSetRows = DatasetHelper.getDatasetRows(chartDefinition, data)
  const snapshotData = DatasetHelper.filterRowsByDisplayColumns(chartDefinition, dataSetRows, true)

  return {
    dataSetRows,
    snapshotData,
  }
}

const getDataForTimeseriesCharts = (
  chartDefinition: components['schemas']['DashboardVisualisationDefinition'],
  rawData: DashboardDataResponse[],
) => {
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
  chartDefinition: components['schemas']['DashboardVisualisationDefinition'],
  data: DashboardDataResponse[],
  timeseries = false,
): ChartDetails => {
  const meta: ChartMetaData[] = []
  const headlines: ChartMetaData[] = createHeadlines(chartDefinition, data, timeseries)

  if (data[0]?.['ts'].raw) {
    meta.push({
      label: 'Values for:',
      value: data[0]?.['ts'].raw,
    })
  }

  return {
    meta,
    headlines,
  }
}

const createHeadlines = (
  chartDefinition: components['schemas']['DashboardVisualisationDefinition'],
  data: DashboardDataResponse[],
  timeseries = false,
) => {
  const headlines: ChartMetaData[] = []
  const { columns } = chartDefinition
  const { measures } = columns
  const isListChart = !!measures.find((col) => col.axis)
  let headline: ChartMetaData | undefined

  let headlineColumn: components['schemas']['DashboardVisualisationColumnDefinition'] | undefined
  let value: number | undefined
  let label: string

  if (timeseries) {
    headlineColumn = measures.find((col) => col.id !== 'ts')
    if (headlineColumn) {
      const { id } = headlineColumn
      const { raw } = data[0][id]
      label = `${data[0]['ts'].raw}`
      value = raw ? Number(raw) : undefined

      if (value) {
        headline = {
          label,
          value,
        }
      }
    }
  } else {
    headlineColumn = !isListChart ? measures[0] : measures.find((col) => col.axis && col.axis === 'y')

    if (headlineColumn) {
      const display = headlineColumn.display?.toLowerCase()
      label = display ? `Total ${display}` : 'Total'
      value = data.reduce((acc: number, d: DashboardDataResponse) => {
        if (headlineColumn) {
          const { id } = headlineColumn
          const { raw } = d[id]
          if (raw) {
            return acc + Number(raw)
          }
        }
        return acc
      }, 0)

      headline = {
        label,
        value,
      }
    }
  }

  if (headline) headlines.push(headline)

  return headlines
}

const createSnapshotChart = (
  chartDefinition: components['schemas']['DashboardVisualisationDefinition'],
  snapshotData: DashboardDataResponse[],
): DashboardVisualisationData => {
  const { type, columns } = chartDefinition
  const { measures } = columns
  const isListChart = !!measures.find((col) => col.axis)

  let labels: string[]
  let unit
  let datasets: DashboardVisualisationDataSet[]

  if (!isListChart) {
    const chart = buildChart(columns, snapshotData)
    labels = chart.labels
    unit = chart.unit
    datasets = chart.datasets
  } else {
    ;({ labels, unit, datasets } = buildChartFromListData(columns, snapshotData))
  }

  return {
    type,
    unit,
    data: {
      labels,
      datasets,
    },
  }
}

const buildChart = (
  columns: components['schemas']['DashboardVisualisationColumnsDefinition'],
  rawData: DashboardDataResponse[],
) => {
  const { keys, measures } = columns
  const labels = measures.map((col) => col.display || '')
  const labelId = keys ? (keys[keys.length - 1]?.id as keyof DashboardDataResponse) : undefined
  const unit = measures[0].unit ? measures[0].unit : undefined

  const datasets = rawData.map((row) => {
    const label = labelId && row[labelId] ? `${row[labelId].raw}` : 'All'
    const data = measures.map((c) => {
      const rowId = c.id as keyof DashboardDataResponse
      return row[rowId] && row[rowId].raw ? Number(row[rowId].raw) : 0
    })
    const total = data.reduce((acc: number, val: number) => acc + val, 0)
    return { label, data, total } as DashboardVisualisationDataSet
  })

  return {
    labels,
    unit,
    datasets,
  }
}

const buildChartFromListData = (
  columns: components['schemas']['DashboardVisualisationColumnsDefinition'],
  rawData: DashboardDataResponse[],
) => {
  const { measures, keys } = columns

  const xAxisColumn = measures.find((col) => col.axis === 'x') || measures[0]
  const yAxisColumn = measures.find((col) => col.axis === 'y') || measures[1]

  if (!xAxisColumn || !yAxisColumn) {
    throw new Error('No X of Y Axis found in definition')
  }

  const unit = yAxisColumn?.unit || undefined
  const groupKey = DatasetHelper.getGroupKey(rawData, keys)
  const groupsData = groupKey ? DatasetHelper.groupRowsByKey(rawData, groupKey.id) : [rawData]

  const labels = groupsData[0]?.map((row) => {
    const { id: xId } = xAxisColumn
    const field = row[xId]
    return field ? `${field.raw}` : ''
  })

  const datasets: DashboardVisualisationDataSet[] = groupsData.map((groupData) => {
    const data = groupData.map((row) => {
      const { id: yId } = yAxisColumn
      const field = row[yId]
      const raw = field && field.raw ? Number(field.raw) : 0
      return Number(raw)
    })

    let label = ''
    if (groupKey) {
      const groupKeyId = groupKey.id
      const groupRow = groupData[0]
      label = groupRow && groupRow[groupKeyId] ? `${groupRow[groupKeyId].raw}` : ''
    } else {
      label = yAxisColumn.display || label
    }

    return {
      label,
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

const createSnapshotTable = (
  chartDefinition: components['schemas']['DashboardVisualisationDefinition'],
  data: DashboardDataResponse[],
): MoJTable => {
  const { columns } = chartDefinition
  const { measures } = columns
  const keys = columns.keys || []

  const headerColumns = [...keys, ...measures]
  const head = headerColumns.map((column) => {
    return { text: column.display || '' }
  })

  const filteredRowData = DatasetHelper.filterRowsByDisplayColumns(chartDefinition, data, true)
  const rows = DashboardListUtils.createTableRows(filteredRowData)

  return {
    head,
    rows,
  }
}

const createTimeseriesChart = (
  chartDefinition: components['schemas']['DashboardVisualisationDefinition'],
  timeseriesData: DashboardDataResponse[],
): DashboardVisualisationData => {
  const { columns } = chartDefinition
  const { keys, measures } = columns

  const unit = measures[0].unit ? measures[0].unit : undefined
  const type = <components['schemas']['DashboardVisualisationDefinition']['type']>chartDefinition.type.split('-')[0]
  const groupKey = DatasetHelper.getGroupKey(timeseriesData, keys)
  const labelId = groupKey?.id as keyof DashboardDataResponse

  const timeBlockData = DatasetHelper.groupRowsByTimestamp(timeseriesData)
  const labels = timeBlockData.map((d: DashboardDataResponse[]) => d[0]['ts'].raw as unknown as string)
  const datasetCount = timeBlockData[0].length

  const datasets: DashboardVisualisationDataSet[] = []
  for (let index = 0; index < datasetCount; index += 1) {
    const data = timeBlockData.map((timeperiod) => {
      const { raw } = timeperiod[index][measures[1].id]
      return raw ? Number(raw) : 0
    })
    const total = data.reduce((a, c) => a + c, 0)
    const rawValue = timeBlockData[0][index][labelId].raw
    const label = rawValue ? <string>rawValue : ''

    datasets.push({
      data,
      label,
      total,
    })
  }

  return {
    type,
    unit,
    timeseries: true,
    data: {
      labels,
      datasets,
    },
  }
}

const createTimeseriesTable = (
  chartDefinition: components['schemas']['DashboardVisualisationDefinition'],
  timeseriesData: DashboardDataResponse[],
): MoJTable => {
  const { columns } = chartDefinition
  const { keys, measures } = columns

  let flatTimeseriesData = timeseriesData.flat()
  let headerColumns = [...measures]

  if (timeseriesData.length > 1) {
    // Add keys as columns as well as measures, and put TS first:
    // Get TS column an remove it from headings
    const timestampIndex = headerColumns.findIndex((m) => m.id === 'ts')
    const timestampCol = headerColumns[timestampIndex]
    headerColumns.splice(timestampIndex, 1)
    // Remove duplicate TS from keys if present and add keys to headings
    const keysWithoutTs = keys ? keys.filter((k) => k.id !== 'ts') : []
    headerColumns = [...keysWithoutTs, ...headerColumns]
    // Add TS column to the start
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

export default {
  createChart,
  createTimeseriesCharts,
  createMatrixChart,
}

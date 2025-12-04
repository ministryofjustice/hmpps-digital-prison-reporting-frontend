import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { ChartDetails, ChartMetaData } from '../../types/Charts'
import { DashboardDataResponse } from '../../types/Metrics'
import DatasetHelper from '../../utils/datasetHelper'
import DashboardListUtils from '../_dashboards/dashboard-list/utils'
import { Granularity } from '../_inputs/granular-date-range/types'
import HeatmapChart from './chart/heatmap/HeatmapChart'
import BarChart from './chart/bar/BarChart'
import { components } from '../../types/api'
import {
  DashboardVisualisationData,
  DashboardVisualisationType,
  DashboardVisualisatonCardData,
  MoJTable,
} from '../_dashboards/dashboard-visualisation/types'
import DoughnutChart from './chart/doughnut/DoughnutChart'
import LineChart from './chart/line/LineChart'
import LineTimeseriesChart from './chart/line-timeseries/LineTimeseriesChart'
import BarTimeseriesChart from './chart/bar-timeseries/BarTimeseriesChart'

dayjs.extend(weekOfYear)

export const createChart = (
  chartDefinition: components['schemas']['DashboardVisualisationDefinition'],
  rawData: DashboardDataResponse[],
  type: components['schemas']['DashboardVisualisationDefinition']['type'],
): DashboardVisualisatonCardData | undefined => {
  let table: MoJTable | undefined
  let chart: DashboardVisualisationData | undefined
  let details: ChartDetails | undefined

  const { dataSetRows, snapshotData } = getDataForSnapshotCharts(chartDefinition, rawData)
  if (dataSetRows.length) {
    switch (type) {
      case DashboardVisualisationType.BAR:
        chart = new BarChart().withDefinition(chartDefinition).withData(snapshotData).build()
        break
      case DashboardVisualisationType.DONUT:
        chart = new DoughnutChart().withDefinition(chartDefinition).withData(snapshotData).build()
        break
      case DashboardVisualisationType.LINE:
        chart = new LineChart().withDefinition(chartDefinition).withData(snapshotData).build()
        break
      default:
        break
    }

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
  type: components['schemas']['DashboardVisualisationDefinition']['type'],
  query?: Record<string, string | string[]>,
) => {
  let table: MoJTable | undefined
  let chart: DashboardVisualisationData | undefined
  let details: ChartDetails | undefined
  let granularity: Granularity = Granularity.DAILY

  if (query) {
    Object.keys(query).forEach((key) => {
      if (key.includes('granularity')) {
        granularity = <Granularity>query[key]
      }
    })
  }

  const { latestData, dataSetRows, timeseriesData } = getDataForTimeseriesCharts(chartDefinition, rawData)

  if (dataSetRows.length) {
    switch (type) {
      case DashboardVisualisationType.MATRIX_TIMESERIES:
        chart = new HeatmapChart()
          .withDefinition(chartDefinition)
          .withGranularity(granularity)
          .withData(timeseriesData)
          .build()
        break
      case DashboardVisualisationType.LINE_TIMESERIES:
        chart = new LineTimeseriesChart().withDefinition(chartDefinition).withData(timeseriesData).build()
        break
      case DashboardVisualisationType.BAR_TIMESERIES:
        chart = new BarTimeseriesChart().withDefinition(chartDefinition).withData(timeseriesData).build()
        break
      default:
        break
    }

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

  if (data[0]?.['ts']?.raw) {
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
}

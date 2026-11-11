import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { components } from '../../types/api'
import { ChartDetails } from '../../types/Charts'
import { DashboardDataResponse } from '../../types/Metrics'
import DatasetHelper from '../../utils/Dashboards/VisualisationDatasetHelper'
import {
  DashboardVisualisationConfig,
  DashboardVisualisationData,
  DashboardVisualisationType,
  MoJTable,
} from '../_dashboards/dashboard-visualisation/types'
import { PartialDate } from '../_filters/types'
import { Granularity } from '../_inputs/granular-date-range/types'
import BarTimeseriesChart from './chart/bar-timeseries/BarTimeseriesChart'
import BarChart from './chart/bar/BarChart'
import DoughnutChart from './chart/doughnut/DoughnutChart'
import MatrixChart from './chart/matrix/MatrixChart'
import LineTimeseriesChart from './chart/line-timeseries/LineTimeseriesChart'
import LineChart from './chart/line/LineChart'
import { createSnapshotTable, createTimeseriesTable } from './chart-table/utils'
import { BoxPlotChart } from './chart/box-plot/BoxPlotChart'
import { getChartDetails } from './chart-details/utils'

dayjs.extend(weekOfYear)

export const createChart = (
  chartDefinition: components['schemas']['DashboardVisualisationDefinition'],
  rawData: DashboardDataResponse[],
  type: components['schemas']['DashboardVisualisationDefinition']['type'],
): DashboardVisualisationConfig | undefined => {
  let chart: DashboardVisualisationData | undefined
  let details: ChartDetails | undefined

  const { dataSetRows, snapshotData: dataset } = getDataForSnapshotCharts(chartDefinition, rawData)
  const tables: MoJTable[] = []

  if (dataSetRows.length) {
    switch (type) {
      case DashboardVisualisationType.BOX_PLOT: {
        const boxPlotChart = new BoxPlotChart().withDefinition(chartDefinition).withData(dataset)
        chart = boxPlotChart.build()
        const statsTable = boxPlotChart.buildTable()
        tables.push(statsTable)
        break
      }

      case DashboardVisualisationType.BAR:
        chart = new BarChart().withDefinition(chartDefinition).withData(dataset).build()
        break

      case DashboardVisualisationType.DONUT:
        chart = new DoughnutChart().withDefinition(chartDefinition).withData(dataset).build()
        break

      case DashboardVisualisationType.LINE:
        chart = new LineChart().withDefinition(chartDefinition).withData(dataset).build()
        break

      default:
        break
    }

    const table = createSnapshotTable(chartDefinition, dataSetRows)
    tables.push(table)

    details = getChartDetails(chartDefinition, dataSetRows)
  }

  return {
    chartData: {
      details,
      tables: [],
      chart,
    },
    dataset,
  }
}

export const createTimeseriesCharts = (
  chartDefinition: components['schemas']['DashboardVisualisationDefinition'],
  rawData: DashboardDataResponse[],
  type: components['schemas']['DashboardVisualisationDefinition']['type'],
  query: Record<string, string | string[]>,
  partialDate?: PartialDate,
): DashboardVisualisationConfig | undefined => {
  const tables: MoJTable[] = []
  let chart: DashboardVisualisationData | undefined
  let details: ChartDetails | undefined
  let granularity: Granularity = Granularity.DAILY

  if (query) {
    Object.keys(query).forEach(key => {
      if (key.includes('granularity')) {
        granularity = <Granularity>query[key]
      }
    })
  }

  const { latestData, dataSetRows, timeseriesData: dataset } = getDataForTimeseriesCharts(chartDefinition, rawData)

  if (dataSetRows.length) {
    switch (type) {
      case DashboardVisualisationType.MATRIX_TIMESERIES:
        chart = new MatrixChart().withDefinition(chartDefinition).withGranularity(granularity).withData(dataset).build()
        break

      case DashboardVisualisationType.LINE_TIMESERIES:
        chart = new LineTimeseriesChart()
          .withDefinition(chartDefinition)
          .withData(dataset)
          .withPartialDate(partialDate)
          .build()
        break

      case DashboardVisualisationType.BAR_TIMESERIES:
        chart = new BarTimeseriesChart()
          .withDefinition(chartDefinition)
          .withData(dataset)
          .withPartialDate(partialDate)
          .build()
        break

      default:
        break
    }

    const table = createTimeseriesTable(chartDefinition, dataset)
    tables.push(table)

    details = getChartDetails(chartDefinition, latestData, true)
  }

  return {
    chartData: {
      details,
      tables,
      chart,
    },
    dataset,
  }
}

/**
 * Gets the data to use for a snapshot chart
 *
 * - Uses the lastest/most recent data if timestamps are present
 *
 * @param {components['schemas']['DashboardVisualisationDefinition']} chartDefinition
 * @param {DashboardDataResponse[]} rawData
 * @return {*}
 */
const getDataForSnapshotCharts = (
  chartDefinition: components['schemas']['DashboardVisualisationDefinition'],
  rawData: DashboardDataResponse[],
) => {
  const { columns } = chartDefinition

  let dateColumn = DatasetHelper.getTimestampColumn(columns)

  if (chartDefinition.type === DashboardVisualisationType.BOX_PLOT) {
    dateColumn = undefined
  }

  const latestData = DatasetHelper.getLatestDataset(rawData, dateColumn)

  // Pass latest data get the rows
  const dataSetRows = DatasetHelper.getDatasetRows(chartDefinition, latestData)

  // Filter the rows to create the visualisation dataset
  const snapshotData = DatasetHelper.filterRowsByDisplayColumns(chartDefinition, dataSetRows, true)

  return {
    dataSetRows,
    snapshotData,
  }
}

/**
 * Returns the data to use for timeseries charts
 *
 * - Uses all data where timestamps are present
 *
 * @param {components['schemas']['DashboardVisualisationDefinition']} chartDefinition
 * @param {DashboardDataResponse[]} rawData
 * @return {*}
 */
const getDataForTimeseriesCharts = (
  chartDefinition: components['schemas']['DashboardVisualisationDefinition'],
  rawData: DashboardDataResponse[],
) => {
  const { columns } = chartDefinition
  const dateColumn = DatasetHelper.getTimestampColumn(columns)

  const latestData = DatasetHelper.getLatestDataset(rawData, dateColumn)

  // Pass latest all data to get the rows
  const dataSetRows = DatasetHelper.getDatasetRows(chartDefinition, rawData)

  // Filter the rows to create the visualisation dataset
  const timeseriesData = DatasetHelper.filterRowsByDisplayColumns(chartDefinition, dataSetRows, true)

  return {
    latestData,
    dataSetRows,
    timeseriesData,
  }
}

export type GetDateValueResponse = {
  measure: components['schemas']['DashboardVisualisationColumnDefinition']
  value: string
}

export default {
  createChart,
  createTimeseriesCharts,
}

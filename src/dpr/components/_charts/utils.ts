import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { components } from '../../types/api'
import { ChartDetails, ChartMetaData } from '../../types/Charts'
import { DashboardDataResponse } from '../../types/Metrics'
import DatasetHelper from '../../utils/Dashboards/VisualisationDatasetHelper'
import { mapUnitToSymbol } from '../../utils/Dashboards/VisualisationUnitHelper'
import DashboardListUtils from '../_dashboards/dashboard-list/utils'
import {
  DashboardVisualisationData,
  DashboardVisualisationType,
  DashboardVisualisatonCardData,
  MoJTable,
} from '../_dashboards/dashboard-visualisation/types'
import { UnitType } from '../_dashboards/dashboard-visualisation/Validate'
import { PartialDate } from '../_filters/types'
import { Granularity } from '../_inputs/granular-date-range/types'
import BarTimeseriesChart from './chart/bar-timeseries/BarTimeseriesChart'
import BarChart from './chart/bar/BarChart'
import DoughnutChart from './chart/doughnut/DoughnutChart'
import HeatmapChart from './chart/heatmap/HeatmapChart'
import LineTimeseriesChart from './chart/line-timeseries/LineTimeseriesChart'
import LineChart from './chart/line/LineChart'

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
  query: Record<string, string | string[]>,
  partialDate?: PartialDate,
) => {
  let table: MoJTable | undefined
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
        chart = new LineTimeseriesChart()
          .withDefinition(chartDefinition)
          .withData(timeseriesData)
          .withPartialDate(partialDate)
          .build()
        break
      case DashboardVisualisationType.BAR_TIMESERIES:
        chart = new BarTimeseriesChart()
          .withDefinition(chartDefinition)
          .withData(timeseriesData)
          .withPartialDate(partialDate)
          .build()
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
  const { columns } = chartDefinition
  const dateColumn = DatasetHelper.getDateColumn(columns)

  const data = DatasetHelper.getLastestDataset(rawData, dateColumn)
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
  const dateMeasure = DatasetHelper.getDateMeasure(chartDefinition.columns.measures)
  const latestData = DatasetHelper.getLastestDataset(rawData, dateMeasure)
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
  const { measures } = chartDefinition.columns
  const meta: ChartMetaData[] = []
  const headlines: ChartMetaData[] = createHeadlines(chartDefinition, data, timeseries)

  const dateData = DatasetHelper.getDateDataFromResult(measures, data)
  if (dateData) {
    const { value } = dateData
    meta.push({
      label: 'Values for:',
      value,
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
  const isListChart = !!measures.find(col => col.axis)
  let headline: ChartMetaData | undefined
  let headlineColumn: components['schemas']['DashboardVisualisationColumnDefinition'] | undefined
  let value: number | undefined
  let label: string = ''

  if (timeseries) {
    headlineColumn = measures.find(col => col.type !== 'date')

    if (headlineColumn) {
      const { id } = headlineColumn
      const { raw } = data[0][id]

      const dateData = DatasetHelper.getDateDataFromResult(measures, data)
      if (dateData) {
        label = dateData.value
      }

      value = raw ? Number(raw) : undefined

      if (value) {
        headline = {
          label,
          value,
        }
      }
    }
  } else {
    headlineColumn = !isListChart ? measures[0] : measures.find(col => col.axis && col.axis === 'y')

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

const mapTableHead = (headerColumns: components['schemas']['DashboardVisualisationColumnDefinition'][]) => {
  return headerColumns.map(column => {
    const unitSymbol = mapUnitToSymbol(column.unit as UnitType)
    const headText = unitSymbol ? `${column.display} (${unitSymbol})` : column.display
    return { text: headText || '' }
  })
}

const createSnapshotTable = (
  chartDefinition: components['schemas']['DashboardVisualisationDefinition'],
  data: DashboardDataResponse[],
): MoJTable => {
  const { columns } = chartDefinition
  const { measures } = columns
  const keys = columns.keys || []
  const head = mapTableHead([...keys, ...measures])

  const filteredRowData = DatasetHelper.filterRowsByDisplayColumns(chartDefinition, data, true)
  const rows = DashboardListUtils.createTableRows(filteredRowData)

  return {
    head,
    rows,
  }
}

/**
 * Creates the a table representation for a timeseries chart
 * - ensures the Date column is always at index 0 when there are multiple rows
 *
 * @param {components['schemas']['DashboardVisualisationDefinition']} chartDefinition
 * @param {DashboardDataResponse[]} timeseriesData
 * @return {*}  {MoJTable}
 */
const createTimeseriesTable = (
  chartDefinition: components['schemas']['DashboardVisualisationDefinition'],
  timeseriesData: DashboardDataResponse[],
): MoJTable => {
  const { columns } = chartDefinition
  const { keys, measures = [] } = columns

  const safeKeys = keys ?? []
  let flatTimeseriesData = timeseriesData.flat()

  let tableColumns: components['schemas']['DashboardVisualisationColumnDefinition'][]

  if (timeseriesData.length > 1) {
    const dateMeasures = measures.filter(m => m.type === 'date')

    if (dateMeasures.length !== 1) {
      throw new Error('Multi-timeseries tables require exactly one date measure')
    }

    const [dateColumn] = dateMeasures
    const valueColumns = measures.filter(m => m.type !== 'date')

    tableColumns = [dateColumn, ...safeKeys, ...valueColumns]
  } else {
    flatTimeseriesData = DatasetHelper.filterRowsByDisplayColumns(chartDefinition, flatTimeseriesData)
    tableColumns = measures
  }

  const head = mapTableHead(tableColumns)
  const rows = DashboardListUtils.createTableRows(flatTimeseriesData, tableColumns)

  return { head, rows }
}

export type GetDateDataResponse = {
  measure: components['schemas']['DashboardVisualisationColumnDefinition']
  value: string
}

export default {
  createChart,
  createTimeseriesCharts,
}

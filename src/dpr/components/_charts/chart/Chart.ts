/* eslint-disable prefer-destructuring */
import { DashboardDataResponse } from '../../../types/Metrics'
import {
  DashboardVisualisationDataSet,
  VisualisationDefinitionKey,
  ChartMeasure,
  VisualisationDefinitionUnitType,
} from '../../_dashboards/dashboard-visualisation/types'
import ChartColoursHelper from './ChartColours'
import ChartLabelsHelper from './ChartLabels'
import { BarDefinitionMeasure } from './bar/types'
import ChartConfig from './chart-config'
import { LineDefinitionMeasure } from './line/types'
import DatasetHelper from '../../../utils/Dashboards/VisualisationDatasetHelper'

class Chart {
  labels: string[] = []

  datasets: DashboardVisualisationDataSet[] = []

  unit: VisualisationDefinitionUnitType | undefined

  responseData: DashboardDataResponse[] = []

  backgroundColor: string[][] = []

  borderWidth: number[] = [0, 0]

  borderColor: string[][] = []

  hexColours: string[] = []

  config = ChartConfig

  private xAxisColumn: BarDefinitionMeasure | LineDefinitionMeasure | undefined

  private yAxisColumn: BarDefinitionMeasure | LineDefinitionMeasure | undefined

  private groupedData: DashboardDataResponse[][] = []

  chartColoursHelper!: ChartColoursHelper

  chartLabelsHelper!: ChartLabelsHelper

  withData = (responseData: DashboardDataResponse[]) => {
    this.responseData = responseData
    this.initHelpers()
    return this
  }

  initUnit = (measures: ChartMeasure[]) => {
    this.unit = measures.find((m) => m.unit)?.unit
  }

  initHelpers = () => {
    this.chartColoursHelper = new ChartColoursHelper()
    this.chartLabelsHelper = new ChartLabelsHelper()
  }

  // -----------------------------------------------------------------------------
  //  Datasets
  // ----------------------------------------------------------------------------

  /**
   * Creates chart.js datasets where:
   * - where each row is a dataset
   * - each column name is an x axis label
   *
   * @param {ChartMeasure[]} measures
   * @param {VisualisationDefinitionKey[]} keys
   * @memberof Chart
   */
  createDatasets = (measures: ChartMeasure[], keys: VisualisationDefinitionKey[]) => {
    this.datasets = this.responseData.map((row, datasetIndex) => {
      const label = this.chartLabelsHelper.getDatasetLabel(keys, row)
      const data = this.createDatasetValues(measures, row)
      const total = data.reduce((acc: number, val: number) => acc + val, 0)

      return {
        label,
        data,
        total,
        ...this.setStyles(datasetIndex),
      }
    })

    this.labels = this.chartLabelsHelper.getLabels(measures)
  }

  /**
   * Creates chart.js datasets where:
   * - ecah column is a dataset
   * - each value in a column is an x axis label
   *
   * @param {ChartMeasure[]} measures
   * @param {VisualisationDefinitionKey[]} keys
   * @memberof Chart
   */
  createListDatasets = (measures: ChartMeasure[], keys: VisualisationDefinitionKey[]) => {
    this.xAxisColumn = measures.find((col: BarDefinitionMeasure | LineDefinitionMeasure) => col.axis === 'x')
    this.yAxisColumn = measures.find((col: BarDefinitionMeasure | LineDefinitionMeasure) => col.axis === 'y')
    const yId = this.yAxisColumn?.id || ''
    const xId = this.xAxisColumn?.id || ''

    const keyIds = keys.map((key) => key.id)
    this.groupedData = keyIds.length ? DatasetHelper.groupRowsBy(this.responseData, keyIds) : [this.responseData]
    this.labels = this.chartLabelsHelper.getListLabels(this.groupedData, xId)

    this.datasets = this.groupedData.map((groupData, groupIndex) => {
      const data = Array(this.labels.length)
      groupData.forEach((row) => {
        const labelField = row[xId]
        const valueField = row[yId]

        const raw = valueField && valueField.raw ? Number(valueField.raw) : 0
        const dataIndex = this.labels.findIndex((l) => l === labelField.raw)

        if (dataIndex !== -1) {
          data[dataIndex] = Number(raw)
        }
      })

      const label = this.chartLabelsHelper.getDatasetLabel(keys, groupData[0])

      return {
        label,
        data,
        total: data.reduce((acc: number, val: number) => acc + val, 0),
        ...this.setStyles(groupIndex),
      }
    })
  }

  private createDatasetValues = (measures: ChartMeasure[], row: DashboardDataResponse) => {
    return measures.map((column) => {
      const rowId = column.id
      return row[rowId] && row[rowId].raw ? Number(row[rowId].raw) : 0
    })
  }

  // -----------------------------------------------------------------------------
  //  Styles
  // ----------------------------------------------------------------------------

  private setStyles = (datasetIndex: number) => {
    return this.chartColoursHelper.setColourStyles(datasetIndex)
  }
}

export { Chart }
export default Chart

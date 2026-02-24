/* eslint-disable prefer-destructuring */
import { DashboardDataResponse } from '../../../types/Metrics'
import {
  DashboardVisualisationDataSet,
  VisualisationDefinitionKey,
  ChartMeasure,
} from '../../_dashboards/dashboard-visualisation/types'
import ChartColoursHelper from './ChartColours'
import ChartLabelsHelper from './ChartLabels'
import ChartConfig from './chart-config'

class Chart {
  labels: string[] = []

  datasets: DashboardVisualisationDataSet[] = []

  unit: 'NUMBER' | 'PERCENTAGE' | undefined

  responseData: DashboardDataResponse[] = []

  backgroundColor: string[][] = []

  borderWidth: number[] = [0, 0]

  borderColor: string[][] = []

  hexColours: string[] = []

  config = ChartConfig

  chartColoursHelper!: ChartColoursHelper

  chartLabelsHelper!: ChartLabelsHelper

  withData = (responseData: DashboardDataResponse[]) => {
    this.responseData = responseData
    return this
  }

  initUnit = (measures: ChartMeasure) => {
    this.unit = measures.find((m) => m.unit)?.unit
  }

  initHelpers = () => {
    this.chartColoursHelper = new ChartColoursHelper()
    this.chartLabelsHelper = new ChartLabelsHelper()
  }

  createDatasets = (
    measures: ChartMeasure,
    keys: VisualisationDefinitionKey[],
    responseData: DashboardDataResponse[],
  ) => {
    this.datasets = responseData.map((row, datasetIndex) => {
      const label = this.createDatasetLabel(keys, row)
      const data = this.createDatasetValues(measures, row)
      const total = data.reduce((acc: number, val: number) => acc + val, 0)

      return {
        label,
        data,
        total,
        ...this.setStyles(datasetIndex),
      }
    })
  }

  private createDatasetLabel = (keys: VisualisationDefinitionKey[], row: DashboardDataResponse) => {
    return this.chartLabelsHelper.getDatasetLabel(keys, row)
  }

  private createDatasetValues = (measures: ChartMeasure, row: DashboardDataResponse) => {
    return measures.map((column) => {
      const rowId = column.id
      return row[rowId] && row[rowId].raw ? Number(row[rowId].raw) : 0
    })
  }

  setStyles = (datasetIndex: number) => {
    return this.chartColoursHelper.setColourStyles(datasetIndex)
  }

  createLabels = (measures: ChartMeasure) => {
    this.labels = this.chartLabelsHelper.getLabels(measures)
  }
}

export { Chart }
export default Chart

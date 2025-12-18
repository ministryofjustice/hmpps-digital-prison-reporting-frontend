/* eslint-disable prefer-destructuring */
import { DashboardDataResponse } from '../../../types/Metrics'
import {
  DashboardVisualisationDataSet,
  VisualisationDefinitionKey,
  ChartMeasure,
} from '../../_dashboards/dashboard-visualisation/types'
import { ChartColours } from './ChartColours'
import ChartConfig from './chart-config'

class Chart {
  labels: string[] = []

  private labelId: string | undefined = undefined

  datasets: DashboardVisualisationDataSet[] = []

  unit: 'NUMBER' | 'PERCENTAGE' | undefined

  responseData: DashboardDataResponse[] = []

  backgroundColor: string[][] = []

  borderWidth: number[] = [0, 0]

  borderColor: string[][] = []

  hexColours: string[] = []

  config = ChartConfig

  withData = (responseData: DashboardDataResponse[]) => {
    this.responseData = responseData
    return this
  }

  initUnit = (measures: ChartMeasure) => {
    this.unit = measures.find((m) => m.unit)?.unit
  }

  createDatasets = (measures: ChartMeasure, responseData: DashboardDataResponse[]) => {
    this.hexColours = new ChartColours().getHexPallette()
    this.datasets = responseData.map((row, datasetIndex) => {
      const label = this.createDatasetLabel(row)
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

  private createDatasetLabel = (row: DashboardDataResponse) => {
    return this.labelId && row[this.labelId] ? `${row[this.labelId].raw}` : 'All'
  }

  private createDatasetValues = (measures: ChartMeasure, row: DashboardDataResponse) => {
    return measures.map((column) => {
      const rowId = column.id
      return row[rowId] && row[rowId].raw ? Number(row[rowId].raw) : 0
    })
  }

  setStyles = (datasetIndex: number) => {
    const colour = this.hexColours[datasetIndex]
    return {
      backgroundColor: colour,
      borderColor: colour,
    }
  }

  createLabels = (measures: ChartMeasure) => {
    this.labels = measures.map((col) => col.display || '')
  }

  getLabelId = (keys: VisualisationDefinitionKey[]) => {
    if (keys.length) {
      const lastIndex = keys.length - 1
      this.labelId = keys[lastIndex]?.id
    }
  }
}

export { Chart }
export default Chart

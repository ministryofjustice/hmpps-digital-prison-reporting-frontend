/* eslint-disable prefer-destructuring */
import { DashboardDataResponse } from '../../../../types/Metrics'
import {
  DashboardVisualisationType,
  DashboardVisualisationData,
  BarDefinitionType,
  DashboardVisualisationDataSet,
} from '../../../_dashboards/dashboard-visualisation/types'
import { components } from '../../../../types/api'
import DashboardVisualisationSchemas from '../../../_dashboards/dashboard-visualisation/Validate'

class BarChart {
  private definition!: BarDefinitionType

  private measures!: BarDefinitionType['columns']['measures']

  private keys!: BarDefinitionType['columns']['measures']

  private responseData: DashboardDataResponse[] = []

  private isList = false

  private labels: string[] = []

  private labelId: string | undefined = undefined

  private datasets: DashboardVisualisationDataSet[] = []

  private unit: 'NUMBER' | 'PERCENTAGE' | undefined

  private init = () => {
    this.measures = this.definition.columns.measures
    this.keys = this.definition.columns.keys || []
    this.isList = !!this.measures.find((col) => col.axis)
    this.initUnit()
  }

  private initUnit = () => {
    this.unit = this.measures[0].unit ? this.measures[0].unit : undefined
  }

  private createDatasets = () => {
    this.datasets = this.responseData.map((row) => {
      const label = this.createDatasetLabel(row)
      const data = this.createDatasetValues(row)
      const total = data.reduce((acc: number, val: number) => acc + val, 0)
      return {
        label,
        data,
        total,
      }
    })
  }

  private createDatasetLabel = (row: DashboardDataResponse) => {
    return this.labelId && row[this.labelId] ? `${row[this.labelId].raw}` : 'All'
  }

  private createDatasetValues = (row: DashboardDataResponse) => {
    return this.measures.map((column) => {
      const rowId = column.id
      return row[rowId] && row[rowId].raw ? Number(row[rowId].raw) : 0
    })
  }

  private createLabels = () => {
    this.labels = this.measures.map((col) => col.display || '')
  }

  private getLabelId = () => {
    if (this.keys.length) {
      const lastIndex = this.keys.length - 1
      this.labelId = this.keys[lastIndex]?.id
    }
  }

  withDefinition = (definition: components['schemas']['DashboardVisualisationDefinition']) => {
    this.definition = DashboardVisualisationSchemas.BarSchema.parse(definition)
    this.init()

    return this
  }

  withData = (responseData: DashboardDataResponse[]) => {
    this.responseData = responseData
    return this
  }

  build = (): DashboardVisualisationData => {
    this.createDatasets()
    this.createLabels()
    return {
      type: DashboardVisualisationType.BAR,
      unit: this.unit,
      data: {
        labels: this.labels,
        datasets: this.datasets,
      },
    }
  }
}

export { BarChart }
export default BarChart

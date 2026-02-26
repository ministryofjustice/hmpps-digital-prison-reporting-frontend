/* eslint-disable prefer-destructuring */
import { DashboardDataResponse } from '../../../../types/Metrics'
import {
  DashboardVisualisationType,
  DashboardVisualisationData,
  VisualisationDefinitionKey,
} from '../../../_dashboards/dashboard-visualisation/types'
import { components } from '../../../../types/api'
import Chart from '../Chart'
import BarChartSchemas from './validate'
import { BarDefinitionMeasure, BarDefinitionOptions, BarDefinitionType } from './types'

class BarChart extends Chart {
  private definition!: BarDefinitionType

  private measures!: BarDefinitionMeasure[]

  private keys!: VisualisationDefinitionKey[]

  private options: BarDefinitionOptions | undefined

  override responseData: DashboardDataResponse[] = []

  private isList = false

  private barCount = 0

  withDefinition = (definition: components['schemas']['DashboardVisualisationDefinition']) => {
    this.definition = BarChartSchemas.BarSchema.parse(definition)
    this.initFromDefinitionData()

    return this
  }

  private initFromDefinitionData = () => {
    this.measures = this.definition.columns.measures
    this.options = this.definition.options
    this.keys = this.definition.columns.keys || []
    this.isList = !!this.measures.find((col) => col.axis)
    this.initUnit(this.measures)
  }

  getCanvasHeight = () => {
    this.barCount = this.datasets.length * this.datasets[0].data.length
    return this.options?.horizontal ? this.barCount : 5
  }

  build = (): DashboardVisualisationData => {
    if (!this.isList) {
      this.createDatasets(this.measures, this.keys) // Chart.ts
    } else {
      this.createListDatasets(this.measures, this.keys)
    }

    // Augment the datasets with chart specific config
    this.augmentDataset()

    // Set the bespoke chart.js options for the chart
    this.setBespokeOptions()

    const height = this.getCanvasHeight()

    return {
      type: DashboardVisualisationType.BAR,
      options: {
        height,
        unit: this.unit,
        timeseries: false,
      },
      data: {
        labels: this.labels,
        datasets: this.datasets,
        config: this.config,
      },
    }
  }

  augmentDataset = () => {
    this.datasets = this.datasets.map((set) => {
      return {
        ...set,
        borderWidth: [0, 0],
        datalabels: {
          align: 'center',
          anchor: 'bottom',
        },
      }
    })
  }

  setBespokeOptions = () => {
    let indexAxis = 'x'
    let scales

    if (this.options) {
      const { horizontal, xStacked, yStacked } = this.options
      indexAxis = horizontal ? 'y' : indexAxis
      if (xStacked || yStacked) {
        scales = {
          ...(xStacked && { x: { stacked: xStacked } }),
          ...(yStacked && { y: { stacked: yStacked } }),
        }
      }
    }

    this.config = {
      ...this.config,
      indexAxis,
      ...(scales && { scales }),
    }
  }
}

export { BarChart }
export default BarChart

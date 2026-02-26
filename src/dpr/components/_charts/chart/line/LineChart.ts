/* eslint-disable prefer-destructuring */
import {
  DashboardVisualisationType,
  DashboardVisualisationData,
  VisualisationDefinitionKey,
} from '../../../_dashboards/dashboard-visualisation/types'
import { components } from '../../../../types/api'
import Chart from '../Chart'
import { LineDefinitionMeasure, LineDefinitionType } from './types'
import LineChartSchemas from './validate'

class LineChart extends Chart {
  private definition!: LineDefinitionType

  private measures!: LineDefinitionMeasure[]

  private keys!: VisualisationDefinitionKey[]

  private isList = false

  withDefinition = (definition: components['schemas']['DashboardVisualisationDefinition']) => {
    this.definition = LineChartSchemas.LineSchema.parse(definition)
    this.initFromDefinitionData()

    return this
  }

  private initFromDefinitionData = () => {
    this.measures = this.definition.columns.measures
    this.keys = this.definition.columns.keys || []
    this.isList = !!this.measures.find((col) => col.axis)
    this.initUnit(this.measures)
  }

  build = (): DashboardVisualisationData => {
    if (!this.isList) {
      this.createDatasets(this.measures, this.keys)
    } else {
      this.createListDatasets(this.measures, this.keys)
    }

    // Augment the datasets with chart specific config
    this.augmentDataset()

    // Set the bespoke chart.js options for the chart
    this.setBespokeOptions()

    return {
      type: DashboardVisualisationType.LINE,
      options: {
        unit: this.unit,
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
        pointStyle: 'circle',
        pointRadius: 4,
        pointHoverRadius: 10,
        pointHitRadius: 20,
        datalabels: {
          display: false,
        },
      }
    })
  }

  setBespokeOptions = () => {
    this.config = {
      ...this.config,
      scales: {
        y: {
          min: 0,
          ticks: {
            fontSize: 12,
          },
        },
        x: {
          ticks: {
            fontSize: 12,
          },
        },
      },
    }
  }
}

export { LineChart }
export default LineChart

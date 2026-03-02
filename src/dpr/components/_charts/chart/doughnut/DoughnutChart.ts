/* eslint-disable prefer-destructuring */
import {
  DashboardVisualisationType,
  DashboardVisualisationData,
  VisualisationDefinitionKey,
} from '../../../_dashboards/dashboard-visualisation/types'
import { components } from '../../../../types/api'
import Chart from '../Chart'
import { DoughnutDefinitionMeasure, DoughnutDefinitionType } from './types'
import DoughnutChartSchemas from './validate'

class DoughnutChart extends Chart {
  private definition!: DoughnutDefinitionType

  private measures!: DoughnutDefinitionMeasure[]

  private keys!: VisualisationDefinitionKey[]

  private init = () => {
    this.measures = this.definition.columns.measures
    this.keys = this.definition.columns.keys || []
    this.initUnit(this.measures)
  }

  withDefinition = (definition: components['schemas']['DashboardVisualisationDefinition']) => {
    this.definition = DoughnutChartSchemas.DoughnutSchema.parse(definition)
    this.init()

    return this
  }

  build = (): DashboardVisualisationData => {
    this.createDatasets(this.measures, this.keys)
    this.augmentDataset()
    this.setBespokeOptions()

    return {
      type: DashboardVisualisationType.DONUT,
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

  private augmentDataset = () => {
    const hexColours = this.chartColoursHelper.getHexPallette()
    this.datasets = this.datasets.map((set) => {
      return {
        ...set,
        backgroundColor: [...hexColours, ...hexColours],
        borderColor: '#FFFFFF',
        hoverOffset: 4,
        datalabels: {
          anchor: 'center',
          borderWidth: 0,
        },
      }
    })
  }

  private setBespokeOptions = () => {
    const cutout = this.datasets.length === 1 ? '50%' : '20%'
    this.config = {
      ...this.config,
      cutout,
    }
  }
}

export { DoughnutChart }
export default DoughnutChart

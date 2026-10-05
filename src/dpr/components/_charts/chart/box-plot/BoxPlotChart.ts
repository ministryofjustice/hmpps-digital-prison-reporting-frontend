import {
  DashboardVisualisationData,
  DashboardVisualisationType,
  VisualisationDefinitionKey,
} from '../../../_dashboards/dashboard-visualisation/types'
import { components } from '../../../../types/api'
import Chart from '../Chart'
import BoxPlotChartSchemas from './validate'
import { BoxPlotDefinitionMeasure, BoxPlotDefinitionType } from './types'

export class BoxPlotChart extends Chart {
  private definition!: BoxPlotDefinitionType

  private measures!: BoxPlotDefinitionMeasure[]

  private keys!: VisualisationDefinitionKey[]

  private init = () => {
    this.measures = this.definition.columns.measures
    this.keys = this.definition.columns.keys || []
    this.initUnit(this.measures)
  }

  withDefinition = (definition: components['schemas']['DashboardVisualisationDefinition']) => {
    this.definition = BoxPlotChartSchemas.BoxPlotSchema.parse(definition)
    this.init()

    return this
  }

  build = (): DashboardVisualisationData => {
    this.createDatasets(this.measures, this.keys)
    this.augmentDataset()
    this.setBespokeOptions()

    return {
      type: DashboardVisualisationType.BOX_PLOT,
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

  private augmentDataset = () => {}

  private setBespokeOptions = () => {}
}

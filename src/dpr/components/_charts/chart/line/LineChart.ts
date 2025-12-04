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

  private init = () => {
    this.measures = this.definition.columns.measures
    this.keys = this.definition.columns.keys || []
    this.initUnit(this.measures)
    this.getLabelId(this.keys)
  }

  withDefinition = (definition: components['schemas']['DashboardVisualisationDefinition']) => {
    this.definition = LineChartSchemas.LineSchema.parse(definition)
    this.init()

    return this
  }

  build = (): DashboardVisualisationData => {
    this.createDatasets(this.measures, this.responseData)
    this.createLabels(this.measures)

    return {
      type: DashboardVisualisationType.LINE,
      unit: this.unit,
      data: {
        labels: this.labels,
        datasets: this.datasets,
      },
    }
  }
}

export { LineChart }
export default LineChart

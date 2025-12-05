/* eslint-disable prefer-destructuring */
import {
  DashboardVisualisationType,
  DashboardVisualisationData,
} from '../../../_dashboards/dashboard-visualisation/types'
import { components } from '../../../../types/api'
import { BarTimeseriesDefinitionType } from './types'
import BarTimeseriesChartSchemas from './validate'
import TimeseriesChart from '../ChartTimeseries'
import BarChart from '../bar/BarChart'

class BarTimeseriesChart extends TimeseriesChart {
  private definition!: BarTimeseriesDefinitionType

  private BarChartBuilder: BarChart = new BarChart()

  withDefinition = (definition: components['schemas']['DashboardVisualisationDefinition']) => {
    this.definition = BarTimeseriesChartSchemas.BarTimeseriesSchema.parse(definition)
    this.initFromDefinition(this.definition)

    return this
  }

  build = (): DashboardVisualisationData => {
    this.buildDatasets()
    this.setStyles()
    this.datasets = this.BarChartBuilder.augmentDataset(this.datasets)
    this.BarChartBuilder.setBespokeOptions()

    return {
      type: DashboardVisualisationType.BAR,
      unit: this.unit,
      timeseries: true,
      data: {
        labels: this.labels,
        datasets: this.datasets,
        config: this.config,
      },
    }
  }

  private setStyles = () => {
    this.datasets = this.datasets.map((set, datasetIndex) => {
      const colour = this.hexColours[datasetIndex]
      return {
        ...set,
        backgroundColor: colour,
        borderColor: colour,
      }
    })
  }
}

export { BarTimeseriesChart }
export default BarTimeseriesChart

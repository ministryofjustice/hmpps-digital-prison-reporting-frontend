/* eslint-disable prefer-destructuring */
import {
  DashboardVisualisationType,
  DashboardVisualisationData,
} from '../../../_dashboards/dashboard-visualisation/types'
import { components } from '../../../../types/api'
import { LineTimeseriesDefinitionType } from './types'
import LineTimeseriesChartSchemas from './validate'
import TimeseriesChart from '../ChartTimeseries'
import LineChart from '../line/LineChart'

class LineTimeseriesChart extends TimeseriesChart {
  private definition!: LineTimeseriesDefinitionType

  private lineChartBuilder: LineChart = new LineChart()

  withDefinition = (definition: components['schemas']['DashboardVisualisationDefinition']) => {
    this.definition = LineTimeseriesChartSchemas.LineTimeseriesSchema.parse(definition)
    this.initFromDefinition(this.definition)
    return this
  }

  build = (): DashboardVisualisationData => {
    this.buildDatasets()
    this.datasets = this.lineChartBuilder.augmentDataset(this.datasets)
    this.setStyles()
    this.setPartialDateStyles()
    this.config = this.lineChartBuilder.setBespokeOptions()

    return {
      type: DashboardVisualisationType.LINE,
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

  private setPartialDateStyles = () => {
    console.log({ ps: this.partialDate })
    this.datasets.map((d, i) => {
      //
      let partialStyle
      if (
        (i === 0 && this.partialDate && this.partialDate.start) ||
        (i === d.data.length - 1 && this.partialDate && this.partialDate.end)
      ) {
        partialStyle = {
          segment: {
            borderDash: [6, 6],
          },
        }
      }

      console.log(partialStyle)
      return {
        ...d,
        ...partialStyle,
      }
    })
  }
}

export { LineTimeseriesChart }
export default LineTimeseriesChart

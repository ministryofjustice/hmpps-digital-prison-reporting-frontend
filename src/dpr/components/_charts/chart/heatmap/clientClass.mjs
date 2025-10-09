/* eslint-disable class-methods-use-this */
import ChartVisualisation from '../clientClass.mjs'

export default class LineChartVisualisation extends ChartVisualisation {
  static getModuleName() {
    return 'matrix'
  }

  initialise() {
    this.setupCanvas()
    this.settings = this.initSettings()
    this.chartData = this.generateChartData(this.settings)
    this.initChart(this.chartData)
  }

  initSettings() {
    return {
      options: this.setOptions(),
      toolTipOptions: this.setToolTipOptions(),
      styling: this.setDatasetStyling(),
    }
  }

  setDatasetStyling() {
    return {}
  }

  setToolTipOptions() {
    return {}
  }

  setOptions() {
    return {}
  }
}

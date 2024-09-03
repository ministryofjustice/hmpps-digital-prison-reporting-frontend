/* global Chart */
import { DprClientClass } from '../../DprClientClass.mjs'

export default class ChartVisualisation extends DprClientClass {
  static getModuleName() {
    return 'chart'
  }

  initialise() {
    this.chartContext = this.getElement().querySelectorAll('canvas')
    this.chartData = this.getElement().getAttribute('data-dpr-chart-data')
    this.initChart()
  }

  initChart() {
    return new Chart(this.chartContext, JSON.parse(this.chartData))
  }
}

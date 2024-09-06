import ChartVisualisation from '../clientClass.mjs'

export default class BarChartVisualisation extends ChartVisualisation {
  static getModuleName() {
    return 'line-chart'
  }

  initialise() {
    this.setupCanvas()
    this.settings = this.initSettings()
    this.chartData = this.generateChartData(this.settings)
    this.initChart(this.chartData)
  }

  initSettings() {
    return {
      pluginsOptions: this.setPluginsOptions(),
      styling: this.setDatasetStyling(),
    }
  }

  setDatasetStyling() {
    const pallette = this.getColourPallette()
    return pallette.map((colour) => {
      return {
        borderColor: colour,
        backgroundColor: colour,
        pointStyle: 'circle',
        pointRadius: 4,
        pointHoverRadius: 10,
        datalabels: {
          display: false,
        },
      }
    })
  }

  setPluginsOptions() {
    return {
      legend: {
        display: true,
        position: 'bottom',
      },
    }
  }
}

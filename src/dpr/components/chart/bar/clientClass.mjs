import ChartVisualisation from '../clientClass.mjs'

export default class BarChartVisualisation extends ChartVisualisation {
  static getModuleName() {
    return 'bar-chart'
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
      styling: this.setDatasetStyling(),
    }
  }

  setDatasetStyling() {
    const pallette = this.getColourPallette()
    return pallette.map((colour) => {
      return {
        borderColor: colour,
        backgroundColor: colour,
        datalabels: {
          display: false,
          align: 'end',
          anchor: 'end',
        },
      }
    })
  }

  setOptions() {
    const { indexAxis, stacked } = this.chartParams
    return {
      indexAxis: indexAxis || 'x',
      ...(stacked && {
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      }),
      responsive: true,
      maintainAspectRatio: true,
    }
  }
}

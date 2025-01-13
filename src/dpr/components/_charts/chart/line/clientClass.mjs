/* eslint-disable class-methods-use-this */
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
      toolTipOptions: this.setToolTipOptions(),
      styling: this.setDatasetStyling(),
    }
  }

  isPartialData(ctx) {
    console.log(ctx)
  }

  setDatasetStyling() {
    const pallette = this.getColourPallette()
    return pallette.map((colour) => {
      return {
        borderColor: colour.hex,
        backgroundColor: colour.hex,
        pointStyle: 'circle',
        pointRadius: 4,
        pointHoverRadius: 10,
        datalabels: {
          display: false,
        },
        segment: {
          borderDash: [6, 6],
        },
      }
    })
  }

  setToolTipOptions() {
    const chartCtx = this
    return {
      callbacks: {
        label(context) {
          const { label } = context
          const { data, label: legend } = context.dataset
          const value = data[context.dataIndex]
          chartCtx.setHoverValue(label, value, legend, chartCtx)
        },
      },
    }
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

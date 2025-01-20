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
    this.lastIndex = this.chartData.data.labels.length - 1
    this.initChart(this.chartData)
  }

  initSettings() {
    return {
      pluginsOptions: this.setPluginsOptions(),
      toolTipOptions: this.setToolTipOptions(),
      styling: this.setDatasetStyling(),
    }
  }

  setPartialStyle(ctx) {
    let style
    if ((this.partialEnd && ctx.p1DataIndex === this.lastIndex) || (this.partialStart && ctx.p1DataIndex === 1)) {
      style = [6, 6]
    }
    return style
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
          borderDash: (ctx) => this.setPartialStyle(ctx),
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

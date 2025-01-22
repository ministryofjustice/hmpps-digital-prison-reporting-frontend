/* eslint-disable class-methods-use-this */
import ChartVisualisation from '../clientClass.mjs'

export default class LineChartVisualisation extends ChartVisualisation {
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
      options: this.setOptions(),
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
    const ctx = this
    return {
      callbacks: {
        label(context) {
          const { label } = context
          const { data, label: legend } = context.dataset
          const value = data[context.dataIndex]
          ctx.setHoverValue({ label, value, legend, ctx })
        },
      },
    }
  }

  setOptions() {
    return {
      scales: {
        y: {
          min: 0,
          ticks: {
            fontSize: 12,
          },
        },
        x: {
          ticks: {
            fontSize: 12,
          },
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

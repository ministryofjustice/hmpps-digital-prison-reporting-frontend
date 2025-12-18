/* eslint-disable prefer-destructuring */
/* eslint-disable class-methods-use-this */
import ChartVisualisation from '../clientClass.mjs'

export default class MatrixChartVisualisation extends ChartVisualisation {
  static getModuleName() {
    return 'matrix-chart'
  }

  initialise() {
    this.setupCanvas()
    this.settings = this.initSettings()
    this.chartData = this.generateChartData(this.settings)
    this.initChart(this.chartData)
  }

  initSettings() {
    return {
      toolTipOptions: this.setToolTipOptions(),
    }
  }

  setToolTipOptions() {
    const ctx = this
    return {
      callbacks: {
        title(context) {
          const { raw } = context[0]
          const title = `${raw.y} ${raw.x}`
          return title
        },
        label(context) {
          const { data, label: legend } = context.dataset
          const dataValue = data[context.dataIndex]
          const label = `${dataValue.y} ${dataValue.x}`
          const value = `${dataValue.v}${ctx.suffix}`
          ctx.setHoverValue({ label, value, legend, ctx })
          return `${legend}: ${value}`
        },
      },
    }
  }

  generateChartData(settings) {
    const { config } = this.chartParams
    const { options, plugins, pluginsOptions, toolTipOptions, hoverEvent } = settings
    const d = {
      type: this.type,
      data: {
        datasets: this.createDatasets(),
      },
      options: {
        ...config,
        ...(options && options),
        ...(hoverEvent && hoverEvent),
        plugins: {
          ...config.plugins,
          legend: {
            position: 'bottom',
            display: false,
          },
          ...(pluginsOptions && pluginsOptions),
          datalabels: {
            display: false,
          },
          tooltip: {
            ...config.plugins.tooltip,
            ...(toolTipOptions && toolTipOptions),
          },
        },
      },
      plugins: plugins && plugins.length ? [...plugins] : [],
    }

    return d
  }

  createDatasets() {
    const { datasets } = this.chartParams
    return datasets.map((d) => {
      const { label, data } = d
      return {
        label,
        data,
        backgroundColor(c) {
          return c.raw.c
        },
        width: ({ chart }) => (chart.chartArea || {}).width / chart.scales.x.ticks.length - 1,
        height: ({ chart }) => (chart.chartArea || {}).height / chart.scales.y.ticks.length - 1,
      }
    })
  }
}

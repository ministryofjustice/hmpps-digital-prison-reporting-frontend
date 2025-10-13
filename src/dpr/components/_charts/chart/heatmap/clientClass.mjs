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
      options: this.setOptions({ scaleType: 'category' }),
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

  setOptions({ scaleType }) {
    return {
      scales: this.setScales({ scaleType }),
    }
  }

  generateChartData(settings) {
    const { datasets } = this.chartParams
    const { options, styling, datalabels, plugins, pluginsOptions, toolTipOptions, hoverEvent } = settings
    return {
      type: this.type,
      data: {
        datasets: this.createDatasets(datasets, styling),
        width: ({ chart }) => (chart.chartArea || {}).width / chart.scales.x.ticks.length - 1,
        height: ({ chart }) => (chart.chartArea || {}).height / chart.scales.y.ticks.length - 1,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 0,
        },
        hover: {
          animationDuration: 0,
        },
        ...(options && options),
        ...(hoverEvent && hoverEvent),
        plugins: {
          legend: {
            position: 'bottom',
          },
          ...(pluginsOptions && pluginsOptions),
          ...(datalabels && { datalabels }),
          tooltip: {
            ...this.setToolTip(),
            ...(toolTipOptions && toolTipOptions),
          },
        },
      },
      plugins: plugins && plugins.length ? [...plugins] : [],
    }
  }

  createDatasets(datasets, styling) {
    return datasets.map((d, i) => {
      const { label, data } = d
      const s = styling[i % 6] ? styling[i % 6] : styling[0]
      return {
        label,
        data,
        ...s,
      }
    })
  }

  setScales({ scaleType }) {
    let xTime
    let yTime
    let xLabels
    let yLabels

    switch (scaleType) {
      case 'time':
        yTime = {
          unit: 'week',
        }
        xTime = {
          unit: 'day',
        }
        break
      case 'category':
        {
          const { datasets } = this.chartParams
          console.log(JSON.stringify({ datasets }))
          xLabels = [
            ...new Set(
              datasets[0].map((d) => {
                return d.x
              }),
            ),
          ]
          yLabels = [
            ...new Set(
              datasets[0].map((d) => {
                return d.y
              }),
            ),
          ]
        }
        break
      default:
        break
    }

    const grid = {
      display: false,
      drawBorder: false,
    }
    const ticks = {
      padding: 1,
      maxRotation: 0,
      stepSize: 1,
    }
    const offset = true
    const common = {
      offset,
      ticks,
      grid,
    }

    return {
      y: {
        left: 'left',
        ...(scaleType && { type: scaleType }),
        ...(yLabels && { labels: yLabels }),
        ...(yTime && { time: yTime }),
        ...common,
      },
      x: {
        position: 'top',
        ...(scaleType && { type: scaleType }),
        ...(xLabels && { labels: xLabels }),
        ...(xTime && { time: xTime }),
        ...common,
      },
    }
  }
}

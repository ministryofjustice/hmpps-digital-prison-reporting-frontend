/* eslint-disable class-methods-use-this */
import Chart from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix'

import { DprClientClass } from '../../../DprClientClass.mjs'

class ChartVisualisation extends DprClientClass {
  setupCanvas() {
    this.chartContext = this.getElement().querySelector('canvas')

    // data
    this.id = this.chartContext.getAttribute('id')
    this.chartParams = JSON.parse(this.getElement().getAttribute('data-dpr-chart-data'))
    this.type = this.getElement().getAttribute('data-dpr-chart-type')
    this.setValueSuffix()

    // elements
    this.legend = this.getElement().querySelector(`#js-legend-${this.id}`)

    // ChartCard elements
    this.tooltipDetailsEl = document.getElementById(`dpr-${this.id}-tooltip-details`)
    this.headlineValuesEl = document.getElementById(`dpr-${this.id}-headline-values`)
    this.labelElement = document.getElementById(`dpr-${this.id}-label`)
    this.valueElement = document.getElementById(`dpr-${this.id}-value`)
    this.legendElement = document.getElementById(`dpr-${this.id}-legend`)
    this.legendElement = document.getElementById(`dpr-${this.id}-legend`)

    // Time series
    this.timeseries = this.getElement().getAttribute('data-dpr-chart-timeseries')
    if (this.timeseries) {
      this.daterangeInputs = document.querySelectorAll('.dpr-granular-date-range')
      if (this.daterangeInputs && this.daterangeInputs.length) {
        this.daterangeInputs.forEach((input) => {
          this.partialStart = input.getAttribute('data-partial-start') === 'true'
          this.partialEnd = input.getAttribute('data-partial-end') === 'true'
        })
      } else {
        this.partialStart = false
        this.partialEnd = false
      }
    }

    // flags
    this.singleDataset = this.chartParams.datasets.length === 1
  }

  initChart() {
    Chart.defaults.font.family = 'GDS Transport'
    Chart.defaults.font.size = 12
    Chart.register(ChartDataLabels)
    Chart.register(MatrixController, MatrixElement)
    this.chart = new Chart(this.chartContext, this.chartData)

    console.log(JSON.stringify(this.chartData, null, 2))

    this.initChartEvents()
  }

  generateChartData(settings) {
    const { datasets, labels, config } = this.chartParams
    const { options, datalabels, plugins, pluginsOptions, toolTipOptions, hoverEvent } = settings

    const chartData = {
      type: this.type,
      data: {
        labels,
        datasets,
      },
      options: {
        ...config,
        ...(options && options),
        ...(hoverEvent && hoverEvent),
        plugins: {
          ...config.plugins,
          ...(pluginsOptions && pluginsOptions),
          ...(datalabels && { datalabels }),
          tooltip: {
            ...config.plugins.tooltip,
            ...(toolTipOptions && toolTipOptions),
          },
        },
      },
      plugins: plugins && plugins.length ? [...plugins] : [],
    }

    return chartData
  }

  setHoverValue({ label, value, legend, ctx }) {
    if (ctx.tooltipDetailsEl) {
      ctx.tooltipDetailsEl.style.display = 'block'
      ctx.labelElement.innerHTML = ctx.singleDataset ? `${label}` : `${legend}: ${label}`
      ctx.valueElement.innerHTML = `${value}`
    }
    if (ctx.headlineValuesEl) {
      ctx.headlineValuesEl.style.display = 'none'
    }
    if (!legend) {
      ctx.legendElement.style.display = 'none'
    }
  }

  setValueSuffix() {
    this.unit = this.getElement().getAttribute('data-dpr-chart-unit')
    this.suffix = this.unit === 'percentage' ? '%' : ''
  }

  isPercentage() {
    return this.unit === 'percentage'
  }

  initChartEvents() {
    this.chart.canvas.addEventListener('mouseout', (e) => {
      if (this.tooltipDetailsEl) this.tooltipDetailsEl.style.display = 'none'
      if (this.headlineValuesEl) this.headlineValuesEl.style.display = 'block'
    })
  }
}

export { ChartVisualisation }
export default ChartVisualisation

/* global Chart */
import { DprClientClass } from '../../DprClientClass.mjs'

export default class ChartVisualisation extends DprClientClass {
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
  }

  initChart() {
    this.chart = new Chart(this.chartContext, this.chartData)
    this.initChartEvents()
  }

  // Accessible colours from the MoJ Pattern Library
  getColourPallette() {
    return [
      '#1d70b8', // brand blue
      '#912b88', // purple
      '#00703c', // green
      '#003078', // dark blue
    ]
  }

  createDatasets(datasets, styling) {
    return datasets.map((d, i) => {
      const { label, data } = d
      const s = styling[i] ? styling[i] : styling[0]
      return {
        label,
        data,
        ...s,
      }
    })
  }

  generateChartData(settings) {
    const { datasets, labels } = this.chartParams
    const { options, styling, datalabels, plugins, pluginsOptions, toolTipOptions, hoverEvent } = settings

    return {
      type: this.type,
      data: {
        labels,
        datasets: this.createDatasets(datasets, styling),
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: {
          duration: 0,
        },
        ...(options && options),
        ...(hoverEvent && hoverEvent),
        plugins: {
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

  setToolTip() {
    return {
      backgroundColor: '#FFF',
      bodyColor: '#000',
      titleFont: {
        size: 16,
      },
      bodyFont: {
        size: 16,
      },
      titleColor: '#000',
      displayColors: false,
      borderWidth: 1,
      borderColor: '#b1b4b6',
      cornerRadius: 0,
      padding: 20,
      footerFont: {
        weight: 'bold',
      },
    }
  }

  setHoverValue(label, value, legend, ctx) {
    if (ctx.tooltipDetailsEl) {
      ctx.tooltipDetailsEl.style.display = 'block'
      ctx.labelElement.innerHTML = `${label}`
      ctx.valueElement.innerHTML = `${value}`
      ctx.legendElement.innerHTML = `${legend}`
    }
    if (ctx.headlineValuesEl) {
      ctx.headlineValuesEl.style.display = 'none'
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

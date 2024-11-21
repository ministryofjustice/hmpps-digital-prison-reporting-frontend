/* eslint-disable class-methods-use-this */
/* global Chart */
/* global ChartDataLabels */

import { DprClientClass } from '../../../DprClientClass.mjs'

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
    Chart.defaults.font.family = 'GDS Transport'
    Chart.register(ChartDataLabels)
    Chart.defaults.font.size = 16

    this.chart = new Chart(this.chartContext, this.chartData)
    this.initChartEvents()
  }

  // Accessible colours from the MoJ Pattern Library
  getColourPallette() {
    return [
      {
        name: 'blue',
        hex: '#1d70b8',
      },
      {
        name: 'purple',
        hex: '#912b88',
      },
      {
        name: 'green',
        hex: '#00703c',
      },
      {
        name: 'dark_blue',
        hex: '#003078',
      },
    ]
  }

  mapHexColourToName(hex, ctx) {
    const pallette = ctx.getColourPallette()
    const colour = pallette.find((p) => {
      return p.hex === hex
    })
    return colour ? colour.name : ''
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

  setHoverValue({ label, value, legend, ctx }) {
    if (ctx.tooltipDetailsEl) {
      ctx.tooltipDetailsEl.style.display = 'block'
      ctx.labelElement.innerHTML = `${legend}: ${label}`
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
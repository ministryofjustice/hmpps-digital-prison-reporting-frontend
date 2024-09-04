/* global Chart */
import { DprClientClass } from '../../DprClientClass.mjs'

export default class ChartVisualisation extends DprClientClass {
  setupCanvas() {
    this.chartContext = this.getElement().querySelector('canvas')
    this.id = this.chartContext.getAttribute('id')
    this.legend = this.getElement().querySelector(`#js-legend-${this.id}`)
    this.chartParams = JSON.parse(this.getElement().getAttribute('data-dpr-chart-data'))
  }

  initChart() {
    // console.log(JSON.stringify(this.chartData, null, 2))
    return new Chart(this.chartContext, this.chartData)
  }

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
      return {
        label,
        data,
        ...styling[i],
      }
    })
  }

  generateChartData(settings) {
    const { type, datasets, labels } = this.chartParams
    const { options, styling, datalabels, plugins, pluginsOptions, toolTipOptions } = settings

    return {
      type,
      data: {
        labels,
        datasets: this.createDatasets(datasets, styling),
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: false,
        ...(options && options),
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

  setLegendPlugin() {
    const { legend } = this
    return {
      id: 'legend',
      beforeInit(chart) {
        const ul = document.createElement('ul')
        const { labels } = chart.data
        const { backgroundColor } = chart.data.datasets[0]
        labels.forEach((label, i) => {
          const colourIndex = i % backgroundColor.length
          const colour = backgroundColor[colourIndex]
          ul.innerHTML += `
              <li class=''>
                <span style="background-color: ${colour}">${chart.data.datasets[0].data[i]}</span>
                ${label}
              </li>
            `
        })
        return legend.appendChild(ul)
      },
    }
  }
}

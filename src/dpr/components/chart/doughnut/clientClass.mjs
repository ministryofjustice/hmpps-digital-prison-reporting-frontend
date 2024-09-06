import ChartVisualisation from '../clientClass.mjs'

export default class DoughnutChartVisualisation extends ChartVisualisation {
  static getModuleName() {
    return 'doughnut-chart'
  }

  initialise() {
    this.setupCanvas()
    this.settings = this.initSettings()
    this.chartData = this.generateChartData(this.settings)
    this.initChart(this.chartData)
  }

  initSettings() {
    return {
      styling: this.setDatasetStyling(),
      datalabels: this.setDataLabels(),
      pluginsOptions: this.setPluginsOptions(),
      toolTipOptions: this.setToolTipOptions(),
      plugins: this.setPlugins(),
    }
  }

  setDatasetStyling() {
    const pallette = this.getColourPallette()
    return [
      {
        backgroundColor: pallette,
        hoverOffset: 4,
        datalabels: {
          anchor: 'center',
          borderWidth: 0,
        },
      },
    ]
  }

  setPluginsOptions() {
    return {
      legend: {
        display: false,
      },
    }
  }

  setPlugins() {
    const plugins = [this.setLegend()]
    if (this.chartParams.datasets.length === 1) {
      plugins.push(this.setCentralText())
    }
    return plugins
  }

  setCentralText() {
    return {
      // Put the total in the center of the donut
      id: 'text',
      beforeDraw(chart) {
        const { width } = chart
        const { height } = chart
        const { ctx } = chart

        ctx.textBaseline = 'middle'
        let fontSize = 2.5
        ctx.font = `100 ${fontSize}em GDS Transport`
        ctx.fillStyle = '	#505a5f'

        // Accumulated total
        const total = chart.data.datasets[0].data.reduce((a, c) => a + c, 0)
        const text = total
        const textX = Math.round((width - ctx.measureText(text).width) / 2)
        const textY = height / 2

        ctx.fillText(text, textX, textY)
        ctx.save()

        ctx.textBaseline = 'middle'
        fontSize = 1
        ctx.font = `100 ${fontSize}em GDS Transport`
        ctx.fillStyle = '	#505a5f'

        // Chart title
        const title = 'Total'
        const titleX = Math.round((width - ctx.measureText(title).width) / 2)
        const titleY = textY + 30

        ctx.fillText(title, titleX, titleY)
        ctx.save()
      },
    }
  }

  setLegend() {
    const { legend } = this
    return {
      id: 'legend',
      beforeInit(chart) {
        const ul = document.createElement('ul')
        const { labels } = chart.data
        const { backgroundColor, data } = chart.data.datasets[0]

        labels.forEach((label, i) => {
          const colourIndex = i % backgroundColor.length
          const colour = backgroundColor[colourIndex]
          const value = chart.data.datasets.length === 1 ? data[i] : ''

          ul.innerHTML += `
              <li aria-label="${label} ${value}">
                <span style="background-color: ${colour}">${value}</span>
                ${label}
              </li>
            `
        })
        legend.appendChild(ul)
        return legend.appendChild(ul)
      },
    }
  }

  setToolTipOptions() {
    const chartCtx = this
    return {
      callbacks: {
        label(context) {
          const { label: legend } = context.dataset
          const { data } = context.chart
          const { datasets, labels } = data
          let value = datasets[0].data[context.dataIndex]
          const label = labels[context.dataIndex]
          const dataArr = datasets[0].data
          const val = dataArr.reduce((sum, d) => sum + Number(d), 0)
          const percentage = `${((value * 100) / val).toFixed(2)}%`
          value = `${value} (${percentage})`
          chartCtx.setHoverValue(label, value, legend, chartCtx)
          return `${legend}: ${value}`
        },
      },
    }
  }

  setDataLabels() {
    return {
      textAlign: 'center',
      color: '#FFF',
      display: (context) => {
        const value = context.dataset.data[context.dataIndex]
        const total = context.dataset.data.reduce((a, c) => a + c, 0)
        const percentage = (value / total) * 100
        return percentage > 4
      },
      labels: {
        title: {
          font: {
            weight: 'bold',
            size: 16,
            color: '#FFF',
          },
        },
      },
    }
  }
}

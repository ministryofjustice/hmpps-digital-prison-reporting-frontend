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
      options: this.setOptions(),
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

  setOptions() {
    const cutoutValue = this.chartParams.datasets.length === 1 ? '50%' : '20%'
    return {
      cutout: cutoutValue,
    }
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
    if (this.chartParams.datasets.length === 1 && !this.isPercentage) {
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
    const { legend, suffix } = this
    return {
      id: 'legend',
      beforeInit(chart) {
        const ul = document.createElement('ul')
        const { labels } = chart.data
        const { backgroundColor, data } = chart.data.datasets[0]

        labels.forEach((label, i) => {
          const colourIndex = i % backgroundColor.length
          const colour = backgroundColor[colourIndex]
          const value = chart.data.datasets.length === 1 ? `${data[i]}${suffix}` : ''

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
    const ctx = this
    return {
      callbacks: {
        title(context) {
          const { label, dataset } = context[0]
          const { label: establishmentId } = dataset
          return `${establishmentId}: ${label}`
        },
        label(context) {
          const { label, parsed: value, dataset } = context
          const { label: legend } = dataset
          const dataArr = dataset.data

          let toolipValue = `${value}${ctx.suffix}`

          if (!ctx.isPercentage) {
            const val = dataArr.reduce((sum, d) => sum + Number(d), 0)
            const percentage = `${((value * 100) / val).toFixed(2)}%`
            toolipValue = `${legend}: ${toolipValue} (${percentage})`
            ctx.setHoverValue({ label, value: toolipValue, legend, ctx })
          } else {
            toolipValue = `${toolipValue}`
            ctx.setHoverValue({ label, value: toolipValue, legend, ctx })
          }

          return toolipValue
        },
      },
    }
  }

  setDataLabels() {
    const ctx = this
    return {
      textAlign: 'center',
      color: '#FFF',
      display: (context) => {
        const { dataset, dataIndex } = context
        const value = dataset.data[dataIndex]
        const total = dataset.data.reduce((a, c) => a + c, 0)
        const percentage = (value / total) * 100
        return percentage > 4
      },
      formatter: (value, context) => {
        let label

        if (ctx.chartParams.datasets.length === 1) {
          label = `${value}${this.suffix}`
        } else {
          const { dataset } = context
          label = `${value}${this.suffix}
${dataset.label}`
        }

        return label
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

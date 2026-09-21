/* eslint-disable class-methods-use-this */
import Chart, { ChartConfiguration, ScriptableContext, TooltipItem } from 'chart.js/auto'
import ChartVisualisation from '../clientClass'

class DoughnutChartVisualisation extends ChartVisualisation {
  settings: Record<string, any> = {}
  chartData!: ChartConfiguration

  static override getModuleName() {
    return 'doughnut-chart'
  }

  override initialise() {
    this.setupCanvas()
    this.settings = this.initSettings()
    this.chartData = this.generateChartData(this.settings)
    this.initChart(this.chartData)
  }

  initSettings() {
    return {
      options: this.setOptions(),
      datalabels: this.setDataLabels(),
      pluginsOptions: this.setPluginsOptions(),
      toolTipOptions: this.setToolTipOptions(),
      plugins: this.setPlugins(),
    }
  }

  setOptions() {
    const cutoutValue = this.chartParams['datasets'].length === 1 ? '50%' : '20%'
    return {
      cutout: cutoutValue,
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

  setPlugins() {
    const plugins = []
    if (this.chartParams['datasets'].length === 1 && !this.isPercentage()) {
      plugins.push(this.setCentralText())
    }
    return plugins
  }

  setCentralText() {
    return {
      // Put the total in the center of the donut
      id: 'text',
      beforeDraw(chart: Chart) {
        const { width, height, ctx } = chart

        ctx.textBaseline = 'middle'
        let fontSize = 2.5
        ctx.font = `100 ${fontSize}em GDS Transport`
        ctx.fillStyle = '	#505a5f'

        // Accumulated total
        const total = chart.data.datasets[0].data.reduce<number>((a, c) => a + Number(c), 0)
        const text: string = total?.toString() || ''
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

  setToolTipOptions() {
    const ctx = this
    return {
      callbacks: {
        title(context: TooltipItem<'doughnut'>[]) {
          const { label, dataset } = context[0]
          const { label: establishmentId } = dataset
          const title = ctx.singleDataset ? `${label}` : `${establishmentId}: ${label}`
          return title
        },
        label(context: TooltipItem<'doughnut'>) {
          const { label, parsed: value, dataset } = context
          const { label: legend } = dataset
          const dataArr = dataset.data

          let toolipValue = `${value}${ctx.suffix}`

          if (!ctx.isPercentage) {
            const val = dataArr.reduce((sum, d) => sum + Number(d), 0)
            const percentage = `${((value * 100) / val).toFixed(2)}%`
            toolipValue = ctx.singleDataset
              ? `${toolipValue} (${percentage})`
              : `${legend}: ${toolipValue} (${percentage})`
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
      display: (context: ScriptableContext<'doughnut'>) => {
        const { dataset, dataIndex } = context
        const value = dataset.data[dataIndex]
        const total = dataset.data.reduce((a, c) => a + c, 0)
        const percentage = (value / total) * 100
        return percentage > 4
      },
      formatter: (value: string, context: ScriptableContext<'doughnut'>) => {
        const { dataset } = context
        const label = ctx.singleDataset
          ? `${value}${this.suffix}`
          : `${value}${this.suffix}
${dataset.label}`

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

export { DoughnutChartVisualisation }
export default DoughnutChartVisualisation

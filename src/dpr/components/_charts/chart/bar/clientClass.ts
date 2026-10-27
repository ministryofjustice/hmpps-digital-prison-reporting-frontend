import { ChartConfiguration, TooltipItem } from 'chart.js'
import ChartVisualisation from '../clientClass'

class BarChartVisualisation extends ChartVisualisation {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings: Record<string, any> = {}
  chartData!: ChartConfiguration

  static override getModuleName() {
    return 'bar-chart'
  }

  override initialise() {
    this.setupCanvas()
    this.settings = this.initSettings()
    this.chartData = this.generateChartData(this.settings)
    this.initChart(this.chartData as ChartConfiguration<'bar'>)
  }

  initSettings() {
    return {
      toolTipOptions: this.setToolTipOptions(),
      datalabels: this.setDataLabels(),
    }
  }

  setToolTipOptions() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const ctx = this
    return {
      callbacks: {
        title(context: TooltipItem<'bar'>[]) {
          const { label, dataset } = context[0]
          const { label: datesetLabel } = dataset
          const title = ctx.singleDataset ? `${label}` : `${datesetLabel}: ${label}`
          return title
        },
        label(context: TooltipItem<'bar'>) {
          const { label } = context
          const { data, label: legend } = context.dataset
          const value = `${data[context.dataIndex]}${ctx.suffix}`
          ctx.setHoverValue({ label, value, legend, ctx })
          return value
        },
      },
    }
  }

  setDataLabels() {
    return {
      color: '#FFF',
      display: () => {
        return true
      },
      formatter: (value: string) => {
        return `${value}${this.suffix}`
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

export { BarChartVisualisation }
export default BarChartVisualisation

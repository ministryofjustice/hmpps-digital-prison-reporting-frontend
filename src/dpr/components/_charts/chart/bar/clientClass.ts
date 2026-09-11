/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */

import { ChartConfiguration, TooltipItem } from 'chart.js'
import ChartVisualisation from '../clientClass'

class BarChartVisualisation extends ChartVisualisation {
  settings: Record<string, any> = {}
  chartData!: ChartConfiguration

  static override getModuleName() {
    return 'bar-chart'
  }

  override initialise() {
    this.setupCanvas()
    this.settings = this.initSettings()
    this.chartData = this.generateChartData(this.settings)
    this.initChart(this.chartData)
  }

  initSettings() {
    return {
      toolTipOptions: this.setToolTipOptions(),
      datalabels: this.setDataLabels(),
    }
  }

  setToolTipOptions() {
    const ctx = this
    return {
      callbacks: {
        title(context: TooltipItem<'bar'>[]) {
          const { label, dataset } = context[0]
          const { label: establishmentId } = dataset
          const title = ctx.singleDataset ? `${label}` : `${establishmentId}: ${label}`
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

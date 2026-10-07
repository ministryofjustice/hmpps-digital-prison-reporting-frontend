/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */

import { ChartConfiguration, TooltipItem } from 'chart.js'
import ChartVisualisation from '../clientClass'

class BoxPlotChartVisualisation extends ChartVisualisation {
  settings: Record<string, any> = {}
  chartData!: ChartConfiguration

  static override getModuleName() {
    return 'boxplot-chart'
  }

  override initialise() {
    this.setupCanvas()
    this.settings = this.initSettings()
    this.chartData = this.generateChartData(this.settings)
    this.initChart(this.chartData as ChartConfiguration<'boxplot'>)
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
        title(context: TooltipItem<'boxplot'>[]) {
          const { label, dataset } = context[0]
          const { label: datasetLabel } = dataset
          const title = ctx.singleDataset ? `${label}` : `${datasetLabel}: ${label}`
          return title
        },
        label(context: TooltipItem<'boxplot'>) {
          const { parsed, label } = context
          const { label: legend } = context.dataset

          const value = [
            `Min: ${parsed.min}`,
            `Q1: ${parsed.q1}`,
            `Median: ${parsed.median}`,
            `Mean: ${parsed.mean}`,
            `Q3: ${parsed.q3}`,
            `Max: ${parsed.max}`,
          ]

          ctx.setHoverValue({ label, value, legend, ctx })
          return value
        },
      },
    }
  }

  setDataLabels() {
    return {
      display: () => {
        return false
      },
    }
  }
}

export { BoxPlotChartVisualisation }
export default BoxPlotChartVisualisation

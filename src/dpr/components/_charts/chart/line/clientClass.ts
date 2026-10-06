/* eslint-disable class-methods-use-this */
import { ChartConfiguration, ScriptableLineSegmentContext, TooltipItem } from 'chart.js'
import ChartVisualisation from '../clientClass'

class LineChartVisualisation extends ChartVisualisation {
  settings: Record<string, any> = {}
  chartData!: ChartConfiguration
  lastIndex: number = 0

  static override getModuleName() {
    return 'line-chart'
  }

  override initialise() {
    this.setupCanvas()
    this.settings = this.initSettings()
    this.chartData = this.generateChartData(this.settings)
    this.lastIndex = this.chartData.data?.labels ? this.chartData.data.labels.length - 1 : 0
    this.initChart(this.chartData)
  }

  initSettings() {
    return {
      toolTipOptions: this.setToolTipOptions(),
      styling: this.setDatasetStyling(),
    }
  }

  setPartialStyle(ctx: ScriptableLineSegmentContext) {
    let style
    if ((this.partialEnd && ctx.p1DataIndex === this.lastIndex) || (this.partialStart && ctx.p1DataIndex === 1)) {
      style = [6, 6]
    }
    return style
  }

  setDatasetStyling() {
    return {
      segment: {
        borderDash: (ctx: ScriptableLineSegmentContext) => this.setPartialStyle(ctx),
      },
    }
  }

  setToolTipOptions() {
    const ctx = this
    return {
      callbacks: {
        title(context: TooltipItem<'line'>[]) {
          const { label, dataset } = context[0]
          const { label: establishmentId } = dataset
          const title = ctx.singleDataset ? `${label}` : `${establishmentId}: ${label}`
          return title
        },
        label(context: TooltipItem<'line'>) {
          const { label } = context
          const { data, label: legend } = context.dataset
          const value = String(data[context.dataIndex])
          ctx.setHoverValue({ label, value, legend, ctx })
          return value
        },
      },
    }
  }
}

export { LineChartVisualisation }
export default LineChartVisualisation

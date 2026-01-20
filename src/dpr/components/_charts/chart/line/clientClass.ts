/* eslint-disable class-methods-use-this */
import ChartVisualisation from '../clientClass'

class LineChartVisualisation extends ChartVisualisation {
  static getModuleName() {
    return 'line-chart'
  }

  initialise() {
    this.setupCanvas()
    this.settings = this.initSettings()
    this.chartData = this.generateChartData(this.settings)
    this.lastIndex = this.chartData.data.labels.length - 1
    this.initChart(this.chartData)
  }

  initSettings() {
    return {
      toolTipOptions: this.setToolTipOptions(),
      styling: this.setDatasetStyling(),
    }
  }

  setPartialStyle(ctx) {
    let style
    if ((this.partialEnd && ctx.p1DataIndex === this.lastIndex) || (this.partialStart && ctx.p1DataIndex === 1)) {
      style = [6, 6]
    }
    return style
  }

  setDatasetStyling() {
    return {
      segment: {
        borderDash: (ctx) => this.setPartialStyle(ctx),
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
          const title = ctx.singleDataset ? `${label}` : `${establishmentId}: ${label}`
          return title
        },
        label(context) {
          const { label } = context
          const { data, label: legend } = context.dataset
          const value = data[context.dataIndex]
          ctx.setHoverValue({ label, value, legend, ctx })
          return value
        },
      },
    }
  }
}

export { LineChartVisualisation }
export default LineChartVisualisation

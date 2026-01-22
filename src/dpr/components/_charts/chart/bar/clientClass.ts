// @ts-nocheck
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import ChartVisualisation from '../clientClass'

class BarChartVisualisation extends ChartVisualisation {
  static getModuleName() {
    return 'bar-chart'
  }

  initialise() {
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
        title(context) {
          const { label, dataset } = context[0]
          const { label: establishmentId } = dataset
          const title = ctx.singleDataset ? `${label}` : `${establishmentId}: ${label}`
          return title
        },
        label(context) {
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
        return !this.timeseries
      },
      formatter: (value) => {
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

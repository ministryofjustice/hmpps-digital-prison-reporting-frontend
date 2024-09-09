import ChartVisualisation from '../clientClass.mjs'

export default class BarChartVisualisation extends ChartVisualisation {
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
      options: this.setOptions(),
      pluginsOptions: this.setPluginsOptions(),
      toolTipOptions: this.setToolTipOptions(),
      styling: this.setDatasetStyling(),
    }
  }

  setDatasetStyling() {
    const pallette = this.getColourPallette()
    return pallette.map((colour) => {
      return {
        borderColor: colour,
        backgroundColor: colour,
        datalabels: {
          display: false,
        },
      }
    })
  }

  setPluginsOptions() {
    return {
      legend: {
        display: true,
        position: 'bottom',
      },
    }
  }

  setToolTipOptions() {
    const chartCtx = this
    return {
      callbacks: {
        label(context) {
          const { label } = context
          const { data, label: legend } = context.dataset
          const value = data[context.dataIndex]
          chartCtx.setHoverValue(label, value, legend, chartCtx)
        },
      },
    }
  }

  setOptions() {
    const { indexAxis, stacked } = this.chartParams
    return {
      indexAxis: indexAxis || 'x',
      ...(stacked && {
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      }),
    }
  }
}

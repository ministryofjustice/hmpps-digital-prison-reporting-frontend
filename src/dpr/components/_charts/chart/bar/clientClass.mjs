/* eslint-disable class-methods-use-this */
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
      datalabels: this.setDataLabels(),
      styling: this.setDatasetStyling(),
    }
  }

  setDatasetStyling() {
    const pallette = this.getColourPallette()
    return pallette.map((colour) => {
      return {
        borderColor: colour.hex,
        ...this.setBackgroundColour(colour.hex),
        datalabels: {
          align: 'center',
          anchor: 'center',
        },
      }
    })
  }

  setBackgroundColour(colour) {
    const lastIndex = this.chartParams.labels.length - 1
    const backgroundColors = []
    const borderWidths = []
    const borderColors = []

    this.chartParams.labels.forEach((label, i) => {
      if ((this.partialEnd && i === lastIndex) || (this.partialStart && i === 0)) {
        backgroundColors.push('#b1b4b6')
        borderWidths.push(3)
        borderColors.push('#5694ca')
      } else {
        backgroundColors.push(colour)
        borderWidths.push(0)
        borderColors.push(colour)
      }
    })

    return {
      backgroundColor: backgroundColors,
      borderWidth: borderWidths,
      borderColor: borderColors,
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
          const { label } = context
          const { data, label: legend } = context.dataset
          const value = `${data[context.dataIndex]}${ctx.suffix}`
          ctx.setHoverValue({ label, value, legend, ctx })
          return value
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

  setDataLabels() {
    return {
      color: '#FFF',
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

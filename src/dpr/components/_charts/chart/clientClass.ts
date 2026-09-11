/* eslint-disable class-methods-use-this */
import Chart, { ChartConfiguration, ChartType } from 'chart.js/auto'
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { DprClientClass } from '../../../DprClientClass'

class ChartVisualisation extends DprClientClass {
  chartContext: HTMLCanvasElement | null = null
  chart: Chart | null = null
  chartParams: Record<string, any> = {}
  type: string | null = null
  id: string = ''
  unit: string = ''
  suffix: string = ''
  legend: HTMLElement | null = null
  tooltipDetailsEl: HTMLElement | null = null
  headlineValuesEl: HTMLElement | null = null
  labelElement: HTMLElement | null = null
  valueElement: HTMLElement | null = null
  legendElement: HTMLElement | null = null
  partialStart: boolean = false
  partialEnd: boolean = false
  singleDataset: boolean = false

  static override getModuleName() {
    return 'chart'
  }

  setupCanvas() {
    this.chartContext = this.getElement().querySelector('canvas')

    // data
    this.id = this.chartContext?.getAttribute('id') || ''
    this.chartParams = JSON.parse(this.getElement().getAttribute('data-dpr-chart-data') || '{}')
    this.type = this.getElement().getAttribute('data-dpr-chart-type')
    this.setValueSuffix()

    // elements
    this.legend = this.getElement().querySelector(`#js-legend-${this.id}`)

    // ChartCard elements
    this.tooltipDetailsEl = document.getElementById(`dpr-${this.id}-tooltip-details`)
    this.headlineValuesEl = document.getElementById(`dpr-${this.id}-headline-values`)
    this.labelElement = document.getElementById(`dpr-${this.id}-label`)
    this.valueElement = document.getElementById(`dpr-${this.id}-value`)
    this.legendElement = document.getElementById(`dpr-${this.id}-legend`)
    this.legendElement = document.getElementById(`dpr-${this.id}-legend`)

    if (this.chartParams['partialDate']) {
      this.partialStart = this.chartParams['partialDate'].start || false
      this.partialEnd = this.chartParams['partialDate'].end || false
    }

    // flags
    this.singleDataset = this.chartParams['datasets'].length === 1
  }

  initChart(chartData: ChartConfiguration) {
    // Prevent font loading issue
    window.addEventListener('load', () => {
      // An example of creating a chart, replace with your code:
      Chart.defaults.font.family = 'GDS Transport'
      Chart.defaults.font.size = 12
      Chart.register(ChartDataLabels)
      Chart.register(MatrixController, MatrixElement)
      Chart.defaults.datasets.bar.categoryPercentage = 0.95
      this.chart = new Chart(this.chartContext as HTMLCanvasElement, chartData)
      this.initChartEvents()
    })
  }

  generateChartData(settings: Record<string, any>): ChartConfiguration {
    const { datasets, labels, config } = this.chartParams
    const { options, datalabels, plugins, pluginsOptions, toolTipOptions, hoverEvent, styling } = settings

    const chartData = {
      type: this.type as ChartType,
      data: {
        labels,
        datasets: this.createDatasets(datasets, styling),
      },
      options: {
        ...config,
        ...(options && options),
        ...(hoverEvent && hoverEvent),
        plugins: {
          ...config.plugins,
          ...(pluginsOptions && pluginsOptions),
          ...(datalabels && { datalabels }),
          tooltip: {
            ...config.plugins.tooltip,
            ...(toolTipOptions && toolTipOptions),
          },
        },
      },
      plugins: plugins && plugins.length ? [...plugins] : [],
    }

    return chartData
  }

  createDatasets(datasets: Object[], styling: any) {
    return datasets.map(dataset => {
      return {
        ...dataset,
        ...(styling && styling),
      }
    })
  }

  setHoverValue({ label, value, legend, ctx }: { label: string; value: string; legend: string | undefined; ctx: any }) {
    if (ctx.tooltipDetailsEl) {
      ctx.tooltipDetailsEl.style.display = 'block'
      ctx.labelElement.innerHTML = ctx.singleDataset ? `${label}` : `${legend}: ${label}`
      ctx.valueElement.innerHTML = `${value}`
    }
    if (ctx.headlineValuesEl) {
      ctx.headlineValuesEl.style.display = 'none'
    }
    if (ctx.legendElement && !legend) {
      ctx.legendElement.style.display = 'none'
    }
  }

  setValueSuffix() {
    this.unit = this.getElement().getAttribute('data-dpr-chart-unit') || ''
    this.suffix = this.unit === 'percentage' ? '%' : ''
  }

  isPercentage() {
    return this.unit === 'percentage'
  }

  initChartEvents() {
    this.chart?.canvas.addEventListener('mouseout', () => {
      if (this.tooltipDetailsEl) this.tooltipDetailsEl.style.display = 'none'
      if (this.headlineValuesEl) this.headlineValuesEl.style.display = 'block'
    })
  }
}

export { ChartVisualisation }
export default ChartVisualisation

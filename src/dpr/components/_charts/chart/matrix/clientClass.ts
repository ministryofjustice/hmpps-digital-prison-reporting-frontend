import { Chart, ChartConfiguration, ChartType, Color, ScriptableContext, TooltipItem, TooltipModel } from 'chart.js'
import ChartVisualisation from '../clientClass'

export default class MatrixChartVisualisation extends ChartVisualisation {
  settings: Record<string, unknown> = {}
  chartData!: ChartConfiguration

  static override getModuleName() {
    return 'matrix-chart'
  }

  override initialise() {
    this.setupCanvas()
    this.settings = this.initSettings()
    this.chartData = this.generateChartData(this.settings)
    this.initChart(this.chartData as ChartConfiguration<'matrix'>)
  }

  initSettings() {
    return {
      toolTipOptions: this.setToolTipOptions(),
    }
  }

  setToolTipOptions() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const ctx = this
    return {
      callbacks: {
        title(context: TooltipItem<'matrix'>[]) {
          const raw = context[0].raw as TooltipModel<'matrix'>
          const title = `${raw.y} ${raw.x}`
          return title
        },
        label(context: TooltipItem<'matrix'>) {
          const { data, label: legend } = context.dataset
          const dataValue = data[context.dataIndex]
          const label = `${dataValue.y} ${dataValue.x}`
          const value = `${dataValue.v}${ctx.suffix}`
          ctx.setHoverValue({ label, value, legend, ctx })
          return `${legend}: ${value}`
        },
      },
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override generateChartData(settings: Record<string, any>): ChartConfiguration {
    const { config } = this.chartParams
    const { options, plugins, pluginsOptions, toolTipOptions, hoverEvent } = settings
    const d: ChartConfiguration = {
      type: this.type as ChartType,
      data: {
        datasets: this.createDatasets(),
      },
      options: {
        ...config,
        ...(options && options),
        ...(hoverEvent && hoverEvent),
        plugins: {
          ...config.plugins,
          legend: {
            position: 'bottom',
            display: false,
          },
          ...(pluginsOptions && pluginsOptions),
          datalabels: {
            display: false,
          },
          tooltip: {
            ...config.plugins.tooltip,
            ...(toolTipOptions && toolTipOptions),
          },
        },
      },
      plugins: plugins && plugins.length ? [...plugins] : [],
    }

    return d
  }

  override createDatasets() {
    const { datasets } = this.chartParams
    return datasets.map((dataset: { label: string; data: unknown[] }) => {
      const { label, data } = dataset
      return {
        label,
        data,
        backgroundColor(c: ScriptableContext<'matrix'>): Color {
          const color = (c.raw as { c: Color }).c as Color
          return color
        },
        width: ({ chart }: { chart: Chart }) => (chart.chartArea || {}).width / chart.scales['x'].ticks.length - 1,
        height: ({ chart }: { chart: Chart }) => (chart.chartArea || {}).height / chart.scales['y'].ticks.length - 1,
      }
    })
  }
}

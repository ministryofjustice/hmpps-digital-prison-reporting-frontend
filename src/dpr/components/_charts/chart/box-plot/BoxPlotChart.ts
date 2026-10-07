import {
  ChartMeasure,
  DashboardVisualisationData,
  DashboardVisualisationType,
  MoJTable,
  VisualisationDefinitionKey,
} from '../../../_dashboards/dashboard-visualisation/types'
import { components } from '../../../../types/api'
import Chart from '../Chart'
import BoxPlotChartSchemas from './validate'
import {
  BoxPlotDefinitionMeasure,
  BoxPlotDefinitionType,
  BarDefinitionOptions,
  BoxPlotStats,
  BoxPlotStatsRow,
} from './types'

export class BoxPlotChart extends Chart {
  private definition!: BoxPlotDefinitionType

  private measures!: BoxPlotDefinitionMeasure[]

  private keys!: VisualisationDefinitionKey[]

  private options: BarDefinitionOptions | undefined

  private barCount = 0

  private stats: BoxPlotStatsRow[] = []

  private init = () => {
    this.measures = this.definition.columns.measures
    this.keys = this.definition.columns.keys || []
    this.options = this.definition.options
    this.initUnit(this.measures)
  }

  withDefinition = (definition: components['schemas']['DashboardVisualisationDefinition']) => {
    this.definition = BoxPlotChartSchemas.BoxPlotSchema.parse(definition)
    this.init()

    return this
  }

  getCanvasHeight = () => {
    this.barCount = this.datasets.length * this.datasets[0].data.length
    return this.options?.horizontal ? this.barCount : 5
  }

  build = (): DashboardVisualisationData => {
    this.createDatasets(this.measures, this.keys)

    this.setBespokeOptions()

    const height = this.getCanvasHeight()

    // Here is where I want to call it
    this.createStats()

    return {
      type: DashboardVisualisationType.BOX_PLOT,
      options: {
        height,
        unit: this.unit,
      },
      data: {
        labels: this.labels,
        datasets: this.datasets,
        config: this.config,
      },
    }
  }

  override createDatasets = (measures: ChartMeasure[], keys: VisualisationDefinitionKey[]) => {
    if (keys.length === 0) {
      this.createMeasureDatasets(measures)
      return
    }

    this.createGroupedDatasets(measures, keys)
  }

  private createMeasureDatasets = (measures: ChartMeasure[]) => {
    this.labels = measures.map(measure => measure.display ?? measure.id)

    const styles = this.chartColoursHelper.setBoxPlotColourStyles(0)

    this.datasets = [
      {
        label: this.definition.display,
        data: measures.map(measure =>
          this.responseData.map(row => Number(row[measure.id]?.raw)).filter(value => !Number.isNaN(value)),
        ),
        ...styles,
      },
    ]
  }

  private createGroupedDatasets = (measures: ChartMeasure[], keys: VisualisationDefinitionKey[]) => {
    const groups = this.groupRowsByKeys(measures, keys)

    this.labels = [...groups.keys()]

    this.datasets = measures.map((measure, index) => ({
      label: measure.display ?? measure.id,
      data: [...groups.values()].map(group => group[measure.id]),
      ...this.chartColoursHelper.setBoxPlotColourStyles(index),
    }))
  }

  private groupRowsByKeys = (measures: ChartMeasure[], keys: VisualisationDefinitionKey[]) => {
    const groups = new Map<string, Record<string, number[]>>()

    this.responseData.forEach(row => {
      const key = keys.map(k => String(row[k.id]?.raw)).join(' | ')

      if (!groups.has(key)) {
        groups.set(key, Object.fromEntries(measures.map(measure => [measure.id, []])))
      }

      const group = groups.get(key)!

      measures.forEach(measure => {
        const value = Number(row[measure.id]?.raw)

        if (!Number.isNaN(value)) {
          group[measure.id].push(value)
        }
      })
    })

    return groups
  }

  private createStats = () => {
    this.stats = []

    this.datasets.forEach(dataset => {
      const valuesByLabel = dataset.data as number[][]

      valuesByLabel.forEach((values, index) => {
        this.stats.push({
          label: this.labels[index] ?? '',
          dataset: dataset.label,
          ...this.calculateStats(values),
        })
      })
    })
  }

  private calculateStats = (values: number[]): BoxPlotStats => {
    const sorted = [...values].sort((a, b) => a - b)

    if (sorted.length === 0) {
      return {
        min: 0,
        q1: 0,
        median: 0,
        mean: 0,
        q3: 0,
        max: 0,
      }
    }

    return {
      min: sorted[0]!,
      q1: this.quantile(sorted, 0.25),
      median: this.quantile(sorted, 0.5),
      mean: sorted.reduce((total, value) => total + value, 0) / sorted.length,
      q3: this.quantile(sorted, 0.75),
      max: sorted[sorted.length - 1]!,
    }
  }

  getStats = () => this.stats

  setBespokeOptions = () => {
    // Initialise the scales
    this.setScales({ horizontal: this.options?.horizontal })

    let indexAxis = 'x'
    if (this.options) {
      const { horizontal } = this.options
      indexAxis = horizontal ? 'y' : indexAxis
    }

    this.config = {
      ...this.config,
      indexAxis,
    }
  }

  // Quantile function that matches the plugins method
  quantile = (sorted: number[], q: number): number => {
    const h = (sorted.length - 1) * q
    const i = Math.floor(h)
    return i === h ? sorted[i] : sorted[i] + (h - i) * (sorted[i + 1] - sorted[i])
  }

  buildTable = (): MoJTable => ({
    head: [
      { text: 'Category' },
      { text: 'Dataset' },
      { text: 'Min' },
      { text: 'Q1' },
      { text: 'Median' },
      { text: 'Mean' },
      { text: 'Q3' },
      { text: 'Max' },
    ],
    rows: this.stats.map(row => [
      { text: row.label },
      { text: row.dataset },
      { text: String(row.min) },
      { text: String(row.q1) },
      { text: String(row.median) },
      { text: String(row.mean) },
      { text: String(row.q3) },
      { text: String(row.max) },
    ]),
  })
}

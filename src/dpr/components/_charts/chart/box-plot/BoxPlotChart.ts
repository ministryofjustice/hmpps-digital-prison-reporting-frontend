import {
  ChartMeasure,
  DashboardVisualisationData,
  DashboardVisualisationType,
  VisualisationDefinitionKey,
} from '../../../_dashboards/dashboard-visualisation/types'
import { components } from '../../../../types/api'
import Chart from '../Chart'
import BoxPlotChartSchemas from './validate'
import { BoxPlotDefinitionMeasure, BoxPlotDefinitionType } from './types'

export class BoxPlotChart extends Chart {
  private definition!: BoxPlotDefinitionType

  private measures!: BoxPlotDefinitionMeasure[]

  private keys!: VisualisationDefinitionKey[]

  private init = () => {
    this.measures = this.definition.columns.measures
    this.keys = this.definition.columns.keys || []
    this.initUnit(this.measures)
  }

  withDefinition = (definition: components['schemas']['DashboardVisualisationDefinition']) => {
    this.definition = BoxPlotChartSchemas.BoxPlotSchema.parse(definition)
    this.init()

    return this
  }

  build = (): DashboardVisualisationData => {
    this.createDatasets(this.measures, this.keys)

    return {
      type: DashboardVisualisationType.BOX_PLOT,
      options: {
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

    this.datasets = [
      {
        label: this.definition.display,
        data: measures.map(measure =>
          this.responseData.map(row => Number(row[measure.id]?.raw)).filter(value => !Number.isNaN(value)),
        ),
      },
    ]
  }

  private createGroupedDatasets = (measures: ChartMeasure[], keys: VisualisationDefinitionKey[]) => {
    const groups = this.groupRowsByKeys(measures, keys)

    this.labels = [...groups.keys()]

    this.datasets = measures.map(measure => ({
      label: measure.display ?? measure.id,
      data: [...groups.values()].map(group => group[measure.id]),
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
}

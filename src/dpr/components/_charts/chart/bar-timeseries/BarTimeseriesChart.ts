/* eslint-disable prefer-destructuring */
import {
  DashboardVisualisationType,
  DashboardVisualisationData,
  VisualisationDefinitionKey,
  DashboardVisualisationDataSet,
} from '../../../_dashboards/dashboard-visualisation/types'
import { components } from '../../../../types/api'
import { BarTimeseriesDefinitionType, BarTimeseriesDefinitionMeasure } from './types'
import BarTimeseriesChartSchemas from './validate'
import { DashboardDataResponse } from '../../../../types/Metrics'
import DatasetHelper from '../../../../utils/datasetHelper'

class BarTimeseriesChart {
  private definition!: BarTimeseriesDefinitionType

  private measures!: BarTimeseriesDefinitionMeasure[]

  private keys!: VisualisationDefinitionKey[]

  private responseData: DashboardDataResponse[] = []

  private timeBlockData: DashboardDataResponse[][] = []

  private groupKey: BarTimeseriesDefinitionMeasure | undefined

  private datasets: DashboardVisualisationDataSet[] = []

  private unit: 'NUMBER' | 'PERCENTAGE' | undefined

  private labels: string[] = []

  private labelId: string | undefined = undefined

  private datasetCount = 0

  withDefinition = (definition: components['schemas']['DashboardVisualisationDefinition']) => {
    this.definition = BarTimeseriesChartSchemas.BarTimeseriesSchema.parse(definition)
    this.initFromDefinition()

    return this
  }

  withData = (responseData: DashboardDataResponse[]) => {
    this.responseData = responseData
    this.initFromData()
    return this
  }

  build = (): DashboardVisualisationData => {
    this.buildDatasets()

    return {
      type: DashboardVisualisationType.LINE,
      unit: this.unit,
      data: {
        labels: this.labels,
        datasets: this.datasets,
      },
    }
  }

  private initFromDefinition = () => {
    this.measures = this.definition.columns.measures
    this.keys = this.definition.columns.keys || []
    this.unit = this.measures.find((m) => m.unit)?.unit
  }

  private initFromData = () => {
    this.groupKey = DatasetHelper.getGroupKey(
      this.responseData,
      <Array<components['schemas']['DashboardVisualisationColumnDefinition']>>this.keys,
    )
    this.labelId = this.groupKey?.id || ''
    this.timeBlockData = DatasetHelper.groupRowsByTimestamp(this.responseData)
    this.labels = this.getLabels()
    this.datasetCount = this.timeBlockData[0]?.length
  }

  private getLabels = () => {
    return this.timeBlockData.map((d: DashboardDataResponse[]) => <string>d[0]['ts'].raw)
  }

  private buildDatasets = () => {
    for (let index = 0; index < this.datasetCount; index += 1) {
      const data = this.timeBlockData.map((timeperiod) => {
        const { raw } = timeperiod[index][this.measures[1].id]
        return raw ? Number(raw) : 0
      })
      const total = data.reduce((a, c) => a + c, 0)
      const rawValue = this.labelId ? this.timeBlockData[0][index][this.labelId].raw : ''
      const label = rawValue ? <string>rawValue : ''

      this.datasets.push({
        data,
        label,
        total,
      })
    }
  }
}

export { BarTimeseriesChart }
export default BarTimeseriesChart

import { components } from '../../../types/api'
import { DashboardDataResponse } from '../../../types/Metrics'
import {
  DashboardVisualisationDataSet,
  TimeseriesChartMeasure,
  VisualisationDefinitionKey,
} from '../../_dashboards/dashboard-visualisation/types'
import DatasetHelper from '../../../utils/datasetHelper'
import { BarTimeseriesDefinitionMeasure, BarTimeseriesDefinitionType } from './bar-timeseries/types'
import { LineTimeseriesDefinitionMeasure, LineTimeseriesDefinitionType } from './line-timeseries/types'
import { ChartColours } from './ChartColours'
import ChartConfig from './chart-config'
import { PartialDate } from '../../_filters/types'

class TimeseriesChart {
  labels: string[] = []

  labelId: string | undefined = undefined

  datasets: DashboardVisualisationDataSet[] = []

  unit: 'NUMBER' | 'PERCENTAGE' | undefined

  responseData: DashboardDataResponse[] = []

  measures: TimeseriesChartMeasure = []

  keys: VisualisationDefinitionKey[] = []

  timeBlockData: DashboardDataResponse[][] = []

  groupKey: LineTimeseriesDefinitionMeasure | BarTimeseriesDefinitionMeasure | undefined

  datasetCount = 0

  hexColours: string[] = []

  config = ChartConfig

  partialDate: PartialDate | undefined

  withData = (responseData: DashboardDataResponse[]) => {
    this.responseData = responseData
    this.initFromData()
    return this
  }

  initFromDefinition = (definition: BarTimeseriesDefinitionType | LineTimeseriesDefinitionType) => {
    this.measures = definition.columns.measures
    this.keys = definition.columns.keys || []
    this.unit = this.measures.find((m) => m.unit)?.unit
  }

  withPartialDate = (partialDate?: PartialDate) => {
    this.partialDate = partialDate
    return this
  }

  initFromData = () => {
    this.groupKey = DatasetHelper.getGroupKey(
      this.responseData,
      <Array<components['schemas']['DashboardVisualisationColumnDefinition']>>this.keys,
    )
    this.labelId = this.groupKey?.id || ''
    this.timeBlockData = DatasetHelper.groupRowsByTimestamp(this.responseData)
    this.labels = this.getLabels()
    this.datasetCount = this.timeBlockData[0]?.length
  }

  buildDatasets = () => {
    this.hexColours = new ChartColours().getHexPallette()
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

  private getLabels = () => {
    return this.timeBlockData.map((d: DashboardDataResponse[]) => <string>d[0]['ts'].raw)
  }
}

export { TimeseriesChart }
export default TimeseriesChart

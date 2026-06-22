import logger from 'src/dpr/utils/logger'
import { components } from '../../../types/api'
import { DashboardDataResponse } from '../../../types/Metrics'
import {
  DashboardVisualisationDataSet,
  TimeseriesChartMeasure,
  VisualisationDefinitionKey,
} from '../../_dashboards/dashboard-visualisation/types'
import DatasetHelper, { getTimestampMeasure, getDateValue } from '../../../utils/Dashboards/VisualisationDatasetHelper'
import { BarTimeseriesDefinitionMeasure, BarTimeseriesDefinitionType } from './bar-timeseries/types'
import { LineTimeseriesDefinitionMeasure, LineTimeseriesDefinitionType } from './line-timeseries/types'
import ChartColoursHelper from './ChartColours'
import ChartConfig from './chart-config'
import { PartialDate } from '../../_filters/types'
import ChartLabelsHelper from './ChartLabels'

class TimeseriesChart {
  id!: string

  labels: string[] = []

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

  chartColoursHelper!: ChartColoursHelper

  chartLabelsHelper!: ChartLabelsHelper

  withData = (responseData: DashboardDataResponse[]) => {
    this.responseData = responseData
    this.initHelpers()
    this.initFromData()
    return this
  }

  initHelpers = () => {
    this.chartColoursHelper = new ChartColoursHelper()
    this.chartLabelsHelper = new ChartLabelsHelper()
  }

  initFromDefinition = (definition: BarTimeseriesDefinitionType | LineTimeseriesDefinitionType) => {
    logger.debug('Building Dashboard Visualisation: ', JSON.stringify(definition))

    this.id = definition.id
    this.measures = definition.columns.measures
    this.keys = definition.columns.keys || []
    this.unit = this.measures.find(m => m.unit)?.unit
  }

  withPartialDate = (partialDate?: PartialDate) => {
    this.partialDate = partialDate
    return this
  }

  initFromData = () => {
    this.groupKey = DatasetHelper.getGroupKey(
      this.responseData,
      <Array<components['schemas']['DashboardVisualisationColumnDefinition']>>this.keys,
    ) as LineTimeseriesDefinitionMeasure | BarTimeseriesDefinitionMeasure | undefined
    const dateMeasure = DatasetHelper.getTimestampMeasure(
      <components['schemas']['DashboardVisualisationColumnDefinition'][]>this.measures,
    )

    if (!dateMeasure) {
      logger.debug(this.id, JSON.stringify(this.measures))
      throw new Error(`${this.id}: No timestamp field in definition`)
    }

    this.timeBlockData = DatasetHelper.groupRowsByTimestamp(this.responseData, dateMeasure)
    this.labels = this.getLabels()
    this.datasetCount = this.timeBlockData[0]?.length
  }

  buildDatasets = () => {
    this.chartColoursHelper = new ChartColoursHelper()
    for (let index = 0; index < this.datasetCount; index += 1) {
      const data = this.timeBlockData.map(timeperiod => {
        const valueId = this.measures[1].id
        const period = timeperiod[index]
        return period && period[valueId].raw ? Number(period[valueId].raw) : 0
      })
      const total = data.reduce((a, c) => a + c, 0)
      const label = this.chartLabelsHelper.getDatasetLabel(this.keys, this.timeBlockData[0][index])

      this.datasets.push({
        data,
        label,
        total,
      })
    }
  }

  private getLabels = () => {
    return this.timeBlockData
      .map((data: DashboardDataResponse[]) => {
        const dateColumn = getTimestampMeasure(
          <components['schemas']['DashboardVisualisationColumnDefinition'][]>this.measures,
        )
        const dateData = getDateValue(data, dateColumn)

        if (!dateData) return undefined

        return dateData.value
      })
      .filter((v): v is string => Boolean(v))
  }
}

export { TimeseriesChart }
export default TimeseriesChart

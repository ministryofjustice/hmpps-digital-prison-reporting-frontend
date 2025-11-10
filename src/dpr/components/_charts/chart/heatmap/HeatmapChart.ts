/* eslint-disable prefer-destructuring */
import dayjs from 'dayjs'
import { Granularity } from '../../../_inputs/granular-date-range/types'
import { DashboardDataResponse } from '../../../../types/Metrics'
import {
  DashboardVisualisationType,
  DashboardVisualisationBucket,
  DashboardVisualisationData,
} from '../../../_dashboards/dashboard-visualisation/types'
import { MatrixChartData } from './types'
import DatasetHelper from '../../../../utils/datasetHelper'
import DashboardVisualisationClass from '../../../_dashboards/dashboard-visualisation/DashboardVisualisation'
import Buckets from '../Buckets'
import { components } from '../../../../types/api'

class HeatmapChart extends DashboardVisualisationClass {
  private granularity: Granularity

  private data: MatrixChartData[] = []

  private dayDateFormat = 'DD/MM/YYYY'

  private valueKey: string

  private label: string

  private buckets: DashboardVisualisationBucket[] = []

  private bucketsHelper: Buckets

  private isTimeseriesChart: boolean

  constructor(
    responseData: DashboardDataResponse[],
    granularity: Granularity,
    definition: components['schemas']['DashboardVisualisationDefinition'],
  ) {
    super(responseData, definition)

    this.granularity = granularity
    this.isTimeseriesChart = <DashboardVisualisationType>this.type === DashboardVisualisationType.LINE_TIMESERIES
    this.setLabel()
    this.initUnit()
    this.bucketsHelper = new Buckets(responseData, this.definition, this.valueKey, true)
    this.buckets = this.bucketsHelper.getBuckets()
  }

  initUnit = () => {
    // todo
    this.unit = this.columns.measures[0].unit ? this.columns.measures[0].unit : undefined
  }

  private setLabel = () => {
    const { id, display } = this.columns.measures[1]
    this.valueKey = id
    this.label = display
  }

  private validateDefinition = () => {
    const { id, columns, type } = this.definition
    const errors = []

    // Validate measures
    if (columns.measures.length !== 2) {
      errors.push(`Measures should only have 2 columns defined. Only found ${columns.measures.length}`)
    } else if (<DashboardVisualisationType>type === DashboardVisualisationType.MATRIX_TIMESERIES) {
      if (columns.measures[0].id !== 'ts') {
        errors.push(`measure at index 0 has incorrect ID. Expected ID to be "ts". Found "${columns.measures[0].id}"`)
      }
    }

    // Throw the error
    if (errors.length) {
      const message = `Validation: Visualisaton definition: ID: ${id}, type: ${type}, errors: ${errors.join(',')}`
      throw new Error(message)
    }
  }

  private initTimeseriesData = () => {
    const timeBlockData = DatasetHelper.groupRowsByTimestamp(this.responseData)

    this.data = timeBlockData.map((tsData) => {
      const { raw, rag } = tsData[0][this.valueKey]
      const tsRaw = tsData[0].ts.raw

      const v = Number(raw)
      const r = rag !== undefined ? Number(tsData[0][this.valueKey].rag) : undefined
      let x
      let y

      switch (this.granularity) {
        case 'hourly':
          break
        case 'weekly':
          x = dayjs(tsRaw, this.dayDateFormat).format('ddd')
          y = dayjs(tsRaw, this.dayDateFormat).week()
          break
        case 'daily':
          x = dayjs(tsRaw, this.dayDateFormat).format('MMM YY')
          y = dayjs(tsRaw, this.dayDateFormat).format('D')
          break
        case 'monthly':
          {
            const ts = (<string>tsRaw).split(' ')
            x = ts[1]
            y = ts[0]
          }
          break
        case 'annually':
          x = 'year'
          y = <string>tsRaw
          break
        default:
          x = dayjs(tsRaw, this.dayDateFormat).format('MMM YY')
          y = dayjs(tsRaw, this.dayDateFormat).format('D')
          break
      }
      return { y, x, v, r }
    })
  }

  private bucketData = () => {
    this.data = this.data.map((d) => {
      const { v, r } = d
      const bucketData = this.bucketsHelper.getBucketForValue(v, r)
      return { ...d, c: bucketData.colour }
    })
  }

  build = (): DashboardVisualisationData => {
    this.validateDefinition()
    this.initTimeseriesData()
    this.bucketData()

    return {
      type: this.type,
      unit: this.unit,
      timeseries: true,
      data: {
        datasets: [
          {
            label: this.label,
            data: this.data,
          },
        ],
      },
    }
  }
}

export { HeatmapChart }
export default HeatmapChart

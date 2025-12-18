/* eslint-disable prefer-destructuring */
import dayjs from 'dayjs'
import { Granularity } from '../../../_inputs/granular-date-range/types'
import { DashboardDataResponse } from '../../../../types/Metrics'
import {
  DashboardVisualisationType,
  DashboardVisualisationData,
  DashboardVisualisationDataSet,
} from '../../../_dashboards/dashboard-visualisation/types'
import { MatrixChartData, MatrixTimeseriesDefinitionType } from './types'
import DatasetHelper from '../../../../utils/datasetHelper'
import Buckets from '../buckets/Buckets'
import { components } from '../../../../types/api'
import MatrixSchema from './validate'
import ChartConfig from '../chart-config'

class HeatmapChart {
  private definition!: MatrixTimeseriesDefinitionType

  private measures!: MatrixTimeseriesDefinitionType['columns']['measures']

  private responseData: DashboardDataResponse[] = []

  private granularity!: Granularity

  private data: MatrixChartData[] = []

  private dayDateFormat = 'DD/MM/YYYY'

  private valueKey = ''

  private label = ''

  private unit: 'NUMBER' | 'PERCENTAGE' | undefined

  private bucketsHelper!: Buckets

  private datasets: DashboardVisualisationDataSet[] = []

  config = ChartConfig

  private xLabels: (string | number)[] = []

  private yLabels: (string | number)[] = []

  withDefinition = (definition: components['schemas']['DashboardVisualisationDefinition']) => {
    this.definition = MatrixSchema.parse(definition)
    this.init()
    return this
  }

  withData = (responseData: DashboardDataResponse[]) => {
    this.responseData = responseData
    this.bucketsHelper = new Buckets(this.responseData, this.definition, this.valueKey, true)
    return this
  }

  withGranularity = (granularity: Granularity) => {
    this.granularity = granularity
    return this
  }

  private init = () => {
    this.measures = this.definition.columns.measures
    this.setLabel()
    this.initUnit()
  }

  initUnit = () => {
    this.unit = this.measures[0].unit ? this.measures[0].unit : undefined
  }

  private setLabel = () => {
    const { id, display } = this.measures[1]
    this.valueKey = id
    this.label = display || ''
  }

  private initTimeseriesData = () => {
    const timeBlockData = DatasetHelper.groupRowsByTimestamp(this.responseData)

    this.data = timeBlockData.map((tsData) => {
      const { raw, rag } = tsData[0][this.valueKey]
      const tsRaw = tsData[0]['ts'].raw

      const v: MatrixChartData['v'] = Number(raw)
      const r: MatrixChartData['r'] = rag !== undefined ? Number(tsData[0][this.valueKey].rag) : undefined
      let x: MatrixChartData['x'] = 0
      let y: MatrixChartData['y'] = 0

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

    this.bucketData()
    this.datasets = [
      {
        label: this.label,
        data: this.data,
      },
    ]
  }

  private bucketData = () => {
    this.data = this.data.map((d) => {
      const { v, r } = d
      const bucketData = this.bucketsHelper.getBucketForValue(v, r)
      return { ...d, c: bucketData.colour }
    })
  }

  private setBespokeOptions = () => {
    this.config = {
      ...this.config,
      scales: this.setScales(),
    }
  }

  setScales() {
    this.xLabels = [
      ...new Set(
        (<MatrixChartData[]>this.datasets[0].data).map((d) => {
          return d.x
        }),
      ),
    ]
    this.yLabels = [
      ...new Set(
        (<MatrixChartData[]>this.datasets[0].data).map((d) => {
          return d.y
        }),
      ),
    ]
    const grid = {
      display: false,
      drawBorder: false,
    }
    const ticks = {
      padding: 1,
      maxRotation: 0,
      stepSize: 1,
    }
    const offset = true
    const common = {
      offset,
      ticks,
      grid,
    }

    return {
      y: {
        position: 'left',
        type: 'category',
        ...(this.yLabels && { labels: this.yLabels }),
        ...common,
      },
      x: {
        position: 'top',
        type: 'category',
        ...(this.xLabels && { labels: this.xLabels }),
        ...common,
      },
    }
  }

  getCanvasHeight = () => {
    return this.yLabels.length * 20 + 60
  }

  build = (): DashboardVisualisationData => {
    this.initTimeseriesData()
    this.bucketData()
    this.setBespokeOptions()
    const height = this.getCanvasHeight()

    return {
      type: DashboardVisualisationType.MATRIX,
      options: {
        unit: this.unit,
        timeseries: true,
        height,
      },
      data: {
        datasets: this.datasets,
        config: this.config,
      },
    }
  }
}

export { HeatmapChart }
export default HeatmapChart

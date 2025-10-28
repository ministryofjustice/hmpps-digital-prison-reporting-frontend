/* eslint-disable prefer-destructuring */
import dayjs from 'dayjs'
import { withAlphaHex } from 'with-alpha-hex'
import { Granularity } from '../../../_inputs/granular-date-range/types'
import { DashboardDataResponse } from '../../../../types/Metrics'
import {
  DashboardVisualisation,
  DashboardVisualisationColumns,
  DashboardVisualisationType,
  MatrixDashboardVisualisationBucket,
  MatrixDashboardVisualisationOptions,
} from '../../../_dashboards/dashboard/types'
import { ChartData, ChartType, MatrixChartData, UnitType } from '../../../../types/Charts'
import DatasetHelper from '../../../../utils/datasetHelper'

class HeatmapChart {
  private baseColour = '#1d70b8'

  private ragColours: string[] = ['#00703c', '#ffdd00', '#d4351c']

  private buckets: MatrixDashboardVisualisationBucket[] = []

  private bucketCount: number

  private onlyBucketColoursDefined: boolean

  private granularity: Granularity

  private responseData: DashboardDataResponse[]

  private data: MatrixChartData[] = []

  private definition: DashboardVisualisation

  private columns: DashboardVisualisationColumns

  private unit: UnitType

  private type: ChartType

  private dayDateFormat = 'DD/MM/YYYY'

  private hasRag = false

  private valueKey: string

  private options: MatrixDashboardVisualisationOptions = {}

  private label: string

  constructor(responseData: DashboardDataResponse[], granularity: Granularity, definition: DashboardVisualisation) {
    this.granularity = granularity
    this.initFromDefinition(definition)
    this.initFromResponseData(responseData)
    this.initBuckets()
  }

  private initFromResponseData = (responseData: DashboardDataResponse[]) => {
    this.hasRag = responseData[0][this.valueKey].rag !== undefined
    this.responseData = responseData
  }

  private initFromDefinition = (definition: DashboardVisualisation) => {
    this.definition = definition
    this.columns = definition.columns
    this.unit = this.columns.measures[0].unit ? this.columns.measures[0].unit : undefined
    this.type = this.definition.type.split('-')[0] as ChartType

    this.options = <MatrixDashboardVisualisationOptions>definition.options
    this.baseColour = this.options.baseColour || this.baseColour
    this.valueKey = this.columns.measures[1].id
    this.label = this.columns.measures[1].display
    this.onlyBucketColoursDefined = this.options?.buckets?.every(
      (bucket) => !bucket.max && !bucket.min && bucket.hexColour !== undefined,
    )
  }

  private initBuckets = () => {
    const { buckets } = this.options
    this.setBucketCount()
    this.initBucketColours()
    if (buckets) {
      if (this.onlyBucketColoursDefined) {
        this.initAutomaticThresholdBucket()
      } else {
        this.initCustomThresholdBuckets()
      }
    } else if (!this.hasRag) this.initAutomaticThresholdBucket()
  }

  private initCustomThresholdBuckets = () => {
    this.buckets = this.options.buckets.map((bucket, i) => {
      return {
        ...this.buckets[i],
        ...bucket,
      }
    })
  }

  /**
   * Initialises the bucket thresholds by defining the range between the min and max
   * and dividing into 3 equal parts
   */
  private initAutomaticThresholdBucket = () => {
    const { min, max, bucketSize } = this.setAutomaticThresholdSize()
    let maxValue = 0
    this.buckets = this.buckets.map((bucket, i) => {
      let minValue = min
      if (i !== 0) minValue = maxValue + 1
      maxValue = bucketSize * (i + 1)
      if (i === this.buckets.length - 1) maxValue = max

      return {
        hexColour: this.options?.buckets ? this.options.buckets[i]?.hexColour : bucket.hexColour,
        min: minValue,
        max: maxValue,
      }
    })
  }

  private initBucketColours = () => {
    const { useRagColours } = this.options
    if (useRagColours && this.bucketCount === 3) {
      this.buckets = Array.from(new Array(this.bucketCount)).map((d, i) => {
        return {
          hexColour: this.ragColours[i],
        }
      })
    } else {
      const alphaDivision = 1 / this.bucketCount
      this.buckets = Array.from(new Array(this.bucketCount)).map((d, i) => {
        const division = alphaDivision * (i + 1)
        return {
          hexColour: withAlphaHex(this.baseColour, division),
        }
      })
    }
  }

  private setAutomaticThresholdSize = () => {
    const values = this.responseData.map((resData) => Number(resData[this.valueKey].raw))
    const min = Math.min(...values)
    const max = Math.max(...values)
    const bucketSize = Math.ceil((max - min) / this.bucketCount)

    return {
      min,
      max,
      bucketSize,
    }
  }

  private setBucketCount = () => {
    const { buckets } = this.options
    if (this.hasRag) {
      this.bucketCount =
        Math.max(...this.responseData.map((resData: DashboardDataResponse) => resData[this.valueKey].rag)) + 1
    } else if (buckets) {
      this.bucketCount = buckets.length
    } else {
      this.bucketCount = 3
    }
  }

  private validateDefinition = () => {
    const { id, columns, type } = this.definition
    const errors = []

    // Validate measures
    if (columns.measures.length !== 2) {
      errors.push(`Measures should only have 2 columns defined. Only found ${columns.measures.length}`)
    } else if (type === DashboardVisualisationType.MATRIX_TIMESERIES) {
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

  private binDataIntoBuckets = () => {
    this.data = this.data.map((d) => {
      const { v, r } = d
      let c
      if (r !== undefined) {
        c = this.buckets[r].hexColour
      } else {
        this.buckets.forEach((bucket) => {
          const { min, max } = bucket
          // First bucket
          if (!min && max && v <= max) {
            c = bucket.hexColour
          }
          // middle buckets
          if (min && v >= bucket.min && max && v <= bucket.max) {
            c = bucket.hexColour
          }
          // last bucket
          if (min && !max && v >= min) {
            c = bucket.hexColour
          }
        })
      }

      return { ...d, c }
    })
  }

  build = (): ChartData => {
    this.validateDefinition()
    this.initTimeseriesData()
    this.binDataIntoBuckets()

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

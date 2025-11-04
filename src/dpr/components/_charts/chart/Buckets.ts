/* eslint-disable prefer-destructuring */
import { withAlphaHex } from 'with-alpha-hex'
import { DashboardDataResponse } from '../../../types/Metrics'
import {
  DashboardVisualisation,
  DashboardVisualisationBucket,
  BucketDashboardVisualisationOptions,
} from '../../_dashboards/dashboard/types'

class Buckets {
  private baseColour = '#1d70b8'

  private ragColours: string[] = ['#00703c', '#ffdd00', '#d4351c']

  private buckets: DashboardVisualisationBucket[] = []

  private useRagColours: boolean

  private bucketCount: number

  private onlyBucketColoursDefined: boolean

  private autoBucketing: boolean

  private hasRagScore = false

  private valueKey: string

  private options: BucketDashboardVisualisationOptions

  responseData: DashboardDataResponse[]

  constructor(
    responseData: DashboardDataResponse[],
    definition: DashboardVisualisation,
    valueKey: string,
    autoBucketing?: boolean,
    ragColours?: string[],
  ) {
    this.responseData = responseData
    this.initFromOptions(definition)
    this.valueKey = valueKey
    this.hasRagScore = responseData[0][this.valueKey].rag !== undefined
    this.autoBucketing = autoBucketing
    if (ragColours) this.ragColours = ragColours
    this.initBuckets()
  }

  private initFromOptions = (definition: DashboardVisualisation) => {
    this.options = <BucketDashboardVisualisationOptions>definition.options || {}
    this.baseColour = this.options?.baseColour || this.baseColour
    this.useRagColours = this.options?.useRagColours || false
    this.onlyBucketColoursDefined = this.options?.buckets?.every(
      (bucket) => !bucket.max && !bucket.min && bucket.hexColour !== undefined,
    )
  }

  private initBuckets = () => {
    const { buckets } = this.options

    this.setBucketCount()
    this.initBucketColours()

    if (buckets) {
      if (this.hasRagScore) {
        if (this.onlyBucketColoursDefined) {
          this.buckets = buckets
        }
      } else if (!this.hasRagScore && this.onlyBucketColoursDefined && this.autoBucketing) {
        this.initAutomaticThresholdBucket()
      } else {
        this.initCustomThresholdBuckets()
      }
    } else if (!buckets && !this.hasRagScore && this.autoBucketing) {
      this.initAutomaticThresholdBucket()
    }
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
      maxValue = bucketSize * (i + 1) + min
      if (i === this.buckets.length - 1) maxValue = max

      return {
        hexColour: this.options?.buckets ? this.options.buckets[i]?.hexColour : bucket.hexColour,
        min: minValue,
        max: maxValue,
      }
    })
  }

  private initBucketColours = () => {
    if (this.useRagColours && this.bucketCount === 3) {
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
    if (this.hasRagScore) {
      if (this.useRagColours) {
        this.bucketCount = 3
      } else {
        this.bucketCount =
          Math.max(...this.responseData.map((resData: DashboardDataResponse) => resData[this.valueKey].rag)) + 1
      }
    } else if (buckets) {
      this.bucketCount = buckets.length
    } else {
      this.bucketCount = 3
    }
  }

  getBucketForValue = (value: number, ragScore?: number) => {
    let colour
    let score

    if (ragScore !== undefined) {
      return {
        colour: this.buckets[ragScore].hexColour,
        score: ragScore,
      }
    }

    this.buckets.forEach((bucket, index) => {
      const { min, max } = bucket
      // First bucket
      if (!min && max && value <= max) {
        colour = bucket.hexColour
        score = index.toString()
      }
      // middle buckets
      if (min && value >= bucket.min && max && value <= bucket.max) {
        colour = bucket.hexColour
        score = index.toString()
      }
      // last bucket
      if (min && !max && value >= min) {
        colour = bucket.hexColour
        score = index.toString()
      }
    })

    return {
      colour,
      score,
    }
  }

  getBuckets = () => {
    return this.buckets
  }
}

export { Buckets }
export default Buckets

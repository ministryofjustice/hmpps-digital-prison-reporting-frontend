/* eslint-disable prefer-destructuring */
import { DashboardDataResponse } from '../../../types/Metrics'
import {
  DashboardVisualisationBucket,
  ScorecardDefinitionType,
  ScorecardGroupDefinitionType,
} from '../dashboard-visualisation/types'
import { CreateScorecardDataArgs, Scorecard, ScorecardDataset, ScorecardTrend } from './types'
import Buckets from '../../_charts/chart/Buckets'
import { components } from '../../../types/api'
import DashboardVisualisationSchemas from '../dashboard-visualisation/Validate'
import DatasetHelper from '../../../utils/datasetHelper'

class ScorecardVisualisation {
  private definition!: ScorecardDefinitionType

  private id!: string

  private measures!: ScorecardDefinitionType['columns']['measures']

  private options!: ScorecardDefinitionType['options']

  private dataset!: ScorecardDataset

  private bucketsHelper: Buckets | undefined

  private buckets: DashboardVisualisationBucket[] = []

  private valueKey!: string

  private titleColumn: components['schemas']['DashboardVisualisationColumnDefinition'] | undefined

  private unit: 'NUMBER' | 'PERCENTAGE' | undefined

  responseData: DashboardDataResponse[] = []

  ragColours: string[] = ['#cce2d8', '#fff7bf', '#f4cdc6']

  withDefinition = (definition: components['schemas']['DashboardVisualisationDefinition']) => {
    this.definition = DashboardVisualisationSchemas.ScorecardSchema.parse(definition)
    this.init()

    return this
  }

  withData = (responseData: DashboardDataResponse[]) => {
    this.responseData = responseData
    this.dataset = this.getDataset(this.definition, this.responseData)
    this.initBuckets(this.responseData, this.valueKey)

    return this
  }

  private init = () => {
    this.id = this.definition.id
    this.measures = this.definition.columns.measures
    this.options = this.definition.options
    this.titleColumn = { display: this.definition.display, id: this.valueKey }
    this.initFromMeasures()
  }

  private initFromMeasures = () => {
    // Zod should throw an error on line 40 so should always pass
    if (this.measures[0] !== undefined) {
      this.valueKey = this.measures[0].id
      this.unit = this.measures[0].unit ? this.measures[0].unit : undefined
    }
  }

  private initBuckets = (responseData: DashboardDataResponse[], valueKey: string) => {
    if (this.options?.buckets || this.options?.useRagColour) {
      this.bucketsHelper = new Buckets(responseData, this.definition, valueKey, false, this.ragColours)
      this.buckets = this.bucketsHelper.getBuckets()
    }
  }

  getDataset = (
    definition: ScorecardDefinitionType | ScorecardGroupDefinitionType,
    rawData: DashboardDataResponse[],
  ) => {
    const latestData = DatasetHelper.getLastestDataset(rawData)
    const latestDataSetRows = DatasetHelper.getDatasetRows(definition, latestData)
    const latestTs = latestDataSetRows[0]?.ts?.raw
    const latestFiltered = DatasetHelper.filterRowsByDisplayColumns(definition, latestDataSetRows, true)

    const earliestData = DatasetHelper.getEarliestDataset(rawData)
    const earliestDataSetRows = DatasetHelper.getDatasetRows(definition, earliestData)
    const earliestTs = earliestDataSetRows[0]?.ts?.raw
    const earliestfiltered = DatasetHelper.filterRowsByDisplayColumns(definition, earliestDataSetRows, true)

    return {
      earliest: earliestfiltered,
      earliestTs,
      latest: latestFiltered,
      latestTs,
    }
  }

  createScorecardData = ({
    id,
    title,
    value,
    rag,
    valueFor,
    valueFrom,
    prevVal,
    groupTitle,
  }: CreateScorecardDataArgs): Scorecard => {
    return {
      id,
      title,
      value,
      ...(rag && { rag }),
      valueFor,
      trend: this.createTrend(valueFor, valueFrom, value, prevVal),
      ...(groupTitle && {
        group: groupTitle,
      }),
    }
  }

  createTrend = (
    valueFor: string,
    valueFrom: string,
    latestValue: string | number,
    earliestValue: string | number,
  ): ScorecardTrend | undefined => {
    let trendData

    if (valueFrom !== valueFor) {
      const value = +latestValue - +earliestValue
      const direction = Math.sign(value)
      trendData = {
        direction,
        value: Math.abs(value),
        from: valueFrom,
      }
    }

    return trendData
  }

  setRagScore = (
    value: string | number,
    rag: number | undefined,
    buckets: DashboardVisualisationBucket[] | undefined,
    bucketsHelper: Buckets | undefined,
  ) => {
    let ragScore
    if (!Number.isNaN(value) && buckets?.length && bucketsHelper) {
      ragScore = bucketsHelper.getBucketForValue(<number>value, rag)
    }
    return ragScore
  }

  build = () => {
    const { latest, earliest, latestTs, earliestTs } = this.dataset
    const scorecordArr: Scorecard[] = latest.map((datasetRow: DashboardDataResponse, index: number) => {
      const { raw: value, rag } = datasetRow[this.valueKey]
      const prevVal = earliest[index][this.valueKey].raw
      const valueFor = `${latestTs}`
      const valueFrom = `${earliestTs}`
      const title = this.titleColumn?.display

      return this.createScorecardData({
        id: this.id,
        title: title || '',
        value,
        rag: this.setRagScore(value, rag, this.buckets, this.bucketsHelper),
        prevVal,
        valueFor,
        valueFrom,
      })
    })

    return scorecordArr[0]
  }
}

export { ScorecardVisualisation }
export default ScorecardVisualisation

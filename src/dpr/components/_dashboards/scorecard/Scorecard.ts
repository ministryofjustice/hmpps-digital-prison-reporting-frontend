/* eslint-disable prefer-destructuring */
import { DashboardDataResponse } from '../../../types/Metrics'
import DashboardVisualisationClass from '../dashboard-visualisation/DashboardVisualisation'
import { DashboardVisualisationBucket, ScorecardDefinitionType } from '../dashboard-visualisation/types'
import DatasetHelper from '../../../utils/datasetHelper'
import { CreateScorecardDataArgs, Scorecard, ScorecardDataset, ScorecardGroup, ScorecardTrend } from './types'
import Buckets from '../../_charts/chart/Buckets'
import { components } from '../../../types/api'

class ScorecardVisualisation extends DashboardVisualisationClass {
  definition: ScorecardDefinitionType

  measures: ScorecardDefinitionType['columns']['measures']

  keys: ScorecardDefinitionType['columns']['keys']

  private dataset: ScorecardDataset

  private bucketsHelper: Buckets | undefined

  private buckets: DashboardVisualisationBucket[] = []

  private valueKey = ''

  private titleColumn: components['schemas']['DashboardVisualisationColumnDefinition'] | undefined

  ragColours: string[] = ['#cce2d8', '#fff7bf', '#f4cdc6']

  constructor(
    responseData: DashboardDataResponse[],
    definition: components['schemas']['DashboardVisualisationDefinition'],
  ) {
    super(responseData, definition)

    this.dataset = this.getDataset(definition, responseData)
    this.valueKey = this.measures[0].id
    this.titleColumn = { display: definition.display, id: this.valueKey }
    this.initBuckets(responseData, this.valueKey)
  }

  private initBuckets = (responseData: DashboardDataResponse[], valueKey: string) => {
    if (this.definition.options?.buckets || this.definition.options?.useRagColour) {
      this.bucketsHelper = new Buckets(responseData, this.definition, valueKey, false, this.ragColours)
      this.buckets = new Buckets(responseData, this.definition, valueKey, false, this.ragColours).getBuckets()
    }
  }

  setRagScore = (value: number, rag?: number) => {
    return this.bucketsHelper?.getBucketForValue(value, rag)
  }

  createScorecardData = ({
    title,
    value,
    rag,
    valueFor,
    valueFrom,
    prevVal,
    groupTitle,
  }: CreateScorecardDataArgs): Scorecard => {
    return {
      id: this.definition.id,
      title,
      value,
      ...(!Number.isNaN(value) &&
        this.buckets.length &&
        this.bucketsHelper && { rag: this.bucketsHelper?.getBucketForValue(<number>value, rag) }),
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

  build = () => {
    const { latest, earliest, latestTs, earliestTs } = this.dataset
    const scorecordArr: Scorecard[] = latest.map((datasetRow: DashboardDataResponse, index: number) => {
      const { raw: value, rag } = datasetRow[this.valueKey]
      const prevVal = earliest[index][this.valueKey].raw
      const valueFor = `${latestTs}`
      const valueFrom = `${earliestTs}`
      const title = this.titleColumn?.display

      return this.createScorecardData({
        title: title || '',
        value,
        rag,
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

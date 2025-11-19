/* eslint-disable prefer-destructuring */
import { DashboardDataResponse } from '../../../types/Metrics'
import DashboardVisualisationClass from '../dashboard-visualisation/DashboardVisualisation'
import { DashboardVisualisationBucket, ScorecardGroupDefinitionType } from '../dashboard-visualisation/types'
import DatasetHelper from '../../../utils/datasetHelper'
import {
  CreateScorecardDataArgs,
  ScorecardDataset,
  ScorecardGroup,
  ScorecardTrend,
  Scorecard,
} from '../scorecard/types'
import Buckets from '../../_charts/chart/Buckets'
import { components } from '../../../types/api'

class ScorecardGroupVisualisation extends DashboardVisualisationClass {
  definition: ScorecardGroupDefinitionType

  measures: ScorecardGroupDefinitionType['columns']['measures']

  keys: ScorecardGroupDefinitionType['columns']['keys']

  private dataset: ScorecardDataset

  private groupKey: components['schemas']['DashboardVisualisationColumnDefinition'] | undefined

  private groupKeyId: string | undefined

  private groupKeyDisplay: string | undefined

  private bucketsHelper: Buckets | undefined

  private buckets: DashboardVisualisationBucket[] = []

  private valueColumn: components['schemas']['DashboardVisualisationColumnDefinition'] | undefined

  private valueKey = ''

  private titleColumn: components['schemas']['DashboardVisualisationColumnDefinition'] | undefined

  private titleKey = ''

  private ragColours: string[] = ['#cce2d8', '#fff7bf', '#f4cdc6']

  constructor(
    responseData: DashboardDataResponse[],
    definition: components['schemas']['DashboardVisualisationDefinition'],
  ) {
    super(responseData, definition)
    this.dataset = this.getDataset(definition, responseData)
    this.initGroupVars()
  }

  private initBuckets = (responseData: DashboardDataResponse[], valueKey: string) => {
    if (this.definition.options?.buckets || this.definition.options?.useRagColour) {
      this.bucketsHelper = new Buckets(responseData, this.definition, valueKey, false, this.ragColours)
      this.buckets = new Buckets(responseData, this.definition, valueKey, false, this.ragColours).getBuckets()
    }
  }

  private initGroupVars = () => {
    this.groupKey = DatasetHelper.getGroupKey(this.keys, this.dataset.latest)
    this.groupKeyId = this.groupKey?.id
    this.groupKeyDisplay = this.groupKey?.display

    this.valueColumn = this.measures.find((col) => col.displayValue)
    if (this.valueColumn) {
      this.valueKey = this.valueColumn?.id
      this.titleColumn = this.measures.find((col) => {
        return col.display || col.display === ''
      })
      this.titleKey = this.titleColumn?.id || ''
    }
  }

  private createScorecardData = ({
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

  private createTrend = (
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

  private createScorecardGroupFromColumns = () => {
    const { latest, earliest, latestTs, earliestTs } = this.dataset

    return latest.map((row, rowIndex) => {
      return {
        title: this.createGroupTitle(row),
        scorecards: Object.keys(row)
          .filter((colId) => colId !== this.groupKeyId)
          .map((colId) => {
            const measure = this.measures.find((m) => m.id === colId)
            const title = measure?.display || colId
            const rowCol = row[colId]
            const { raw, rag: ragScore } = rowCol
            const value = Number(raw)

            const rag = ragScore !== undefined ? Number(ragScore) : undefined
            this.initBuckets([row], colId)

            const valueFor = `${latestTs}`
            const valueFrom = `${earliestTs}`

            const comparisonRow = earliest[rowIndex]
            const prevVal = comparisonRow[colId]?.raw

            return this.createScorecardData({
              title,
              value,
              rag,
              prevVal,
              valueFor,
              valueFrom,
            })
          }),
      }
    })
  }

  private createScorecardGroupFromList = (): ScorecardGroup[] => {
    const { latest, earliest } = this.dataset
    return [
      {
        title: '',
        scorecards: latest.map((row: DashboardDataResponse, index: number) => {
          const values = this.getScorecardValues(row)
          const prevVal = earliest[index][this.valueKey].raw
          return this.createScorecardData({
            ...values,
            prevVal,
          })
        }),
      },
    ]
  }

  private createScorecardGroupFromListWithGroups = () => {
    const { latest, earliest } = this.dataset

    let earliestGroupedByKey = DatasetHelper.groupRowsByKey(earliest, <string>this.groupKeyId)
    let latestGroupedByKey = DatasetHelper.groupRowsByKey(latest, <string>this.groupKeyId)
    if (this.groupKeyId === this.titleKey) {
      latestGroupedByKey = [latestGroupedByKey.flat()]
      earliestGroupedByKey = [earliestGroupedByKey.flat()]
    }

    const scorecardGroup = latestGroupedByKey.map((group, groupIndex) => {
      return {
        title: this.groupKeyDisplay ? `By ${this.groupKeyDisplay}` : '',
        scorecards: group.map((row, rowIndex) => {
          const values = this.getScorecardValues(row)
          const comparisonRow = earliestGroupedByKey[groupIndex][rowIndex]
          const prevVal = comparisonRow[this.valueKey]?.raw

          return this.createScorecardData({
            ...values,
            prevVal,
          })
        }),
      }
    })

    return scorecardGroup
  }

  private getScorecardValues = (row: DashboardDataResponse) => {
    const { latestTs, earliestTs } = this.dataset
    const title = `${this.titleColumn?.display} ${row[this.titleKey].raw}`
    const rowCol = row[this.valueKey]
    const { raw, rag: ragScore } = rowCol
    const value = Number(raw)
    const rag = ragScore !== undefined ? Number(ragScore) : undefined
    this.initBuckets([row], this.valueKey)
    const valueFor = `${latestTs}`
    const valueFrom = `${earliestTs}`

    return {
      title,
      value,
      rag,
      valueFor,
      valueFrom,
    }
  }

  private createGroupTitle = (row: DashboardDataResponse) => {
    const title = this.groupKeyId ? `${row[this.groupKeyId]?.raw}` : ''
    return this.groupKeyDisplay && this.groupKeyDisplay.length ? `${this.groupKeyDisplay}: ${title}` : title
  }

  private buildGroup = () => {
    let scorecardGroup: ScorecardGroup[]
    if (!this.valueColumn) {
      scorecardGroup = this.createScorecardGroupFromColumns()
    } else if (this.groupKey) {
      scorecardGroup = this.createScorecardGroupFromListWithGroups()
    } else {
      scorecardGroup = this.createScorecardGroupFromList()
    }
    return scorecardGroup
  }

  build = () => {
    return this.buildGroup()
  }
}

export { ScorecardGroupVisualisation }
export default ScorecardGroupVisualisation

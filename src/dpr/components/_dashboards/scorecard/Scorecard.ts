/* eslint-disable prefer-destructuring */
import { DashboardDataResponse } from '../../../types/Metrics'
import DashboardVisualisationClass from '../../_charts/chart/DashboardVisualisation'
import {
  DashboardVisualisation,
  DashboardVisualisationBucket,
  DashboardVisualisationColumnKey,
  DashboardVisualisationColumnMeasure,
} from '../dashboard/types'
import DatasetHelper from '../../../utils/datasetHelper'
import { CreateScorecardDataArgs, Scorecard, ScorecardDataset, ScorecardGroup, ScorecardTrend } from './types'
import Buckets from '../../_charts/chart/Buckets'

class ScorecardVisualisation extends DashboardVisualisationClass {
  private dataset: ScorecardDataset

  private groupKey: DashboardVisualisationColumnKey

  private groupKeyId: string

  private groupKeyDisplay: string

  private bucketsHelper: Buckets

  private buckets: DashboardVisualisationBucket[] = []

  private valueColumn: DashboardVisualisationColumnMeasure

  private valueKey: string

  private titleColumn: DashboardVisualisationColumnMeasure

  private titleKey: string

  private group: boolean

  private ragColours: string[] = ['#cce2d8', '#fff7bf', '#f4cdc6']

  constructor(responseData: DashboardDataResponse[], definition: DashboardVisualisation, group = false) {
    super(responseData, definition)
    this.group = group
    this.dataset = this.getDataset(definition, responseData)

    if (group) {
      this.initGroupVars()
    } else {
      this.titleColumn = this.measures[0]
      this.valueKey = this.measures[0].id
      this.bucketsHelper = new Buckets(responseData, this.definition, this.valueKey, false, this.ragColours)
    }
  }

  private initBuckets = (responseData: DashboardDataResponse[], valueKey: string) => {
    this.bucketsHelper = new Buckets(responseData, this.definition, valueKey, false, this.ragColours)
    this.buckets = new Buckets(responseData, this.definition, valueKey, false, this.ragColours).getBuckets()
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
      this.titleKey = this.titleColumn?.id
    }
  }

  private getDataset = (scorecardDefinition: DashboardVisualisation, rawData: DashboardDataResponse[]) => {
    const latestData = DatasetHelper.getLastestDataset(rawData)
    const latestDataSetRows = DatasetHelper.getDatasetRows(scorecardDefinition, latestData)
    const latestTs = latestDataSetRows[0]?.ts?.raw
    const latestFiltered = DatasetHelper.filterRowsByDisplayColumns(scorecardDefinition, latestDataSetRows, true)

    const earliestData = DatasetHelper.getEarliestDataset(rawData)
    const earliestDataSetRows = DatasetHelper.getDatasetRows(scorecardDefinition, earliestData)
    const earliestTs = earliestDataSetRows[0]?.ts?.raw
    const earliestfiltered = DatasetHelper.filterRowsByDisplayColumns(scorecardDefinition, earliestDataSetRows, true)

    return {
      earliest: earliestfiltered,
      earliestTs,
      latest: latestFiltered,
      latestTs,
    }
  }

  private setRagScore = (value: number, rag?: number) => {
    return this.bucketsHelper.getBucketForValue(value, rag)
  }

  private createScorecardData = ({
    title,
    value,
    rag,
    valueFor,
    valueFrom,
    prevVal,
    groupTitle,
  }: CreateScorecardDataArgs) => {
    return {
      title,
      value,
      ...(!Number.isNaN(value) && this.buckets.length && { rag: this.setRagScore(<number>value, rag) }),
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

  private validateDefinition = () => {
    const { id, type } = this.definition
    const errors = []

    // if (this.group) {
    //   if (this.measures.length !== 2) {
    //     errors.push(`Measures should have 2 column defined. Found ${this.measures.length}`)
    //   } else if (!this.titleColumn) {
    //     errors.push(`No title column defined. Expected measure to include "display: string" field`)
    //   } else if (!this.titleKey) {
    //     errors.push(`Missing ID in title measure. Expected measure to include "id: string" field`)
    //   }
    // }
    if (!this.group) {
      if (this.measures.length !== 1) {
        errors.push(`Measures should only have 1 column defined. Found ${this.measures.length}`)
      } else if (!this.titleColumn) {
        errors.push(`No title column defined. Expected measure to include "display: string" field`)
      } else if (!this.valueKey) {
        errors.push(`Missing ID in title measure. Expected measure to include "id: string" field`)
      }
    }

    if (errors.length) {
      // Throw the error
      const message = `Validation: Visualisaton definition: ID: ${id}, type: ${type}, errors: ${errors.join(',')}`
      throw new Error(message)
    }
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

    let earliestGroupedByKey = DatasetHelper.groupRowsByKey(earliest, this.groupKeyId)
    let latestGroupedByKey = DatasetHelper.groupRowsByKey(latest, this.groupKeyId)
    if (this.groupKeyId === this.titleKey) {
      latestGroupedByKey = [latestGroupedByKey.flat()]
      earliestGroupedByKey = [earliestGroupedByKey.flat()]
    }

    const scorecardGroup = latestGroupedByKey.map((group, groupIndex) => {
      return {
        title: this.createGroupTitle(group[0]),
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
    const title = `${this.titleColumn.display} ${row[this.titleKey].raw}`
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

  /**
   * Builds a single scorecard
   *
   * @return {Scorecard}
   */
  private buildScorecard = () => {
    const { latest, earliest, latestTs, earliestTs } = this.dataset
    const scorecordArr: Scorecard[] = latest.map((datasetRow: DashboardDataResponse, index: number) => {
      const { raw: value, rag } = datasetRow[this.valueKey]
      const prevVal = earliest[index][this.valueKey].raw
      const valueFor = `${latestTs}`
      const valueFrom = `${earliestTs}`
      const title = this.measures[0].display

      return this.createScorecardData({
        title,
        value,
        rag,
        prevVal,
        valueFor,
        valueFrom,
      })
    })

    return scorecordArr[0]
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
    this.validateDefinition()
    if (this.group) {
      return this.buildGroup()
    }
    return this.buildScorecard()
  }
}

export { ScorecardVisualisation }
export default ScorecardVisualisation

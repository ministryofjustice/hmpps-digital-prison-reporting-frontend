/* eslint-disable prefer-destructuring */
import { DashboardDataResponse } from '../../../types/Metrics'
import DatasetHelper from '../../../utils/datasetHelper'
import { ScorecardDataset, ScorecardGroup } from '../scorecard/types'
import Buckets from '../../_charts/chart/buckets/Buckets'
import { components } from '../../../types/api'
import ScorecardVisualisation from '../scorecard/Scorecard'
import { ScorecardGroupDefinitionType, ScorecardGroupDefinitionMeasure } from './types'
import { DashboardVisualisationBucket } from '../dashboard-visualisation/types'
import ScorecardGroupSchemas from './validate'

class ScorecardGroupVisualisation {
  private definition!: ScorecardGroupDefinitionType

  private id!: string

  private measures!: ScorecardGroupDefinitionType['columns']['measures']

  private keys!: ScorecardGroupDefinitionType['columns']['keys']

  private options!: ScorecardGroupDefinitionType['options']

  private dataset!: ScorecardDataset

  private groupKey: ScorecardGroupDefinitionMeasure | undefined

  private groupKeyId: string | undefined

  private groupKeyDisplay: string | undefined

  private bucketsHelper: Buckets | undefined

  private buckets: DashboardVisualisationBucket[] = []

  private valueColumn: ScorecardGroupDefinitionMeasure | undefined

  private valueKey = ''

  private titleColumn: ScorecardGroupDefinitionMeasure | undefined

  private titleKey = ''

  responseData: DashboardDataResponse[] = []

  scoreCardBuilder: ScorecardVisualisation

  constructor() {
    this.scoreCardBuilder = new ScorecardVisualisation()
  }

  withDefinition = (definition: components['schemas']['DashboardVisualisationDefinition']) => {
    this.definition = ScorecardGroupSchemas.ScorecardGroupSchema.parse(definition)
    this.init()

    return this
  }

  withData = (responseData: DashboardDataResponse[]) => {
    this.responseData = responseData
    this.dataset = this.scoreCardBuilder.getDataset(this.definition, this.responseData)
    this.initBuckets(this.responseData, this.valueKey)
    this.initGroupVars()
    return this
  }

  private init = () => {
    this.id = this.definition.id
    this.measures = this.definition.columns.measures
    this.keys = this.definition.columns.keys
    this.options = this.definition.options
    this.valueKey = this.measures[0].id
    this.titleColumn = { display: this.definition.display || '', id: this.valueKey }
  }

  private initBuckets = (responseData: DashboardDataResponse[], valueKey: string) => {
    if (this.options?.buckets || this.options?.useRagColour) {
      this.bucketsHelper = new Buckets(responseData, this.definition, valueKey, false, this.scoreCardBuilder.ragColours)
      this.buckets = this.bucketsHelper.getBuckets()
    }
  }

  private initGroupVars = () => {
    this.groupKey = DatasetHelper.getGroupKey(
      this.dataset.latest,
      <Array<components['schemas']['DashboardVisualisationColumnDefinition']>>this.keys || [],
    )
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
            const { raw, rag } = rowCol
            const value = Number(raw)

            const ragValue = rag !== undefined ? Number(rag) : undefined
            this.initBuckets([row], colId)

            const valueFor = `${latestTs}`
            const valueFrom = `${earliestTs}`

            const comparisonRow = earliest[rowIndex]
            const prevVal = comparisonRow[colId]?.raw
            const ragScore = this.scoreCardBuilder.setRagScore(value, ragValue, this.buckets, this.bucketsHelper)

            return this.scoreCardBuilder.createScorecardData({
              id: this.id,
              title,
              value,
              rag: ragScore,
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
          return this.scoreCardBuilder.createScorecardData({
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

          return this.scoreCardBuilder.createScorecardData({
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
      id: this.id,
      title,
      value,
      rag: this.scoreCardBuilder.setRagScore(value, rag, this.buckets, this.bucketsHelper),
      valueFor,
      valueFrom,
    }
  }

  private createGroupTitle = (row: DashboardDataResponse) => {
    const title = this.groupKeyId ? `${row[this.groupKeyId]?.raw}` : ''
    return this.groupKeyDisplay && this.groupKeyDisplay.length ? `${this.groupKeyDisplay}: ${title}` : title
  }

  build = () => {
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
}

export { ScorecardGroupVisualisation }
export default ScorecardGroupVisualisation

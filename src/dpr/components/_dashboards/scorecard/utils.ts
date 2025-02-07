import { MetricsDataResponse } from '../../../types/Metrics'
import {
  DashboardUIVisualisation,
  DashboardVisualisation,
  DashboardVisualisationType,
  ScorecardVisualisationColumn,
} from '../dashboard/types'
import { Scorecard, ScorecardTrend } from './types'
import DashboardSectionUtils from '../dashboard-section/utils'

const getDataset = (scorecardDefinition: DashboardVisualisation, rawData: MetricsDataResponse[][]) => {
  const latestData = rawData[rawData.length - 1]
  const latestDataSetRows = DashboardSectionUtils.getDatasetRows(scorecardDefinition, latestData)
  const latestTs = latestDataSetRows[0]?.timestamp?.raw
  const latestFiltered = DashboardSectionUtils.filterByMeasures(scorecardDefinition, latestDataSetRows)

  const earliestData = rawData[0]
  const earliestDataSetRows = DashboardSectionUtils.getDatasetRows(scorecardDefinition, earliestData)
  const earliestTs = earliestDataSetRows[0]?.timestamp?.raw
  const earliestfiltered = DashboardSectionUtils.filterByMeasures(scorecardDefinition, earliestDataSetRows)

  return {
    earliest: earliestfiltered,
    earliestTs,
    latest: latestFiltered,
    latestTs,
  }
}

const getScorecardData = (
  scorecardDefinition: DashboardVisualisation,
  rawData: MetricsDataResponse[][],
  titleDisplay: string,
  valueColumnId: string,
  displayColumnId?: string,
) => {
  const { earliest, latest, earliestTs, latestTs } = getDataset(scorecardDefinition, rawData)

  return latest.map((datasetRow: MetricsDataResponse, index: number) => {
    const title = displayColumnId ? `${titleDisplay} ${datasetRow[displayColumnId].raw}` : titleDisplay
    const { rag, raw: value } = datasetRow[valueColumnId]
    const prevVal = earliest[index][valueColumnId].raw
    const valueFor = `${latestTs}`
    const valueFrom = `${earliestTs}`

    return {
      title,
      value,
      ...(rag && { rag: getRag(rag) }),
      valueFor,
      trend: createTrend(valueFor, valueFrom, value, prevVal),
    }
  })
}

const createScorecard = (scorecardDefinition: DashboardVisualisation, rawData: MetricsDataResponse[][]) => {
  const { columns } = scorecardDefinition
  const { measures } = columns
  const displayColumn = measures[0]
  const { id: valueColumnId, display } = displayColumn

  const scorecardDataArray = getScorecardData(scorecardDefinition, rawData, display, valueColumnId)
  const scorecardData = scorecardDataArray.length ? scorecardDataArray[0] : undefined

  return scorecardData
}

const createScorecards = (scorecardDefinition: DashboardVisualisation, rawData: MetricsDataResponse[][]) => {
  const { columns } = scorecardDefinition
  const { measures } = columns

  const displayColumn = measures.find((col) => col.display)
  const { id: displayColumnId, display } = displayColumn
  const valueColumnId = (<ScorecardVisualisationColumn[]>measures).find((col) => col.displayValue).id

  return getScorecardData(scorecardDefinition, rawData, display, valueColumnId, displayColumnId)
}

const getRag = (ragScore: number) => {
  const ragColors = ['green', 'yellow', 'red']
  return {
    score: ragScore,
    color: ragColors[ragScore],
  }
}

const createTrend = (
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

const mergeScorecards = (visualisations: DashboardUIVisualisation[]) => {
  const groupedScorecardIds: number[][] = visualisations
    // get scorecard indexes
    .reduce((acc: number[], vis: DashboardUIVisualisation, i: number) => {
      if (vis.type === DashboardVisualisationType.SCORECARD) acc.push(i)
      return acc
    }, [])
    // group adjacent indexes
    .reduce((r, n) => {
      const lastSubArray = r[r.length - 1]
      if (!lastSubArray || lastSubArray[lastSubArray.length - 1] !== n - 1) r.push([])
      r[r.length - 1].push(n)
      return r
    }, [])

  groupedScorecardIds.reverse().forEach((group) => {
    const spliceAtIndex = group[0]
    const scorecardGroup: Scorecard[] = group
      .map((scIndex: number) => {
        return visualisations[scIndex].data as Scorecard
      })
      .filter((scorecard: Scorecard) => !!scorecard)

    while (group.length) {
      visualisations.splice(group.pop(), 1)
    }

    if (scorecardGroup.length) {
      visualisations.splice(spliceAtIndex, 0, {
        id: `${spliceAtIndex}`,
        type: DashboardVisualisationType.SCORECARD_GROUP,
        data: scorecardGroup,
      })
    }
  })
}

export default {
  createScorecard,
  createScorecards,
  mergeScorecards,
}

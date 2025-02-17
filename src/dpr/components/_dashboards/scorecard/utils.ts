import { DashboardDataResponse } from '../../../types/Metrics'
import {
  DashboardUIVisualisation,
  DashboardVisualisation,
  DashboardVisualisationType,
  ScorecardVisualisationColumn,
} from '../dashboard/types'
import { Scorecard, ScorecardSubGroup, ScorecardTrend } from './types'
import DatasetHelper from '../../../utils/datasetHelper'

const getDataset = (scorecardDefinition: DashboardVisualisation, rawData: DashboardDataResponse[]) => {
  const latestData = DatasetHelper.getLastestDataset(rawData)
  const latestDataSetRows = DatasetHelper.getDatasetRows(scorecardDefinition, latestData)
  const latestTs = latestDataSetRows[0]?.ts?.raw
  const latestFiltered = DatasetHelper.filterRowsByDisplayColumns(scorecardDefinition, latestDataSetRows)

  const earliestData = DatasetHelper.getEarliestDataset(rawData)
  const earliestDataSetRows = DatasetHelper.getDatasetRows(scorecardDefinition, earliestData)
  const earliestTs = earliestDataSetRows[0]?.ts?.raw
  const earliestfiltered = DatasetHelper.filterRowsByDisplayColumns(scorecardDefinition, earliestDataSetRows)

  return {
    earliest: earliestfiltered,
    earliestTs,
    latest: latestFiltered,
    latestTs,
  }
}

const getScorecardData = (
  scorecardDefinition: DashboardVisualisation,
  rawData: DashboardDataResponse[],
  titleDisplay: string,
  valueColumnId: string,
  displayColumnId?: string,
  groupColumnId?: string,
): Scorecard[] => {
  const { earliest, latest, earliestTs, latestTs } = getDataset(scorecardDefinition, rawData)

  return latest.map((datasetRow: DashboardDataResponse, index: number) => {
    const title = displayColumnId ? `${titleDisplay} ${datasetRow[displayColumnId].raw}` : titleDisplay
    const groupTitle = groupColumnId ? `${datasetRow[groupColumnId].raw}` : undefined
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
      ...(groupTitle && {
        group: groupTitle,
      }),
    }
  })
}

const createScorecard = (scorecardDefinition: DashboardVisualisation, rawData: DashboardDataResponse[]) => {
  const { columns } = scorecardDefinition
  const { measures } = columns
  const displayColumn = measures[0]
  const { id: valueColumnId, display } = displayColumn

  const scorecardDataArray = getScorecardData(scorecardDefinition, rawData, display, valueColumnId)

  const scorecardData = scorecardDataArray.length ? scorecardDataArray[0] : undefined

  return scorecardData
}

const createScorecards = (
  scorecardDefinition: DashboardVisualisation,
  rawData: DashboardDataResponse[],
): Scorecard[] | ScorecardSubGroup[] => {
  const { columns } = scorecardDefinition
  const { measures } = columns

  const nonValueColumns = (<ScorecardVisualisationColumn[]>measures).filter((col) => !col.displayValue)
  const valueColumnId = (<ScorecardVisualisationColumn[]>measures).find((col) => col.displayValue).id
  const displayColumn = nonValueColumns.find((col) => {
    return col.display || col.display === ''
  })
  const groupId =
    nonValueColumns.length > 1 ? nonValueColumns.filter((c) => c.id !== displayColumn.id)[0]?.id : undefined

  const { id: displayColumnId, display } = displayColumn

  const scorecardGroup = getScorecardData(
    scorecardDefinition,
    rawData,
    display,
    valueColumnId,
    displayColumnId,
    groupId,
  )

  if (groupId) {
    const groups = groupBy(scorecardGroup, 'group')
    return Object.keys(groups).map((key: string) => {
      return {
        name: key,
        scorecards: groups[key],
      }
    })
  }

  return scorecardGroup
}

const getRag = (ragScore: number) => {
  const ragColors = ['green', 'yellow', 'red']
  return {
    score: ragScore,
    color: ragColors[ragScore],
  }
}

const groupBy = (xs: Scorecard[], key: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return xs.reduce((rv: any, x: any) => {
    // eslint-disable-next-line no-param-reassign
    ;(rv[x[key]] ??= []).push(x)
    return rv
  }, {})
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
  const groupedScorecardIndexes: number[][] = visualisations
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

  groupedScorecardIndexes.reverse().forEach((group) => {
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

  return visualisations
}

export default {
  createScorecard,
  createScorecards,
  mergeScorecards,
}

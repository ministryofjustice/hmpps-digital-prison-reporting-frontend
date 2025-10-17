import { DashboardDataResponse } from '../../../types/Metrics'
import {
  DashboardUIVisualisation,
  DashboardVisualisation,
  DashboardVisualisationColumn,
  DashboardVisualisationColumns,
  DashboardVisualisationType,
  ScorecardVisualisationColumn,
} from '../dashboard/types'
import { Scorecard, ScorecardGroup, ScorecardTrend } from './types'
import DatasetHelper from '../../../utils/datasetHelper'

export const createScorecards = (
  scorecardDefinition: DashboardVisualisation,
  rawData: DashboardDataResponse[],
): ScorecardGroup[] => {
  const { columns } = scorecardDefinition
  const { measures, keys } = columns
  const dataset = getDataset(scorecardDefinition, rawData)
  const { earliest, latest, earliestTs, latestTs } = dataset

  const scorecardFromListValueColumn = (<ScorecardVisualisationColumn[]>measures).find((col) => col.displayValue)
  const groupKey = DatasetHelper.getGroupKey(keys, latest)

  let scorecardGroup: ScorecardGroup[]
  if (!scorecardFromListValueColumn) {
    scorecardGroup = createScorecardGroupFromColumns(columns, earliest, earliestTs, latest, latestTs, groupKey)
  } else if (groupKey) {
    scorecardGroup = createScorecardGroupFromListWithGroups(columns, earliest, earliestTs, latest, latestTs, groupKey)
  } else {
    scorecardGroup = createScorecardGroupFromList(columns, earliest, earliestTs, latest, latestTs)
  }
  return scorecardGroup
}

const getDataset = (scorecardDefinition: DashboardVisualisation, rawData: DashboardDataResponse[]) => {
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

const createScorecardData = ({
  title,
  value,
  rag,
  valueFor,
  valueFrom,
  prevVal,
  groupTitle,
}: {
  title: string
  value: string | number
  rag?: number
  valueFor: string
  valueFrom: string
  prevVal: string | number
  groupTitle?: string
}) => {
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
}

export const createScorecard = (scorecardDefinition: DashboardVisualisation, rawData: DashboardDataResponse[]) => {
  const { columns } = scorecardDefinition
  const { measures } = columns
  const displayColumn = measures[0]
  const { id: valueColumnId, display } = displayColumn

  const dataset = getDataset(scorecardDefinition, rawData)
  const { earliest, latest, earliestTs, latestTs } = dataset

  const scorecordArr: Scorecard[] = latest.map((datasetRow: DashboardDataResponse, index: number) => {
    const title = display
    const { rag, raw: value } = datasetRow[valueColumnId]
    const prevVal = earliest[index][valueColumnId].raw
    const valueFor = `${latestTs}`
    const valueFrom = `${earliestTs}`

    return createScorecardData({
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

const createScorecardGroupFromList = (
  columns: DashboardVisualisationColumns,
  earliest: DashboardDataResponse[],
  earliestTs: string | number,
  latest: DashboardDataResponse[],
  latestTs: string | number,
): ScorecardGroup[] => {
  const { measures } = columns
  const valueColumn = (<ScorecardVisualisationColumn[]>measures).find((col) => col.displayValue)
  const displayColumn = measures.find((col) => {
    return col.display || col.display === ''
  })
  return [
    {
      title: '',
      scorecards: latest.map((datasetRow: DashboardDataResponse, index: number) => {
        const title = displayColumn
          ? `${displayColumn.display} ${datasetRow[displayColumn.id].raw}`
          : displayColumn.display
        const { rag, raw: value } = datasetRow[valueColumn.id]
        const prevVal = earliest[index][valueColumn.id].raw
        const valueFor = `${latestTs}`
        const valueFrom = `${earliestTs}`

        return createScorecardData({
          title,
          value,
          rag,
          prevVal,
          valueFor,
          valueFrom,
        })
      }),
    },
  ]
}

const createScorecardGroupFromColumns = (
  columns: DashboardVisualisationColumns,
  earliest: DashboardDataResponse[],
  earliestTs: string | number,
  latest: DashboardDataResponse[],
  latestTs: string | number,
  groupKey: DashboardVisualisationColumn,
) => {
  const { measures } = columns

  return latest.map((row, rowIndex) => {
    const groupTitle = `${row[groupKey?.id]?.raw}` || ''

    return {
      title: groupKey.display ? `${groupKey.display}: ${groupTitle}` : groupTitle,
      scorecards: Object.keys(row)
        .filter((colId) => colId !== groupKey?.id)
        .map((colId) => {
          const comparisonRow = earliest[rowIndex]
          const measure = measures.find((m) => m.id === colId)
          const title = measure?.display || colId
          const value = +row[colId].raw
          const rag = +row[colId].rag
          const prevVal = comparisonRow[colId]?.raw
          const valueFor = `${latestTs}`
          const valueFrom = `${earliestTs}`

          return createScorecardData({
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

const createScorecardGroupFromListWithGroups = (
  columns: DashboardVisualisationColumns,
  earliest: DashboardDataResponse[],
  earliestTs: string | number,
  latest: DashboardDataResponse[],
  latestTs: string | number,
  groupKey: DashboardVisualisationColumn,
) => {
  const { measures } = columns

  const latestGroupedByKey = DatasetHelper.groupRowsByKey(latest, groupKey.id)
  const earliestGroupedByKey = DatasetHelper.groupRowsByKey(earliest, groupKey.id)
  const valueColumn = (<ScorecardVisualisationColumn[]>measures).find((col) => col.displayValue)
  const displayColumn = measures.find((col) => {
    return col.display || col.display === ''
  })

  const scorecardGroup = latestGroupedByKey.map((group, groupIndex) => {
    const groupTitle = `${group[0][groupKey?.id]?.raw}` || ''
    return {
      title: groupKey.display ? `${groupKey.display}: ${groupTitle}` : groupTitle,
      scorecards: group.map((row, rowIndex) => {
        const title = displayColumn ? `${displayColumn.display} ${row[displayColumn.id].raw}` : displayColumn.display
        const value = +row[valueColumn.id].raw
        const rag = +row[valueColumn.id].rag
        const valueFor = `${latestTs}`
        const valueFrom = `${earliestTs}`

        const comparisonRow = earliestGroupedByKey[groupIndex][rowIndex]
        const prevVal = comparisonRow[valueColumn.id]?.raw

        return createScorecardData({
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

  return scorecardGroup
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

export const mergeScorecardsIntoGroup = (visualisations: DashboardUIVisualisation[]) => {
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

  groupedScorecardIndexes.reverse().forEach((group: number[]) => {
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
        data: [{ scorecards: scorecardGroup }],
      })
    }
  })

  return visualisations
}

export default {
  createScorecard,
  createScorecards,
  mergeScorecardsIntoGroup,
}

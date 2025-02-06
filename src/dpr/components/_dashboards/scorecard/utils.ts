import { MetricsDataResponse } from '../../../types/Metrics'
import { DashboardVisualisation, ScorecardVisualisationColumn } from '../dashboard/types'
import { ScorecardTrend } from './types'
import DashboardSectionUtils from '../dashboard-section/utils'

const getDataset = (scorecardDefinition: DashboardVisualisation, rawData: MetricsDataResponse[][]) => {
  const latestData = rawData[rawData.length - 1]
  const latestDataSetRows = DashboardSectionUtils.getDatasetRows(scorecardDefinition, latestData)
  const latestFiltered = DashboardSectionUtils.filterByMeasures(scorecardDefinition, latestDataSetRows)

  const earliestData = rawData[0]
  const earliestDataSetRows = DashboardSectionUtils.getDatasetRows(scorecardDefinition, earliestData)
  const earliestfiltered = DashboardSectionUtils.filterByMeasures(scorecardDefinition, earliestDataSetRows)

  return {
    earliest: earliestfiltered,
    latest: latestFiltered,
  }
}

const getScorecardData = (
  scorecardDefinition: DashboardVisualisation,
  rawData: MetricsDataResponse[][],
  titleDisplay: string,
  valueColumnId: string,
  displayColumnId?: string,
) => {
  const { earliest, latest } = getDataset(scorecardDefinition, rawData)

  return latest.map((datasetRow: MetricsDataResponse, index: number) => {
    const title = displayColumnId ? `${titleDisplay} ${datasetRow[displayColumnId].raw}` : titleDisplay
    const { rag, raw: value } = datasetRow[valueColumnId]
    const prevVal = earliest[index][valueColumnId].raw
    const valueFor = `${datasetRow.timestamp?.raw}`
    const valueFrom = `${earliest[index].timestamp?.raw}`

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

  const scorecardData = getScorecardData(scorecardDefinition, rawData, display, valueColumnId)

  return scorecardData.length ? scorecardData[0] : undefined
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
  const value = +latestValue - +earliestValue
  const direction = Math.sign(value)

  if (valueFrom !== valueFor) {
    trendData = {
      direction,
      value: Math.abs(value),
      from: valueFrom,
    }
  }

  return trendData
}

export default {
  createScorecard,
  createScorecards,
}

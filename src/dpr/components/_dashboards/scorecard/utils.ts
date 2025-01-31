import { DashboardScorecard, DashboardScorecardsGroup } from '../../../types/Dashboards'
import { MetricsDataResponse } from '../../../types/Metrics'
import { Scorecard, ScorecardGroup, ScorecardTrend } from './types'

const createScoreCard = (scorecardDefinition: DashboardScorecard, rawData: MetricsDataResponse[][]): Scorecard => {
  // Get last in timeseries data
  const data = rawData[rawData.length - 1][0]
  const { column, label: title } = scorecardDefinition
  const valueFor = data.timestamp as unknown as string
  return {
    title,
    value: +data[column].raw,
    rag: getRag(+data[column].rag),
    valueFor: data.timestamp as unknown as string,
    trend: createTrend(rawData, column, valueFor),
  }
}

const createScorecards = (scorecardsGroup: DashboardScorecardsGroup, data: MetricsDataResponse[][]) => {
  const { scorecards } = scorecardsGroup
  return scorecards.map((scorecardDefinition: DashboardScorecard) => {
    return createScoreCard(scorecardDefinition, data)
  })
}

const getRag = (ragScore: number) => {
  const ragColors = ['green', 'yellow', 'red']
  return {
    score: ragScore,
    color: ragColors[ragScore],
  }
}

const createTrend = (
  rawData: MetricsDataResponse[][],
  column: string,
  valueFor: string,
): ScorecardTrend | undefined => {
  let trendData
  const currentData = rawData[rawData.length - 1][0]
  const startData = rawData[0][0]
  const currentValue = +currentData[column].raw
  const startValue = +startData[column].raw
  const value = currentValue - startValue
  const direction = Math.sign(value)
  const fromData = startData.timestamp as unknown as string

  if (fromData !== valueFor) {
    trendData = {
      direction,
      value: Math.abs(value),
      from: startData.timestamp as unknown as string,
    }
  }

  return trendData
}

export default {
  createScorecards,
}

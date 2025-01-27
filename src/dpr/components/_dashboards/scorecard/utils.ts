import { DashboardScorecard, DashboardScorecardsGroup } from '../../../types/Dashboards'
import { MetricsDataResponse } from '../../../types/Metrics'
import { Scorecard, ScorecardGroup, ScorecardTrend } from './types'

const createScoreCard = (scorecardDefinition: DashboardScorecard, rawData: MetricsDataResponse[][]): Scorecard => {
  // Get last in timeseries data
  const data = rawData[rawData.length - 1][0]
  const { column, label: title } = scorecardDefinition

  return {
    title,
    value: +data[column].raw,
    rag: getRag(+data[column].rag),
    valueFor: data.timestamp as unknown as string,
    trend: createTrend(rawData, column),
  }
}

const createScorecards = (
  scorecardsDefinition: DashboardScorecardsGroup[],
  data: MetricsDataResponse[][],
): ScorecardGroup[] => {
  const scorecardGroups = scorecardsDefinition.map((group: DashboardScorecardsGroup) => {
    const { display: title, description, scorecards } = group

    return {
      title,
      description,
      scorecards: scorecards.map((scorecardDefinition: DashboardScorecard) => {
        return createScoreCard(scorecardDefinition, data)
      }),
    }
  })

  return scorecardGroups
}

const getRag = (ragScore: number) => {
  const ragColors = ['green', 'yellow', 'red']
  return {
    score: ragScore,
    color: ragColors[ragScore],
  }
}

const createTrend = (rawData: MetricsDataResponse[][], column: string): ScorecardTrend => {
  const currentData = rawData[rawData.length - 1][0]
  const startData = rawData[0][0]

  const currentValue = +currentData[column].raw
  const startValue = +startData[column].raw

  const value = currentValue - startValue

  const direction = Math.sign(value)

  return {
    direction,
    value: Math.abs(value),
    from: startData.timestamp as unknown as string,
  }
}

export default {
  createScorecards,
}

import { DashboardDataResponse } from '../../../types/Metrics'

export interface Scorecard {
  id: string
  title: string
  group?: string
  value: number | string
  trend?: ScorecardTrend
  link?: {
    href: '#'
    displayName: 'View breakdown'
  }
  valueFor?: string
  rag?: ScorecardRag
}

export interface ScorecardSubGroup {
  name: string
  scorecards: Scorecard[]
}

export interface ScorecardGroup {
  title?: string
  description?: string
  scorecards: Scorecard[]
}

export interface ScorecardTrend {
  direction: number
  value: number
  from: string
}

export interface ScorecardRag {
  score: number
  colour: string
}

export interface ScorecardDataset {
  earliest: DashboardDataResponse[]
  earliestTs?: string | number | null | undefined
  latest: DashboardDataResponse[]
  latestTs?: string | number | null | undefined
}

export interface CreateScorecardDataArgs {
  title: string
  value: string | number
  rag?: number
  valueFor: string
  valueFrom: string
  prevVal: string | number | null | undefined
  groupTitle?: string
}

export interface Scorecard {
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
  color: string
}

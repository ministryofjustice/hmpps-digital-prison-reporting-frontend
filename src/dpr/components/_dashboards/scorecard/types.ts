export interface Scorecard {
  title: string
  value: number | string
  trend?: ScorecardTrend
  link?: {
    href: '#'
    displayName: 'View breakdown'
  }
  valueFor?: string
  rag?: ScorecardRag
}

export interface ScorecardGroup {
  id: string
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

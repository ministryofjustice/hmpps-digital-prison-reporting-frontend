import { DashboardList } from '../components/_dashboards/dashboard-list/types'
import { Scorecard } from '../components/_dashboards/scorecard/types'
import { components } from './api'
import { ChartUnit, ChartType, ChartCardData, MoJTable } from './Charts'

export interface DashboardDefinition {
  id: string
  name: string
  description: string
  lists: DashboardList[]
  metrics: DashboardMetricDefinition[]
  scorecards: DashboardScorecardsGroup[]
  filterFields: components['schemas']['FieldDefinition'][]
}

export interface DashboardSection {
  type: 'scorecard' | 'chart' | 'list'
  id: string
  title: string
  description: string
  data: Scorecard[] | ChartCardData | MoJTable
}

export interface DashboardMetricDefinition {
  id: string
  name: string
  display: string
  timeseries?: boolean
  description: string
  charts: DashboardChartDefinition[]
}

export interface DashboardScorecardsGroup {
  id: string
  name: string
  display: string
  description: string
  scorecards: DashboardScorecard[]
}

export interface DashboardScorecard {
  label: string
  unit: string
  column: string
}
export interface DashboardChartDefinition {
  type: ChartType
  unit: ChartUnit
  label: ChartColumn
  columns: ChartColumn[]
}

interface ChartColumn {
  name: string
  display: string
}

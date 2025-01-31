export interface DashboardList {
  id: string
  display: string
  name: string
  description: string
  columns: DashboardListColumns
}

export interface DashboardListColumns {
  keys: DashboardListsColumn[]
  dimensions: DashboardListsColumn[]
  values: DashboardListsColumn[]
}

export interface DashboardListsColumn {
  id: string
  display: string
  aggregate?: AggregateType
  unit?: UnitType
}

export enum AggregateType {
  SUM = 'sum',
  AVG = 'avergage',
}

export enum UnitType {
  NUMBER = 'number',
  PERCENTAGE = 'percentage',
}

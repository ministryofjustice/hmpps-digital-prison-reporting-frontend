export interface ChartData {
  type: ChartType
  unit?: UnitType
  data: ChartDataValues
  timeseries?: boolean
}

export enum UnitType {
  NUMBER = 'number',
  PERCENTAGE = 'percentage',
}

export enum ChartType {
  DONUT = 'doughnut',
  BAR = 'bar',
  BAR_TIMESERIES = 'bar-timeseries',
  LINE = 'line',
}

export interface ChartCardData {
  chart: ChartData
  table?: MoJTable
}

export interface ChartDataValues {
  labels: string[]
  datasets: ChartDataset[]
  axis?: 'x' | 'y'
}

export interface ChartDataset {
  label: string
  data: number[]
  total: number
}

export interface MoJTable {
  head: MoJTableHead[]
  rows: MoJTableRow[][]
}

export interface MoJTableRow {
  text?: string
  html?: string
}

export interface MoJTableHead {
  text?: string
  html?: string
}

export interface ChartCardValue {
  value: string | number
  name: string
  display: string
  unit?: UnitType
  chart?: ChartType[]
}

export interface ChartValue {
  group?: ChartGroup
  data: ChartCardValue[]
}

export interface ChartGroup {
  name: string
  value: string
}

export interface ChartsData {
  type: ChartType
  datasets: { data: ChartCardValue[]; group: ChartGroup }[]
}

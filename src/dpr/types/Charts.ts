interface Chart {
  id: string
  type: ChartType
  unit: ChartUnit
  data: {
    chart: ChartData
  }
}

export enum ChartUnit {
  NUMBER = 'number',
  PERCENTAGE = 'percentage',
}

interface ChartTabs extends Omit<Chart, 'type'> {
  type: ChartType[]
  data: {
    chart: ChartData
    table: MoJTable
  }
}

export interface ChartCardData extends ChartTabs {
  title: string
  description: string
  details?: {
    headlines: ChartCardDetailsItem[]
    meta: ChartCardDetailsItem[]
  }
}

interface ChartCardDetailsItem {
  label: string
  value: string | number
}

interface ChartData {
  labels: string[]
  datasets: ChartDataset[]
  axis?: 'x' | 'y'
}

export interface ChartDataset {
  label: string
  data: number[]
  total: number
}

export enum ChartType {
  DONUT = 'doughnut',
  BAR = 'bar',
  LINE = 'line',
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

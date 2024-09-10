interface Chart {
  id: string
  type: ChartType
  data: {
    chart: ChartData
  }
}

interface ChartTabs extends Omit<Chart, 'type'> {
  type: ChartType[]
  data: {
    chart: ChartData
    table: TableData
  }
}

export interface ChartCardData extends ChartTabs {
  title: string
  description: string
  details: {
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

interface ChartDataset {
  label: string
  data: number[]
  total: number
}

export enum ChartType {
  DONUT = 'doughnut',
  BAR = 'bar',
  LINE = 'line',
}

interface TableData {
  head: { text: string }[]
  rows: { text?: string; html?: string }[][]
}

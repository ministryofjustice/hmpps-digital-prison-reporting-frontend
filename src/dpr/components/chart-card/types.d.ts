interface ChartCardData {
  id: string
  title: string
  description: string
  type: ChartType[]
  data: {
    chart: ChartData
    table: TableData
  }
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

enum ChartType {
  DONUT = 'doughnut',
  BAR = 'bar',
  LINE = 'line',
}

interface TableData {
  head: { text: string }[]
  rows: { text?: string; html?: string }[][]
}

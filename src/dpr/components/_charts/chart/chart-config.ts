const tooltip: ChartTooltipType = {
  backgroundColor: '#FFF',
  bodyColor: '#000',
  titleFont: {
    size: 16,
  },
  bodyFont: {
    size: 16,
  },
  titleColor: '#000',
  displayColors: false,
  borderWidth: 1,
  borderColor: '#b1b4b6',
  cornerRadius: 0,
  padding: 20,
  footerFont: {
    weight: 'bold',
  },
  animation: {
    duration: 0,
  },
}

const chartConfig: ChartOptionsType = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 0,
  },
  hover: {
    animationDuration: 0,
  },
  plugins: {
    legend: {
      position: 'bottom',
    },
    tooltip,
  },
}

type ChartTooltipType = {
  backgroundColor: string
  bodyColor: string
  titleFont: {
    size: number
  }
  bodyFont: {
    size: number
  }
  titleColor: string
  displayColors: false
  borderWidth: number
  borderColor: string
  cornerRadius: number
  padding: number
  footerFont: {
    weight: string
  }
  animation: {
    duration: number
  }
}

export type ChartOptionsType = {
  responsive: boolean
  maintainAspectRatio: boolean
  animation: {
    duration: number
  }
  hover: {
    animationDuration: number
  }
  plugins: {
    legend: {
      position: string
    }
    tooltip: ChartTooltipType
  }
  indexAxis?: string
  cutout?: string
  scales?: ChartScalesType
}

type ChartScalesType = {
  y?: ChartScaleAxis
  x?: ChartScaleAxis
}

type ChartScaleAxis = {
  stacked?: boolean
  position?: string
  type?: string
  min?: number
  offset?: boolean
  labels?: Array<string | number>
  grid?: {
    display: boolean
    drawBorder: boolean
  }
  ticks?: {
    fontSize?: number
    padding?: number
    maxRotation?: number
    stepSize?: number
  }
}

export default chartConfig

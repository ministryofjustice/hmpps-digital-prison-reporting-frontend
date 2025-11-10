export interface ChartDetails {
  meta?: ChartMetaData[]
  headlines?: ChartMetaData[]
}

export interface ChartMetaData {
  label: string
  value: string | number
  legend?: string
}

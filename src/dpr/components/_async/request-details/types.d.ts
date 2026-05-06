export type QuerySummaryItem = {
  name: string
  value: string | string[]
}

export type FilterDisplayState = {
  values: string[]

  start?: string
  end?: string
  relativeDuration?: string

  quickFilter?: string
  granularity?: string
}

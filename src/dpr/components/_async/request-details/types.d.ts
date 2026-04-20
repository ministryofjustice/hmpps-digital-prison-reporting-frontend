export type QuerySummaryItem = {
  name: string
  value: string | string[]
}

export type FieldSummaryState = {
  start?: string
  end?: string
  relativeDuration?: string
  values: string[]
}

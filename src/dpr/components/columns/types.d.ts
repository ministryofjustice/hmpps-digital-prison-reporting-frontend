export interface Column {
  text: string
  value: string
  disabled: boolean
}

export interface Columns {
  name: string
  options: Column[]
  value: string[]
}

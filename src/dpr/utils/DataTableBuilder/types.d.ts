export interface Header {
  html?: string
  text?: string
  format?: string
}

export interface Cell {
  text?: string
  html?: string
  format?: string
  classes?: string
  colspan?: number
}

export interface DataTable {
  head: Array<Header>
  rows: Array<Array<Cell>>
  rowCount: number
  colCount: number
}
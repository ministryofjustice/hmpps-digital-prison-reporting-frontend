export type CellFormat = 'numeric' | 'string'

export interface Cell {
  fieldName?: string
  text?: string
  html?: string
  format?: CellFormat
  classes?: string
  colspan?: number
  rowspan?: number
}

export interface DataTable {
  head: Array<Header>
  rows: Array<Array<Cell>>
  rowCount: number
  colCount: number
}

export interface FieldDefinition {
  name: string
  display: string
  type?: 'boolean' | 'date' | 'double' | 'HTML' | 'long' | 'string' | 'time'
  wordWrap?: 'none' | 'normal' | 'break-words'
  calculated?: boolean
  sortable?: boolean
  header?: boolean
  mergeRows?: boolean
}

export interface SortKey extends Dict<string> {
  sortKey: string
}

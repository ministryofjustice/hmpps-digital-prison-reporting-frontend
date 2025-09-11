export type CellFormat = 'numeric' | 'string'

export interface Cell {
  fieldName?: string
  text?: string | null
  html?: string | null
  format?: CellFormat
  classes?: string
  colspan?: number
  rowspan?: number
}

export interface DataTable {
  head: Array<Header> | null
  rows: Array<Array<Cell>>
  rowCount: number
  colCount: number
}

export interface FieldDefinition {
  name: string
  display?: string
  type?: 'boolean' | 'date' | 'double' | 'HTML' | 'long' | 'string' | 'time'
  wordWrap?: 'none' | 'normal' | 'break-words'
  calculated?: boolean
  sortable?: boolean
  header?: boolean
  mergeRows?: boolean
  visible?: boolean
}

export interface SortKey extends Dict<string> {
  sortKey: string
}

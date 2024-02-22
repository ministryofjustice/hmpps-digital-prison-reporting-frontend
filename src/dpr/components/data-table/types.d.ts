import Dict = NodeJS.Dict

export interface Header {
  html: string
  format?: string
}

export interface Cell {
  text?: string
  html?: string
  format?: string
  classes?: string
}

export interface DataTableOptions {
  head: Array<Header>
  rows: Array<Array<Cell>>
  count: number
  currentQueryParams: Dict<string | Array<string>>
  classification: string
  printable?: boolean
  url: string
}

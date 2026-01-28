export interface Page {
  number?: number
  current?: boolean
  href?: string
  ellipsis?: boolean
}

export interface Pagination {
  next?: string | undefined
  prev?: string | undefined
  pages: Page[]
  pageSize: number
  currentPage: number
  totalRows: number
  sizes: PageSize[]
}

export interface PageSize {
  value: number
  text: string
}

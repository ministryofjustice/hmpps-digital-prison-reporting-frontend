export interface Page {
  number?: number
  current?: boolean
  href?: string
  ellipsis?: boolean
}

export interface Pagination {
  next?: string,
  prev?: string
  pages: Page[],
  pageSize: number,
  currentPage: number,
  totalRows: number,
  sizes: PageSize[]
}

interface PageSize {
  value: number,
  text: string,
}
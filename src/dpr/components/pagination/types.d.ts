export interface Page {
  number?: number
  current?: boolean
  href?: string
  ellipsis?: boolean
}

export interface UrlData {
  search: string
  query: string
  pathname: string
  path: string
  href: string
}

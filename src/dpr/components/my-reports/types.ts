/* ==========================================================================
   Shared value types
   ========================================================================== */

import { LoadType, ReportType } from 'src/dpr/types/UserReports'

export type NameValuePair = {
  name: string
  value: string
}

/* ==========================================================================
   Headings
   ========================================================================== */

export type DprMyReportHeading = {
  name: string
  classes: string
}

/* ==========================================================================
   Title
   ========================================================================== */

export type DprMyReportTitle = {
  productName: string
  reportName: string
  reportType: string
  timestamp?: string
}

/* ==========================================================================
   Filters
   ========================================================================== */

export type DprMyReportFilters = {
  prerequest?: NameValuePair[]
  interactive?: NameValuePair[]
}

/* ==========================================================================
   Actions
   ========================================================================== */

export type RemoveAction = {
  action: string
  csrfToken: string
  returnTo: string
}

export type LinkAction = {
  href: string
}

export type ViewAction = {
  href: string
  reportType: string
}

export type DprMyReportActions = {
  remove?: RemoveAction
  refresh?: LinkAction
  retry?: LinkAction
  view?: ViewAction
  polling?: LinkAction
  load?: ViewAction
  bookmark?: any // TODO
  request?: ViewAction
}

export type DprMyReportMeta = {
  id: string
  reportId: string
  tableId?: string | undefined
}

/* ==========================================================================
   Item (row)
   ========================================================================== */

export type DprMyReportItem = {
  title: DprMyReportTitle
  description?: string
  filters?: DprMyReportFilters
  status?: string
  actions?: DprMyReportActions
  meta?: DprMyReportMeta
}

/* ==========================================================================
   List config
   ========================================================================== */

export type DprMyReportListConfig = {
  title: string
  listType: ListType
  headings: DprMyReportHeading[]
  items: DprMyReportItem[]
  totals: MyReportsListTotals
}

export enum ListType {
  REQUESTED = 'requested',
  BOOKMARKS = 'bookmarks',
  VIEWED = 'viewed',
}

// HEADINGS

type HeadingKey = 'title' | 'description' | 'filters' | 'status' | 'actions'

export type HeadingConfig = {
  key: HeadingKey
  name: string
  classes: string
  showIn: ListType[]
}

export type DprMyReport = {
  requested: DprMyReportListConfig
  viewed: DprMyReportListConfig
  bookmarks?: DprMyReportListConfig | undefined
}

export type MappedBookmarks = {
  id: string
  reportId: string
  name: string
  reportName: string
  reportType: ReportType
  description: string
  loadType: LoadType
}

export type MyReportsOptions = {
  maxRows?: number
  showHelp?: boolean
}

export type MyReportsListTotals = {
  shown: number
  total: number
  href?: string | undefined
}

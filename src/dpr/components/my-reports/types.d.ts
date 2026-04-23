/* ==========================================================================
   Shared value types
   ========================================================================== */

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
  timestamp: string
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
}

/* ==========================================================================
   List config
   ========================================================================== */

export type DprMyReportListConfig = {
  headings: DprMyReportHeading[]
  items: DprMyReportItem[]
}

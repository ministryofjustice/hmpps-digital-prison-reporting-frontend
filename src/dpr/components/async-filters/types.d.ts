export interface requestAsyncReportParams {
  apiTimeout: number
  apiUrl: string
  token: string
  reportId: string
  reportVariantId: string
  query: Query
}

// todo update to correct type
interface Query {
  sortColumn: string
  sortedAsc: boolean
  filters: filter[]
  dataProductDefinitionsPath: string
}

interface filter {
  [filterId: string]: string
}

export interface SortByDefaults {
  options: { text: string; value: string }[]
  value: string
}

interface RequestedReportStateItem {
  reportId: string
  variantId: string
  statementId: string
  tableId: string
  status: string // TODO enum
  filters: string
  sortyBy: string
  filtersQueryString: string
  filtersUrl: string // for sharing
  reportUrl?: string // once ready
  timestamp: {
    lastViewed?: string
    requested?: string
    completed?: string
    expired?: string
    failed?: string
  }
}

export interface RenderFiltersReturnValue {
  reportData: {
    reportName: string
    variantName: string
    description: string
    reportId: string
    variantId: string
    definitionPath: string | string[] | ParsedQs | ParsedQs[]
    csrfToken: string
    template: string
  }
  filters: FilterValue[]
  sortBy: FilterValue[]
}

import { ReportType } from '../../types/UserReports'

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
    type: ReportType
  }
  filters: FilterValue[]
  sortBy: FilterValue[]
}

export interface querySummaryResult {
  query: Dict<string>
  filterData: Dict<string>
  querySummary: Array<Dict<string>>
  sortData: Dict<string>
}

import { FilterValue } from '../../_filters/types'
import Dict = NodeJS.Dict

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
  filters: FilterValue[]
  sortBy?: FilterValue[]
}

export interface SetQueryFromFiltersResult {
  query: Record<string, string>
  filterData: Record<string, string>
  querySummary: Array<Record<string, string>>
  sortData: Record<string, string>
}

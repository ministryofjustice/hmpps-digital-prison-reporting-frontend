import { FilterType } from './enum'

export interface FilterDefinition {
  type: FilterType
  options?: Array<FilterOption>
  value?: string
}

export interface FilterOption {
  value: string
  text: string
}

export type FilterValue = GenericFilterValue | DateFilterValue

export interface GenericFilterValue {
  text: string
  name: string
  type: FilterType
  value?: string
  options?: Array<FilterOption>
  minimumLength?: number
  dynamicResourceEndpoint?: string
}

export interface DateFilterValue extends FilterValue {
  type: FilterType.dateRange
  value?: DateRange
  min?: string
  max?: string
}

export interface SelectedFilter {
  text: string
  href: string
  classes: string
}

export interface DateRange {
  start: string
  end: string
}

export interface FilterOptions {
  filters: Array<FilterValue>
  selectedFilters: Array<SelectedFilter>
}

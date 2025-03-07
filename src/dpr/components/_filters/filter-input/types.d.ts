import { FilterType } from './enum'

export interface FilterOption {
  value: string
  text: string
  disabled?: boolean
  selected?: boolean
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
  mandatory?: boolean
}

export interface DateFilterValue extends GenericFilterValue {
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

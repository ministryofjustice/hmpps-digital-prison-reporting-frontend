import { Granularity, QuickFilters } from '../_inputs/granular-date-range/types'
import { FilterType } from './filter-input/enum'

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
  pattern?: string
  mandatory?: boolean
}

export interface DateFilterValue extends GenericFilterValue {
  type: FilterType
  value?: DateRange | string | GranularDateRange
  min?: string
  max?: string
  relativeOptions?: { value: string; text: string }[]
  quickFilterOptions?: { value: string; text: string }[]
  granularityOptions?: { value: string; text: string }[]
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

export interface GranularDateRange extends DateRange {
  granularity: {
    value: Granularity
    display: string
  }
  quickFilter?: {
    value: QuickFilters
    display: string
  }
  partialDate: {
    start: boolean
    end: boolean
  }
}

export interface FilterOptions {
  filters: Array<FilterValue>
  selectedFilters: Array<SelectedFilter>
  urlWithNoFilters: string
}

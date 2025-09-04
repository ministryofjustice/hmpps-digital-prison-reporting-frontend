import { Granularity, QuickFilters } from '../_inputs/granular-date-range/types'
import { FilterType } from './filter-input/enum'
import RelativeDateRange from '../_inputs/date-range/types'

export interface FilterOption {
  value: string
  text: string
  disabled?: boolean
  selected?: boolean
  sortedAsc?: boolean
}

export type FilterValue =
  | TextFilterValue
  | FilterValueWithOptions
  | MultiselectFilterValue
  | DateFilterValue
  | DateRangeFilterValue
  | GranularDateRangeFilterValue

export type FilterValueType = string | DateRange | GranularDateRange | null
export interface BaseFilterValue {
  text: string
  name: string
  type: FilterType
  value: FilterValueType
  mandatory?: boolean
}

export interface TextFilterValue extends BaseFilterValue {
  minimumLength?: number
  pattern?: string
}

export interface FilterValueWithOptions extends BaseFilterValue {
  options: Array<FilterOption>
  staticOptionNameValue?: string
  dynamicResourceEndpoint?: string
}

export interface MultiselectFilterValue extends Omit<BaseFilterValue, 'value'>, FilterValueWithOptions {
  value: string | null
  values: string[]
}

export interface DateFilterValue extends Omit<BaseFilterValue, 'value'> {
  value: string | null
  min?: string
  max?: string
}

export interface DateRangeFilterValue extends Omit<BaseFilterValue, 'value'> {
  value: DateRange
  min?: string
  max?: string
  relativeOptions?: { value: string; text: string; disabled?: boolean }[]
}

export interface GranularDateRangeFilterValue extends Omit<BaseFilterValue, 'value'> {
  value: GranularDateRange
  min?: string
  max?: string
  relativeOptions?: { value: string; text: string; disabled?: boolean }[]
  quickFilterOptions?: { value: string; text: string; disabled?: boolean }[]
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
  relative?: RelativeDateRange
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
  partialDate?: {
    start: boolean
    end: boolean
  }
}

export interface FilterOptions {
  filters: Array<FilterValue>
  selectedFilters: Array<SelectedFilter>
  urlWithNoFilters: string
}

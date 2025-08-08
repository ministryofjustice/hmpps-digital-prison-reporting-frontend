import { Granularity, QuickFilters } from '../../../../components/_inputs/granular-date-range/types'

export interface defaultFilterValue {
  name: string
  value: string | dateFilterValue | granularDateFilterValue
}

export interface dateFilterValue {
  start: string
  end: string
  relative?: RelativeDateRange
}

export interface granularDateFilterValue {
  start: string
  end: string
  granularity: Granularity
  quickFilter: QuickFilters
}

export interface defaultFilterConfig {
  reportId: string
  id: string
  values: defaultFilterValue[]
}

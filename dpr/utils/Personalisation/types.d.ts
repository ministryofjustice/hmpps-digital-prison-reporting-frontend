import { Granularity, QuickFilters } from '../../components/_inputs/granular-date-range/types'
import { FiltersType } from '../../components/_filters/filtersTypeEnum'
import RelativeDateRange from '../../components/_inputs/date-range/types'

export interface defaultFilterValue {
  name: string
  value: string | DefaultDateFilterValue | DefaultGranularDateFilterValue
  type?: FiltersType
}

export interface DefaultDateFilterValue {
  start: string
  end: string
  relative?: RelativeDateRange
}

export interface DefaultGranularDateFilterValue {
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

import { Request } from 'express'
import { DateFilterValue, DateRange, FilterValue } from '../filters/types'
import { FilterType } from './filter-input/enum'

import SelectedFiltersUtils from './filters-selected/utils'
import AsyncFiltersUtils from '../_async/async-filters-form/utils'
import { RenderFiltersReturnValue } from '../_async/async-filters-form/types'
import { components } from '../../types/api'

const setFilterValuesFromRequest = (filters: FilterValue[], req: Request, prefix = 'filters.'): FilterValue[] => {
  const { preventDefault } = req.query

  return filters.map((filter: FilterValue) => {
    let requestfilterValue
    if (filter.type === FilterType.dateRange.toLowerCase()) {
      requestfilterValue = handleDaterangeValue(filter, req, prefix)
    } else if (filter.type === FilterType.date.toLowerCase()) {
      requestfilterValue = handleDateValue(filter, req, prefix)
    } else {
      requestfilterValue = <string>req.query[`${prefix}${filter.name}`]
    }

    let value: string | DateRange
    if (requestfilterValue) {
      value = requestfilterValue
    } else if (preventDefault) {
      value = null
    } else {
      value = filter.value
    }

    return {
      ...filter,
      value,
    }
  })
}

const handleDaterangeValue = (filter: FilterValue, req: Request, prefix: string) => {
  let value
  const start = <string>req.query[`${prefix}${filter.name}.start`]
  const end = <string>req.query[`${prefix}${filter.name}.end`]
  if (start || end) {
    value = {
      start: start || (<DateRange>filter.value).start,
      end: end || (<DateRange>filter.value).end,
    } as DateRange
  }
  return value
}

const handleDateValue = (filter: FilterValue, req: Request, prefix: string) => {
  const dateValue = <string>req.query[`${prefix}${filter.name}`]
  const { min } = <DateFilterValue>filter
  const { max } = <DateFilterValue>filter
  return dateValue || min || max || '1977-05-25'
}

const getFilters = async ({
  fields,
  req,
  interactive = false,
  prefix = 'filters.',
}: {
  fields: components['schemas']['FieldDefinition'][]
  req: Request
  interactive?: boolean
  prefix?: string
}) => {
  const defaultFilterData = <RenderFiltersReturnValue>await AsyncFiltersUtils.renderFilters(fields, interactive)
  const filters = setFilterValuesFromRequest(defaultFilterData.filters, req)
  const selectedFilters = SelectedFiltersUtils.getSelectedFilters(filters, prefix)
  return {
    filters,
    selectedFilters,
  }
}

export default {
  setFilterValuesFromRequest,
  getFilters,
}

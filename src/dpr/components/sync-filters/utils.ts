import { Request } from 'express'
import { DateFilterValue, DateRange, FilterValue } from '../filters/types'
import { FilterType } from '../filter-input/enum'
import AsyncFiltersUtils from '../async-filters/utils'
import { RenderFiltersReturnValue } from '../async-filters/types'
import { components } from '../../types/api'

const getSelectedFilters = (filters: FilterValue[], req: Request, prefix: string) => {
  return filters
    .filter((f) => f.value)
    .map((f) => {
      let value = []
      let key: string[] = []
      let displayValue = f.value

      if (f.type === FilterType.dateRange.toLowerCase()) {
        displayValue = `${(<DateRange>f.value).start} - ${(<DateRange>f.value).start}`
        value = [(<DateRange>f.value).start, (<DateRange>f.value).end]
      } else {
        key = [`${prefix}${f.name}`]
        value = [displayValue]
      }

      return {
        text: `${f.text}: ${displayValue}`,
        key: JSON.stringify(key),
        value: JSON.stringify(value),
        classes: 'govuk-button--inverse accordion-summary-remove-button govuk-!-margin-0',
        attributes: {
          'aria-label': `Selected Filter: ${f.text}: ${value}. Click to clear this filter`,
        },
      }
    })
}

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

export default {
  getSelectedFilters,
  setFilterValuesFromRequest,
  getFilters: async ({
    fields,
    req,
    prefix = 'filters.',
  }: {
    fields: components['schemas']['FieldDefinition'][]
    req: Request
    prefix?: string
  }) => {
    const defaultFilterData = <RenderFiltersReturnValue>await AsyncFiltersUtils.renderFilters(fields)
    const filtersData = setFilterValuesFromRequest(defaultFilterData.filters, req)
    return {
      filters: filtersData,
      selectedFilters: getSelectedFilters(filtersData, req, prefix),
    }
  },
}

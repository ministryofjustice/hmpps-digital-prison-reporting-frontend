import { Request } from 'express'
import { FilterType } from './filter-input/enum'
import type { components } from '../../types/api'
import type { FilterOption } from './filter-input/types'
import type { DateFilterValue, DateRange, FilterValue } from './types'

import SelectedFiltersUtils from './filters-selected/utils'
import DateRangeInputUtils from '../_inputs/date-range/utils'
import DateInputUtils from '../_inputs/date-input/utils'

const setFilterValuesFromRequest = (filters: FilterValue[], req: Request, prefix = 'filters.'): FilterValue[] => {
  const { preventDefault } = req.query

  return filters.map((filter: FilterValue) => {
    let requestfilterValue
    if (filter.type.toLowerCase() === FilterType.dateRange.toLowerCase()) {
      requestfilterValue = handleDaterangeValue(filter, req, prefix)
    } else if (filter.type.toLowerCase() === FilterType.date.toLowerCase()) {
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

export const handleDaterangeValue = (filter: FilterValue, req: Request, prefix: string) => {
  const { preventDefault } = req.query

  const start = <string>req.query[`${prefix}${filter.name}.start`]
  const end = <string>req.query[`${prefix}${filter.name}.end`]

  const defaultStart = preventDefault ? null : (<DateRange>filter.value)?.start
  const defaultEnd = preventDefault ? null : (<DateRange>filter.value)?.end

  const value = {
    start: start || defaultStart || (<DateFilterValue>filter).min,
    end: end || defaultEnd || (<DateFilterValue>filter).max,
  } as DateRange

  return value
}

export const handleDateValue = (filter: FilterValue, req: Request, prefix: string) => {
  const dateValue = <string>req.query[`${prefix}${filter.name}`]
  const { min } = <DateFilterValue>filter
  const { max } = <DateFilterValue>filter
  return dateValue || min || max || '1977-05-25'
}

/**
 * Initialises the filters from the definition
 *
 * @param {components['schemas']['VariantDefinition']} definition
 * @return {*}
 */
const getFiltersFromDefinition = (fields: components['schemas']['FieldDefinition'][], interactive = false) => {
  return fields
    .filter((f) => f.filter)
    .filter((f) => {
      // TODO: fix types here once it has been defined.
      return interactive
        ? (<components['schemas']['FieldDefinition'] & { interactive?: boolean }>f.filter).interactive
        : !(<components['schemas']['FieldDefinition'] & { interactive?: boolean }>f.filter).interactive
    })
    .map((f) => {
      const { display: text, name, filter } = f
      const { type, staticOptions, dynamicOptions, defaultValue, mandatory, pattern } = filter

      const options: FilterOption[] = []
      if (staticOptions) {
        if (type === FilterType.select) {
          options.push({ value: 'no-filter', text: 'Select your option', disabled: true, selected: true })
        }
        staticOptions.forEach((o) => {
          options.push({ value: o.name, text: o.display })
        })
      }

      let filterData: FilterValue = {
        text,
        name,
        type: type as FilterType,
        options: options.length ? options : null,
        value: defaultValue || null,
        minimumLength: dynamicOptions ? dynamicOptions.minimumLength : null,
        dynamicResourceEndpoint: null,
        mandatory,
        pattern,
      }

      if (type === FilterType.dateRange.toLowerCase()) {
        const dateRegEx = /^\d{1,4}-\d{1,2}-\d{2,2} - \d{1,4}-\d{1,2}-\d{1,2}$/
        const { min, max } = filter
        let startValue
        let endValue

        if (min) startValue = min
        if (max) endValue = max

        let value
        if (defaultValue && defaultValue.match(dateRegEx)) {
          ;[startValue, endValue] = defaultValue.split(' - ')
          value = DateRangeInputUtils.setDateRangeValuesWithinMinMax(filter, startValue, endValue)
        } else if (defaultValue) {
          value = defaultValue
        } else {
          value = DateRangeInputUtils.setDateRangeValuesWithinMinMax(filter, startValue, endValue)
        }

        filterData = filterData as unknown as DateFilterValue
        filterData = {
          ...filterData,
          min: filter.min,
          max: filter.max,
          value,
        }

        filterData.relativeOptions = DateRangeInputUtils.getRelativeDateOptions(filterData.min, filterData.max)
      }

      if (type === FilterType.date.toLowerCase()) {
        filterData = filterData as unknown as DateFilterValue
        filterData = {
          ...filterData,
          value: DateInputUtils.setDateValueWithinMinMax(filter),
          min: filter.min,
          max: filter.max,
        }
      }

      return filterData
    })
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
  const defaultFilters = await getFiltersFromDefinition(fields, interactive)
  const filters = setFilterValuesFromRequest(defaultFilters, req)
  const selectedFilters = SelectedFiltersUtils.getSelectedFilters(filters, prefix)

  return {
    filters,
    selectedFilters,
  }
}

export default {
  getFiltersFromDefinition,
  setFilterValuesFromRequest,
  getFilters,
}

import { Request } from 'express'
import { FilterType } from './filter-input/enum'
import type { components } from '../../types/api'
import type { FilterOption } from './filter-input/types'
import type { DateRange, FilterValue } from './types'

import SelectedFiltersUtils from './filters-selected/utils'
import DateRangeInputUtils from '../_inputs/date-range/utils'
import DateInputUtils from '../_inputs/date-input/utils'
import GranularDateRangeInputUtils from '../_inputs/granular-date-range/utils'
import { Granularity } from '../_inputs/granular-date-range/types'

const setFilterValuesFromRequest = (filters: FilterValue[], req: Request, prefix = 'filters.'): FilterValue[] => {
  const { preventDefault } = req.query

  return filters.map((filter: FilterValue) => {
    let requestfilterValue
    if (filter.type.toLowerCase() === FilterType.dateRange.toLowerCase()) {
      requestfilterValue = DateRangeInputUtils.setValueFromRequest(filter, req, prefix)
    } else if (filter.type.toLowerCase() === FilterType.granularDateRange.toLowerCase()) {
      requestfilterValue = GranularDateRangeInputUtils.setValueFromRequest(filter, req, prefix)
    } else if (filter.type.toLowerCase() === FilterType.date.toLowerCase()) {
      requestfilterValue = DateInputUtils.setValueFromRequest(filter, req, prefix)
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

/**
 * Initialises the filters from the definition
 *
 * @param {components['schemas']['VariantDefinition']} definition
 * @return {*}
 */
const getFiltersFromDefinition = (fields: components['schemas']['FieldDefinition'][], interactive?: boolean) => {
  return fields
    .filter((f) => f.filter)
    .filter((f) => {
      // TODO: fix types here once it has been defined.
      if (interactive !== undefined) {
        return interactive
          ? (<components['schemas']['FieldDefinition'] & { interactive?: boolean }>f.filter).interactive
          : !(<components['schemas']['FieldDefinition'] & { interactive?: boolean }>f.filter).interactive
      }
      return true
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
        filterData = DateRangeInputUtils.getFilterFromDefinition(filter, filterData)
      }

      if (type === FilterType.granularDateRange.toLocaleLowerCase()) {
        // TODO: align this with the BE - defaultGranularity
        const granularDateRangeFilter = filter as components['schemas']['FilterDefinition'] & {
          defaultGranularity: Granularity
        }
        filterData = GranularDateRangeInputUtils.getFilterFromDefinition(granularDateRangeFilter, filterData)
      }

      if (type === FilterType.date.toLowerCase()) {
        filterData = DateInputUtils.getFilterFromDefinition(filter, filterData)
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

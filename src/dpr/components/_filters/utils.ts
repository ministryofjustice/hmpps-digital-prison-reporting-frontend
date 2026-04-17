/* eslint-disable no-param-reassign */
import { Request, Response } from 'express'
import { FilterType } from './filter-input/enum'
import type { components } from '../../types/api'
import type { FilterOption } from './filter-input/types'
import type {
  DateFilterValue,
  FilterValueType,
  DateRangeFilterValue,
  FilterValue,
  MultiselectFilterValue,
  GranularDateRangeFilterValue,
  FilterValueWithOptions,
} from './types'

import DateRangeInputUtils from '../_inputs/date-range/utils'
import DateInputUtils from '../_inputs/date-input/utils'
import GranularDateRangeInputUtils from '../_inputs/granular-date-range/utils'
import AutocompleteUtils from '../_inputs/autocomplete-text-input/utils'
import MultiSelectUtils from '../_inputs/multi-select/utils'
import PersonalistionUtils from '../../utils/Personalisation/personalisationUtils'
import { RenderFiltersReturnValue } from '../_async/async-filters-form/types'
import SortHelper from '../_async/async-filters-form/sortByTemplate'

/**
 * Given a FilterValue[], will update the values to match the req.query values if present
 *
 * @param {FilterValue[]} filters
 * @param {Request} req
 * @param {string} [prefix='filters.']
 * @return {*}  {FilterValue[]}
 */
export const setFilterValuesFromRequest = (
  filters: FilterValue[],
  req: Request,
  prefix = 'filters.',
): FilterValue[] => {
  const { preventDefault } = req.query

  if (Object.keys(req.query).every((key) => !key.includes(prefix)) && !preventDefault) {
    return filters
  }

  return filters.map((filter: FilterValue) => {
    let requestfilterValue: FilterValueType
    let requestfilterValues: string[] | undefined
    let requestOptionValue: string | undefined

    const type = filter.type.toLowerCase()
    switch (type) {
      case FilterType.dateRange.toLowerCase():
        requestfilterValue = DateRangeInputUtils.setValueFromRequest(<DateRangeFilterValue>filter, req, prefix)
        break

      case FilterType.granularDateRange.toLowerCase():
        requestfilterValue = GranularDateRangeInputUtils.setValueFromRequest(
          <GranularDateRangeFilterValue>filter,
          req,
          prefix,
        )
        break

      case FilterType.date.toLowerCase():
        requestfilterValue = DateInputUtils.setValueFromRequest(<DateFilterValue>filter, req, prefix)
        break

      case FilterType.multiselect.toLowerCase():
        ;({ requestfilterValue, requestfilterValues } = MultiSelectUtils.setValueFromRequest(
          <MultiselectFilterValue>filter,
          req,
          prefix,
        ))
        break

      case FilterType.autocomplete.toLowerCase(): {
        ;({ requestfilterValue, requestOptionValue } = AutocompleteUtils.setValueFromRequest(
          <FilterValueWithOptions>filter,
          req,
          prefix,
        ))
        break
      }

      default:
        requestfilterValue = <string>req.query[`${prefix}${filter.name}`]
        break
    }

    let value: FilterValueType = null
    if (requestfilterValue) {
      value = requestfilterValue
    } else if (preventDefault) {
      value = ''
    }

    return {
      ...filter,
      value,
      ...(requestfilterValues && { values: requestfilterValues }),
      ...(requestOptionValue && { staticOptionNameValue: requestOptionValue }),
    }
  })
}

export const getFiltersFromDefinition = (
  fields: components['schemas']['FieldDefinition'][],
  interactive?: boolean,
): FilterValue[] => {
  const filters = fields
    .filter((f) => f.filter)
    .filter((f) => {
      if (interactive !== undefined) {
        if (f.filter?.interactive === undefined) {
          return !interactive
        }
        return interactive === f.filter.interactive
      }
      return true
    })
    .map((f) => {
      const { display: text, name } = f
      const filter = <components['schemas']['FilterDefinition']>f.filter
      const { type, staticOptions, dynamicOptions, defaultValue, mandatory, pattern, index } = filter

      const options: FilterOption[] = staticOptions
        ? staticOptions.map((opt) => {
            return { value: opt.name, text: opt.display }
          })
        : []

      let filterData: FilterValue = {
        text,
        name,
        type: type as FilterType,
        value: defaultValue || null,
        mandatory: mandatory || false,
        minimumLength: dynamicOptions?.minimumLength,
        pattern,
        index,
      }

      const noFilterOption = {
        value: 'no-filter',
        text: 'None',
        disabled: false,
      }

      switch (type) {
        case FilterType.autocomplete.toLowerCase():
          filterData = {
            ...filterData,
            options,
          }
          break

        case FilterType.radio:
          if (!mandatory) options.unshift(noFilterOption)
          filterData = {
            ...filterData,
            options,
          }
          break

        case FilterType.select: {
          if (!mandatory) options.unshift(noFilterOption)
          options.unshift({
            value: '',
            text: 'Select your option',
            disabled: true,
            selected: true,
          })

          filterData = {
            ...filterData,
            options,
          }
          break
        }

        case FilterType.multiselect.toLowerCase():
          filterData = {
            ...filterData,
            options,
            values: defaultValue ? defaultValue.split(',') : [],
          }
          break

        case FilterType.dateRange.toLowerCase():
          filterData = DateRangeInputUtils.getFilterFromDefinition(filter, filterData)
          break

        case FilterType.date.toLowerCase():
          filterData = DateInputUtils.getFilterFromDefinition(filter, filterData)
          break

        case FilterType.granularDateRange.toLocaleLowerCase(): {
          filterData = GranularDateRangeInputUtils.getFilterFromDefinition(filter, filterData)
          break
        }

        default:
          break
      }

      return filterData
    })

  const orderedFilters = orderFilters(filters)
  return orderedFilters
}

/**
 * Initialises the sortData from the definition
 */
export const getSortByFromDefinition = (fields: components['schemas']['FieldDefinition'][]): FilterValue[] => {
  const sortBy = SortHelper.sortByTemplate()
  const options = fields
    .filter((f) => f.sortable)
    .map((f) => {
      if (f.defaultsort) sortBy[0].value = f.name
      const field: FilterOption = { value: f.name, text: f.display }
      sortBy[1].value = f.sortDirection ? `${f.sortDirection === 'asc'}` : 'true'
      return field
    })

  if (options.length) {
    const sortWithOptions: FilterValueWithOptions = <FilterValueWithOptions>sortBy[0]
    sortWithOptions.options = options
    sortBy[0] = sortWithOptions
    return sortBy
  }
  return []
}

const orderFilters = (filterValues: FilterValue[]) => {
  const noIndexFilters = filterValues.filter((f) => f.index === undefined)
  const indexFilters = filterValues.filter((f) => f.index !== undefined)
  indexFilters.forEach((f) => {
    if (f.index !== undefined) noIndexFilters.splice(f.index, 0, f)
  })
  return noIndexFilters
}

/**
 * Gets the filters for an interactive report
 *
 * @param {{
 *   fields: components['schemas']['FieldDefinition'][]
 *   req: Request
 * }} {
 *   fields,
 *   req,
 * }
 * @return {*}
 */
export const getInteractiveFilters = async ({
  fields,
  req,
}: {
  fields: components['schemas']['FieldDefinition'][]
  req: Request
}) => {
  // 1. Set the filters from the product definition
  let filters = await getFiltersFromDefinition(fields, true)

  // 2. Set values from request
  filters = setFilterValuesFromRequest(filters, req)

  return filters
}

/**
 * Gets the filters for pre-request
 *
 * @param {Request} req
 * @param {Response} res
 * @param {components['schemas']['FieldDefinition'][]} fields
 * @return {*}  {(Promise<RenderFiltersReturnValue | undefined>)}
 */
export const getRequestFilters = async (
  req: Request,
  res: Response,
  fields: components['schemas']['FieldDefinition'][],
): Promise<RenderFiltersReturnValue | undefined> => {
  if (!fields || !fields.length) {
    return undefined
  }

  // 1. Get filters from definition with default values
  let filters = getFiltersFromDefinition(fields, false)

  // 2. Get the sort from the definition
  const sortBy = getSortByFromDefinition(fields)

  // 3. Update filter values with user context values. eg. establishmnent code
  filters = PersonalistionUtils.setUserContextDefaults(res, filters)

  // 4. Overwrite filter values with query param values
  filters = setFilterValuesFromRequest(filters, req)

  return {
    filters,
    sortBy,
  }
}

export default {
  getFiltersFromDefinition,
  setFilterValuesFromRequest,
  getInteractiveFilters,
}

import { Request, Response } from 'express'
import { FilterType } from './filter-input/enum'
import type { components } from '../../types/api'
import type { FilterOption } from './filter-input/types'
import type { DateRange, FilterValue } from './types'
import ReportQuery, { DEFAULT_FILTERS_PREFIX } from '../../types/ReportQuery'

import SelectedFiltersUtils from './filters-selected/utils'
import DateRangeInputUtils from '../_inputs/date-range/utils'
import DateInputUtils from '../_inputs/date-input/utils'
import GranularDateRangeInputUtils from '../_inputs/granular-date-range/utils'
import MultiSelectUtils from '../_inputs/mulitselect/utils'
import { Granularity, QuickFilters } from '../_inputs/granular-date-range/types'
import createUrlForParameters from '../../utils/urlHelper'

const setFilterValuesFromRequest = (filters: FilterValue[], req: Request, prefix = 'filters.'): FilterValue[] => {
  const { preventDefault } = req.query

  return filters.map((filter: FilterValue) => {
    let requestfilterValue
    let requestfilterValues: string[]
    if (filter.type.toLowerCase() === FilterType.dateRange.toLowerCase()) {
      requestfilterValue = DateRangeInputUtils.setValueFromRequest(filter, req, prefix)
    } else if (filter.type.toLowerCase() === FilterType.granularDateRange.toLowerCase()) {
      requestfilterValue = GranularDateRangeInputUtils.setValueFromRequest(filter, req, prefix)
    } else if (filter.type.toLowerCase() === FilterType.date.toLowerCase()) {
      requestfilterValue = DateInputUtils.setValueFromRequest(filter, req, prefix)
    } else if (filter.type.toLowerCase() === FilterType.multiselect.toLowerCase()) {
      ;({ requestfilterValue, requestfilterValues } = MultiSelectUtils.setValueFromRequest(filter, req, prefix))
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
      ...(requestfilterValues && { values: requestfilterValues }),
    }
  })
}

const setFilterQueryFromFilterDefinition = (
  fields: components['schemas']['FieldDefinition'][],
  interactive?: boolean,
) => {
  let filterFields = fields.filter((f) => f.filter)
  if (interactive) {
    filterFields = filterFields.filter(
      (f) => (<components['schemas']['FilterDefinition'] & { interactive?: boolean }>f.filter).interactive,
    )
  }

  const queryArray = filterFields.map((field) => {
    const { filter } = field

    if (filter.type.toLowerCase() === FilterType.dateRange.toLowerCase()) {
      return DateRangeInputUtils.getQueryFromDefinition(filter, field.name, DEFAULT_FILTERS_PREFIX)
    }

    if (filter.type.toLowerCase() === FilterType.granularDateRange.toLowerCase()) {
      const startEndParams = DateRangeInputUtils.getQueryFromDefinition(filter, field.name, DEFAULT_FILTERS_PREFIX)
      return GranularDateRangeInputUtils.getQueryFromDefinition(
        filter as unknown as components['schemas']['FilterDefinition'] & {
          defaultGranularity: Granularity
          defaultQuickFilterValue: QuickFilters
        },
        field.name,
        DEFAULT_FILTERS_PREFIX,
        startEndParams,
      )
    }

    if (filter.type.toLowerCase() === FilterType.multiselect.toLowerCase()) {
      const values = filter.defaultValue.split(',')
      return values.reduce((q: string, value, index) => {
        // eslint-disable-next-line no-param-reassign
        q += `${DEFAULT_FILTERS_PREFIX}${field.name}=${value}`
        if (index !== values.length - 1) {
          // eslint-disable-next-line no-param-reassign
          q += '&'
        }
        return q
      }, '')
    }

    if (filter.defaultValue) {
      return `${DEFAULT_FILTERS_PREFIX}${field.name}=${filter.defaultValue}`
    }

    return ''
  })

  const queryString = queryArray.filter((p) => p.length).join('&')

  return queryString
}

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
        minimumLength: dynamicOptions ? dynamicOptions.minimumLength : null,
        dynamicResourceEndpoint: null,
        mandatory: mandatory || false,
        pattern,
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
          const granularDateRangeFilter = filter as components['schemas']['FilterDefinition'] & {
            defaultGranularity: Granularity
            defaultQuickFilterValue: QuickFilters
          }
          filterData = GranularDateRangeInputUtils.getFilterFromDefinition(granularDateRangeFilter, filterData)
          break
        }

        default:
          break
      }

      return filterData
    })
}

function redirectWithDefaultFilters(
  reportQuery: ReportQuery,
  variantDefinition: {
    id: string
    name: string
    resourceName: string
    description?: string
    specification?: components['schemas']['Specification']
  },
  response: Response,
  request: Request,
) {
  const defaultFilters: Record<string, string> = {}
  const { fields } = variantDefinition.specification

  if (Object.keys(reportQuery.filters).length === 0) {
    fields
      .filter((f) => f.filter && f.filter.defaultValue)
      .forEach((f) => {
        if (f.filter.type.toLowerCase() === FilterType.dateRange) {
          const dates = f.filter.defaultValue.split(' - ')

          if (dates.length >= 1) {
            // eslint-disable-next-line prefer-destructuring
            defaultFilters[`${DEFAULT_FILTERS_PREFIX}${f.name}.start`] = dates[0]

            if (dates.length >= 2) {
              // eslint-disable-next-line prefer-destructuring
              defaultFilters[`${DEFAULT_FILTERS_PREFIX}${f.name}.end`] = dates[1]
            }
          }
        } else {
          defaultFilters[`${DEFAULT_FILTERS_PREFIX}${f.name}`] = f.filter.defaultValue
        }
      })
  }

  if (Object.keys(defaultFilters).length > 0) {
    const querystring = createUrlForParameters(reportQuery.toRecordWithFilterPrefix(), defaultFilters, fields)
    response.redirect(`${request.baseUrl}${request.path}${querystring}`)
    return true
  }

  return false
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
  setFilterQueryFromFilterDefinition,
  redirectWithDefaultFilters,
}

/* eslint-disable no-param-reassign */
import { Request, Response } from 'express'
import { GranularDateRangeQuickFilterValue } from './types'
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
  GranularDateRange,
  GranularDateRangeGranularityValue,
} from './types'
import ReportQuery, { DEFAULT_FILTERS_PREFIX } from '../../types/ReportQuery'

import SelectedFiltersUtils from './filters-selected/utils'
import DateRangeInputUtils from '../_inputs/date-range/utils'
import DateInputUtils from '../_inputs/date-input/utils'
import GranularDateRangeInputUtils from '../_inputs/granular-date-range/utils'
import MultiSelectUtils from '../_inputs/multi-select/utils'
import { Granularity, QuickFilters } from '../_inputs/granular-date-range/types'
import PersonalistionUtils from '../../utils/Personalisation/personalisationUtils'
import createUrlForParameters from '../../utils/urlHelper'
import { Services } from '../../types/Services'
import { FiltersType } from './filtersTypeEnum'
import LocalsHelper from '../../utils/localsHelper'

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
    }
  })
}

export const setFilterQueryFromFilterDefinition = (
  fields: components['schemas']['FieldDefinition'][],
  interactive?: boolean,
) => {
  let filterFields: components['schemas']['FieldDefinition'][] = fields.filter((f) => f.filter)
  if (interactive) {
    filterFields = filterFields.filter(
      (f) => (<components['schemas']['FilterDefinition'] & { interactive?: boolean }>f.filter).interactive,
    )
  }

  return filterFields
    .filter((field) => field.filter !== undefined)
    .filter((field) => (<components['schemas']['FilterDefinition']>field.filter).defaultValue !== undefined)
    .map((field) => {
      const filter = <components['schemas']['FilterDefinition']>field.filter
      const type = filter.type.toLocaleLowerCase()

      switch (type) {
        case FilterType.dateRange.toLowerCase():
          return DateRangeInputUtils.getQueryFromDefinition(filter, field.name, DEFAULT_FILTERS_PREFIX)

        case FilterType.multiselect.toLowerCase():
          return MultiSelectUtils.getQueryFromDefinition(filter, field.name, DEFAULT_FILTERS_PREFIX)

        case FilterType.granularDateRange.toLowerCase(): {
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

        default:
          return `${DEFAULT_FILTERS_PREFIX}${field.name}=${filter.defaultValue}`
      }
    })
    .join('&')
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
        minimumLength: dynamicOptions?.minimumLength,
        mandatory: mandatory || false,
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

const orderFilters = (filterValues: FilterValue[]) => {
  const noIndexFilters = filterValues.filter((f) => f.index === undefined)
  const indexFilters = filterValues.filter((f) => f.index !== undefined)
  indexFilters.forEach((f) => {
    if (f.index !== undefined) noIndexFilters.splice(f.index, 0, f)
  })
  return noIndexFilters
}

export const setRequestQueryFromFilterValues = (filterValues: FilterValue[]) => {
  const requestQuery = filterValues
    .filter((fv) => fv.value)
    .reduce((acc, curr) => {
      const { value, name } = curr
      const filterPrefix = `filters.${name}`
      switch (curr.type) {
        case FilterType.granularDateRange.toLowerCase():
          {
            const granularDateRangeValue = <GranularDateRange>value
            Object.keys(granularDateRangeValue).forEach((key) => {
              let v = granularDateRangeValue[key as keyof GranularDateRange]
              if (key.includes('partialDate')) {
                acc = {
                  ...acc,
                }
              } else {
                if (key.includes('granularity') || key.includes('quickFilter')) {
                  v = (<GranularDateRangeGranularityValue | GranularDateRangeQuickFilterValue>v).value
                }
                acc = {
                  ...acc,
                  [`${filterPrefix}.${key}`]: v,
                }
              }
            })
          }
          break
        case FilterType.dateRange.toLowerCase():
          if (value) {
            Object.keys(value).forEach((key) => {
              acc = {
                ...acc,
                [`${filterPrefix}.${key}`]: value[key as keyof FilterValueType],
              }
            })
          }
          break
        case FilterType.multiselect.toLowerCase():
          acc = {
            ...acc,
            [`${filterPrefix}`]: (<string>value).split(','),
          }
          break
        default:
          acc = {
            ...acc,
            [`${filterPrefix}`]: value,
          }
          break
      }
      return acc
    }, {})

  return requestQuery
}

export const redirectWithDefaultFilters = (
  reportQuery: ReportQuery,
  variantDefinition: components['schemas']['VariantDefinition'],
  response: Response,
  request: Request,
) => {
  const defaultFilters: Record<string, string> = {}
  const { specification } = variantDefinition
  const fields = specification ? specification.fields : []
  const { preventDefault } = request.query
  const hasNoQueryFilters = Object.keys(reportQuery.filters).length === 0 && !preventDefault
  if (hasNoQueryFilters) {
    fields
      .filter((f) => f.filter && f.filter.defaultValue)
      .forEach((f) => {
        const { filter } = f
        if (filter) {
          if (filter.type.toLowerCase() === FilterType.dateRange.toLowerCase()) {
            const { defaultValue } = <components['schemas']['FilterDefinition']>filter
            const dates = defaultValue ? defaultValue.split(' - ') : ''

            if (dates.length >= 1) {
              // eslint-disable-next-line prefer-destructuring
              defaultFilters[`${DEFAULT_FILTERS_PREFIX}${f.name}.start`] = dates[0]

              if (dates.length >= 2) {
                // eslint-disable-next-line prefer-destructuring
                defaultFilters[`${DEFAULT_FILTERS_PREFIX}${f.name}.end`] = dates[1]
              }
            }
          } else {
            defaultFilters[`${DEFAULT_FILTERS_PREFIX}${f.name}`] = filter.defaultValue || ''
          }
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

export const getPersonalisedFilters = async (
  filters: FilterValue[],
  req: Request,
  res: Response,
  services: Services,
  filtersType: FiltersType,
) => {
  const { reportId, id } = req.params
  const { dprUser } = LocalsHelper.getValues(res)
  const defaultFilterValues = await services.defaultFilterValuesService.get(dprUser.id, reportId, id, filtersType)
  let defaultFilters = filters
  if (defaultFilterValues) {
    const personalisedFilters = PersonalistionUtils.setFilterValuesFromSavedDefaults(filters, [], defaultFilterValues)
    defaultFilters = personalisedFilters.filters
  }

  return { filters: defaultFilters, defaultFilterValues }
}

export const getFilters = async ({
  fields,
  req,
  res,
  prefix = 'filters.',
  services,
  filtersType,
}: {
  fields: components['schemas']['FieldDefinition'][]
  req: Request
  res?: Response
  prefix?: string
  services?: Services
  filtersType: FiltersType
}) => {
  // 1. Set the filters from the product definition
  let filters = await getFiltersFromDefinition(fields, filtersType === FiltersType.INTERACTIVE)

  let hasDefaults
  let canSaveDefaults = false
  if (services && res) {
    // 2. If there are personalised filters, overwrite fiters with the personalised filter values.
    const { filters: personalisedFilterValues, defaultFilterValues } = await getPersonalisedFilters(
      filters,
      req,
      res,
      services,
      filtersType,
    )
    filters = personalisedFilterValues
    hasDefaults = defaultFilterValues && defaultFilterValues.length > 0
    canSaveDefaults = true
  }

  // If there is a request query, overwrite the filters with the query params
  if (req.query) {
    filters = setFilterValuesFromRequest(filters, req)
  }

  // Set the selected filters
  const selectedFilters = SelectedFiltersUtils.getSelectedFilters(filters, prefix)

  return {
    filters,
    selectedFilters,
    hasDefaults,
    canSaveDefaults,
  }
}

export default {
  getFiltersFromDefinition,
  setFilterValuesFromRequest,
  getFilters,
  setFilterQueryFromFilterDefinition,
  redirectWithDefaultFilters,
  setRequestQueryFromFilterValues,
  getPersonalisedFilters,
}

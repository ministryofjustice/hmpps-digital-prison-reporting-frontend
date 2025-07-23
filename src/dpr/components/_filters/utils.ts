/* eslint-disable no-param-reassign */
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
import MultiSelectUtils from '../_inputs/multi-select/utils'
import { Granularity, QuickFilters } from '../_inputs/granular-date-range/types'
import createUrlForParameters from '../../utils/urlHelper'
import { defaultFilterValue } from '../../routes/journeys/request-report/filters/types'
import localsHelper from '../../utils/localsHelper'
import { Services } from '../../types/Services'
import { ReportType } from '../../types/UserReports'

/**
 * Given a FilterValue[], will update the values to match the req.query values if present
 *
 * @param {FilterValue[]} filters
 * @param {Request} req
 * @param {string} [prefix='filters.']
 * @return {*}  {FilterValue[]}
 */
const setFilterValuesFromRequest = (filters: FilterValue[], req: Request, prefix = 'filters.'): FilterValue[] => {
  const { preventDefault } = req.query

  if (Object.keys(req.query).every((key) => !key.includes(prefix)) && !preventDefault) {
    return filters
  }

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

    let value: string | DateRange = null
    if (requestfilterValue) {
      value = requestfilterValue
    } else if (preventDefault) {
      value = null
    }

    return {
      ...filter,
      value,
      ...(requestfilterValues && { values: requestfilterValues }),
    }
  })
}

const setFilterValuesFromSavedDefaults = (filters: FilterValue[], defaultValues: defaultFilterValue[]) => {
  const hasDefaults = filters.some((f) => {
    const defaultValue = defaultValues.findIndex((v) => v.name === f.name)
    return defaultValue !== -1
  })

  return filters.map((filter) => {
    let defaultValue = defaultValues.find((v) => v.name === filter.name)
    let updatedFilter = {
      ...filter,
    }
    const type = filter.type.toLocaleLowerCase()

    if (type === FilterType.multiselect.toLocaleLowerCase()) {
      let value = hasDefaults ? '' : updatedFilter.value
      value = defaultValue ? defaultValue.value : value
      let values = hasDefaults ? [] : updatedFilter.values
      values = defaultValue ? (<string>defaultValue.value).split(',') : values

      updatedFilter = {
        ...updatedFilter,
        value,
        values,
      }
    } else if (type === FilterType.date.toLocaleLowerCase()) {
      const value = hasDefaults ? '' : updatedFilter.value
      defaultValue = defaultValue || { ...defaultValue, value }
      updatedFilter = DateInputUtils.setFilterValueFromDefault(defaultValue, updatedFilter)
    } else if (type === FilterType.dateRange.toLocaleLowerCase()) {
      const value = hasDefaults ? { start: '', end: '' } : updatedFilter.value
      defaultValue = defaultValue || { ...defaultValue, value }
      updatedFilter = DateRangeInputUtils.setFilterValueFromDefault(defaultValue, updatedFilter)
    } else if (type === FilterType.granularDateRange.toLocaleLowerCase()) {
      const value = hasDefaults ? { start: '', end: '', granularity: '', quickFilter: '' } : updatedFilter.value
      defaultValue = defaultValue || { ...defaultValue, value }
      updatedFilter = GranularDateRangeInputUtils.setFilterValueFromDefault(defaultValue, updatedFilter)
    } else {
      let value = hasDefaults ? '' : updatedFilter.value
      value = defaultValue ? defaultValue.value : value
      updatedFilter = {
        ...filter,
        value,
      }
    }

    return updatedFilter
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

  return filterFields
    .filter((field) => field.filter && field.filter.defaultValue)
    .map((field) => {
      const { filter } = field

      if (filter.type.toLowerCase() === FilterType.dateRange.toLowerCase()) {
        return DateRangeInputUtils.getQueryFromDefinition(filter, field.name, DEFAULT_FILTERS_PREFIX)
      }

      if (filter.type.toLowerCase() === FilterType.multiselect.toLowerCase()) {
        return MultiSelectUtils.getQueryFromDefinition(filter, field.name, DEFAULT_FILTERS_PREFIX)
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

      return `${DEFAULT_FILTERS_PREFIX}${field.name}=${filter.defaultValue}`
    })
    .join('&')
}

const setUserDefinedDefaultValuesForReport = async (
  req: Request,
  res: Response,
  services: Services,
): Promise<defaultFilterValue[]> => {
  const { token, definitionsPath } = localsHelper.getValues(res)
  const { reportId, id, type } = req.body

  const service = type === ReportType.REPORT ? services.reportingService : services.dashboardService
  const definition = await service.getDefinition(token, reportId, id, definitionsPath)
  const fields: components['schemas']['FieldDefinition'][] =
    type === ReportType.REPORT ? definition.variant.specification.fields : definition.filterFields

  const bodyFilterValues = Object.keys(req.body)
    .filter((k) => {
      return k.includes('filters.')
    })
    .map((k) => {
      return { name: k.replace('filters.', ''), value: req.body[k] }
    })
    .map((k) => {
      const n = k.name.split('.')[0]
      const field = fields.find((f) => f.name === n)
      let { value, name } = k

      if (field) {
        const filterType = field.filter?.type.toLocaleLowerCase()

        if (filterType === FilterType.multiselect.toLocaleLowerCase()) {
          value = k.value.join(',')
        }

        if (filterType === FilterType.dateRange.toLocaleLowerCase()) {
          ;({ value, name } = DateRangeInputUtils.setDefaultValue(req, name))
        }

        if (filterType === FilterType.granularDateRange.toLocaleLowerCase()) {
          ;({ name, value } = GranularDateRangeInputUtils.setDefaultValue(req, name))
        }
      }

      return {
        name,
        value,
      }
    })

  let defaultValuesConfig = Array.from(new Set(bodyFilterValues.map((a) => a.name))).map((name) => {
    return bodyFilterValues.find((a) => a.name === name)
  })

  defaultValuesConfig = defaultValuesConfig.filter((defaultValue) => {
    return defaultValue.value !== ''
  })

  return defaultValuesConfig
}

const setUserContextDefaults = (res: Response, filters: FilterValue[]) => {
  const { activeCaseLoadId } = localsHelper.getValues(res)

  filters.forEach((filter) => {
    if (
      filter.type.toLocaleLowerCase() === FilterType.autocomplete.toLocaleLowerCase() &&
      filter.text.toLocaleLowerCase().includes('establishment') &&
      activeCaseLoadId.length
    ) {
      filter.value = activeCaseLoadId
    }
  })

  return filters
}

const getFiltersFromDefinition = (fields: components['schemas']['FieldDefinition'][], interactive?: boolean) => {
  return fields
    .filter((f) => f.filter)
    .filter((f) => {
      if (interactive !== undefined) {
        const interactiveFilterValue = (<
          components['schemas']['FieldDefinition'] & {
            interactive?: boolean
          }
        >f.filter).interactive

        // NOTE: Uncomment if filters are meant to be both interactive and non interactive.
        if (interactiveFilterValue === undefined) {
          return !interactive
        }

        return interactive === interactiveFilterValue
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

const redirectWithDefaultFilters = (
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
) => {
  const defaultFilters: Record<string, string> = {}
  const { fields } = variantDefinition.specification
  const { preventDefault } = request.query
  const hasNoQueryFilters = Object.keys(reportQuery.filters).length === 0 && !preventDefault
  if (hasNoQueryFilters) {
    fields
      .filter((f) => f.filter && f.filter.defaultValue)
      .forEach((f) => {
        if (f.filter.type.toLowerCase() === FilterType.dateRange.toLowerCase()) {
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
  setFilterValuesFromSavedDefaults,
  setUserDefinedDefaultValuesForReport,
  setUserContextDefaults,
}

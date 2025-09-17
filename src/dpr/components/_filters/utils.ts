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
import { RenderFiltersReturnValue } from '../_async/async-filters-form/types'

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

const setFilterValuesFromSavedDefaults = (
  filtersData: RenderFiltersReturnValue,
  defaultValues: defaultFilterValue[],
): RenderFiltersReturnValue => {
  const hasDefaults = filtersData.filters.some((f) => {
    const defaultValue = defaultValues.findIndex((v) => v.name === f.name)
    return defaultValue !== -1
  })

  const filterValues = filtersData.filters.map((filter) => {
    const defaultValue = defaultValues.find((v) => v.name === filter.name)
    let updatedFilter = {
      ...filter,
    }
    const type = filter.type.toLocaleLowerCase()

    switch (type) {
      case FilterType.multiselect.toLocaleLowerCase():
        updatedFilter = MultiSelectUtils.setFilterValuesFromSavedDefault(updatedFilter, hasDefaults, defaultValue)
        break
      case FilterType.date.toLocaleLowerCase():
        {
          const value = hasDefaults ? '' : updatedFilter.value
          const presetValue = defaultValue || value
          updatedFilter = <DateFilterValue>DateInputUtils.setFilterValueFromDefault(presetValue, updatedFilter)
        }
        break
      case FilterType.dateRange.toLocaleLowerCase():
        {
          const value = hasDefaults ? { start: '', end: '', relative: '' } : updatedFilter.value
          const presetValue = defaultValue || value
          updatedFilter = <DateRangeFilterValue>(
            DateRangeInputUtils.setFilterValueFromDefault(presetValue, updatedFilter)
          )
        }
        break
      case FilterType.granularDateRange.toLocaleLowerCase():
        {
          const value = hasDefaults ? { start: '', end: '', granularity: '', quickFilter: '' } : updatedFilter.value
          const presetValue = defaultValue || value
          updatedFilter = <GranularDateRangeFilterValue>(
            GranularDateRangeInputUtils.setFilterValueFromDefault(presetValue, updatedFilter)
          )
        }
        break
      default:
        {
          let value = hasDefaults ? '' : updatedFilter.value
          value = defaultValue ? defaultValue.value : value
          updatedFilter = {
            ...filter,
            value,
          }
        }

        break
    }

    return updatedFilter
  })

  const sortValues = filtersData.sortBy.map((sortFilter) => {
    const defaultValue = defaultValues.find((v) => v.name === sortFilter.name)
    return {
      ...sortFilter,
      ...(defaultValue && { value: defaultValue.value }),
    }
  })

  return {
    filters: filterValues,
    sortBy: sortValues,
  }
}

const setFilterQueryFromFilterDefinition = (
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
      return k.includes('filters.') || k.includes('sortColumn') || k.includes('sortedAsc')
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

        switch (filterType) {
          case FilterType.multiselect.toLocaleLowerCase():
            value = k.value.join(',')
            break

          case FilterType.dateRange.toLocaleLowerCase():
            ;({ value, name } = DateRangeInputUtils.setDefaultValue(req, name))
            break

          case FilterType.granularDateRange.toLocaleLowerCase():
            ;({ name, value } = GranularDateRangeInputUtils.setDefaultValue(req, name))
            break

          default:
            break
        }
      }

      return {
        name,
        value,
      }
    })

  const defaultValuesConfig = Array.from(new Set(bodyFilterValues.map((a) => a.name)))
    .map((name) => {
      return bodyFilterValues.find((a) => a.name === name)
    })
    .filter((c) => c !== undefined)

  return defaultValuesConfig.filter((defaultValue) => {
    return defaultValue ? defaultValue.value !== '' : false
  })
}

const setUserContextDefaults = (res: Response, filters: FilterValue[]) => {
  const { dprUser } = localsHelper.getValues(res)
  const { activeCaseLoadId } = dprUser

  filters.forEach((filter) => {
    if (
      filter.type.toLocaleLowerCase() === FilterType.autocomplete.toLocaleLowerCase() &&
      filter.text.toLocaleLowerCase().includes('establishment') &&
      activeCaseLoadId.length
    ) {
      const f = <FilterValueWithOptions>filter
      const option = f.options.find((opt) => opt.value === activeCaseLoadId)

      if (option) {
        f.value = option.text
        f.staticOptionNameValue = activeCaseLoadId
      }
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
      const { display: text, name } = f
      const filter = <components['schemas']['FilterDefinition']>f.filter
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
        minimumLength: dynamicOptions?.minimumLength,
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
          const granularDateRangeFilter = filter as components['schemas']['FilterDefinition']
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

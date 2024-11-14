/* eslint-disable no-param-reassign */
import { Request } from 'express'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import Dict = NodeJS.Dict
import { components } from '../../types/api'
import FilterUtils from '../filters/utils'
import { DateFilterValue, FilterValue, FilterOption } from '../filters/types'
import { FilterType } from '../filter-input/enum'
import SortHelper from './sortByTemplate'
import DefinitionUtils from '../../utils/definitionUtils'
import { SetQueryFromFiltersResult } from './types'
import DateMapper from '../../utils/DateMapper/DateMapper'
/**
 * Initialises the filters & Sort from the definition data
 *
 * @param {components['schemas']['VariantDefinition']} definition
 * @return {*}
 */
const initFiltersFromDefinition = (fields: components['schemas']['FieldDefinition'][]) => {
  return {
    filters: getFiltersFromDefinition(fields),
    sortBy: getSortByFromDefinition(fields),
  }
}

/**
 * Initialises the sortData from the definition
 *
 * @param {components['schemas']['VariantDefinition']} definition
 * @return {*}
 */
export const getSortByFromDefinition = (fields: components['schemas']['FieldDefinition'][]) => {
  const sortBy = SortHelper.sortByTemplate()
  const options = fields
    .filter((f) => f.sortable)
    .map((f) => {
      if (f.defaultsort) sortBy[0].value = f.name
      return { value: f.name, text: f.display }
    })

  if (options.length) {
    sortBy[0].options = fields
      .filter((f) => f.sortable)
      .map((f) => {
        if (f.defaultsort) sortBy[0].value = f.name
        return { value: f.name, text: f.display }
      })

    return sortBy
  }
  return []
}

const dateIsInBounds = (startDate: dayjs.Dayjs, endDate: dayjs.Dayjs, min: string, max: string) => {
  dayjs.extend(isBetween)

  const minDate = dayjs(min)
  const maxDate = dayjs(max)

  const startDateIsBetweenMinAndMax = startDate.isBetween(minDate, maxDate, 'day', '[]')
  const endDateIsBetweenMinAndMax = endDate.isBetween(minDate, maxDate, 'day', '[]')

  return startDateIsBetweenMinAndMax && endDateIsBetweenMinAndMax
}

export const calcDates = (durationValue: string) => {
  let endDate
  let startDate

  switch (durationValue) {
    case 'yesterday':
      endDate = dayjs()
      startDate = endDate.subtract(1, 'day')
      break
    case 'tomorrow':
      startDate = dayjs()
      endDate = startDate.add(1, 'day')
      break
    case 'last-week':
      endDate = dayjs()
      startDate = endDate.subtract(1, 'week')
      break
    case 'next-week':
      startDate = dayjs()
      endDate = startDate.add(1, 'week')
      break
    case 'last-month':
      endDate = dayjs()
      startDate = endDate.subtract(1, 'month')
      break
    case 'next-month':
      startDate = dayjs()
      endDate = startDate.add(1, 'month')
      break
    default:
      break
  }

  return {
    endDate,
    startDate,
  }
}

export const getRelativeDateOptions = (min: string, max: string) => {
  if (!min) min = '1977-05-25'
  if (!max) max = '9999-01-01'
  let options: { value: string; text: string; disabled?: boolean }[] = [
    { value: 'yesterday', text: 'Yesterday' },
    { value: 'tomorrow', text: 'Tomorrow' },
    { value: 'last-week', text: 'Last week' },
    { value: 'next-week', text: 'Next week' },
    { value: 'last-month', text: 'Last month' },
    { value: 'next-month', text: 'Next-month' },
  ]

  options.forEach((option: { value: string; text: string; disabled?: boolean }) => {
    const { endDate, startDate } = calcDates(option.value)
    if (!dateIsInBounds(startDate, endDate, min, max)) {
      option.disabled = true
    }
  })

  if (options.every((opt: { value: string; text: string; disabled?: boolean }) => opt.disabled)) {
    options = []
  }
  return options
}

/**
 * Initialises the filters from the definition
 *
 * @param {components['schemas']['VariantDefinition']} definition
 * @return {*}
 */
const getFiltersFromDefinition = (fields: components['schemas']['FieldDefinition'][]) => {
  return fields
    .filter((f) => f.filter)
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
          value = FilterUtils.setDateRangeValuesWithinMinMax(filter, startValue, endValue)
        } else if (defaultValue) {
          value = defaultValue
        } else {
          value = FilterUtils.setDateRangeValuesWithinMinMax(filter, startValue, endValue)
        }

        filterData = filterData as unknown as DateFilterValue
        filterData = {
          ...filterData,
          min: filter.min,
          max: filter.max,
          value,
        }

        filterData.relativeOptions = getRelativeDateOptions(filterData.min, filterData.max)
      }

      if (type === FilterType.date.toLowerCase()) {
        filterData = filterData as unknown as DateFilterValue
        filterData = {
          ...filterData,
          value: FilterUtils.setDateValueWithinMinMax(filter),
          min: filter.min,
          max: filter.max,
        }
      }

      return filterData
    })
}

export const setDurationStartAndEnd = (
  name: string,
  value: string,
  query: Dict<string>,
  filterData: Dict<string>,
  querySummary: Array<Dict<string>>,
  fields: components['schemas']['FieldDefinition'][],
) => {
  const { startDate, endDate } = calcDates(value)
  const startDateDisplayString = startDate.format('YYYY-MM-DD').toString()
  const endDateDisplayString = endDate.format('YYYY-MM-DD').toString()

  const fieldId = name.split('.')[0]
  const field = fields.find((f) => {
    return f.name === fieldId
  })

  query[`filters.${fieldId}.start` as keyof Dict<string>] = startDateDisplayString
  query[`filters.${fieldId}.end` as keyof Dict<string>] = endDateDisplayString

  filterData[name as keyof Dict<string>] = value

  let queryValue = `${value.charAt(0).toUpperCase() + value.slice(1).replace('-', ' ')}`
  queryValue = `${queryValue} (${startDateDisplayString} - ${endDateDisplayString})`
  querySummary.push({
    name: `${field.display}`,
    value: queryValue,
  })

  return {
    querySummary,
    filterData,
    query,
  }
}

export default {
  /**
   * Returns the data required for rendering the async filters component
   *
   * @param {AsyncReportUtilsParams} { req, res, dataSources }
   * @return {*}
   */
  renderFilters: async (fields: components['schemas']['FieldDefinition'][]) => {
    return {
      ...initFiltersFromDefinition(fields),
    }
  },

  setQueryFromFilters: (
    req: Request,
    fields: components['schemas']['FieldDefinition'][],
  ): SetQueryFromFiltersResult => {
    let query: Dict<string> = {}
    let filterData: Dict<string> = {}
    let querySummary: Array<Dict<string>> = []
    const sortData: Dict<string> = {}
    const dateMapper = new DateMapper()

    Object.keys(req.body)
      .filter((name) => name !== '_csrf' && req.body[name] !== '')
      .forEach((name) => {
        const shortName = name.replace('filters.', '')
        const value = req.body[name]

        if (name.includes('relative-duration')) {
          ;({ query, filterData, querySummary } = setDurationStartAndEnd(
            name,
            value,
            query,
            filterData,
            querySummary,
            fields,
          ))
        }

        if (name.startsWith('filters.') && value !== '' && !query[name]) {
          query[name as keyof Dict<string>] = value
          filterData[shortName as keyof Dict<string>] = value

          let dateDisplayValue

          if (dateMapper.isDate(value)) {
            dateDisplayValue = dateMapper.toDateString(value, 'local-date')

            const isoFormatDate = dateMapper.toDateString(value, 'iso')
            query[name as keyof Dict<string>] = isoFormatDate
            filterData[shortName as keyof Dict<string>] = isoFormatDate
          }

          const fieldDisplayName = DefinitionUtils.getFieldDisplayName(fields, shortName)
          querySummary.push({
            name: fieldDisplayName || shortName,
            value: dateDisplayValue || value,
          })
        } else if (name.startsWith('sort')) {
          query[name as keyof Dict<string>] = value
          sortData[name as keyof Dict<string>] = value

          const fieldDef = DefinitionUtils.getField(fields, value)

          let displayName = 'Sort Direction'
          let displayValue = value === 'true' ? 'Ascending' : 'Descending'
          if (fieldDef) {
            displayName = 'Sort Column'
            displayValue = fieldDef.display
          }

          querySummary.push({
            name: displayName,
            value: displayValue,
          })
        }
      })

    return {
      query,
      filterData,
      querySummary,
      sortData,
    }
  },
}

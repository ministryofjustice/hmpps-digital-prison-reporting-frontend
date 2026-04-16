/* eslint-disable no-param-reassign */
import dayjs from 'dayjs'
import customParse from 'dayjs/plugin/customParseFormat'
import isBetween from 'dayjs/plugin/isBetween'
import { Request } from 'express'
import { components } from '../../../types/api'
import { DateRangeFilterValue, DateRange, FilterValue } from '../../_filters/types'
import StartEndDateUtils from '../start-end-date/utils'
import RelativeDateRange, { RelativeOption } from './types'
import { DefaultDateFilterValue, defaultFilterValue } from '../../../utils/Personalisation/types'
import { calcDates, calcDatesForFilterDefinition, calcDatesForInputs } from '../../../utils/durationCalculator'

dayjs.extend(customParse)
dayjs.extend(isBetween)

type DateString = string | null | undefined

export const dateIsInBounds = (startDate: DateString, endDate: DateString, min: string, max: string): boolean => {
  const minDate = dayjs(min, 'YYYY-MM-DD').startOf('day')
  const maxDate = dayjs(max, 'YYYY-MM-DD').endOf('day')
  const isStartValid = !startDate || dayjs(startDate, 'DD/MM/YYYY').isBetween(minDate, maxDate, 'day', '[]')
  const isEndValid = !endDate || dayjs(endDate, 'DD/MM/YYYY').isBetween(minDate, maxDate, 'day', '[]')
  return isStartValid && isEndValid
}

export const setValueFromRequest = (
  filter: DateRangeFilterValue,
  req: Request,
  prefix: string,
): DateRangeFilterValue['value'] => {
  const { relativeOptions } = filter
  const start = <string>req.query[`${prefix}${filter.name}.start`]
  const end = <string>req.query[`${prefix}${filter.name}.end`]
  const relative = <string>req.query[`${prefix}${filter.name}.relative-duration`]

  let relativeDisabled = false
  if (relative && relativeOptions) {
    const option = relativeOptions.find((opt) => opt.value === relative)
    relativeDisabled = option && option.disabled ? option.disabled : false
  }

  const value = {
    start,
    end,
    ...(relative && !relativeDisabled && { relative }),
  } as DateRange

  return value
}

export const setDefaultValue = (req: Request, name: string) => {
  const dateRangeName = name.split('.')[0]

  const dateRangeDefaults = Object.keys(req.body)
    .filter((key) => key.includes(dateRangeName))
    .map((key) => {
      return { name: key.split('.')[2], value: req.body[key] }
    })

  const dateRangeValue: DateRangeFilterValue['value'] | string = { start: '', end: '' }
  dateRangeDefaults.forEach((dateRangeDefault) => {
    if (dateRangeDefault.name.includes('start')) {
      dateRangeValue.start = dateRangeDefault.value
    }
    if (dateRangeDefault.name.includes('end')) {
      dateRangeValue.end = dateRangeDefault.value
    }
    if (dateRangeDefault.name.includes('relative-duration')) {
      dateRangeValue.relative = dateRangeDefault.value
    }
  })

  return { value: dateRangeValue, name: dateRangeName }
}

export const setFilterValueFromDefault = (defaultValue: defaultFilterValue, filter: FilterValue) => {
  const value = { start: '', end: '', relative: '' }
  const { start, end, relative } = <DefaultDateFilterValue>defaultValue.value
  if (relative) {
    value.relative = relative
  }
  if (start) {
    value.start = dayjs(start, 'D/M/YYYY').format('YYYY-MM-DD').toString()
  }
  if (end) {
    value.end = dayjs(end, 'D/M/YYYY').format('YYYY-MM-DD').toString()
  }

  return {
    ...filter,
    value,
  }
}

export const getRelativeDateOptions = (min?: string, max?: string) => {
  if (!min) min = '1977-05-25'
  if (!max) max = '9999-01-01'
  let options: RelativeOption[] = getRelativeValues()
  options.forEach((option: RelativeOption) => {
    if (option.value !== RelativeDateRange.NONE) {
      const dates = calcDatesForInputs(option.value)
      if (dates && !dateIsInBounds(dates.start, dates.end, min, max)) {
        option.disabled = true
      }
    }
  })

  if (
    options
      .filter((opt: RelativeOption) => opt.value !== 'none')
      .every((opt: RelativeOption) => {
        return opt.value === null || opt.disabled
      })
  ) {
    options = []
  }

  return options
}

export const mapRelativeValue = (value: RelativeDateRange) => {
  const values = getRelativeValues()
  const opt = values.find((v) => v.value === value)
  return opt ? opt.text : ''
}

export const getRelativeValues = (): RelativeOption[] => {
  return [
    { value: RelativeDateRange.NONE, text: 'None' },
    { value: RelativeDateRange.YESTERDAY, text: 'Yesterday' },
    { value: RelativeDateRange.TOMORROW, text: 'Tomorrow' },
    { value: RelativeDateRange.LAST_WEEK, text: 'Last week' },
    { value: RelativeDateRange.NEXT_WEEK, text: 'Next week' },
    { value: RelativeDateRange.LAST_MONTH, text: 'Last month' },
    { value: RelativeDateRange.NEXT_MONTH, text: 'Next month' },
  ]
}

export const getFilterFromDefinition = (filter: components['schemas']['FilterDefinition'], filterData: FilterValue) => {
  const value = StartEndDateUtils.getStartAndEndValueFromDefinition(filter)
  const relativeOptions = getRelativeDateOptions(filter.min, filter.max)

  return {
    ...filterData,
    min: filter.min,
    max: filter.max,
    relativeOptions,
    value,
  }
}

/**
 * Creates the default query string from the definition
 *
 * @param {components['schemas']['FilterDefinition']} filter
 * @param {string} name
 * @return {*}  {string}
 */
export const getQueryFromDefinition = (filter: components['schemas']['FilterDefinition'], name: string): string => {
  if (!filter.defaultValue) return ''

  const params = new URLSearchParams()
  appendDateRangeValue(params, name, filter.defaultValue)

  return params.toString()
}

/**
 * Creates and appends the daterange query string
 * to an existing URLSearchParams
 *
 * @param {URLSearchParams} params
 * @param {string} fieldName
 * @param {string} defaultValue
 */
export const appendDateRangeValue = (
  params: URLSearchParams,
  fieldName: string,
  value: { start?: string; end?: string; relative?: string },
) => {
  if (value.start) {
    params.append(`filters.${fieldName}.start`, value.start)
  }

  if (value.end) {
    params.append(`filters.${fieldName}.end`, value.end)
  }

  if (value.relative) {
    params.append(`filters.${fieldName}.relative-duration`, value.relative)
  }
}

export type DateRangeDefaults = {
  start?: string
  end?: string
  relative?: string
}

export const resolveDateRangeDefaults = (
  filter: components['schemas']['FilterDefinition'],
): DateRangeDefaults | undefined => {
  // Case 1: quick filter wins
  if (filter.defaultQuickFilterValue) {
    const dates = calcDatesForFilterDefinition(<RelativeDateRange>filter.defaultQuickFilterValue)

    return {
      relative: filter.defaultQuickFilterValue,
      ...(dates?.start !== undefined ? { start: dates.start } : {}),
      ...(dates?.end !== undefined ? { end: dates.end } : {}),
    }
  }

  if (filter.defaultValue) {
    const [start, end] = filter.defaultValue
      .split(' - ')
      .map((v) => v.trim())
      .filter(Boolean)

    return {
      ...(start !== undefined ? { start } : {}),
      ...(end !== undefined ? { end } : {}),
    }
  }

  return undefined
}

export default {
  calcDates,
  getRelativeDateOptions,
  getFilterFromDefinition,
  setValueFromRequest,
  getQueryFromDefinition,
  mapRelativeValue,
  setDefaultValue,
  setFilterValueFromDefault,
  appendDateRangeValue,
}

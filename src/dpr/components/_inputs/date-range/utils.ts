/* eslint-disable no-param-reassign */
import dayjs from 'dayjs'
import customParse from 'dayjs/plugin/customParseFormat'
import { Request } from 'express'
import isBetween from 'dayjs/plugin/isBetween'
import { components } from '../../../types/api'
import { DateRangeFilterValue, DateRange, FilterValue } from '../../_filters/types'
import StartEndDateUtils from '../start-end-date/utils'
import RelativeDateRange, { RelativeOption } from './types'
import { DefaultDateFilterValue, defaultFilterValue } from '../../../utils/Personalisation/types'

dayjs.extend(customParse)

const dateIsInBounds = (startDate: dayjs.Dayjs | string, endDate: dayjs.Dayjs | string, min: string, max: string) => {
  dayjs.extend(isBetween)

  const minDate = dayjs(min)
  const maxDate = dayjs(max)

  const startDateIsBetweenMinAndMax = startDate
    ? (<dayjs.Dayjs>startDate).isBetween(minDate, maxDate, 'day', '[]')
    : true
  const endDateIsBetweenMinAndMax = endDate ? (<dayjs.Dayjs>endDate).isBetween(minDate, maxDate, 'day', '[]') : true

  return startDateIsBetweenMinAndMax && endDateIsBetweenMinAndMax
}

const calcDates = (durationValue: string) => {
  let endDate: string | dayjs.Dayjs = dayjs()
  let startDate: string | dayjs.Dayjs = dayjs()

  switch (durationValue) {
    case 'none':
      endDate = ''
      startDate = ''
      break
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

const setValueFromRequest = (
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
    start: start || filter.min,
    end: end || filter.max,
    ...(relative && !relativeDisabled && { relative }),
  } as DateRange

  return value
}

const setDefaultValue = (req: Request, name: string) => {
  const dateRangeName = name.split('.')[0]

  const dateRangeDefaults = Object.keys(req.body)
    .filter((key) => key.includes(dateRangeName))
    .map((key) => {
      return { name: key, value: req.body[key] }
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

const setFilterValueFromDefault = (defaultValue: defaultFilterValue, filter: FilterValue) => {
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

const getRelativeDateOptions = (min?: string, max?: string) => {
  if (!min) min = '1977-05-25'
  if (!max) max = '9999-01-01'
  let options: RelativeOption[] = getRelativeValues()
  options.forEach((option: RelativeOption) => {
    if (option.value) {
      const { endDate, startDate } = calcDates(option.value)
      if (!dateIsInBounds(startDate, endDate, min, max)) {
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

const mapRelativeValue = (value: RelativeDateRange) => {
  const values = getRelativeValues()
  const opt = values.find((v) => v.value === value)
  return opt ? opt.text : ''
}

const getRelativeValues = (): {
  value: string
  text: string
  disabled?: boolean
}[] => {
  return [
    { value: 'none', text: 'None' },
    { value: 'yesterday', text: 'Yesterday' },
    { value: 'tomorrow', text: 'Tomorrow' },
    { value: 'last-week', text: 'Last week' },
    { value: 'next-week', text: 'Next week' },
    { value: 'last-month', text: 'Last month' },
    { value: 'next-month', text: 'Next month' },
  ]
}

const getFilterFromDefinition = (filter: components['schemas']['FilterDefinition'], filterData: FilterValue) => {
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

const getQueryFromDefinition = (
  filter: components['schemas']['FilterDefinition'],
  name: string,
  filterPrefix: string,
) => {
  const dates = filter.defaultValue ? filter.defaultValue.split(' - ') : []
  let param = ''
  if (dates.length >= 1) {
    param = `${filterPrefix}${name}.start=${dates[0]}`
    if (dates.length >= 2) {
      param = `${param}&${filterPrefix}${name}.end=${dates[1]}`
    }
  }
  return param
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
}

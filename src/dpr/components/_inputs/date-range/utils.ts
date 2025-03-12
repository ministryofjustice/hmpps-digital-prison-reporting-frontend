/* eslint-disable no-param-reassign */
import dayjs from 'dayjs'
import { Request } from 'express'
import isBetween from 'dayjs/plugin/isBetween'
import { components } from '../../../types/api'
import { DateFilterValue, DateRange, FilterValue } from '../../_filters/types'
import StartEndDateUtils from '../start-end-date/utils'

const dateIsInBounds = (startDate: dayjs.Dayjs, endDate: dayjs.Dayjs, min: string, max: string) => {
  dayjs.extend(isBetween)

  const minDate = dayjs(min)
  const maxDate = dayjs(max)

  const startDateIsBetweenMinAndMax = startDate.isBetween(minDate, maxDate, 'day', '[]')
  const endDateIsBetweenMinAndMax = endDate.isBetween(minDate, maxDate, 'day', '[]')

  return startDateIsBetweenMinAndMax && endDateIsBetweenMinAndMax
}

const calcDates = (durationValue: string) => {
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

const setValueFromRequest = (filter: FilterValue, req: Request, prefix: string) => {
  const start = <string>req.query[`${prefix}${filter.name}.start`]
  const end = <string>req.query[`${prefix}${filter.name}.end`]

  const value = {
    start: start || (<DateFilterValue>filter).min,
    end: end || (<DateFilterValue>filter).max,
  } as DateRange

  return value
}

const getRelativeDateOptions = (min: string, max: string) => {
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
  const dates = filter.defaultValue.split(' - ')
  let param
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
}

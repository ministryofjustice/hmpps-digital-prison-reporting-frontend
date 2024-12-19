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

const setDateRangeValueFromRequest = (filter: FilterValue, req: Request, prefix: string) => {
  const { preventDefault } = req.query

  const start = <string>req.query[`${prefix}${filter.name}.start`]
  const end = <string>req.query[`${prefix}${filter.name}.end`]

  const defaultStart = preventDefault ? null : (<DateRange>filter.value)?.start
  const defaultEnd = preventDefault ? null : (<DateRange>filter.value)?.end

  const value = {
    start: start || defaultStart || (<DateFilterValue>filter).min,
    end: end || defaultEnd || (<DateFilterValue>filter).max,
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

const getDateRangeFilterFromDefinition = (
  filter: components['schemas']['FilterDefinition'],
  filterData: FilterValue,
) => {
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

export default {
  calcDates,
  getRelativeDateOptions,
  getDateRangeFilterFromDefinition,
  setDateRangeValueFromRequest,
}

import { components } from '../../../types/api'
import { DateRange } from '../../_filters/types'
import RelativeDateRange from '../date-range/types'

export const setDateRangeValuesWithinMinMax = (
  filter: components['schemas']['FilterDefinition'],
  startValue?: string,
  endValue?: string,
) => {
  const { min, max } = filter
  const start = min ? compareMin(min, startValue) : startValue
  const end = max ? compareMax(max, endValue) : endValue

  return {
    start: start || '',
    end: end || '',
  }
}

export const compareMin = (min: string, dateValue?: string) => {
  const minDate = new Date(min)
  const date = dateValue ? new Date(dateValue) : new Date()
  return date < minDate ? min : dateValue
}

export const compareMax = (max: string, dateValue?: string) => {
  const maxDate = new Date(max)
  const date = dateValue ? new Date(dateValue) : new Date()
  return date > maxDate ? max : dateValue
}

export const getStartAndEndValueFromDefinition = (filter: components['schemas']['FilterDefinition']): DateRange => {
  const { min, max, defaultValue, defaultQuickFilterValue } = filter

  let value: DateRange = { start: '', end: '' }
  if (defaultQuickFilterValue) {
    value.relative = defaultQuickFilterValue as RelativeDateRange
  } else {
    let startValue
    let endValue
    if (min) startValue = min
    if (max) endValue = max
    const dateRegEx = /^\d{1,4}-\d{1,2}-\d{2,2} - \d{1,4}-\d{1,2}-\d{1,2}$/
    if (defaultValue && defaultValue.match(dateRegEx)) {
      ;[startValue, endValue] = defaultValue.split(' - ')
      value = setDateRangeValuesWithinMinMax(filter, startValue, endValue)
    }
  }

  return value
}

export function isDateRange(value: DateRange | string): value is DateRange {
  return (<DateRange>value).start !== undefined || (<DateRange>value).end !== undefined
}

export default {
  compareMax,
  compareMin,
  isDateRange,
  setDateRangeValuesWithinMinMax,
  getStartAndEndValueFromDefinition,
}

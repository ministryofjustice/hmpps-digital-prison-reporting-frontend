import { components } from '../../../types/api'
import { DateRange } from '../../_filters/types'
import RelativeDateRange from '../date-range/types'

const setDateRangeValuesWithinMinMax = (
  filter: components['schemas']['FilterDefinition'],
  startValue?: string,
  endValue?: string,
) => {
  const { min, max } = filter
  let start
  if (min) {
    start = compareMin(min, startValue)
  } else {
    start = startValue
  }

  let end
  if (max) {
    end = compareMax(max, endValue)
  } else {
    end = endValue
  }

  return {
    start,
    end,
  }
}

const compareMin = (min: string, dateValue: string) => {
  const minDate = new Date(min)
  const date = new Date(dateValue)
  return date < minDate ? min : dateValue
}

const compareMax = (max: string, dateValue: string) => {
  const maxDate = new Date(max)
  const date = new Date(dateValue)
  return date > maxDate ? max : dateValue
}

const getStartAndEndValueFromDefinition = (filter: components['schemas']['FilterDefinition']): DateRange => {
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

function isDateRange(value: DateRange | string): value is DateRange {
  return (<DateRange>value).start !== undefined || (<DateRange>value).end !== undefined
}

export default {
  compareMax,
  compareMin,
  isDateRange,
  setDateRangeValuesWithinMinMax,
  getStartAndEndValueFromDefinition,
}

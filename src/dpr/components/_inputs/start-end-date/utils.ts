import { calcDatesForAPI } from '../../../utils/durationCalculator'
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

/**
 * Given the filter definition for a date-range with defaults
 * - will initialise the filter with correct start end dates
 * - if default relative range it will calc the correct start end dates
 *
 * @param {components['schemas']['FilterDefinition']} filter
 * @return {*}  {DateRange}
 */
export const getStartAndEndValueFromDefinition = (filter: components['schemas']['FilterDefinition']): DateRange => {
  const { min, max, defaultValue, defaultQuickFilterValue } = filter
  let value: DateRange = { start: '', end: '' }

  if (defaultQuickFilterValue) {
    const relative = defaultQuickFilterValue as RelativeDateRange
    value.relative = relative
    const calculated = calcDatesForAPI(relative)

    if (calculated) {
      value = {
        ...setDateRangeValuesWithinMinMax(filter, calculated.start, calculated.end),
        relative,
      }
    }
    return value
  }

  let startValue = min
  let endValue = max
  const dateRegEx = /^\d{1,4}-\d{1,2}-\d{2} - \d{1,4}-\d{1,2}-\d{1,2}$/

  if (defaultValue && dateRegEx.test(defaultValue)) {
    ;[startValue, endValue] = defaultValue.split(' - ')
  }

  if (startValue || endValue) {
    value = setDateRangeValuesWithinMinMax(filter, startValue, endValue)
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

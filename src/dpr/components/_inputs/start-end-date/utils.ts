import { components } from '../../../types/api'

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

const getStartAndEndValueFromDefinition = (filter: components['schemas']['FilterDefinition']) => {
  const { min, max, defaultValue } = filter

  let startValue
  let endValue
  if (min) startValue = min
  if (max) endValue = max

  const dateRegEx = /^\d{1,4}-\d{1,2}-\d{2,2} - \d{1,4}-\d{1,2}-\d{1,2}$/
  let value
  if (defaultValue && defaultValue.match(dateRegEx)) {
    ;[startValue, endValue] = defaultValue.split(' - ')
    value = setDateRangeValuesWithinMinMax(filter, startValue, endValue)
  } else if (defaultValue) {
    value = defaultValue
  } else {
    value = setDateRangeValuesWithinMinMax(filter, startValue, endValue)
  }

  return value
}

export default {
  compareMax,
  compareMin,
  setDateRangeValuesWithinMinMax,
  getStartAndEndValueFromDefinition,
}

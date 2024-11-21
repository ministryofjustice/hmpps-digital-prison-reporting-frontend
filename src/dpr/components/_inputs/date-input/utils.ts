import { components } from '../../../types/api'
import DateRangeInputUtils from '../date-range/utils'

const setDateValueWithinMinMax = (filter: components['schemas']['FilterDefinition']) => {
  const { defaultValue, min, max } = filter
  let dateValue
  if (defaultValue) {
    dateValue = defaultValue
    if (min) dateValue = DateRangeInputUtils.compareMin(min, dateValue)
    if (max) dateValue = DateRangeInputUtils.compareMax(max, dateValue)
  }
  return dateValue
}

export default {
  setDateValueWithinMinMax,
}
